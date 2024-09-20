import { collection, getDocs, query, where } from 'firebase/firestore';
import { firestore, auth } from '../firebase';
import { useQuery } from '@tanstack/react-query';

import { TReward } from '../../types/user.types';
import { useContext } from 'react';
import { AuthContext } from '@/app/providers/AuthContext';

const rewardsRef = collection(firestore, 'rewards');

export const fetchRewards = async (userId?: string): Promise<TReward[]> => {
  if (!userId) {
    throw new Error('User is not authenticated');
  }

  const forCurrentUser = where('userId', '==', auth.currentUser?.uid);
  const rewardsQuery = query(rewardsRef, forCurrentUser);
  const rewardsData = await getDocs(rewardsQuery);

  const rewards = rewardsData.docs.map(
    (doc) =>
      ({
        ...doc.data(),
        id: doc.id
      }) as TReward
  );

  return rewards;
};

export const useRewardsQuery = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const userId = auth.currentUser?.uid;

  return useQuery<TReward[], Error>({
    queryKey: ['rewards', userId],
    queryFn: () => fetchRewards(userId),
    enabled: !!isAuthenticated
  });
};
