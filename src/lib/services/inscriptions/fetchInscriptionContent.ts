import { useQuery, UseQueryResult } from '@tanstack/react-query';

export const fetchInscriptionContent = async (id: string, contentType: string): Promise<string | Blob> => {
  const response = await fetch(`/api/inscriptions/content/${id}`, {
    cache: 'force-cache'
  });

  if (!response.ok) {
    throw new Error('Failed to fetch inscription content');
  }

  if (contentType.includes('text/') || contentType.includes('application/json') || contentType.includes('image/svg+xml')) {
    const textData = await response.json();
    return textData.content;
  }

  const blobData = await response.blob();
  return blobData;
};

export function useInscriptionContentQuery(id: string, contentType: string): UseQueryResult<string | Blob, Error> {
  return useQuery({
    queryKey: ['inscription-content', id],
    queryFn: () => fetchInscriptionContent(id, contentType || ''),
    enabled: !!contentType && !!id
  });
}
