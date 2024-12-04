'use client';
import { AuthContext } from '@/app/providers/AuthContext';
import { InscriptionCard } from '@/components/InscriptionCard';
import { Button } from '@/components/ui/button';
import { useWalletInscriptions } from '@/lib/services/inscriptions/fetchWalletInscriptions';
import { useContext } from 'react';

export const MyAssetsTab = () => {
  const { wallet } = useContext(AuthContext);

  const { data: walletInscriptions, hasNextPage, fetchNextPage } = useWalletInscriptions(wallet?.ordinalsAddress);

  return (
    <div>
      <div className='flex h-full basis-5/6 flex-wrap gap-4'>
        {walletInscriptions?.map(
          (inscriptionId: string, index: any) =>
            wallet &&
            inscriptionId &&
            Object.keys(inscriptionId).length > 0 && <InscriptionCard key={`ordinal-${index}`} id={inscriptionId} />
        )}
      </div>
      {hasNextPage && (
        <div className='mb-4 mt-4 text-center'>
          <Button variant='secondary' onClick={() => fetchNextPage()}>
            Load More
          </Button>
        </div>
      )}
    </div>
  );
};
