'use client';

import { useContext } from 'react';
import { GlobalContext } from '@/app/providers/GlobalContext';
import { EMenuType } from '@/types/global-context.types';
import ProfilePane from './ProfilePane';
import ActivityPane from './ActivityPane';
import WalletConnectionPane from './WalletConnectionPane';
import Link from 'next/link';
import Image from 'next/image';
import { X } from 'lucide-react';

export default function MenuPanes() {
  const { menuDisclosure, menuType, menuBG } = useContext(GlobalContext);
  const { isOpen } = menuDisclosure;

  if (!isOpen) return null;

  const renderPane = () => {
    switch (menuType) {
      case EMenuType.PROFILE:
        return <ProfilePane />;
      case EMenuType.ACTIVITY:
        return <ActivityPane />;
      case EMenuType.WALLET:
        return <WalletConnectionPane />;
      default:
        return null;
    }
  };

  return (
    <div className={`fixed inset-0 left-0 top-0 ${menuBG} z-50 text-black`}>
      <div className='fixed left-0 top-0 z-50 flex h-[--header-height] w-full items-center justify-between bg-ob-black px-4 md:px-16'>
        <div className='flex items-center'>
          <Link href='/'>
            <Image className='h-10 w-auto' src='/img/trio-logo.svg' alt='Trio logo' width={100} height={40} />
          </Link>
        </div>

        <div>
          <X
            className='h-auto max-h-[48px] w-full max-w-[48px] cursor-pointer rounded-full bg-white p-[0.75rem] text-black'
            onClick={menuDisclosure.close}
          />
        </div>
      </div>

      <div className='absolute inset-0 top-[--header-height] z-40 overflow-y-auto'>{renderPane()}</div>
    </div>
  );
}
