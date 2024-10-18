import Points from '@/components/Points';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Points',
  description: 'Collect Experience Points (XP) and earn rewards'
};

export default function Page() {
  return <Points />;
}
