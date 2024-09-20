import { SplashPageLayout } from '@/components/Layouts';
import { ReactNode } from 'react';

export default function ArtistLayout({ children }: { children: ReactNode }) {
  return <SplashPageLayout>{children}</SplashPageLayout>;
}
