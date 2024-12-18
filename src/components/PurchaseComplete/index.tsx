import { useInscriptionWithCollectionData } from '@/lib/services';
import { MediaWrapper } from '../common';
import { useInscriptionDataQuery } from '../common/MediaViewer/useInscriptionDataQuery';
import { useOrderFlow } from '@/lib/hooks';
import { MEMPOOL_SPACE_URL } from '@/lib/constants';
import { shortenTxid } from '@/lib/utilities';

export default function PurchaseComplete({ inscriptionId }: { inscriptionId: string }) {
  const { data: collectionData } = useInscriptionWithCollectionData(inscriptionId) as any;
  const { data: inscriptionData } = useInscriptionDataQuery(inscriptionId);
  const { txId } = useOrderFlow();
  return (
    <div className='flex h-full w-full flex-row gap-4 rounded-lg bg-ob-purple-dark p-4'>
      <div className='flex w-full basis-1/3'>
        <MediaWrapper id={inscriptionId} className='relative aspect-square overflow-hidden rounded-lg' />
      </div>
      <div className='flex w-full basis-2/3 flex-col justify-center'>
        <span className='text-2xl font-bold text-white'>Your Purchase is Complete</span>
        <span className='text-ob-grey-lightest'>
          You are now the owner of{' '}
          <span className='text-white'>{collectionData?.name ?? `Inscription #${inscriptionData?.details.number}`}</span>.
        </span>
        <span className='mt-2 text-xs text-ob-grey-lightest'>
          <a target='_blank' href={`${MEMPOOL_SPACE_URL}/tx/${txId}`} className='flex flex-row gap-2'>
            <span className='text-ob-grey-lightest'>Transaction ID</span>
            <span className='text-ob-grey-lightest'>{txId && shortenTxid(txId)}</span>
          </a>
        </span>
      </div>
    </div>
  );
}
