import { Container } from '@/components/Container';
import { Searchbar } from '@/components/Searchbar';
import { CollectionsTable } from '@/components/Tables';
import { useCollections } from '@/lib/services';
import { useState } from 'react';

export default function SearchPane() {
  const [searchKeyword, setSearchKeyword] = useState('');
  const { data, isPending } = useCollections({ offset: 0, limit: 20 }, searchKeyword);

  return (
    <Container direction='col' justify='start'>
      <div className='flex h-[80vh] w-full flex-col items-center text-white'>
        <Searchbar
          focusOnRender
          onChange={setSearchKeyword}
          className='flex min-w-[320px] items-center justify-between gap-4 rounded-full bg-white/[0.15] has-[:focus]:bg-white/[0.25]'
        />
        <div className='my-4 h-full w-[600px] overflow-auto rounded-lg bg-ob-purple-dark p-4'>
          <CollectionsTable searchMode isLoading={isPending} collections={data} />
        </div>
      </div>
    </Container>
  );
}
