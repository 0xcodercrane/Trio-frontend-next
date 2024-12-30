import { useFilter } from '@/lib/hooks/useFilter';
import NextPage from './NextPage';
import PrevPage from './PrevPage';

export default function Pagination({ loading }: { loading?: boolean }) {
  const { offset, limit } = useFilter();
  return (
    <div className='flex flex-row items-center justify-between gap-4'>
      <PrevPage disabled={loading} />
      <div className='rounded-full bg-ob-purple-dark'>
        <span className='p-2 text-white'>
          {offset + 1} - {offset + limit}
        </span>
      </div>
      <NextPage disabled={loading} />
    </div>
  );
}

export { NextPage, PrevPage };
