'use client';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Section from '@/components/Section';
import { useActiveOrderbookWithInscriptionsQuery } from '@/lib/services';
import { MediaWrapper } from '../common';
import { Button } from '../ui/button';
import { useMemo, useState } from 'react';
import { useWallet } from '@/lib/hooks';
import { satsToBitcoin } from '@/lib/utilities';

export default function PopularCollections() {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const wallet = useWallet();

  const handleOnSaleNextClick = () => {
    if (!onSale) return;
    if (currentPage === onSale.pages.length) {
      fetchNextPage();
    }
    setCurrentPage((current) => current + 1);
  };

  const handleOnSalePrevClick = () => {
    if (currentPage === 0) {
      return;
    }
    setCurrentPage((current) => current - 1);
  };

  const { data: onSale, fetchNextPage } = useActiveOrderbookWithInscriptionsQuery();

  const listedInscriptions = useMemo(() => {
    if (onSale) {
      const index = onSale.pageParams.findIndex((page) => page === currentPage);
      return onSale.pages[index].data;
    }
    return [];
  }, [currentPage]);

  const handleBuyListing = async (id: number) => {
    // const txId = await buyListing(id, 8);
  };

  return (
    <Section className='bg-ob-purple-darkest'>
      <div className='flex flex-row justify-between py-16'>
        <h3>Popular</h3>
        <span>View all (3)</span>
      </div>

      <div className='flex flex-col gap-4'>
        <div className='flex h-[256px] min-h-[256px] flex-row'>
          <div className='flex h-full basis-1/6 flex-col items-center justify-center gap-4'>
            <h3>On Sale</h3>
            <div className='flex flex-row items-center justify-between gap-4'>
              <Button variant='icon' className='h-[60px] w-[60px]' size='icon'>
                <ChevronLeft onClick={handleOnSalePrevClick} color='black' size={30} />
              </Button>
              <Button variant='icon' className='h-[60px] w-[60px]' size='icon'>
                <ChevronRight onClick={handleOnSaleNextClick} color='black' size={30} />
              </Button>
            </div>
          </div>
          <div className='flex h-full basis-5/6 flex-row gap-4'>
            {(listedInscriptions || []).map((list, index) => (
              <div
                key={`on-sale-item-${index}`}
                className='relative h-full w-full max-w-[256px] rounded-xl bg-ob-purple-light'
              >
                <div className='flex h-[256px] flex-col items-center justify-end gap-4 pb-4'>
                  {list.utxos &&
                    list.utxos.utxo_contents &&
                    list.utxos.utxo_contents.length > 0 &&
                    list.utxos.utxo_contents[0] &&
                    list.utxos.utxo_contents[0].inscriptions && (
                      <MediaWrapper
                        key={list.id}
                        id={list.utxos.utxo_contents[0].inscriptions.inscription_id}
                        square
                        className='relative mt-4 h-[--inscription-smaller] overflow-hidden rounded-xl'
                      />
                    )}
                  {wallet && (
                    <div className='flex flex-col items-center gap-2'>
                      <Button variant='secondary' onClick={() => handleBuyListing(list.id)}>
                        Buy Now {satsToBitcoin(list.price)} BTC
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='flex h-[256px] min-h-[256px] flex-row'>
          <div className='flex h-full basis-1/6 flex-col items-center justify-center gap-4'>
            <h3>Trending</h3>
            <div className='flex flex-row items-center justify-between gap-4'>
              <Button variant='icon' className='h-[60px] w-[60px]' size='icon'>
                <ChevronLeft color='black' size={30} />
              </Button>
              <Button variant='icon' className='h-[60px] w-[60px]' size='icon'>
                <ChevronRight color='black' size={30} />
              </Button>
            </div>
          </div>
          <div className='flex h-full basis-5/6 flex-row gap-4'>
            <div className='h-full w-full max-w-[256px] rounded-xl bg-ob-purple-light'></div>
            <div className='h-full w-full max-w-[256px] rounded-xl bg-ob-purple-light'></div>
            <div className='h-full w-full max-w-[256px] rounded-xl bg-ob-purple-light'></div>
            <div className='h-full w-full max-w-[256px] rounded-xl bg-ob-purple-light'></div>
          </div>
        </div>
        <div className='flex h-[256px] min-h-[256px] flex-row'>
          <div className='flex h-full basis-1/6 flex-col items-center justify-center gap-4'>
            <h3>Movers</h3>
            <div className='flex flex-row items-center justify-between gap-4'>
              <Button variant='icon' className='h-[60px] w-[60px]' size='icon'>
                <ChevronLeft color='black' size={30} />
              </Button>
              <Button variant='icon' className='h-[60px] w-[60px]' size='icon'>
                <ChevronRight color='black' size={30} />
              </Button>
            </div>
          </div>
          <div className='flex h-full basis-5/6 flex-row gap-4'>
            <div className='h-full w-full max-w-[256px] rounded-xl bg-ob-purple-light'></div>
            <div className='h-full w-full max-w-[256px] rounded-xl bg-ob-purple-light'></div>
            <div className='h-full w-full max-w-[256px] rounded-xl bg-ob-purple-light'></div>
            <div className='h-full w-full max-w-[256px] rounded-xl bg-ob-purple-light'></div>
          </div>
        </div>
      </div>
    </Section>
  );
}
