enum ECurrency {
  bitcoin = 'bitcoin',
  dog = 'dog'
  // Add another currencies here.
}

type PriceItem = {
  usd: number;
};

type FxRateResponse = {
  [ticker in ECurrency]: PriceItem;
};

// MEMO: Simplify this when TRIO price is added to /fxrate endpoint.
interface Prices extends FxRateResponse {
  trio: {
    usd: number;
  };
}

export { ECurrency };
export type { FxRateResponse, PriceItem, Prices };
