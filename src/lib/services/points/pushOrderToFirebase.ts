import { auth, firestore } from '@/lib/firebase';
import { ERewardState } from '@/types';
import { addDoc, collection, Timestamp } from 'firebase/firestore';

export async function pushOrderToFirebase(orderId: number, address: string) {
  if (!auth.currentUser) return { success: false, error: 'user is not authenticated' };

  await addDoc(collection(firestore, 'orders'), {
    source: 'trio.xyz',
    orderId,
    address,
    createdAt: Timestamp.now(),
    rewardState: ERewardState.Default,
    userId: auth.currentUser?.uid
  });
}
