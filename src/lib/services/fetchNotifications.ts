import { auth, firestore } from '@/lib/firebase';
import { TNotification } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';

export const fetchNotifications = async (userId: string) => {
  if (!userId) throw new Error('User is not authenticated');
  const notificationsRef = collection(firestore, `/users/${userId}/notifications`);
  const notificationsQuery = query(
    notificationsRef,
    where('read', '==', false),
    where('app', 'array-contains-any', ['global', 'trio.xyz']),
    orderBy('timestamp', 'desc')
  );
  const notificationsData = await getDocs(notificationsQuery);

  const notifications = notificationsData.docs.map(
    (doc) =>
      ({
        ...doc.data(),
        id: doc.id
      }) as TNotification
  );
  return notifications;
};

export const useNotificationsQuery = () => {
  const userId = auth.currentUser?.uid;

  return useQuery<TNotification[], Error>({
    queryKey: ['notifications', userId],
    queryFn: () => fetchNotifications(userId!),
    enabled: !!userId
  });
};
