import { collection, doc, limit, orderBy, query } from 'firebase/firestore';
import { firestore } from '..';

export const adminMetricsRef = doc(firestore, 'adminMetrics/live');
export const pointsConfigRef = query(collection(firestore, 'pointsConfig'), limit(1), orderBy('createdAt', 'desc'));
