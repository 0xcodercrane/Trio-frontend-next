'use client';
import React, { ReactNode } from 'react';
import { useMediaQuery } from 'usehooks-ts';
import { Monitor } from 'lucide-react';
import { APP_NAME } from '@/lib/constants';
import Image from 'next/image';
type MobileOverlayWrapperProps = {
  children: ReactNode;
};

const MobileOverlayWrapper = ({ children }: MobileOverlayWrapperProps) => {
  const isMobile = useMediaQuery('(max-width: 500px)');

  return isMobile ? (
    <div
      style={{ zIndex: 99999999 }}
      className='fixed z-50 flex h-full w-full flex-col items-center justify-center bg-ob-purple-dark'
    >
      <Image
        className='mb-20 h-[--header-content-height] w-auto opacity-20'
        src='/img/trio-logo.svg'
        alt={`${APP_NAME} logo`}
        width={95}
        height={30}
      />
      <div className='flex flex-col items-center justify-center gap-4 px-10 text-center text-lg text-white'>
        <Monitor size={128} />
        Mobile version coming soon, please use desktop for now.
      </div>
    </div>
  ) : (
    children
  );
};

export { MobileOverlayWrapper };
