import { ONE_BITCOIN } from '../constants';
export * from './network';
export * from './style';
export * from './date';
export * from './format';
export * from './number';
export * from './tx-fees';

export const shortenString = (str: string, firstAmount: number, lastAmount: number) => {
  if (!str) return '';

  const start = str.substring(0, firstAmount);
  const end = str.slice(lastAmount * -1);

  return `${start}...${end}`;
};

export const shortenAddress = (address: string) => {
  return shortenString(address, 4, 4);
};

export const shortenTxid = (txid: string) => {
  return shortenString(txid, 4, 4);
};

export const shortenInscriptionId = (inscriptionId: string) => shortenString(inscriptionId, 6, 6);

export const satsToBitcoin = (sats: number) => {
  return cleanDecimalValue((sats / ONE_BITCOIN).toString());
};

function cleanDecimalValue(input: string): string {
  // Limit to at most 8 decimal places
  const limitedDecimals = input.includes('.') ? parseFloat(input).toFixed(8) : input;

  // Remove trailing zeros and unnecessary decimal points
  return limitedDecimals
    .replace(/(\.\d*?[1-9])0+$/g, '$1') // Removes trailing zeros after non-zero decimals
    .replace(/\.0+$/, '') // Removes the decimal if only zeros follow it
    .replace(/(\.\d{8})\d+$/, '$1'); // Truncate strictly to 8 decimals if needed
}

export const bitcoinToSats = (bitcoinAmount: number) => Math.round(bitcoinAmount * ONE_BITCOIN);

export const getRandomElements = (arr: any[], num: number) => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
};

export function numberWithCommas(x: number, decimals: number = 0) {
  const parts = x.toFixed(decimals).split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
}
