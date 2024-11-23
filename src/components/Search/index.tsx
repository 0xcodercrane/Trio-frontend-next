import React from 'react';
import { Search as SearchIcon } from 'lucide-react';

const Search = () => {
  return (
    <div className='flex h-full min-w-[52px] items-center rounded-full bg-white/[0.15] p-[0.5rem]'>
      <SearchIcon className='w-full' size='16' />
    </div>
  );
};

export { Search };
