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
    <div className={`flex w-full flex-row ${orientation === 'rtl' ? 'flex-row-reverse' : ''} ${className ? className : ''}`}>
      <div className='flex basis-1/2 items-start justify-start'>
        {type === 'inscription' ? (
          <div className='w-full'>
            <MediaWrapper id={id} size='full' className='relative w-full max-w-[600px] overflow-hidden rounded-xl' />
          </div>
        ) : (
          <Image
            src={src ?? ''}
            alt='some hero image'
            width={1000}
            height={1000}
            className='relative overflow-hidden rounded-xl'
          />
        )}
      </div>
      <div className={`flex basis-1/2 flex-col justify-${childrenWrapperJustify}`}>{children}</div>
    </div>
  );
}
