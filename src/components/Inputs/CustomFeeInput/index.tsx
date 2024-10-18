import { Input } from '@/components/ui/input';

export default function CustomFeeInput() {
  return (
    <div className='flex w-full flex-row items-center justify-between rounded-sm bg-ob-black pr-2 ring-1 ring-ob-white-20'>
      <Input className='grow border-none bg-ob-black pl-2 text-ob-grey-lightest' type='number' />
      <span className='text-nowrap pl-1 text-sm text-ob-grey-lightest'>sats/vB | $9.76</span>
    </div>
  );
}
