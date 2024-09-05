import React, { useContext } from 'react';
import Image from 'next/image';
import { Bell, BellDot, Star, User, X } from 'lucide-react';
import { AuthContext } from '@/app/providers/AuthContext';
import Loading from '../Loading';
import { GlobalContext } from '@/app/providers/GlobalContext';
import { EMenuType } from '@/types/global-context.types';
import { Button } from '../ui/button';

export default function ConnectedWallet() {
  const { loading, user } = useContext(AuthContext);
  const { setMenuType, menuDisclosure } = useContext(GlobalContext);

  const { profile } = user || {};
  const { avatar } = profile || {};

  const openMenu = (type: EMenuType) => {
    setMenuType(type);
    menuDisclosure.open();
  };

  const renderUserIcon = () => {
    if (loading) return <Loading />;
    if (avatar) {
      return (
        <Image
          className='rounded-full max-h-full w-auto'
          src={avatar}
          alt='user avatar'
          width={50}
          height={50}
          onClick={() => openMenu(EMenuType.PROFILE)}
        />
      );
    } else {
      return (
        <User
          className='h-full w-full text-black bg-white rounded-full p-[0.75rem]'
          onClick={() => openMenu(EMenuType.PROFILE)}
        />
      );
    }
  };

  const renderNotificationIcon = () => {
    if (loading) return null;
    //TODO - Hook this up to the notification system
    const notification = false;
    if (notification)
      return (
        <div onClick={() => openMenu(EMenuType.ACTIVITY)}>
          <IconBell />
        </div>
      );
    return (
      <Bell
        onClick={() => openMenu(EMenuType.ACTIVITY)}
        className='w-full h-full text-black bg-white rounded-full p-[0.75rem] max-h-[48px] max-w-[48px]'
      />
    );
  };

  const renderPointsIcon = () => {
    if (loading) return null;
    return (
      <Button className='min-w-[120px] h-[48px] py-[0.5rem] md:w-auto rounded-full ml-2 border-2 border-solid border-white font-extrabold'>
        <div className='flex w-full justify-between items-center'>
          12,000
          <Star fill='black' size='20' />
        </div>
      </Button>
    );
  };

  const renderCart = () => {
    if (loading) return null;
    return (
      <Button
        className='min-w-[120px] h-[48px] p-[0.5rem] md:px-8 md:w-auto rounded-full ml-2 border border-solid font-extrabold border-ob-blue ring-offset-4'
        variant='secondary'
      >
        Pending (2)
      </Button>
    );
  };

  return (
    <div className='flex justify-center h-[48px] items-center cursor-pointer'>
      {!menuDisclosure.isOpen && (
        <div className='flex gap-2 h-full'>
          {renderCart()}
          {renderPointsIcon()}
          {renderNotificationIcon()}
          {renderUserIcon()}
        </div>
      )}
      {menuDisclosure.isOpen && (
        <X
          className='w-full h-full text-black bg-white rounded-full p-[0.75rem]'
          onClick={menuDisclosure.close}
        />
      )}
    </div>
  );
}

export const IconBell = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='black'
      stroke-width='2'
      stroke-linecap='round'
      stroke-linejoin='round'
      className='w-full h-full bg-white rounded-full p-[0.75rem] max-h-[48px] max-w-[48px]'
    >
      <path d='M19.4 14.9C20.2 16.4 21 17 21 17H3s3-2 3-9c0-3.3 2.7-6 6-6 .7 0 1.3.1 1.9.3' />
      <path d='M10.3 21a1.94 1.94 0 0 0 3.4 0' />
      <circle cx='18' cy='8' r='3' fill='red' stroke='red' />
    </svg>
  );
};
