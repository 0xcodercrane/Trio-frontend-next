import { EPoolState, TPool } from '@/types';

export const mapPoolToState = (pool: TPool, blockHeight: number): EPoolState => {
  if (pool.startBlock === -1) return EPoolState.PENDING;
  if (pool.startBlock > blockHeight) return EPoolState.UPCOMING;
  if (pool.startBlock < blockHeight && (pool.endBlock > blockHeight || pool.endBlock === -1)) return EPoolState.LIVE;
  return EPoolState.ENDED;
};

export const mapPoolTypeToPayoutText = (type: TPool['type']): string => {
  switch (type) {
    case 'proportionate':
      return 'Payout In';
    default:
      return 'Draw In';
  }
};

export const mapPoolTypeToLabel = (type: TPool['type']): { typeText: string; additionalInfo: string } => {
  switch (type) {
    case 'proportionate':
      return {
        typeText: 'Proportionate Pool',
        additionalInfo: 'everyone gets a share of the pool'
      };
    case 'n-winners':
      return {
        typeText: 'Many Winners Lottery Pool',
        additionalInfo: 'multiple prizes to be won by multiple users'
      };
    case 'winner-takes-all':
      return {
        typeText: 'Winner Takes All',
        additionalInfo: 'one user wins the entire pool'
      };
    default:
      return {
        typeText: 'unknown pool',
        additionalInfo: 'unknown pool type'
      };
  }
};
