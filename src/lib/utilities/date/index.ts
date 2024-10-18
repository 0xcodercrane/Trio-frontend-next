import { DateTime } from 'luxon';

export const formatDate = (date: string | { seconds: number; nanoseconds: number }) => {
  if (typeof date === 'string') {
    return DateTime.fromISO(date).toFormat('dd/MM/yyyy');
  } else {
    const jsDate = new Date(date.seconds * 1000);
    return DateTime.fromJSDate(jsDate).toFormat('dd/MM/yyyy');
  }
};
