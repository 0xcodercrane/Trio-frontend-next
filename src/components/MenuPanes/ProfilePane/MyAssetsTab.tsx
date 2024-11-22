'use client';
import { AuthContext } from '@/app/providers/AuthContext';
import { InscriptionCard } from '@/components/InscriptionCard';
import { Button } from '@/components/ui/button';
import { useListings } from '@/lib/hooks';
import { useWalletInscriptions } from '@/lib/services/inscriptions/fetchWalletInscriptions';
import { InscriptionItem } from '@/types';
import { useContext, useState } from 'react';

export const MyAssetsTab = () => {
  const { wallet } = useContext(AuthContext);
  const { listInscriptions } = useListings();
  const [selectedInscriptions, setSelectedInscriptions] = useState<InscriptionItem[]>([]);

  const handleSellSelected = async () => {
    const listed = await listInscriptions(selectedInscriptions);
    if (listed) {
      setSelectedInscriptions([]);
    }
  };

  const handleMultiSelect = (selected: boolean, price: number, id: string) => {
    if (selected) {
      const inscriptionExists = selectedInscriptions.find((item: InscriptionItem) => item.inscription_id === id);

      if (inscriptionExists) {
        setSelectedInscriptions(
          selectedInscriptions.map((item: InscriptionItem) => (item.inscription_id === id ? { ...item, price } : item))
        );
      } else {
        setSelectedInscriptions([
          ...selectedInscriptions,
          {
            inscription_id: id,
            price
          }
        ]);
      }
    } else {
      const withoutCurrentInscription = selectedInscriptions.filter((item: InscriptionItem) => item.inscription_id !== id);
      setSelectedInscriptions(withoutCurrentInscription);
    }
  };

  const {
    data: walletInscriptions,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage
  } = useWalletInscriptions(wallet?.ordinalsAddress || '', wallet?.wallet);

  return (
    <div>
      {/* {selectedInscriptions && selectedInscriptions.length > 0 && (
        <div className='mb-4 mt-4 text-end'>
          <Button variant='secondary' onClick={() => handleSellSelected()}>
            Sell Selected
          </Button>
        </div>
      )} */}
      <div className='flex h-full basis-5/6 flex-wrap gap-4'>
        {walletInscriptions?.map(
          (inscription: any, index: any) =>
            wallet &&
            inscription &&
            Object.keys(inscription).length > 0 && (
              <InscriptionCard
                key={`ordinal-${index}`}
                inscription={inscription}
                // handleMultiSelect={handleMultiSelect}
                // handleSellInscription={listInscriptions}
              />
            )
        )}
      </div>
      {hasNextPage && (
        <div className='mb-4 mt-4 text-center'>
          <Button variant='secondary' onClick={() => fetchNextPage()}>
            {isFetchingNextPage ? 'Loading...' : 'Load More'}
          </Button>
        </div>
      )}
    </div>
  );
};
