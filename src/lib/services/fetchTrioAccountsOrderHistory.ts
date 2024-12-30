'use client';

import { auth, firestore } from '@/lib/firebase';
import { TTrioAccountOrder } from '@/types/orders';
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';

const poolsRef = collection(firestore, 'orders');

export const useTrioAccountsOrderHistory = () => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<TTrioAccountOrder[]>([]);

  useEffect(() => {
    if (!auth.currentUser) return;
    onSnapshot(query(poolsRef, where('userId', '==', auth.currentUser?.uid), orderBy('createdAt', 'desc')), (snapshot) => {
      const orders: TTrioAccountOrder[] = [];
      snapshot.forEach((doc) => {
        const order = doc.data();
        orders.push({
          id: doc.id,
          ...order
        } as TTrioAccountOrder);
        setOrders(orders);
        setLoading(false);
      });
    });
  }, []);

  return { orders, loading };
};
