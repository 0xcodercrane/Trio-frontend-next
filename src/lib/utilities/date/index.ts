import { Timestamp } from 'firebase/firestore';
import { DateTime } from 'luxon';

export const formatDate = (date: Timestamp) => {
  if (typeof date === 'string') {
    return DateTime.fromISO(date).toFormat('dd/MM/yyyy');
  } else {
    const jsDate = new Date(date.seconds * 1000);
    return DateTime.fromJSDate(jsDate).toFormat('dd/MM/yyyy');
  }
};
