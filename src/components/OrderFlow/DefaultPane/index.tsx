import BuyNow from '@/components/OrderFlow/DefaultPane/BuyNow';
import FeeSelector from '@/components/FeeSelector';
import FeesPanel from '@/components/FeesPanel';
import { OrderFlowPaneBaseProps } from '..';
import { Skeleton } from '@/components/ui/skeleton';
import { useInscriptionDataQuery } from '@/components/common/MediaViewer/useInscriptionDataQuery';
import { useContext } from 'react';
import { AuthContext } from '@/app/providers/AuthContext';
import ListItem from '@/components/OrderFlow/DefaultPane/ListItem';
import { useInscriptionOrder } from '@/lib/hooks';
import { TermsAndConditions } from '@/components/TermsAndConditions';
import { ModifyListing } from './ModifyListing';
import { calculateTxVBytes } from '@/lib/utilities';
import { TX_PARAMS_BUY_LISTING } from '@/lib/constants';

const txVirtualSize = calculateTxVBytes(
  TX_PARAMS_BUY_LISTING.inputsCount,
  TX_PARAMS_BUY_LISTING.outputsCount,
  TX_PARAMS_BUY_LISTING.inputScript,
  TX_PARAMS_BUY_LISTING.outputScript
);

export default function DefaultPane({ inscriptionId, collectionSlug }: OrderFlowPaneBaseProps) {
  const { latestOrder, isPending } = useInscriptionOrder(inscriptionId);
  const { data } = useInscriptionDataQuery(inscriptionId);
  const { wallet } = useContext(AuthContext);

  const hasActiveListing = latestOrder?.status === 'active';

  const isInscriptionOwner = data && wallet && data.details.address === wallet.ordinalsAddress;
  return (
    <div className='flex h-full w-full flex-col gap-8'>
      {isPending ? (
        <Skeleton className='h-full min-h-[240px] w-full' />
      ) : (
        <div className='flex flex-col gap-4 rounded-lg bg-ob-purple-dark p-4 text-white'>
          {/* OWNER OF INSCRIPTION */}
          {isInscriptionOwner ? (
            hasActiveListing ? (
              <ModifyListing listing={latestOrder} inscriptionId={inscriptionId} collectionSlug={collectionSlug} />
            ) : (
              <ListItem inscriptionId={inscriptionId} collectionSlug={collectionSlug} />
            )
          ) : (
            <>
              {/* NOT OWNER: Render buy form or inform the item is not listed. */}
              {hasActiveListing ? (
                <>
                  <FeesPanel listPriceSats={latestOrder.price} />
                  <FeeSelector txVirtualSize={txVirtualSize.txVBytes} />
                  <TermsAndConditions actionName='Buy Now' />
                  <BuyNow price={latestOrder?.price} orderId={latestOrder?.id} inscriptionId={inscriptionId} />
                </>
              ) : (
                'This item is not listed for sale.'
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
