import BuyNow from '@/components/BuyNow';
import FeeSelector from '@/components/FeeSelector';
import FeesPanel from '@/components/FeesPanel';
import Link from 'next/link';
import { OrderFlowPaneBaseProps } from '..';
import { Skeleton } from '@/components/ui/skeleton';
import { useInscriptionDataQuery } from '@/components/common/MediaViewer/useInscriptionDataQuery';
import { useContext } from 'react';
import { AuthContext } from '@/app/providers/AuthContext';
import ListItem from '@/components/ListItem';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useInscriptionOrder } from '@/lib/hooks';
import { ESTIMATED_TX_FEE } from '@/lib/constants';

export default function DefaultPane({ inscriptionId }: OrderFlowPaneBaseProps) {
  const { latestOrder, isPending } = useInscriptionOrder(inscriptionId);
  const { data } = useInscriptionDataQuery(inscriptionId);
  const { wallet } = useContext(AuthContext);

  const txVirtualSize = ESTIMATED_TX_FEE.SINGLE_INSCRIPTION_BUY;

  const hasActiveListing = latestOrder?.status === 'active';

  const isInscriptionOwner = data && wallet && data.details.address === wallet.ordinalsAddress;
  return (
    <div className='flex h-full w-full flex-col gap-8'>
      {isPending ? (
        <Skeleton className='h-full min-h-[240px] w-full' />
      ) : hasActiveListing ? (
        <>
          <FeesPanel listPriceSats={latestOrder?.price} takerFeeSats={latestOrder?.platform_taker_fee} />
          {isInscriptionOwner ? (
            <div className='flex justify-between gap-4 rounded-lg bg-ob-grey p-4 text-white'>
              <Button variant='secondary' onClick={() => toast.warning('Not implemented yet.')}>
                Delist
              </Button>{' '}
              <Button variant='secondary' onClick={() => toast.warning('Not implemented yet.')}>
                Change price
              </Button>
            </div>
          ) : (
            <>
              {' '}
              <FeeSelector txVirtualSize={txVirtualSize} />
              <BuyNow orderId={latestOrder?.id} />
              <span className='text-bold text-ob-grey-lighter'>
                By clicking Buy Now you agree to our&nbsp;
                <Link href='/terms-and-conditions' target='_blank' className='text-ob-grey-lightest'>
                  Terms and Conditions
                </Link>
              </span>
            </>
          )}
        </>
      ) : (
        <div className='flex flex-col gap-4 rounded-lg bg-ob-grey p-4 text-white'>
          This item is not listed for sale.
          {isInscriptionOwner && <ListItem inscriptionId={inscriptionId} />}
        </div>
      )}
    </div>
  );
}
