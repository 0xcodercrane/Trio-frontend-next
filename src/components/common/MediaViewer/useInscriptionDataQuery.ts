import { fetchInscriptionContent, fetchInscriptionDetails, InscriptionDetails } from '@/lib/services';
import { useQuery } from '@tanstack/react-query';

export interface InscriptionData {
  details: InscriptionDetails;
  content: string | Blob;
}

/**
 * This query hook combines the inscription details and content queries into a single query.
 * @param id - The inscription ID to fetch data for.
 */
export function useInscriptionDataQuery(id: string) {
  const detailsQuery = useQuery({
    queryKey: ['inscription-details', id],
    queryFn: () => fetchInscriptionDetails(id),
    enabled: !!id
  });

  const contentType = detailsQuery.data?.content_type || detailsQuery.data?.effective_content_type;

  const contentQuery = useQuery({
    queryKey: ['inscription-content', id],
    queryFn: () => fetchInscriptionContent(id, contentType || ''),
    enabled: detailsQuery.isSuccess && !!contentType
  });

  const isLoading = detailsQuery.isLoading || contentQuery.isLoading;
  const error = detailsQuery.error || contentQuery.error;
  const isSuccess = detailsQuery.isSuccess && contentQuery.isSuccess;

  const data: InscriptionData | undefined = isSuccess
    ? {
        details: { ...detailsQuery.data, content_type: contentType || '' },
        content: contentQuery.data
      }
    : undefined;

  return {
    data,
    isLoading,
    error,
    isSuccess
  };
}
