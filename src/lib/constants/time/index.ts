import { Duration } from 'luxon';

export const ONE_SECOND = Duration.fromObject({ seconds: 1 });
export const TEN_SECONDS = Duration.fromObject({ seconds: 10 });
export const ONE_MINUTE = Duration.fromObject({ minutes: 1 });
export const ONE_DAY = Duration.fromObject({ day: 1 });
export const ONE_WEEK = Duration.fromObject({ week: 1 });
export const ONE_MONTH = Duration.fromObject({ month: 1 });

export const ONE_BLOCK = Duration.fromObject({ minutes: 10 });
