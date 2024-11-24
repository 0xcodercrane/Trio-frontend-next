import { useFilter } from '@/lib/hooks/useFilter';
import NextPage from './NextPage';
import PrevPage from './PrevPage';

export default function Pagination() {
  const { offset, limit } = useFilter();
  return (
    <div className='flex flex-row items-center justify-between gap-4'>
      <PrevPage />
      <div className='rounded-full bg-ob-purple-dark'>
        <span className='p-2 text-white'>
          {offset + 1} - {offset + limit}
        </span>
      </div>
      <NextPage />
    </div>
  );
}

export { NextPage, PrevPage };
