import { MediaWrapper } from '../common';

export default function PurchaseComplete() {
  return (
    <div className='flex h-full w-full flex-row rounded-lg bg-ob-grey p-4'>
      <div className='flex h-full w-full basis-1/3'>
        <MediaWrapper className='relative overflow-hidden rounded-lg' />
      </div>
      <div className='flex w-full basis-2/3 flex-col justify-center'>
        <span className='text-2xl font-bold text-white'>Your Purchase is Complete</span>
        <span className='text-ob-grey-lightest'>
          You are now the owner of <span className='text-white'>INSCRIPTION</span> by{' '}
          <span className='text-white'>ARTIST</span>
        </span>
        <span className='mt-2 text-xs text-ob-grey-lightest'>
          Transaction ID <span className='text-white'>addr</span>
        </span>
      </div>
    </div>
  );
}
