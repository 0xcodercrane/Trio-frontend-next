import React, { useContext } from 'react';
import Image from 'next/image';
import { Disc, X } from 'lucide-react';
import { auth } from '@/lib/firebase';
import { AuthContext } from '@/app/providers/AuthContext';
import { useRouter } from 'next/navigation';
import Loading from '../Loading';
import { GlobalContext } from '@/app/providers/GlobalContext';
import { EMenuType } from '@/types/global-context.types';

export default function ConnectedWallet() {
  const { loading, user } = useContext(AuthContext);
  const { setMenuType, menuDisclosure } = useContext(GlobalContext);

  const router = useRouter();

  const { profile } = user || {};
  const { avatar } = profile || {};

  const openProfileMenu = () => {
    setMenuType(EMenuType.PROFILE);
    menuDisclosure.toggle();
  };

  return (
    <div
      className='flex justify-center h-[48px] items-center cursor-pointer'
      onClick={openProfileMenu}
    >
      {!menuDisclosure.isOpen && (
        <div className='h-full'>
          {!loading && auth.currentUser && avatar && (
            <Image
              className='rounded-full max-h-full w-auto'
              src={avatar}
              alt='user avatar'
              width={50}
              height={50}
            />
          )}

          {loading && <Loading />}

          {!loading && auth.currentUser && !avatar && (
            <Disc className='h-full w-full text-white' />
          )}
        </div>
      )}
      {menuDisclosure.isOpen && (
        <X className='w-full h-full text-black bg-white rounded-full p-2' />
      )}
    </div>
  );
}
