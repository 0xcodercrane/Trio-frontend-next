import { InscriptionOrderState, OrderType } from 'ordinalsbot/dist/types/v1';
import { EOrderSubType } from '../pointsConfig';
import { ERewardState } from '../rewards';

export type TTrioAccountOrder = {
  id: string | number;
  createdAt: FirebaseFirestore.Timestamp;
  type: OrderType;
  source: 'trio.xyz' | 'ordinalsbot.com';
  subType: EOrderSubType;
  state?: InscriptionOrderState;
  rewardState: ERewardState;
  userId: string;
  txid?: string;
};
