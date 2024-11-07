import { Ordinalsbot } from 'ordinalsbot';
import { ORDINALSBOT_API_KEY } from '../constants';

const ordinalsbotObj = new Ordinalsbot(ORDINALSBOT_API_KEY, 'mainnet');

export default ordinalsbotObj;
