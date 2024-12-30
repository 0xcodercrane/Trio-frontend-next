'use client';

import { MobileOverlayWrapper } from '@/components/MobileOverlayWrapper';
import { usePathname } from 'next/navigation';

export default function ConditionalWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const enableMobile =
    pathname.startsWith('/mint/') ||
    pathname.startsWith('/collections/') ||
    pathname.startsWith('/inscriptions/') ||
    pathname.startsWith('/rewards');

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
