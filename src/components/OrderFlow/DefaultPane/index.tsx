import BuyNow from '@/components/BuyNow';
import FeeSelector from '@/components/FeeSelector';
import FeesPanel from '@/components/FeesPanel';
import Link from 'next/link';

export default function DefaultPane() {
  return (
    <div className='flex h-full w-full flex-col gap-8'>
      <FeesPanel />
      <FeeSelector />
      <BuyNow />
      <span className='text-bold text-ob-grey-lighter'>
        By clicking Buy Now you agree to our&nbsp;
        <Link href='/terms-and-conditions' target='_blank' className='text-ob-grey-lightest'>
          Terms and Conditions
        </Link>
      </span>
    </div>
  );
}
