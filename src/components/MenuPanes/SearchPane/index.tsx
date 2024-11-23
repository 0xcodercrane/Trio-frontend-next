import { Chit, Divider } from '@/components/common';
import { Container } from '@/components/Container';
import { CollectionsTable, NotificationTable } from '@/components/Tables';
import { Input } from '@/components/ui/input';
import { useCollections } from '@/lib/services';
import { useNotificationsQuery } from '@/lib/services/fetchNotifications';
import { EComponentVariants } from '@/types';
import { SearchIcon } from 'lucide-react';
import { ChangeEvent, useState } from 'react';

export default function SearchPane() {
  const [searchKeyword, setSearchKeyword] = useState('');
  const { data, isPending } = useCollections({ offset: 0, limit: 100 }, searchKeyword);

  const handleSearchKeywordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(event.target.value ?? '');
  };
  return (
    <Container direction='col' justify='start'>
      <div className='flex h-[80vh] w-full flex-col items-center text-white'>
        <div className='flex min-w-[320px] items-center justify-between gap-4 rounded-full bg-white/[0.15]'>
          <Input
            id='keyword'
            value={searchKeyword}
            onChange={handleSearchKeywordChange}
            placeholder='Search for collection'
            className='col-span-3 rounded-full border-0 bg-transparent'
          />
          <div className='mx-1 flex w-fit min-w-[52px] items-center rounded-full bg-white/[0.15] p-[0.5rem]'>
            <SearchIcon className='w-full' size='16' />
          </div>
        </div>
        <div className='my-4 h-full w-[600px] overflow-auto rounded-lg bg-ob-purple-dark p-4'>
          <CollectionsTable searchMode isLoading={isPending} collections={data} />
        </div>
      </div>
    </Container>
  );
}
