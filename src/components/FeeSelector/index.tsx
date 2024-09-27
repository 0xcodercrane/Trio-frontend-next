import { Skeleton } from '../ui/skeleton';

export default function FeeSelector() {
  return (
    <div className='flex flex-col gap-4'>
      <span className='font-bold text-ob-grey-lightest'>Bitcoin Network Fee</span>
      <div className='flex w-full flex-row gap-2'>
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className='h-[96px] basis-1/3'>
            <Skeleton className='h-full w-full' />
          </div>
        ))}
      </div>
    </div>
  );
}
