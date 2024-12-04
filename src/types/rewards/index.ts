import { DocumentReference, Timestamp } from 'firebase/firestore';

export enum ERewardState {
  Default = 'default',
  Ineligable = 'ineligable',
  Granted = 'granted'
}
export enum ERewardType {
  Order = 'order',
  Stake = 'stake',
  Referral = 'referral',
  Referred = 'referred',
  ReferralBonus = 'referral-bonus',
  Task = 'task'
}

export type TReward = {
  id?: string;
  userId: string;
  type: ERewardType;
  amount: number;
  date: Timestamp;
  refId: DocumentReference | string;
};

export type TUserPointsBalance = {
  currentBalance: number;
};
