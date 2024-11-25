import { Input } from '@/components/ui/input';
import { useFilter } from '@/lib/hooks';
import { SearchIcon, XIcon } from 'lucide-react';
import React, { ChangeEvent, useCallback, useState } from 'react';
import debounce from 'lodash.debounce';

const Searchbar = () => {
  const [keyword, setKeyword] = useState('');
  const { setSearchKeyword, setOffset } = useFilter();

  // MEMO: Update global filter state (and results) every 500ms debounced
  const setGlobalKeyword = useCallback(
    debounce((keyword: string) => {
      setSearchKeyword(keyword);
      setOffset(0);
    }, 300),
    [setSearchKeyword]
  );

  const handleSearchKeywordChange = (event: ChangeEvent<HTMLInputElement>) => {
    changeSearchKeyword(event.target.value || '');
  };

  const changeSearchKeyword = (keyword: string) => {
    setKeyword(keyword);
    setGlobalKeyword(keyword);
  };

  const clearSearch = () => changeSearchKeyword('');

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
        <div className='w-4'>
          {keyword && (
            <button onClick={clearSearch} className='flex items-center'>
              <XIcon size='16' />
            </button>
          )}
        </div>

        <div className='mr-4'>
          <SearchIcon className='w-full' size='16' />
        </div>
      </div>
    </div>
  );
};

export { Searchbar };
