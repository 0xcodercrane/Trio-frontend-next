'use client';
import { useContext } from 'react';
import { Button } from '../ui/button';
import { EMenuType } from '@/types/global-context.types';
import { GlobalContext } from '@/app/providers/GlobalContext';
import { X } from 'lucide-react';

export default function ConnectWallet() {
  const { setMenuType, menuDisclosure } = useContext(GlobalContext);

  const handleOpenWalletMenu = () => {
    setMenuType(EMenuType.WALLET);
    menuDisclosure.open();
  };

  return (
    <>
      {!menuDisclosure.isOpen && (
        <Button
          variant='secondary'
          className='rounded-full bg-white px-6 py-2 text-sm font-medium text-black transition-colors hover:bg-gray-200'
          onClick={handleOpenWalletMenu}
        >
          Connect
        </Button>
      )}
      {menuDisclosure.isOpen && (
        <div>
          <X
            className='h-auto max-h-[48px] w-full max-w-[48px] cursor-pointer rounded-full bg-white p-[0.75rem] text-black'
            onClick={menuDisclosure.close}
          />
        </div>
      )}
    </>
  );
}
