import { ERewardType, TReward } from '@/types/rewards';
import { collection, DocumentReference, limit, onSnapshot, orderBy, query, startAfter, where } from 'firebase/firestore';
import { useCallback, useEffect, useState } from 'react';
import { auth, firestore } from '../firebase';
import { TPagination } from '../hooks/usePagination/pagination.types';

const rewardsRef = collection(firestore, 'rewards');

export const useRewards = (type: ERewardType | 'all' = 'all', pagination: TPagination = { offset: 0, limit: 10 }) => {
  const [rewards, setRewards] = useState<TReward[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastVisible, setLastVisible] = useState<DocumentReference | null>(null);

  // Fetch rewards and set up a real-time listener
  const fetchRewards = useCallback(
    (reset: boolean = false) => {
      if (!auth?.currentUser) return;

      setLoading(true);

      const forCurrentUser = where('userId', '==', auth?.currentUser?.uid);
      const orderByDate = orderBy('date', 'desc');
      let rewardsQuery = query(rewardsRef, forCurrentUser, orderByDate, limit(pagination.limit));

      if (!reset && lastVisible) {
        rewardsQuery = query(rewardsQuery, startAfter(lastVisible));
      }

      if (type !== 'all') {
        rewardsQuery = query(rewardsQuery, where('type', '==', type));
      }

      // Real-time listener for rewards
      const unsubscribe = onSnapshot(rewardsQuery, (snapshot) => {
        const newRewards: TReward[] = [];
        snapshot.forEach((doc) => {
          newRewards.push({ ...doc.data(), id: doc.id } as TReward);
        });

        setLastVisible(snapshot.docs[snapshot.docs.length - 1]?.ref || null);
        setRewards((prevRewards) => (reset ? newRewards : [...prevRewards, ...newRewards]));
        console.log('----- here - 1');
        setLoading(false);
      });

      // Return the unsubscribe function to clean up the listener
      return unsubscribe;
    },
    [auth?.currentUser, type, pagination.limit]
  );

  // Effect to fetch rewards initially
  useEffect(() => {
    const unsubscribe = fetchRewards(true);

    // Cleanup listener on unmount
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [fetchRewards]);

  // Reset rewards
  const resetRewards = useCallback(() => {
    setRewards([]);
    setLastVisible(null);
    fetchRewards(true);
  }, [fetchRewards]);

  // Load more rewards (pagination)
  const loadMore = useCallback(() => {
    fetchRewards(false);
  }, [fetchRewards]);

  return { rewards, loading, loadMore, resetRewards };
};
