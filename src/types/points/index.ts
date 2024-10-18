import { Timestamp } from 'firebase/firestore';

export type TPool = {
  id: string;
  img: string;
  name: string;
  description?: string;
  poolPointsBalance: number;
  rewards: TPoolReward[];
  startDate: Timestamp;
  endDate: Timestamp;
};

export type TPoolReward = {
  token: string;
  amount: number;
};
