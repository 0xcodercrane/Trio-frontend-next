import { AuthContext } from '@/app/providers/AuthContext';
import { useContext } from 'react';

export function useWallet() {
  const { wallet } = useContext(AuthContext);
  return wallet;
}
