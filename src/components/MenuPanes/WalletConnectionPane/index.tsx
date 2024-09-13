'use client';

import React, { useContext, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import { GlobalContext } from '@/app/providers/GlobalContext';
import { useLaserEyes } from '@omnisat/lasereyes';
import {
  UNISAT as unisatLogo,
  MAGIC_EDEN as magicEdenLogo,
  XVERSE as xVerseLogo,
} from '@/lib/constants/imgs';
import { signInWithCustomToken } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { WALLET_SIGN_IN_MESSAGE } from '@/lib/constants';
import { SUPPORTED_WALLETS } from '@/types/auth.types';
import { AuthContext } from '@/app/providers/AuthContext';
import { signIn } from 'next-auth/react';

const WALLET_OPTIONS = [
  {
    name: 'Xverse',
    icon: xVerseLogo,
    provider: SUPPORTED_WALLETS.XVERSE,
    recommended: true,
  },
  { name: 'Unisat', icon: unisatLogo, provider: SUPPORTED_WALLETS.UNISAT },
  {
    name: 'Magic Eden',
    icon: magicEdenLogo,
    provider: SUPPORTED_WALLETS.MAGIC_EDEN,
  },
  // { name: 'Leather', icon: '/img/leather-logo.svg', provider: SUPPORTED_WALLETS.LEATHER },
  // { name: 'OKX', icon: '/img/okx-logo.svg', provider: 'OKX' }, // TODO do we support?
];

export default function WalletConnectionPane() {
  const { menuDisclosure } = useContext(GlobalContext);
  const { loginWithWallet } = useContext(AuthContext);

  const {
    connect,
    connected,
    address,
    publicKey,
    signMessage,
    paymentAddress,
    paymentPublicKey,
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
    if (connected && !auth.currentUser) {
      const connectWallet = async (walletProvider: string) => {
        const signedMessage = await signMessage(
          WALLET_SIGN_IN_MESSAGE,
          address,
        );
        const signInResult = await signIntoFirebase(address, signedMessage);

        if (signInResult) {
          loginWithWallet({
            ordinalsAddress: address,
            ordinalsPublicKey: publicKey,
            paymentAddress,
            paymentPublicKey,
            wallet: walletProvider as SUPPORTED_WALLETS,
          });
        }
      };

      connectWallet(provider as SUPPORTED_WALLETS);
    }
  }, [connected]);

  const handleConnect = async (
    provider: 'unisat' | 'xverse' | 'magic-eden',
  ) => {
    try {
      await connect(provider);
      menuDisclosure.close();
    } catch (error) {
      console.error('Error connecting to wallet:', error);
    }
  };
  return (
    <div className='flex h-full flex-col items-center justify-center bg-ob-black p-6 text-white'>
      <h2 className='mb-8 text-4xl font-bold'>
        Choose a bitcoin wallet to connect
      </h2>
      <div className='w-full max-w-md space-y-4'>
        {WALLET_OPTIONS.map((wallet) => (
          <Button
            key={wallet.name}
            variant='outline'
            className='w-full justify-between border-zinc-700 bg-zinc-900 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white'
            onClick={() =>
              handleConnect(
                wallet.provider as 'unisat' | 'xverse' | 'magic-eden',
              )
            }
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
                <span className='ml-2 rounded-full bg-zinc-800 px-2 py-1 text-xs'>
                  Recommended
                </span>
              )}
            </div>
            <ChevronRight size={20} className='hover:text-white' />
          </Button>
        ))}
      </div>
    </div>
  );
}
