'use client';

import { useContext } from 'react';
import { GlobalContext } from '@/app/providers/GlobalContext';
import { EMenuType } from '@/types/global-context.types';
import ProfileMenu from './ProfileMenu';

export default function MenuPanes() {
  const { menuDisclosure, menuType } = useContext(GlobalContext);
  const { isOpen } = menuDisclosure;

  if (!isOpen) return null;

  const renderPane = () => {
    switch (menuType) {
      case EMenuType.PROFILE:
        return <ProfileMenu />;
      default:
        return null;
    }
  };

  return (
    <div className='w-full h-full bg-white text-black absolute top-[--header-height]'>
      {renderPane()}
    </div>
  );
}
