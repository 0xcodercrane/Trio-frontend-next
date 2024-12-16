'use client';
import { AuthContext } from '@/app/providers/AuthContext';
import ProfilePane from '@/components/MenuPanes/ProfilePane';
import WalletConnectionPane from '@/components/MenuPanes/WalletConnectionPane';
import Section from '@/components/Section';
import { useContext } from 'react';

function Profile() {
  const { wallet } = useContext(AuthContext);
  return <Section className='bg-ob-purple-darkest'>{wallet ? <ProfilePane /> : <WalletConnectionPane />}</Section>;
}
export { Profile };
