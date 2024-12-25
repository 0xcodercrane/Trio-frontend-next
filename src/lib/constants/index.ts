import { TSocialsConfig } from '@/types/socials';
import type { Metadata } from 'next';
import { getSocialIcon } from '../utilities/socials';
export * from './cache';
export * from './imgs';
export * from './time';

export const APP_NAME = 'Trio Marketplace';
const CLEAN_APP_NAME = APP_NAME.replace(/ /g, '-').toLowerCase();

export const DEFAULT_METADATA: Metadata = {
  title: {
    default: `${APP_NAME}`,
    template: `${APP_NAME} | %s`
  },
  manifest: './manifest.json'
};

export const WALLET_SIGN_IN_MESSAGE = `Sign into ${APP_NAME} Application`;

export const SESSION_TOKEN_NAME = `${CLEAN_APP_NAME}.session-token`;

export const USE_LOW_POSTAGE = true;
export const LOW_POSTAGE = 546; // value in sats
export const ONE_BITCOIN = 100000000;
export const BRC20_CONVERSION_FACTOR = 10 ** 18;
export const ZERO = 0;

export const SATS_TO_BTC_CONVERSION_FACTOR = 10 ** 8;

// 144 Blocks is the cycle length for synthetic staking
// TODO: This should ultimately be dynamic and configurable
export const XP_MINING_CYCLE_LENGTH = 144;
export const AVERAGE_BLOCK_TIME = 10;

export const EXPLORER_URL = process.env.NEXT_PUBLIC_EXPLORER_URL || 'https://explorer.ordinalsbot.com';
export const PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.ordinalsbot.com';
export const MEMPOOL_URL = process.env.NEXT_PUBLIC_MEMPOOL_API_URL || `${PUBLIC_API_URL}/mempool`;
export const ORDINALSBOT_MARKETPLACE_API_URL = process.env.ORDINALSBOT_MARKETPLACE_API_URL as string;
export const ORDINALSBOT_PUBLIC_API_KEY = process.env.ORDINALSBOT_PUBLIC_API_KEY as string;

export const ORDINALSBOT_MARKETPLACE_API_KEY = process.env.ORDINALSBOT_MARKETPLACE_API_KEY as string;
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

export enum ESUPPORTED_WALLETS {
  UNISAT = 'unisat',
  XVERSE = 'xverse',
  MAGIC_EDEN = 'magic-eden',
  LEATHER = 'leather',
  ORANGE = 'orange',
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
  SIGNET = 'signet'
}
export const NETWORK: ENETWORK = (process.env.NEXT_PUBLIC_NETWORK?.toLowerCase() || 'mainnet') as ENETWORK;

export const DEFAULT_FEE_RATE = 3;

export const TRANSACTION_DEFAULT_PARAMETERS_BUY_LISTING = {
  inputsCount: 4,
  outputsCount: 6,
  inputScript: 'P2WPKH',
  outputScript: 'P2TR'
};

export const SPOTLIGHT_COLLECTION_SLUG = {
  [ENETWORK.MAINNET]: 'punk-royale',
  [ENETWORK.SIGNET]: 'underground-fragments',
  [ENETWORK.TESTNET]: 'test'
};

export const IMG_DIR = '/img';

export const TRIO_EXCHANGES: { label: string; link: string; img: string }[] = [
  {
    label: 'Gate.io',
    link: 'https://www.gate.io/trade/TRIO_USDT',
    img: `${IMG_DIR}/exchanges/gateio.svg`
  },
  {
    label: 'MEXC Global',
    link: 'https://www.mexc.com/exchange/TRIO_USDT',
    img: `${IMG_DIR}/exchanges/mexc.svg`
  },
  {
    label: 'BingX',
    link: 'https://bingx.com/en/spot/TRIOUSDT/',
    img: `${IMG_DIR}/exchanges/bingx.svg`
  },
  {
    label: 'UniSat',
    link: 'https://unisat.io/market/brc20?tick=TRIO',
    img: `${IMG_DIR}/exchanges/unisat.svg`
  },
  {
    label: 'BitPanda',
    link: 'https://www.bitpanda.com/en/prices/trio-ordinalsbot-trio',
    img: `${IMG_DIR}/exchanges/bitpanda.svg`
  },
  {
    label: 'CoinW',
    link: 'https://www.coinw.com/spot/trio(ordinals)usdt',
    img: `${IMG_DIR}/exchanges/coinw.svg`
  },
  {
    label: 'DotSwap',
    link: 'https://www.dotswap.app/swap#B_%E2%80%A2BTC_%E2%80%A2TRIO',
    img: `${IMG_DIR}/exchanges/dotswap.svg`
  },
  {
    label: 'BefiLabs',
    link: 'https://befilabs.com/app/',
    img: `${IMG_DIR}/exchanges/befilabs.svg`
  }
];

export const TOOLTIP_HOVER_DELAY = 200;

const MEMPOOL_SPACE_URLS = {
  [ENETWORK.MAINNET]: 'https://mempool.space',
  [ENETWORK.SIGNET]: 'https://mempool.space/signet',
  [ENETWORK.TESTNET]: 'https://mempool.space/testnet4'
};

export const MEMPOOL_SPACE_URL = MEMPOOL_SPACE_URLS[NETWORK];

export enum ESOCIALS {
  Instagram = 'instagram',
  X = 'x',
  Telegram = 'telegram',
  Discord = 'discord',
  YouTube = 'youtube',
  Web = 'web'
}
export const OB_SOCIALS_CONFIG: TSocialsConfig = {
  [ESOCIALS.Discord]: {
    img: getSocialIcon(ESOCIALS.Discord),
    link: 'https://discord.com/invite/9nBhVgCjct'
  },
  [ESOCIALS.YouTube]: {
    img: getSocialIcon(ESOCIALS.YouTube),
    link: 'https://www.youtube.com/@ordinalsbot'
  },
  [ESOCIALS.Telegram]: {
    img: getSocialIcon(ESOCIALS.Telegram),
    link: 'https://t.me/ordinalsbot'
  },
  [ESOCIALS.X]: {
    img: getSocialIcon(ESOCIALS.X),
    link: 'https://x.com/trio_xyz'
  }
};

export const SATS_IN_BITCOIN = 100000000;
export const MIN_UTXO_VALUE = 546;

export const PERCENTAGE_CONVERSION_FACTOR = 100;
export const BPS_TO_DECIMAL_CONVERSION_FACTOR = 10000;
export const BPS_TO_PERCENTAGE_CONVERSION_FACTOR = 100;
// Defined in basis points.
export const MARKETPLACE_MAKER_FEE_BPS = 0;
export const MARKETPLACE_TAKER_FEE_BPS = 150;
export const MARKETPLACE_TRIO_DISCOUNT_THRESHOLD = 50;

// These environments pertain to the app instance.
// They correspond to the environment environment variable used below
export const ENV = process.env.NEXT_PUBLIC_ENV as ENVS;
export enum ENVS {
  DEV = 'dev',
  SIGNET = 'signet',
  PROD = 'prod'
}
