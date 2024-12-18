import React, { useContext } from 'react';
import { AuthContext } from '@/app/providers/AuthContext';
import { GlobalContext } from '@/app/providers/GlobalContext';
import { Avatar } from '../common';
import HeaderPointsButton from './HeaderPointsButton';
import MenuCloseButton from './MenuCloseButton';
import Link from 'next/link';

export default function ConnectedWallet() {
  const { loading } = useContext(AuthContext);
  const { menuDisclosure } = useContext(GlobalContext);

  if (loading) return null;

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
