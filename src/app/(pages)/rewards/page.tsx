import Rewards from '@/components/Rewards';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Rewards',
  description: 'Collect Experience Points (XP) and earn rewards in the exclusive trio.xyz reward pools'
};

export default function Page() {
  return <Rewards />;
}
