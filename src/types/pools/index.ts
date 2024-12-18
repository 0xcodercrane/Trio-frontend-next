export enum EPoolType {
  PROPORTIONATE = 'proportionate',
  WINNER_TAKES_ALL = 'winner-takes-all',
  N_WINNERS = 'n-winners'
}

export enum EPoolState {
  UPCOMING = 'upcoming', // Pool is defined and happening in the future
  LIVE = 'live', // Pool is defined and happening now
  ENDED = 'ended', // Pool is defined and has happened in the past
  PENDING = 'pending' // Pool time/block window is not defined
}

export type TPool = {
  id: string;
  title: string;
  img?: string;
  enabled: boolean;
  startBlock: number;
  endBlock: number;
  rewards: TPoolReward[];
  type: EPoolType;
  winners: TWinner[];
  trioBalanceRequired?: number; // Optional field that gates the pool based on the user's trio balance
};

export type TProportionatePool = TPool & {
  totalPointsAllocated: number;
  minPointsAllocation: number;
  maxPointsAllocation: number;
};

export type TLotteryPool = TPool & {
  ticketPrice: number;
  numberOfTickets: number;
  maxTicketsPerUser: number;
  totalTicketsSold: number;
};

export type TWinner = {
  address: string;
  winner: {
    userId: string;
    ticketNumber: number;
  };
};

export enum EPoolReward {
  INSCRIPTION = 'inscription',
  BRC_20 = 'brc20',
  RUNE = 'rune',
  BTC = 'btc'
}

export type TPoolReward = {
  name: string;
  amount: number;
  type: EPoolReward;
  asset: string;
  estimatedValue?: number; // Can be filled with a USD value for the reward. This is applicable for when EPoolReward is an inscription.
  prizePosition?: number; // Only filled when parent pool type is n-winners
};
