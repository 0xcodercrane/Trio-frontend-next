'use client';

import { useContext, useEffect, useMemo } from 'react';
import { InscriptionsGrid } from '@/components/Grids';
import { useWalletInscriptions } from '@/lib/services/inscriptions/fetchWalletInscriptions';
import { AuthContext } from '@/app/providers/AuthContext';
import { Info } from 'lucide-react';

export const MyItemsPanel = ({ slug }: { slug: string }) => {
  const { wallet } = useContext(AuthContext);

  const { inscriptions, isPending } = useWalletInscriptions(wallet?.ordinalsAddress);

  const ownedInscriptions = useMemo(
    () => inscriptions.collections?.find(({ collectionSlug }) => collectionSlug === slug)?.inscriptions || [],
    [inscriptions.collections]
  );

  return (
    <div className='w-full'>
      {ownedInscriptions.length > 0 ? (
        <InscriptionsGrid inscriptions={ownedInscriptions} isFetching={isPending} />
      ) : (
        <div className='flex w-full items-center gap-2 p-4 text-lg text-white'>
          <Info size={32} /> You do not own any item from this collection.
        </div>
      )}
    </div>
  );
};
