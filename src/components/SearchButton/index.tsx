import React, { useContext } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { GlobalContext } from '@/app/providers/GlobalContext';
import { EMenuType } from '@/types';

const SearchButton = () => {
  const { setMenuType, menuDisclosure } = useContext(GlobalContext);

  const handleOpenWalletMenu = () => {
    setMenuType(EMenuType.SEARCH);
    menuDisclosure.open();
  };

  return (
    <button
      onClick={handleOpenWalletMenu}
      className='flex h-full min-w-[52px] items-center rounded-full bg-white/[0.15] p-[0.5rem]'
    >
      <SearchIcon className='w-full' size='16' />
    </button>
  );
};

export { SearchButton };
