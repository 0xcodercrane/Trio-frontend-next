import { Duration } from 'luxon';
import { ONE_BLOCK, ONE_WEEK } from '../time';

export const INSCRIPTIONS_DETAILS_CACHE_AGE = ONE_BLOCK;
export const INSCRIPTIONS_CONTENT_CACHE_AGE = ONE_WEEK;
export const FEE_RATES_CACHE_AGE = Duration.fromObject({ minutes: 5 });
