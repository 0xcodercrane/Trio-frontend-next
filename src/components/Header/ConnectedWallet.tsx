import React, { useContext } from 'react';
import { Bell, Star, X } from 'lucide-react';
import { AuthContext } from '@/app/providers/AuthContext';
import { GlobalContext } from '@/app/providers/GlobalContext';
import { EMenuType } from '@/types/global-context.types';
import { Button } from '../ui/button';
import { Avatar } from '../common';

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
      {!menuDisclosure.isOpen && (
        <div className='flex h-full gap-2'>
          {/* FIXMe we need the gradient */}
          <Button
            className='h-auto min-w-[120px] rounded-full border-2 border-solid border-ob-red p-[0.5rem] font-extrabold ring-offset-4 md:w-auto md:px-8'
            variant='secondary'
          >
            Pending (2)
          </Button>

          <Button
            className='h-auto min-w-[120px] rounded-full bg-white py-[0.5rem] font-extrabold text-black md:w-auto'
            variant='secondary'
          >
            <div className='flex w-full items-center justify-around'>
              12,000
              <Star fill='black' size='20' />
            </div>
          </Button>

          <Bell
            // TODO - Hook this up to the notification system
            onClick={() => openMenu(EMenuType.ACTIVITY)}
            className='h-auto max-h-[48px] w-full max-w-[48px] rounded-full bg-white p-[0.75rem] text-black'
          />

          <Avatar
            onClick={() => {
              setMenuType(EMenuType.PROFILE);
              menuDisclosure.open();
            }}
          />
        </div>
      )}
      {menuDisclosure.isOpen && (
        <X
          className='h-full w-full rounded-full bg-white p-[0.75rem] text-black'
          onClick={menuDisclosure.close}
        />
      )}
    </div>
  );
}

//TODO - Built a more sophisticated bell icon with numbers inside of it. Like the Figma spec asks for.
export const IconBell = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='20'
      height='20'
      viewBox='0 0 24 24'
      fill='none'
      stroke='black'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      className='h-full max-h-[48px] w-full max-w-[48px] rounded-full bg-white p-[0.75rem]'
    >
      <path d='M19.4 14.9C20.2 16.4 21 17 21 17H3s3-2 3-9c0-3.3 2.7-6 6-6 .7 0 1.3.1 1.9.3' />
      <path d='M10.3 21a1.94 1.94 0 0 0 3.4 0' />
      <circle cx='18' cy='8' r='3' fill='red' stroke='red' />
    </svg>
  );
};
