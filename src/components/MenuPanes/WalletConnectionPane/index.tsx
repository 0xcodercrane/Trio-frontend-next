'use client';

import React, { ReactElement, useContext, useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { StaticImageData } from 'next/image';
import { ChevronRight } from 'lucide-react';
import { GlobalContext } from '@/app/providers/GlobalContext';
import { signInWithCustomToken } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { ESUPPORTED_WALLETS, NETWORK, WALLET_SIGN_IN_MESSAGE } from '@/lib/constants';
import { AuthContext } from '@/app/providers/AuthContext';
import { signIn } from 'next-auth/react';
import { toast } from 'sonner';
import {
  UNISAT,
  XVERSE,
  MAGIC_EDEN,
  LEATHER,
  OKX,
  OYL,
  useLaserEyes,
  OylLogo,
  UnisatLogo,
  MagicEdenLogo,
  LeatherLogo,
  XverseLogo,
  OkxLogo
} from '@omnisat/lasereyes';
import { Container } from '@/components/Container';
import LoadingScreen from '@/components/common/LoadingScreen';
import { Loading } from '@/components/common';

const WALLET_OPTIONS: {
  [key in ESUPPORTED_WALLETS]: {
    name: string;
    icon: StaticImageData | ReactElement;
    provider: typeof XVERSE | typeof UNISAT | typeof MAGIC_EDEN | typeof LEATHER | typeof OKX | typeof OYL;
    recommended?: boolean;
  };
} = {
  [XVERSE]: {
    name: 'Xverse',
    icon: <XverseLogo size={24} />,
    provider: XVERSE,
    recommended: true
  },
  [UNISAT]: { name: 'Unisat', icon: <UnisatLogo size={24} />, provider: UNISAT },
  [MAGIC_EDEN]: {
    name: 'Magic Eden',
    icon: <MagicEdenLogo size={24} />,
    provider: MAGIC_EDEN
  },
  [LEATHER]: { name: 'Leather', icon: <LeatherLogo size={24} />, provider: LEATHER },
  [OYL]: { name: 'OYL', icon: <OylLogo size={24} />, provider: OYL },
  [OKX]: { name: 'OKX', icon: <OkxLogo size={24} />, provider: OKX }
};

export default function WalletConnectionPane() {
  const { menuDisclosure } = useContext(GlobalContext);
  const { loginWithWallet, loading, logout } = useContext(AuthContext);

  const [loginStates, setLoginStates] = useState({
    connect: false,
    sign: false,
    loading: false
  });

  const {
    connect,
    connected,
    address,
    publicKey,
    signMessage,
    paymentAddress,
    paymentPublicKey,
    provider,
    isInitializing,
    hasUnisat,
    hasXverse,
    hasOkx,
    hasMagicEden,
    hasLeather,
    hasOyl
  } = useLaserEyes();

  const signIntoFirebase = async (address: string, signature: string) => {
    try {
      const response = await fetch('/api/auth/customToken', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ address, signature }) // Send the address and its signature
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
        return false;
      }
    } catch (error) {
      console.error('Fetch Error: ', error);
      return false;
    }
  };

  useEffect(() => {
    if (isInitializing || auth.currentUser || loading) return;

    // Only prompt to sign a message if the wallet is connected, but firebase has no authenticated user
    if (connected) {
      setLoginStates({ connect: true, sign: false, loading: true });
      const signMessageForFirebase = async (wallet: ESUPPORTED_WALLETS) => {
        try {
          const signedMessage = await signMessage(WALLET_SIGN_IN_MESSAGE, address);
          if (!signedMessage) {
            setLoginStates({ connect: false, sign: false, loading: false });
            logout();
            return toast.error('Failed to sign message');
          }
          const signInResult = await signIntoFirebase(address, signedMessage);

          if (signInResult) {
            menuDisclosure.close();
            return loginWithWallet({
              ordinalsAddress: address,
              ordinalsPublicKey: publicKey,
              paymentAddress,
              paymentPublicKey,
              wallet
            });
          }
        } catch (error) {
          toast.error('User rejected request');
          logout();
        }
      };

      signMessageForFirebase(provider);
    }
  }, [connected]);

  const handleConnect = async (provider: ESUPPORTED_WALLETS) => {
    try {
      await connect(provider as any);
      setLoginStates({ connect: true, sign: false, loading: true });
    } catch (error: any) {
      if (error.message.includes('Please switch networks')) {
        return toast.error(`Please switch your wallets to ${NETWORK}`);
      }
      toast.error('User denied connection request');
    }
  };

  const WalletInstallationMatrix = useMemo(() => {
    return {
      [ESUPPORTED_WALLETS.UNISAT]: hasUnisat,
      [ESUPPORTED_WALLETS.XVERSE]: hasXverse,
      [ESUPPORTED_WALLETS.MAGIC_EDEN]: hasMagicEden,
      [ESUPPORTED_WALLETS.LEATHER]: hasLeather,
      [ESUPPORTED_WALLETS.OKX]: hasOkx,
      [ESUPPORTED_WALLETS.OYL]: hasOyl
    };
  }, [hasUnisat, hasXverse, hasMagicEden, hasLeather, hasLeather, hasOkx, hasOyl]);

  return (
    <Container padding justify='center'>
      <div className='flex h-full flex-col items-center justify-center gap-8 bg-ob-black text-white'>
        {!loginStates.connect && <h2 className='text-4xl font-bold'>Choose a bitcoin wallet to connect</h2>}

        <div className='flex w-full flex-col items-center justify-center gap-4'>
          {loginStates.connect && !loginStates.sign && (
            <span className='text-2xl'>Connecting wallet... please sign the message</span>
          )}
          {loginStates.loading && <Loading />}
          {!loginStates.connect &&
            Object.entries(WALLET_OPTIONS).map(([key, wallet]) => {
              return (
                WalletInstallationMatrix[key as ESUPPORTED_WALLETS] && (
                  <Button
                    key={wallet.name}
                    variant='outline'
                    className='w-full min-w-fit max-w-[33%] justify-between hover:text-white'
                    // @ts-expect-error- Supported Wallets are the keys of the WalletProviderConfig object
                    onClick={() => handleConnect(key)}
                  >
                    <div className='flex w-full flex-row items-center gap-2'>
                      <div className='max-h-[var(--button-height-xs)] max-w-[var(--button-height-xs)]'>
                        {React.isValidElement(wallet.icon) ? wallet.icon : null}
                      </div>
                      <span>{wallet.name}</span>
                      {key === ESUPPORTED_WALLETS.XVERSE && (
                        <span className='rounded-full bg-zinc-800 px-2 py-1 text-xs'>Recommended</span>
                      )}
                    </div>
                    <ChevronRight size={20} className='hover:text-white' />
                  </Button>
                )
              );
            })}
        </div>
      </div>
    </Container>
  );
}
