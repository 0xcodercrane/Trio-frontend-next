import Rewards from '@/components/Rewards';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Rewards',
  description: 'Collect Experience Points (XP) and earn rewards'
};

export default function Page() {
  return <Rewards />;
}
