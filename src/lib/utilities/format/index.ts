import numeral from 'numeral';
export const formatUsdValue = (value: number) =>
  `$${Intl.NumberFormat(undefined, { currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value)}`;

export const formatBlock = (block: number) => {
  return numeral(block).format('0,0');
};

export const formatFileSize = (size: number) => numeral(size).format('0.000b');
