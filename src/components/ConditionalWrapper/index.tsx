'use client';

import { usePathname } from 'next/navigation';
import { MobileOverlayWrapper } from '@/components/MobileOverlayWrapper';

export default function ConditionalWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const enableMobile =
    pathname.startsWith('/mint/') || pathname.startsWith('/collections/') || pathname.startsWith('/inscriptions/');

  return (
    <>
      {enableMobile ? (
        <div className='mt-[--header-height]'>{children}</div>
      ) : (
        <MobileOverlayWrapper>
          <div className='mt-[--header-height]'>{children}</div>
        </MobileOverlayWrapper>
      )}
    </>
  );
}
