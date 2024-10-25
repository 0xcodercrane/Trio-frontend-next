export const formatUsdValue = (value: number) =>
  `$${Intl.NumberFormat(undefined, { currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value)}`;
