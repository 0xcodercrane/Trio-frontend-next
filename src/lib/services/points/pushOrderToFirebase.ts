import { auth, firestore } from '@/lib/firebase';
import { EOrderSubType, ERewardState } from '@/types';
import { TTrioAccountOrder } from '@/types/orders';
import { addDoc, collection, doc, setDoc, Timestamp } from 'firebase/firestore';
import { toast } from 'sonner';

export async function pushListingOrderToFirebase(id: number, address: string) {
  if (!auth.currentUser) return { success: false, error: 'user is not authenticated' };

  await addDoc(collection(firestore, 'orders'), {
    source: 'trio.xyz',
    type: 'buy-listing',
    id,
    address,
    createdAt: Timestamp.now(),
    rewardState: ERewardState.Default,
    userId: auth.currentUser?.uid
  });
}

export async function pushDirectOrderToFirebase(order: TTrioAccountOrder) {
  // We process legacy orders differently than we process listing orders. Here are the notable differences
  //  - the document id is the order id
  //  - order.id is a string, whereas in listing orders, order.id is a number
  // So, the process below is that we create a document on the orders collection with the order.id as the id,
  //  and then we set the doc contents to the order object
  const { id } = order;
  const orderDoc = doc(collection(firestore, 'orders'), id.toString());
  try {
    await setDoc(orderDoc, order);
  } catch (error) {
    console.error(error);
    toast.error(`Error saving order: ${id}`);
  }
}
