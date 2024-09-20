import { Container } from '@/components/Container';
import Image from 'next/image';
import { ReactNode } from 'react';

export default function SplashPageLayout({ children }: { children: ReactNode }) {
  return (
    <div className='relative'>
      <div className='absolute z-0 h-[90vh] max-h-[90vh] w-full'>
        <div className='absolute z-20 mt-[--header-height] h-full w-full bg-gradient-to-t from-ob-black via-ob-black/[0.80] to-transparent'></div>
        <Image
          src='/img/placeholder-hero.jpg'
          alt={`some hero image`}
          className='w-full'
          width={1000}
          height={1000}
          style={{ objectFit: 'cover', maxHeight: 'calc(90vh + var(--header-height))' }}
        />
      </div>

      <div>{children}</div>
    </div>
  );
}
