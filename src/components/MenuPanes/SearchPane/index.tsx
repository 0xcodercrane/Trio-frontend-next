import { Chit, Divider } from '@/components/common';
import { Container } from '@/components/Container';
import { CollectionsTable, NotificationTable } from '@/components/Tables';
import { Input } from '@/components/ui/input';
import { useCollections } from '@/lib/services';
import { useNotificationsQuery } from '@/lib/services/fetchNotifications';
import { EComponentVariants } from '@/types';
import { SearchIcon, XIcon } from 'lucide-react';
import { ChangeEvent, useEffect, useRef, useState } from 'react';

export default function SearchPane() {
  const [searchKeyword, setSearchKeyword] = useState('');
  const { data, isPending } = useCollections({ offset: 0, limit: 100 }, searchKeyword);

  const handleSearchKeywordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(event.target.value ?? '');
  };

  const clearSearch = () => setSearchKeyword('');

  // Focus on input on pane open.
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <Container direction='col' justify='start'>
      <div className='flex h-[80vh] w-full flex-col items-center text-white'>
        <div className='flex min-w-[320px] items-center justify-between gap-4 rounded-full bg-white/[0.15]'>
          <Input
            ref={inputRef}
            id='keyword'
            value={searchKeyword}
            onChange={handleSearchKeywordChange}
            placeholder='Search for collection'
            className='col-span-3 rounded-full border-0 bg-transparent'
          />
          <div className='flex items-center gap-2'>
            <div className='w-4'>
              {searchKeyword && (
                <button onClick={clearSearch} className='flex items-center'>
                  <XIcon size='16' />
                </button>
              )}
            </div>
            <div className='mr-1 flex w-fit min-w-[52px] items-center rounded-full bg-white/[0.15] p-[0.5rem]'>
              <SearchIcon className='w-full' size='16' />
            </div>
          </div>
        </div>
        <div className='my-4 h-full w-[600px] overflow-auto rounded-lg bg-ob-purple-dark p-4'>
          <CollectionsTable searchMode isLoading={isPending} collections={data} />
        </div>
      </div>
    </Container>
  );
}
