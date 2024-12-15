export type TPointsConfigInstance = {
  createdAt: FirebaseFirestore.Timestamp;
  config: TPointsMapping;
};

export type TPointsMapping = {
  orders: {
    [key in EOrderSubType]: number;
  };
  tasks: {
    [key in ETaskType]: number;
  };
  referrals: {
    base: number;
    tiers: {
      [key: string]: number;
    };
  };
  staking: {
    factor: number;
    cycleLength: number;
  };
};

export enum ETaskType {
  SET_USERNAME = 'set-username',
  CONNECT_WALLET = 'connect-wallet',
  TWITTER_FOLLOW = 'twitter-follow',
  VERIFY_EMAIL = 'verify-email'
}

export enum EOrderSubType {
  RUNE_LAUNCHPAD_MINT = 'rune-launchpad-mint',
  RUNE_LAUNCHPAD_CREATION = 'rune-launchpad-creation',
  RUNE_MINT = 'rune-mint',
  RUNE_ETCH = 'rune-etch',
  COLLECTION_MINT = 'collection-mint',
  MANAGED_BRC_20_MINT = 'collection-mint-brc20',
  BRC20_DEPLOY = 'brc20-deploy',
  BRC20_MINT = 'brc20-mint',
  BRC20_TRANSFER = 'brc20-transfer',
  PROJECT_MINT = 'project-mint',
  DELEGATE_INSCRIPTION = 'delegate-inscription',
  SATSNAME = 'satsname',
  HASHCHECK = 'hashcheck',
  TAP = 'tap',
  BITMAP = 'bitmap',
  TEXT = 'text',
  INSCRIPTION = 'inscription',
  BULK_INSCRIPTION = 'bulk-inscription',
  SPARTACUS = 'spartacus'
}
