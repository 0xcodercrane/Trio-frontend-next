import { BPS_TO_DECIMAL_CONVERSION_FACTOR, BPS_TO_PERCENTAGE_CONVERSION_FACTOR } from '@/lib/constants';

export const bpsToDecimal = (bpsValue: number) => bpsValue / BPS_TO_DECIMAL_CONVERSION_FACTOR;

export const bpsToPercentage = (bpsValue: number) => bpsValue / BPS_TO_PERCENTAGE_CONVERSION_FACTOR;
