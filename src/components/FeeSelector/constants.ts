import { EFeeOptions } from '@/types';

const feeOptionsConfig = {
  [EFeeOptions.MINIMUM]: {
    label: 'Minimum',
    dbKey: 'minimum_fee'
  },
  [EFeeOptions.LOW]: {
    label: 'Low',
    dbKey: 'economy_fee'
  },
  [EFeeOptions.STANDARD]: {
    label: 'Standard',
    dbKey: 'hour_fee'
  },
  [EFeeOptions.HIGH]: {
    label: 'High',
    dbKey: 'fastest_fee'
  },
  [EFeeOptions.CUSTOM]: {
    label: 'Custom'
  }
} as const;

const DEFAULT_FEE = EFeeOptions.STANDARD;
const DEFAULT_FEE_OPTIONS = {
  [EFeeOptions.STANDARD]: true,
  [EFeeOptions.HIGH]: true
};

export { feeOptionsConfig, DEFAULT_FEE, DEFAULT_FEE_OPTIONS };
