import { TPointAllocation } from '@/types';
import { functions } from '..'; // Import the functions obj from the instantiated firebase app
import { httpsCallable } from 'firebase/functions';

const createPointAllocation = httpsCallable(functions, 'createPointAllocation');
export default (payload: TPointAllocation) => createPointAllocation(payload);
