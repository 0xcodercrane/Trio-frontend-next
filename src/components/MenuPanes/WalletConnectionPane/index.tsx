'use client';

import React, { useContext, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Image, { StaticImageData } from 'next/image';
import { ChevronRight } from 'lucide-react';
import { GlobalContext } from '@/app/providers/GlobalContext';
import { useLaserEyes } from '@omnisat/lasereyes';
import {
  UNISAT as unisatLogo,
  MAGIC_EDEN as magicEdenLogo,
  XVERSE as xVerseLogo,
  LEATHER as LeatherLogo
} from '@/lib/constants/imgs';
import { signInWithCustomToken } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { SUPPORTED_WALLETS, WALLET_SIGN_IN_MESSAGE } from '@/lib/constants';
import { AuthContext } from '@/app/providers/AuthContext';
import { signIn } from 'next-auth/react';
import { toast } from 'sonner';
import { UNISAT, XVERSE, MAGIC_EDEN, LEATHER } from '@omnisat/lasereyes';

const WALLET_OPTIONS: {
  [key in SUPPORTED_WALLETS]: {
    name: string;
    icon: StaticImageData | string;
    provider: typeof XVERSE | typeof UNISAT | typeof MAGIC_EDEN | typeof LEATHER;
    recommended?: boolean;
  };
} = {
  [XVERSE]: {
    name: 'Xverse',
    icon: xVerseLogo,
    provider: XVERSE,
    recommended: true
  },
  [UNISAT]: { name: 'Unisat', icon: unisatLogo, provider: UNISAT },
  [MAGIC_EDEN]: {
    name: 'Magic Eden',
    icon: magicEdenLogo,
    provider: MAGIC_EDEN
  },
  [LEATHER]: { name: 'Leather', icon: LeatherLogo, provider: LEATHER }
  // { name: 'OKX', icon: '/img/okx-logo.svg', provider: 'OKX' }, // TODO do we support?
};

export default function WalletConnectionPane() {
  const { menuDisclosure } = useContext(GlobalContext);
  const { loginWithWallet, loading, logout } = useContext(AuthContext);

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
    hasUnisat
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
    if (isInitializing || auth.currentUser || loading) return;

    // Only prompt to sign a message if the wallet is connected, but firebase has no authenticated user
    if (connected) {
      const signMessageForFirebase = async (wallet: SUPPORTED_WALLETS) => {
        try {
          const signedMessage = await signMessage(WALLET_SIGN_IN_MESSAGE, address);
          if (!signedMessage) return toast.error('Failed to sign message');
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

  const handleConnect = async (provider: SUPPORTED_WALLETS) => {
    try {
      await connect(provider);
    } catch (error) {
      toast.error('User denied connection request');
    }
  };

  return (
    <div className='flex h-full flex-col items-center justify-center bg-ob-black p-6 text-white'>
      <h2 className='mb-8 text-4xl font-bold'>Choose a bitcoin wallet to connect</h2>
      <div className='w-full max-w-md space-y-4'>
        {!connected &&
          Object.entries(WALLET_OPTIONS).map(
            ([key, wallet]) =>
              (key !== UNISAT || (key === UNISAT && hasUnisat)) && (
                <Button
                  key={wallet.name}
                  variant='outline'
                  className='w-full justify-between border-zinc-700 bg-zinc-900 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white'
                  // @ts-ignore - Supported Wallets are the keys of the WalletProviderConfig object
                  onClick={() => handleConnect(key)}
                >
                  <div className='flex items-center'>
                    <Image
                      src={wallet.icon}
                      alt={`${wallet.name} logo`}
                      width={24}
                      height={24}
                      className='mr-3 grayscale filter hover:grayscale-0'
                    />
                    {wallet.name}
                    {wallet.recommended && (
                      <span className='ml-2 rounded-full bg-zinc-800 px-2 py-1 text-xs'>Recommended</span>
                    )}
                  </div>
                  <ChevronRight size={20} className='hover:text-white' />
                </Button>
              )
          )}
      </div>
    </div>
  );
}
