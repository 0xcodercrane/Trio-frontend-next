import React, { useContext } from 'react';
import { AuthContext } from '@/app/providers/AuthContext';
import { GlobalContext } from '@/app/providers/GlobalContext';
import { EMenuType } from '@/types/global-context.types';
import { Avatar } from '../common';
import Notification from './NotificationButton';
import HeaderPointsButton from './HeaderPointsButton';
import PendingOrderButton from './PendingOrderButton';
import MenuCloseButton from './MenuCloseButton';
import { ButtonLink } from '../common/ButtonLink';
import Link from 'next/link';

export default function ConnectedWallet() {
  const { loading } = useContext(AuthContext);
  const { setMenuType, menuDisclosure } = useContext(GlobalContext);

  if (loading) return null;

  const openMenu = (type: EMenuType) => {
    setMenuType(type);
    menuDisclosure.open();
  };

  return (
    <div className='flex h-full cursor-pointer items-center justify-center'>
      {menuDisclosure.isOpen ? (
        <MenuCloseButton />
      ) : (
        <div className='flex h-full gap-2'>
          {/* <PendingOrderButton /> */}
          <HeaderPointsButton />
          {/* <Notification /> */}
          <Link className='hover:opacity-80' href='/profile'>
            <Avatar />
          </Link>
        </div>
      )}
    </div>
  );
}
