import { TRIO_EXCHANGES } from '@/lib/constants';
import Image from 'next/image';

export default function TrioMarkets() {
  return (
    <div className='flex w-full flex-col items-center gap-8'>
      {TRIO_EXCHANGES.map(({ label, img, link }) => {
        return (
          <a href={link} target='_blank' rel='noreferrer' key={label} className='flex w-full flex-row justify-between'>
            <Image src={img} alt={label} width={100} height={100} />
            <span className='text-ob-yellow'>Buy Now</span>
          </a>
        );
      })}
    </div>
  );
}
