import { collection, getDocs, limit, orderBy, query, startAt, where } from 'firebase/firestore';
import { auth, firestore } from '../firebase';
import { useQuery } from '@tanstack/react-query';
import { TReward } from '@/types/rewards';
import { TPagination } from '../hooks/usePagination/pagination.types';

const rewardsRef = collection(firestore, 'rewards');

// TODO: implement proper pagination here as per Firestore spec: https://firebase.google.com/docs/firestore/query-data/query-cursors
export const fetchRewards = async (userId: string, pagination: TPagination): Promise<TReward[]> => {
  if (!userId || userId === '') return [];

  const forCurrentUser = where('userId', '==', userId);
  const rewardsQuery = query(rewardsRef, forCurrentUser, orderBy('date', 'desc'));
  try {
    const rewardsData = await getDocs(rewardsQuery);
    const rewards = rewardsData.docs.map(
      (doc) =>
        ({
          ...doc.data(),
          id: doc.id
        }) as TReward
    );

    return rewards;
  } catch (err) {
    console.error('Error fetching rewards', err);
    return [];
  }
};

export const useRewardsQuery = (pagination: TPagination) => {
  const userId = auth.currentUser?.uid || '';

  return useQuery<TReward[], Error>({
    queryKey: ['rewards', userId],
    queryFn: () => fetchRewards(userId, pagination),
    enabled: !!userId
  });
};
