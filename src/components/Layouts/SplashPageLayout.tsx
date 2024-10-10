import Image from 'next/image';
import { ReactNode } from 'react';
import HeroLayout from './HeroLayout';

export default function SplashPageLayout({ children }: { children: ReactNode }) {
  return (
    <div className='relative'>
      <HeroLayout className='absolute'>
        <div className='absolute z-20 mt-[--header-height] h-full w-full bg-gradient-to-t from-ob-black via-ob-black/[0.80] to-transparent'></div>
        <Image
          src='/img/placeholder-hero.jpg'
          alt={`some hero image`}
          className='w-full'
          width={1000}
          height={1000}
          style={{ objectFit: 'cover', maxHeight: 'calc(100vh-var(--header-height))' }}
        />
      </HeroLayout>

      <div>{children}</div>
    </div>
  );
}
