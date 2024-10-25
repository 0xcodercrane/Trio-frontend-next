enum EFeeOptions {
  MINIMUM = 'MINIMUM',
  LOW = 'LOW',
  STANDARD = 'STANDARD',
  HIGH = 'HIGH',
  CUSTOM = 'CUSTOM'
}

interface FeeRateState {
  feeRate: number;
  setFeeRate: (feeRate: number) => void;
}

export { EFeeOptions };
export type { FeeRateState };
