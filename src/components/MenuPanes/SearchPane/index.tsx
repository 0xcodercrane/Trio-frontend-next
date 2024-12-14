import { Container } from '@/components/Container';

import { CollectionsTable } from '@/components/Tables';
import { useCollections } from '@/lib/services';

interface SearchPaneProps {
  searchKeyword: string;
}
export default function SearchPane({ searchKeyword }: SearchPaneProps) {
  const { data, isLoading } = useCollections({ offset: 0, limit: 20 }, searchKeyword);

  return (
    <Container direction='col' justify='start'>
      <div className='flex h-[80vh] w-full flex-col items-center text-white'>
        <div className='my-4 h-full w-[600px] overflow-auto rounded-lg bg-ob-purple-dark p-4'>
          <CollectionsTable searchMode isLoading={isLoading} collections={data} />
        </div>
      </div>
    </Container>
  );
}
