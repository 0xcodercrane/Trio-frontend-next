import supabase from '@/lib/supabase';
import { GenericResponse, InscriptionWithMetadata, isResponseSuccess } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

const fetchWalletInscriptions = async (address: string): Promise<GenericResponse<string[]>> => {
  const response = await fetch(`/api/walletInscriptions?address=${address}`, {
    cache: 'no-store'
  });
  if (!response.ok) {
    return { success: false, error: 'Failed to fetch inscriptions in wallet.' };
  }
  return response.json();
};

const fetchInscriptionsMetadata = async (inscriptionIds: Array<string>) =>
  supabase.rpc('get_inscription_details_wallet_view', { inscription_ids: inscriptionIds });

export const useWalletInscriptions = (address: string | undefined) => {
  const inscriptionsResult = useQuery({
    queryKey: ['inscriptions-by-address', address],
    queryFn: () => fetchWalletInscriptions(address || ''),
    enabled: !!address,
    select: (data) => (isResponseSuccess(data) ? data.payload : [])
  });

  const metadataResult = useQuery({
    queryKey: ['inscriptions-metadata-by-address', address],
    queryFn: () => fetchInscriptionsMetadata(inscriptionsResult.data || []),
    enabled: !!inscriptionsResult.data
  });

  const inscriptions = useMemo(() => {
    if (!inscriptionsResult.data || !metadataResult.data) {
      return { recognized: {}, other: [] };
    }
    const collections: {
      [collectionSlug: string]: InscriptionWithMetadata[];
    } = {};
    const other: InscriptionWithMetadata[] = [];
    for (const inscriptionId of inscriptionsResult.data) {
      const foundMetadata = metadataResult.data.data?.find((item) => item.inscription_id === inscriptionId);
      if (foundMetadata?.collection_slug) {
        collections[foundMetadata.collection_slug] = [
          ...(collections[foundMetadata.collection_slug] || []),
          {
            ...foundMetadata,
            price: foundMetadata.listed_price,
            order_status: foundMetadata.orderbook_status
          }
        ];
      } else {
        if (foundMetadata) {
          other.push(foundMetadata);
        } else {
          other.push({ inscription_id: inscriptionId });
        }
      }
    }
    return {
      collections: Object.values(collections).map((inscriptions) => ({
        collectionName: inscriptions[0].collection_name,
        collectionSlug: inscriptions[0].collection_slug,
        collectionIcon: inscriptions[0].collection_icon,
        inscriptions
      })),
      other
    };
  }, [inscriptionsResult.data, metadataResult.data]);

  // // MEMO: Simulating pagination here because API returns all the results at once.
  // const [lastPage, setLastPage] = useState(1);

  // const paginatedResult = useMemo(
  //   () => (inscriptionsResult?.data ? inscriptionsResult.data.slice(0, PAGINATION_LIMIT * lastPage) : []),
  //   [inscriptionsResult.data, lastPage]
  // );

  // const hasNextPage = (inscriptionsResult.data?.length || 0) > PAGINATION_LIMIT * lastPage;
  // const fetchNextPage = useCallback(() => setLastPage((currentPage) => currentPage + 1), []);

  return {
    inscriptions,
    isPending: inscriptionsResult.isPending || metadataResult.isPending
  };
};
