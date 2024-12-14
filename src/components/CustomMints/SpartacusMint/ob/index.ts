import { NETWORK } from '@/lib/constants';
import { Ordinalsbot } from 'ordinalsbot';

// This instance of the OrdinalsBot library uses the special Spartacus API Key which grants the minters of Spartacus inscriptions a special rate of 2000 sats per file
const ob = new Ordinalsbot(process.env.SPARTACUS_ORDINALSBOT_API_KEY, NETWORK);

export default ob;
