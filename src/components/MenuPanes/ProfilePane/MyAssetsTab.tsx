'use client';
import { InscriptionsGrid } from '@/components/Grids';
import { Skeleton } from '@/components/ui/skeleton';
import { useWallet } from '@/lib/hooks';
import { useWalletInscriptions } from '@/lib/services/inscriptions/fetchWalletInscriptions';
import { InscriptionWithMetadata } from '@/types';

const InscriptionsSection = ({
  isInnersFlagToBeReverted = false,
  sectionName,
  inscriptions
}: {
  isInnersFlagToBeReverted?: boolean;
  sectionName: string;
  inscriptions: Array<InscriptionWithMetadata>;
}) => {
  return (
    <div className='rounded-lg bg-ob-purple-dark p-6'>
      <div className='mb-4 text-3xl font-semibold text-white'>{sectionName}</div>
      <InscriptionsGrid isInnersFlagToBeReverted={isInnersFlagToBeReverted} inscriptions={inscriptions} isFetching={false} />
    </div>
  );
};

export const MyAssetsTab = () => {
  const wallet = useWallet();

  const { inscriptions, isPending } = useWalletInscriptions(wallet?.ordinalsAddress);

  return (
    <div>
      <div className='flex flex-col gap-12'>
        {isPending ? (
          <div className='grid grid-cols-5 gap-4'>
            {Array.from({ length: 5 }).map((_, indexRow) => (
              <Skeleton key={`skeleton-inscriptions-grid-${indexRow}`} className='aspect-square w-full' />
            ))}
          </div>
        ) : (
          <>
            {(inscriptions?.collections || []).map(({ collectionName, collectionSlug, inscriptions }) => (
              <InscriptionsSection
                isInnersFlagToBeReverted={collectionSlug === 'inners'}
                key={collectionSlug}
                sectionName={collectionName || ''}
                inscriptions={inscriptions}
              />
            ))}
            {(inscriptions?.other?.length || 0) > 0 && (
              <InscriptionsSection sectionName='Other Inscriptions' inscriptions={inscriptions?.other || []} />
            )}
          </>
        )}
      </div>
      {/* {hasNextPage && (
        <div className='mb-4 mt-4 text-center'>
          <Button variant='secondary' onClick={() => fetchNextPage()}>
            Load More
          </Button>
        </div>
      )} */}
    </div>
  );
};
