import { useMemo } from 'react';
import { MediaWrapper } from '../common';
import Image from 'next/image';
import { EJustify, EOrientation, TSplashPageLayoutProps } from '@/types';

export default function SplashPageLayout({
  children,
  orientation = EOrientation.LTR,
  media: { type, id, src },
  className,
  childrenWrapperJustify = EJustify.CENTER
}: TSplashPageLayoutProps) {
  const ImgSkeleton = () => <div className='h-full w-full animate-pulse rounded-xl bg-ob-black-lightest'></div>;

  const splashImage = useMemo(() => {
    if (!src) return <ImgSkeleton />;
    if (type === 'inscription') return <ImgSkeleton />;
    if (type === 'img')
      return (
        <Image
          src={src ?? ''}
          alt='some hero image'
          width={1000}
          height={1000}
          className='relative overflow-hidden rounded-xl'
        />
      );
    return (
      <div className='w-full'>
        <MediaWrapper id={id} size='full' className='relative max-w-[600px] overflow-hidden rounded-xl' />
      </div>
    );
  }, [src, type]);

  return (
    <div className={`flex flex-row ${orientation === 'rtl' ? 'flex-row-reverse' : ''} ${className ? className : ''}`}>
      <div className='flex w-1/2 basis-1/2 items-start justify-start'>{splashImage}</div>
      <div className={`flex basis-1/2 flex-col justify-${childrenWrapperJustify}`}>{children}</div>
    </div>
  );
}
