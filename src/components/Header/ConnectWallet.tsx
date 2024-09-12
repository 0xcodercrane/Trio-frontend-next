'use client';
import { AuthContext } from '@/app/providers/AuthContext';
import { WALLET_SIGN_IN_MESSAGE } from '@/lib/constants';
import { auth } from '@/lib/firebase';
import {
  UNISAT,
  XVERSE,
  MAGIC_EDEN,
  useLaserEyes,
  LEATHER,
} from '@omnisat/lasereyes';
import { signInWithCustomToken } from 'firebase/auth';
import { signIn } from 'next-auth/react';
import { useContext, useEffect } from 'react';
import Image, { type StaticImageData } from 'next/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '../ui/button';
import {
  UNISAT as unisatLogo,
  MAGIC_EDEN as magicEdenLogo,
  XVERSE as xVerseLogo,
  LEATHER as leatherLogo,
} from '@/lib/constants/imgs';
import type { SUPPORTED_WALLETS } from '@/types/auth.types';
import { useRouter } from 'next/navigation';

const WalletProviderConfig: {
  [key in SUPPORTED_WALLETS]: {
    logo: StaticImageData;
  };
} = {
  [UNISAT]: { logo: unisatLogo },
  [XVERSE]: { logo: xVerseLogo },
  [MAGIC_EDEN]: { logo: magicEdenLogo },
  [LEATHER]: { logo: leatherLogo },
};

export default function ConnectWallet() {
  const { loginWithWallet, logout } = useContext(AuthContext);
  const router = useRouter();

  const {
    isInitializing,
    connect,
    connected,
    paymentAddress,
    paymentPublicKey,
    address,
    publicKey,
    signMessage,
    hasUnisat,
    disconnect,
    provider,
  } = useLaserEyes();

  const signIntoFirebase = async (address: string, signature: string) => {
    try {
      const response = await fetch('/api/auth/customToken', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ address, signature }), // Send the address and its signature
      });

      if (!response.ok) {
        throw new Error('Failed to fetch custom token');
      }

      const data = await response.json();
      const customToken = data.customToken;

      // Use the custom token to authenticate with Firebase
      try {
        await signInWithCustomToken(auth, customToken);

        const idToken = await auth.currentUser?.getIdToken(true);
        if (idToken) {
          // Sign in with next-auth, which establishes a session
          await signIn('credentials', { redirect: false, idToken });
          return true;
        }
      } catch (error) {
        console.error('Error signing in with custom token:', error);
        // cancel();
        return false;
      }
    } catch (error) {
      console.error('Fetch Error: ', error);
      // cancel();
      return false;
    }
  };

  useEffect(() => {
    if (isInitializing) return;
    if (connected && !auth.currentUser) {
      const connectWallet = async (wallet: SUPPORTED_WALLETS) => {
        console.log('----- signing in with address', address);
        const signedMessage = await signMessage(
          WALLET_SIGN_IN_MESSAGE,
          address,
        );

        console.log('----- signing in with signed message', signedMessage);

        const signInResult = await signIntoFirebase(address, signedMessage);

        if (signInResult)
          return loginWithWallet({
            ordinalsAddress: address,
            ordinalsPublicKey: publicKey,
            paymentAddress,
            paymentPublicKey,
            wallet,
          });
      };

      connectWallet(provider);
    }
  }, [isInitializing, connected]);

  const signOut = async () => {
    disconnect();
    logout();
    router.push('/');
  };

  return (
    <DropdownMenu>
      {!connected && (
        <DropdownMenuTrigger asChild>
          <Button
            className='h-[48px] w-[80px] cursor-pointer rounded-full border-2 border-solid border-white bg-transparent p-[0.5rem] font-extrabold md:w-auto md:px-8'
            variant='secondary'
          >
            Connect
          </Button>
        </DropdownMenuTrigger>
      )}

      <DropdownMenuContent align='end'>
        {!connected &&
          Object.entries(WalletProviderConfig).map(
            ([key, value]) =>
              (key !== UNISAT || (key === UNISAT && hasUnisat)) && (
                <DropdownMenuItem
                  key={key}
                  className='cursor-pointer'
                  // @ts-expect-error seems theres more wallets missing
                  onClick={() => connect(key as SUPPORTED_WALLETS)}
                >
                  <div className='flex items-center space-x-2'>
                    <Image
                      src={value.logo}
                      alt={`${key} wallet logo`}
                      width={24}
                      height={24}
                    />
                    <span className='capitalize'>{key}</span>
                  </div>
                </DropdownMenuItem>
              ),
          )}

        {connected && (
          <>
            <DropdownMenuItem>
              <span onClick={() => router.push('/dashboard')}>Dashboard</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span onClick={signOut}>logout</span>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
