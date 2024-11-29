import { ESUPPORTED_WALLETS } from '@/lib/constants';

export interface IWallet {
  ordinalsAddress: string;
  ordinalsPublicKey: string;
  paymentAddress: string;
  paymentPublicKey: string;
  wallet: ESUPPORTED_WALLETS;
}

export interface IAuthContext {
  isAuthenticated: boolean;
  loginWithWallet: (wallet: IWallet) => void;
  logout: () => void;
  signPsbt: (
    psbt: string,
    finalize?: boolean
  ) => Promise<{ signedPsbtHex?: string; signedPsbtBase64?: string; txId?: string } | undefined>;
  wallet: IWallet | null;

  loading: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any;
}
