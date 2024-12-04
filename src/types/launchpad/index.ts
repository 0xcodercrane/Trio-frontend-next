export enum EPhaseState {
  ENDED = 'Ended',
  LIVE = 'Active',
  UPCOMING = 'Starts in'
}

export enum EMintState {
  DEFAULT = 'default',
  PADDING = 'padding',
  MINT_PROMPT = 'mint-prompt',
  MINTING = 'minting',
  CONFIRMED = 'confirmed'
}

export type TMetaData = {
  name: string;
  description: string;
  creator_name: string;
  creator_email: string;
  creator_btc_address: string;
  icon: string;
  banner_image: string;
  slug: string;
  website_link?: string;
  telegram_link?: string;
  instagram_link?: string;
  twitter_link?: string;
  discord_link?: string;
};

export type TLaunchpad = {
  id: number;
  maker_payment_address_id: number;
  meta_data: TMetaData;
  phases: TPhase[];
  status: string;
};

export type TPhase = {
  id: number;
  launchpad_id: number;
  name: string;
  phase_number: number;
  start_date: number;
  end_date: number;
  status: string;
  total_inscriptions: number;
  remaining_inscriptions: number;
  is_public: boolean;
  price: number;
  psbts: {
    id: number;
    status: string;
    phase_id: number;
    batch_number: number;
    inscription_count: number;
  }[];
};

export type TAllocation = {
  id: number;
  is_public: boolean;
  total_allocation: number;
  remaining_allocation: number;
};

export type TPhaseStatusProps = {
  metaData: TMetaData;
  launchInfo: TLaunchpad;
  allocationIsPending: any;
  allocationInfo: {
    phases: TAllocation[];
  };
  isAuthenticated: boolean;
  currentPhase: TPhase;
};

export type TMintProcessProps = {
  percentComplete: number;
  launchInfoPending: boolean;
  totalInscriptions: number;
  remainingInscriptions: number;
};

export type TMintActionProps = {
  isAuthenticated: boolean;
  mintState: EMintState;
  hasAllocationInCurrentPhase: boolean;
  txid: string | null;
  mint: (feeRate: number) => void;
  launchInfoPending: boolean;
};
