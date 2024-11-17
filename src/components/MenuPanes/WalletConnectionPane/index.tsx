'use client';

import React, { ReactElement, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { StaticImageData } from 'next/image';
import { ChevronRight, MonitorDown } from 'lucide-react';
import { ESUPPORTED_WALLETS, NETWORK } from '@/lib/constants';
import { toast } from 'sonner';
import {
  UNISAT,
  XVERSE,
  MAGIC_EDEN,
  LEATHER,
  OKX,
  OYL,
  ORANGE,
  useLaserEyes,
  OylLogo,
  UnisatLogo,
  MagicEdenLogo,
  LeatherLogo,
  XverseLogo,
  OkxLogo,
  PHANTOM,
  PhantomLogo,
  WIZZ,
  WizzLogo
} from '@omnisat/lasereyes';
import { Container } from '@/components/Container';
import { Loading } from '@/components/common';

const WALLET_OPTIONS: {
  [key in ESUPPORTED_WALLETS]: {
    name: string;
    icon: StaticImageData | ReactElement;
    provider:
      | typeof XVERSE
      | typeof UNISAT
      | typeof MAGIC_EDEN
      | typeof LEATHER
      | typeof OKX
      | typeof OYL
      | typeof PHANTOM
      | typeof ORANGE
      | typeof WIZZ;
    recommended?: boolean;
    downloadUrl?: string;
  };
} = {
  [XVERSE]: {
    name: 'Xverse',
    icon: <XverseLogo size={24} />,
    provider: XVERSE,
    recommended: true,
    downloadUrl: 'https://www.xverse.app/download'
  },
  [UNISAT]: { name: 'Unisat', icon: <UnisatLogo size={24} />, provider: UNISAT, downloadUrl: 'https://unisat.io/download' },
  [MAGIC_EDEN]: {
    name: 'Magic Eden',
    icon: <MagicEdenLogo size={24} />,
    provider: MAGIC_EDEN,
    downloadUrl: 'https://wallet.magiceden.io/download'
  },
  [LEATHER]: {
    name: 'Leather',
    icon: <LeatherLogo size={24} />,
    provider: LEATHER,
    downloadUrl: 'https://leather.io/install-extension'
  },
  [OYL]: { name: 'OYL', icon: <OylLogo size={24} />, provider: OYL, downloadUrl: 'https://www.oyl.io/' },
  [OKX]: { name: 'OKX', icon: <OkxLogo size={24} />, provider: OKX, downloadUrl: 'https://www.okx.com/download' },
  [PHANTOM]: { name: 'Phantom', icon: <PhantomLogo size={24} />, provider: PHANTOM, downloadUrl: 'https://phantom.app/' },
  [ORANGE]: { name: 'Orange', icon: <span>🟠</span>, provider: ORANGE, downloadUrl: 'https://orangecrypto.com' },
  [WIZZ]: { name: 'Wizz', icon: <WizzLogo size={24} />, provider: WIZZ, downloadUrl: 'https://wizzwallet.io' }
};

export default function WalletConnectionPane() {
  const [loginStates, setLoginStates] = useState({
    connect: false,
    sign: false,
    loading: false
  });

  const { connect, hasUnisat, hasXverse, hasOkx, hasMagicEden, hasLeather, hasOyl, hasPhantom, hasWizz, hasOrange } =
    useLaserEyes();

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
      [ESUPPORTED_WALLETS.OYL]: hasOyl,
      [ESUPPORTED_WALLETS.PHANTOM]: hasPhantom,
      [ESUPPORTED_WALLETS.WIZZ]: hasWizz,
      [ESUPPORTED_WALLETS.ORANGE]: hasOrange
    };
  }, [hasUnisat, hasXverse, hasMagicEden, hasLeather, hasLeather, hasOkx, hasOyl, hasPhantom, hasOrange, hasWizz]);

  return (
    <Container padding justify='center'>
      <div className='flex h-full flex-col items-center justify-center gap-8 bg-ob-purple-darkest text-white'>
        {!loginStates.connect && <h2 className='text-4xl font-bold'>Choose a bitcoin wallet to connect</h2>}

        <div className='flex w-full flex-col items-center justify-center gap-4'>
          {loginStates.connect && !loginStates.sign && (
            <span className='text-2xl'>Connecting wallet... please sign the message</span>
          )}
          {loginStates.loading && <Loading />}
          {!loginStates.connect &&
            Object.entries(WALLET_OPTIONS).map(([key, wallet]) => {
              const hasWallet = WalletInstallationMatrix[key as ESUPPORTED_WALLETS];
              return (
                WalletInstallationMatrix[key as ESUPPORTED_WALLETS] && (
                  <Button
                    key={wallet.name}
                    variant='ghost'
                    className='w-full min-w-fit max-w-[33%] justify-between hover:text-white'
                    onClick={() => {
                      // @ts-expect-error- Supported Wallets are the keys of the WalletProviderConfig object
                      if (hasWallet) return handleConnect(key);
                      else if (wallet.downloadUrl && window) window.open(wallet.downloadUrl);
                    }}
                  >
                    <div className='flex w-full flex-row items-center gap-2'>
                      <div className='max-h-[var(--button-height-xs)] max-w-[var(--button-height-xs)]'>
                        {React.isValidElement(wallet.icon) ? wallet.icon : null}
                      </div>
                      <span>{wallet.name}</span>
                    </div>
                    {hasWallet ? <ChevronRight size={20} className='hover:text-white' /> : <MonitorDown size={20} />}
                  </Button>
                )
              );
            })}
        </div>
      </div>
    </Container>
  );
}
