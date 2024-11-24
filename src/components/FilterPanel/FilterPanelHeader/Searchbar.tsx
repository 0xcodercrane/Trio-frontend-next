import { Input } from '@/components/ui/input';
import { useFilter } from '@/lib/hooks';
import { SearchIcon } from 'lucide-react';
import React, { ChangeEvent, useCallback, useState } from 'react';
import debounce from 'lodash.debounce';

const Searchbar = () => {
  const [keyword, setKeyword] = useState('');
  const { setSearchKeyword } = useFilter();

  // MEMO: Update global state (and results) every 500ms debounced
  const setGlobalKeyword = useCallback(
    debounce((keyword: string) => setSearchKeyword(keyword), 500),
    [setSearchKeyword]
  );

  const handleSearchKeywordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value ?? '');
    setGlobalKeyword(event.target.value ?? '');
  };

  return (
    <div>
      <div className='flex min-w-[200px] items-center justify-between gap-4 rounded-full bg-ob-purple-dark text-white has-[:focus]:bg-ob-purple'>
        <Input
          id='keyword'
          value={keyword}
          onChange={handleSearchKeywordChange}
          placeholder='Search'
          className='peer col-span-3 rounded-full border-0 bg-transparent'
        />
        <div className='mr-4'>
          <SearchIcon className='w-full' size='16' />
        </div>
      </div>
    </div>
  );
};

export { Searchbar };
