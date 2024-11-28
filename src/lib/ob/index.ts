import { Ordinalsbot } from 'ordinalsbot';
import { NETWORK, ORDINALSBOT_PUBLIC_API_KEY } from '../constants';

const ordinalsbotObj = new Ordinalsbot(ORDINALSBOT_PUBLIC_API_KEY, NETWORK);

export default ordinalsbotObj;
