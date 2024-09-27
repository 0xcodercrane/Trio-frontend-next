import { Info } from 'lucide-react';
import Link from 'next/link';
import { Tag } from '../Tag';
import { Button } from '../ui/button';
import FeeSelector from '../FeeSelector';
import FeesPanel from '../FeesPanel';

export default function BuyNow() {
  return (
    <div className='flex h-full w-full flex-col gap-8'>
      <FeesPanel />
      <FeeSelector />
      <div className='flex flex-row gap-8'>
        <Button size='lg' variant='secondary'>
          Buy Now
        </Button>
        <div className='flex flex-col justify-between'>
          <Tag label='1000' variant='success' />
          <span className='flex w-full flex-row items-center justify-between text-ob-grey-lightest'>
            What is XP? <Info size={18} className='ml-1' />
          </span>
        </div>
      </div>
      <span className='text-bold text-ob-grey-lighter'>
        By clicking Buy Now you agree to our&nbsp;
        <Link href='/terms-and-conditions' target='_blank' className='text-ob-grey-lightest'>
          Terms and Conditions
        </Link>
      </span>
    </div>
  );
}
