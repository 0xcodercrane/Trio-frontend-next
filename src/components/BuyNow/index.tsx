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
        <div className='flex h-full flex-col items-center justify-center'>
          <Tag label='+ 1,000 XP' variant='default' />
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
