import { Timestamp } from 'firebase/firestore';
import { InscriptionOrderState, OrderType } from 'ordinalsbot/dist/types/v1';
import { EOrderSubType } from '../pointsConfig';
import { ERewardState } from '../rewards';

export type TTrioAccountOrder = {
  id: string | number;
  createdAt: Timestamp;
  type: OrderType | ETrioOrderType;
  source: 'trio.xyz' | 'ordinalsbot.com';
  subType: EOrderSubType;
  state?: InscriptionOrderState;
  rewardState: ERewardState;
  userId: string;
  txid?: string;
};

export enum ETrioOrderType {
  BuyListing = 'buy-listing',
  PreinscribeMint = 'preinscribe-mint'
}
