const fetchFeeRates = async (): Promise<{
  data: {
    economy_fee: number;
    fastest_fee: number;
    half_hour_fee: number;
    hour_fee: number;
    minimum_fee: number;
    ts: string;
  }[];
}> => {
  const response = await fetch('/api/supabase/feeRates');

  if (!response.ok) {
    throw new Error('Failed to fetch fee rates');
  }

  return response.json();
};

export { fetchFeeRates };
