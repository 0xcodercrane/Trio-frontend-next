export type TickerResult = {
  id: string;
  original_tick: string;
  tick: string;
  max_supply: string;
  decimals: number;
  limit_per_mint: string;
  remaining_supply: string;
  burned_supply: string;
  is_self_mint: boolean;
  deploy_inscription_id: string;
  block_height: number;
};

export type TickerInfoApiResponse = {
  error: string | null;
  result: TickerResult;
};

/// address info
export type AddressResult = {
  overall_balance: string;
  available_balance: string;
  block_height: number;
  tick: string;
};

export type AddressInfoApiResponse = {
  error: string | null;
  result: AddressResult[];
};
