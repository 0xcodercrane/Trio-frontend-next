import { Input } from '@/components/ui/input';
import { Star } from 'lucide-react';

export function AddToPoolInput() {
  return (
    <div className='flex w-full flex-row items-center justify-between rounded-sm bg-ob-purple-darkest py-1 pr-2'>
      <Input className='grow border-none bg-ob-purple-darkest pl-2 text-ob-grey-lightest ring ring-ob-blue' type='number' />
      <div
        className={`relative flex h-[--button-height-sm] max-h-[--button-height-md] justify-center rounded-sm p-[1px] shadow-lg`}
      >
        <div className='absolute inset-0 h-full w-full rounded-sm bg-ob-purple-darkest bg-gradient-to-b from-ob-blue to-ob-green text-white duration-100 ease-in-out'></div>
        <div className='relative flex h-full min-h-[calc(var(--button-height-sm)-2px)] w-full max-w-[calc(100%-2px)] flex-row items-center justify-between gap-2 rounded-sm bg-ob-purple-darkest px-2'>
          <Star color='white' fill='white' size={24} />
        </div>
      </div>
    </div>
  );
}
