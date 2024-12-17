'use client';
import React, { ReactNode } from 'react';
import { useMediaQuery } from 'usehooks-ts';
import Section from '../Section';
import { Monitor } from 'lucide-react';
type MobileOverlayWrapperProps = {
  children: ReactNode;
};

const MobileOverlayWrapper = ({ children }: MobileOverlayWrapperProps) => {
  const isMobile = useMediaQuery('(max-width: 500px)');

  return isMobile ? (
    <Section className='flex flex-col items-center justify-center p-4'>
      <div className='flex flex-col items-center justify-center gap-4 text-center text-lg text-white'>
        <Monitor size={128} />
        Mobile version coming soon, please use desktop for now.
      </div>
    </Section>
  ) : (
    children
  );
};

export { MobileOverlayWrapper };
