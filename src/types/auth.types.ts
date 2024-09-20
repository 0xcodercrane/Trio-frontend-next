import { SUPPORTED_WALLETS } from '@/lib/constants';

export interface IWallet {
  ordinalsAddress: string;
  ordinalsPublicKey: string;
  paymentAddress: string;
  paymentPublicKey: string;
  wallet: SUPPORTED_WALLETS;
}

export interface IAuthContext {
  isAuthenticated: boolean;
  loginWithWallet: (wallet: IWallet) => void;
  logout: () => void;

  wallet: IWallet | null;

  loading: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any;
}
