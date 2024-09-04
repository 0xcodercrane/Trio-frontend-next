import { LoaderCircle, LoaderPinwheel } from 'lucide-react';

export default function Loading() {
  return (
    <div className='flex h-full w-full justify-center items-center'>
      <LoaderCircle className='animate-spin' />
    </div>
  );
}
