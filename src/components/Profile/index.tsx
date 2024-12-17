'use client';
import ProfilePane from '@/components/MenuPanes/ProfilePane';
import WalletConnectionPane from '@/components/MenuPanes/WalletConnectionPane';
import Section from '@/components/Section';
import { useWallet } from '@/lib/hooks';

function Profile() {
  const wallet = useWallet();
  return <Section className='bg-ob-purple-darkest'>{wallet ? <ProfilePane /> : <WalletConnectionPane />}</Section>;
}
export { Profile };
