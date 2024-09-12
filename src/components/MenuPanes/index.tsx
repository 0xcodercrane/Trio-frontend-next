'use client';

import { useContext } from 'react';
import { GlobalContext } from '@/app/providers/GlobalContext';
import { EMenuType } from '@/types/global-context.types';
import ProfilePane from './ProfilePane';
import ActivityPane from './ActivityPane';

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
      default:
        return null;
    }
  };

  return (
    <div
      className={`absolute top-[--header-height] h-full w-full ${menuBG} text-black`}
    >
      {renderPane()}
    </div>
  );
}
