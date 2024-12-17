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
        <Button variant='default' size='sm' onClick={handleOpenWalletMenu}>
          Connect
        </Button>
      )}
      {menuDisclosure.isOpen && (
        <div>
          <X
            className='h-auto max-h-[--button-height-md] w-full max-w-[--button-height-md] cursor-pointer rounded-full bg-white p-[0.75rem] text-black'
            onClick={menuDisclosure.close}
          />
        </div>
      )}
    </>
  );
}
