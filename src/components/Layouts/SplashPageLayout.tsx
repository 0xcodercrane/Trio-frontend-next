import { ReactNode } from 'react';
import { MediaWrapper } from '../common';
import Image from 'next/image';

interface SplashPageLayoutProps {
  children: ReactNode;
  orientation?: 'ltr' | 'rtl';
  media: {
    type: 'inscription' | 'img';
    id?: string;
    src?: string;
  };
  className?: string;
  childrenWrapperJustify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
}

export default function SplashPageLayout({
  children,
  orientation = 'ltr',
  media: { type, id, src },
  className,
  childrenWrapperJustify = 'center'
}: SplashPageLayoutProps) {
  return (
    <div
      className={`flex w-full flex-col gap-8 lg:flex-row ${orientation === 'rtl' ? 'flex-row-reverse' : ''} ${className ? className : ''}`}
    >
      <div className='flex w-full items-start justify-start lg:basis-1/2'>
        {type === 'inscription' ? (
          <div className='flex w-full justify-center'>
            <MediaWrapper id={id} size='--inscription-largest' className='relative w-full overflow-hidden rounded-xl' />
          </div>
        ) : (
          <Image
            src={src ?? ''}
            alt='Mint Image'
            width={600}
            height={600}
            className='relative w-full overflow-hidden rounded-xl'
          />
        )}
      </div>
      <div className={`flex w-full flex-col lg:basis-1/2 justify-${childrenWrapperJustify}`}>{children}</div>
    </div>
  );
}
