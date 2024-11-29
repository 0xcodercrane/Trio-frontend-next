import { DateTime } from 'luxon';

export const convertUnixToLocalTimeString = (unixTimestamp: number): string => {
  return DateTime.fromSeconds(unixTimestamp).toFormat('yyyy-MM-dd hh:mm a');
};
