export type TLegacyFees = {
  additionalFee: number;
  additionalFeeCharged: number;
  amount: number;
  baseFee: string;
  chainFee: number;
  collectionServiceFee: number;
  count: number;
  discounts: any[]; // TODO: define discounts type
  postage: number;
  price: number;
  rareSatsFee: number;
  serviceFee: number;
  totalFee: number;
};
