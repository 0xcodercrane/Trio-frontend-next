import FeesPanel from '@/components/FeesPanel';
import { TermsAndConditions } from '@/components/TermsAndConditions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useListings } from '@/lib/hooks';
import { bitcoinToSats } from '@/lib/utilities';
import { OrderbookItem } from '@/types';
import { useState, ChangeEvent } from 'react';

enum EModifyListingState {
  DEFAULT,
  PRICE_CHANGE,
  DELISTING
}
const ModifyListing = ({
  listing,
  inscriptionId,
  collectionSlug
}: {
  listing: OrderbookItem;
  inscriptionId: string;
  collectionSlug?: string;
}) => {
  const [modificationState, setModificationState] = useState<EModifyListingState>(EModifyListingState.DEFAULT);
  const [newPrice, setNewPrice] = useState<string>('0');

  const { updateListingPrice, cancelListing } = useListings();

  const handleNewPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewPrice(e.target.value || '');
  };

  const handleChangePrice = async () => {
    const newPriceSats = bitcoinToSats(parseFloat(newPrice));

    if (!newPriceSats) {
      return;
    }
    await updateListingPrice(inscriptionId, listing.id, newPriceSats, collectionSlug);
    setModificationState(EModifyListingState.DEFAULT);
  };

  const handleCancelListing = async () => {
    await cancelListing(inscriptionId, listing.id);
    setModificationState(EModifyListingState.DEFAULT);
  };

  const currentPriceInSats = listing.price;

  return (
    <>
      <div className='flex flex-col gap-6 p-4'>
        <FeesPanel listPriceSats={currentPriceInSats} variant='listing' />
        {(() => {
          switch (modificationState) {
            case EModifyListingState.DEFAULT:
              return (
                <div className='flex basis-1/2 justify-between gap-2'>
                  <div className='w-full'>
                    <Button
                      className='text-md w-full min-w-full basis-1/2 rounded-md'
                      variant='secondary'
                      onClick={() => setModificationState(EModifyListingState.DELISTING)}
                      type='button'
                    >
                      Cancel Listing
                    </Button>
                  </div>
                  <div className='w-full'>
                    <Button
                      className='text-md min-w-full basis-1/2 rounded-md'
                      onClick={() => setModificationState(EModifyListingState.PRICE_CHANGE)}
                      type='button'
                    >
                      Change price
                    </Button>
                  </div>
                </div>
              );
            case EModifyListingState.DELISTING:
              return (
                <div className='flex flex-col gap-2 rounded-lg bg-ob-purple p-4'>
                  <div className='text-lg font-bold text-white'>Are you sure you want to cancel this listing?</div>
                  <TermsAndConditions actionName='Yes' />
                  <div className='flex basis-1/2 justify-between gap-2'>
                    <div className='w-full'>
                      <Button
                        className='text-md w-full min-w-full basis-1/2 rounded-md'
                        variant='secondary'
                        onClick={() => setModificationState(EModifyListingState.DEFAULT)}
                        type='button'
                      >
                        No
                      </Button>
                    </div>
                    <div className='w-full'>
                      <Button
                        className='text-md min-w-full basis-1/2 rounded-md'
                        onClick={handleCancelListing}
                        type='button'
                        variant='destructive'
                      >
                        Yes
                      </Button>
                    </div>
                  </div>
                </div>
              );
            case EModifyListingState.PRICE_CHANGE:
              return (
                <form className='flex flex-col gap-2 rounded-lg bg-ob-purple p-4'>
                  <div className='text-lg font-bold text-white'>What do you want to change the price to?</div>
                  <div className='flex w-full flex-row items-center justify-between rounded-sm bg-white pr-2 ring-1 ring-ob-white-20'>
                    <Input
                      className='min-w-12 grow border-none bg-white pl-2 text-right text-lg font-bold text-ob-grey'
                      onChange={handleNewPriceChange}
                      value={newPrice}
                      placeholder='Set new price'
                    />
                    <span className='text-nowrap bg-white pl-1 text-lg text-ob-grey'>BTC</span>
                  </div>
                  <TermsAndConditions actionName='Submit' />
                  <div className='flex basis-1/2 justify-between gap-2'>
                    <div className='w-full'>
                      <Button
                        className='text-md w-full min-w-full basis-1/2 rounded-md'
                        variant='secondary'
                        onClick={() => setModificationState(EModifyListingState.DEFAULT)}
                        type='button'
                      >
                        No
                      </Button>
                    </div>
                    <div className='w-full'>
                      <Button
                        disabled={!parseFloat(newPrice)}
                        className='min-w-full rounded-md text-lg'
                        onClick={handleChangePrice}
                        type='button'
                      >
                        Submit{' '}
                      </Button>
                    </div>
                  </div>
                </form>
              );
          }
        })()}
      </div>
    </>
  );
};

export { ModifyListing };
