import type { Metadata } from 'next';
export * from './imgs';
export * from './time';
export * from './cache';

export const APP_NAME = 'Trio Marketplace';
const CLEAN_APP_NAME = APP_NAME.replace(/ /g, '-').toLowerCase();

export const DEFAULT_METADATA: Metadata = {
  title: {
    default: `${APP_NAME}`,
    template: `${APP_NAME} | %s`
  },
  manifest: './manifest.json'
};

// The wallet cookie is a string with no spaces in it. We prefix the APP_NAME with __wallet-cookie and then attach the APP_NAME at the end for uniqueness
export const WALLET_COOKIE = `__wallet-cookie-${CLEAN_APP_NAME}`;
export const WALLET_SIGN_IN_MESSAGE = `Sign into ${APP_NAME} Application`;

export const SESSION_TOKEN_NAME = `${CLEAN_APP_NAME}.session-token`;

export const USE_LOW_POSTAGE = true;
export const ONE_BITCOIN = 100000000;
export const BRC20_CONVERSION_FACTOR = 10 ** 18;

export const EXPLORER_URL = process.env.NEXT_PUBLIC_EXPLORER_URL || 'https://explorer.ordinalsbot.com';
export const ORDINALSBOT_API_URL = process.env.ORDINALSBOT_API;
export const PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.ordinalsbot.com';
export const ORDINALSBOT_API_KEY = process.env.ORDINALSBOT_API_KEY;
export const MARKETPLACE_API_KEY = process.env.ORDINALSBOT_MARKETPLACE_API_KEY;

export const MARKETPLACE_API_URL = `${PUBLIC_API_URL}/marketplace`;

export const MEMPOOL_URL = process.env.MEMPOOL_URL || 'https://mempool.space';

export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export enum ESUPPORTED_WALLETS {
  UNISAT = 'unisat',
  XVERSE = 'xverse',
  MAGIC_EDEN = 'magic-eden',
  LEATHER = 'leather',
  OKX = 'okx',
  OYL = 'oyl',
  PHANTOM = 'phantom',
  WIZZ = 'wizz'
}

export enum EFILTERS {
  MOST_LIKED = 'most liked',
  TRENDING = 'trending',
  BIGGEST_GAINERS = 'biggest gainers',
  BIGGEST_LOSERS = 'biggest losers'
}

export const FiltersValues = Object.values(EFILTERS);

export enum ESIZES {
  XS = 'xs',
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
  XL = 'xl',
  XXL = '2xl'
}

export const SizesValues = Object.values(ESIZES);

// We support list view and grid view most places and on most tables
export enum EVIEW_TYPES {
  GRID = 'grid',
  LIST = 'list'
}

export const ViewTypeValues = Object.values(EVIEW_TYPES);
export enum ENETWORK {
  MAINNET = 'mainnet',
  TESTNET = 'testnet',
  SIGNET = 'signet',
}
export const NETWORK: ENETWORK = (process.env.NEXT_PUBLIC_NETWORK?.toLowerCase() || 'mainnet') as ENETWORK;

export const DEFAULT_FEE_RATE = 3;

// TODO: Calculate actual fee estimates.
export const ESTIMATED_TX_FEE = {
  SINGLE_INSCRIPTION_BUY: 522.5
};
