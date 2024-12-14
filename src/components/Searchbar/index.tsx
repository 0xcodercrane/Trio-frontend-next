import { Input } from '@/components/ui/input';
import { SearchIcon, XIcon } from 'lucide-react';
import React, { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import debounce from 'lodash.debounce';

interface SearchbarProps {
  onChange: (searchKeyword: string) => void;
  focusOnRender?: boolean;
  className?: string;
}

const Searchbar = ({ onChange, focusOnRender = false, className }: SearchbarProps) => {
  const [keyword, setKeyword] = useState('');

  const onChangeDebounced = useCallback(debounce(onChange, 300), [onChange]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    changeSearchKeyword(event.target.value || '');
  };

  const clearSearchKeyword = () => changeSearchKeyword('');

  const changeSearchKeyword = (keyword: string) => {
    // Set input state immediately.
    setKeyword(keyword);
    // Debounce callback.
    onChangeDebounced(keyword);
  };

  // Focus on input on pane open.
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (inputRef.current && focusOnRender) {
      inputRef.current.focus();
    }
    return () => clearSearchKeyword();
  }, []);

  return (
    <div>
      <div
        className={`flex min-w-[200px] items-center justify-between gap-4 rounded-full bg-ob-purple-dark text-white has-[:focus]:bg-ob-purple ${className}`}
      >
        <Input
          autoComplete='off'
          id='keyword'
          ref={inputRef}
          value={keyword}
          onChange={handleInputChange}
          placeholder='Search'
          className='peer col-span-3 rounded-full border-0 bg-transparent'
        />
        <div className='w-4'>
          {keyword && (
            <button onClick={clearSearchKeyword} className='flex items-center'>
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
