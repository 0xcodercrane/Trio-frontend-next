import { ONE_BITCOIN } from '../constants';
export * from './network';
export * from './style';
export * from './date';
export * from './format';

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
  return sats / ONE_BITCOIN;
};

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
