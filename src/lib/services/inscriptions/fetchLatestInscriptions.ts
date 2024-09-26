import { useQuery } from '@tanstack/react-query';

export interface InscriptionListResponse {
  ids: string[];
  more: boolean;
  page_index: number;
}

export const fetchInscriptionsList = async (): Promise<InscriptionListResponse> => {
  const response = await fetch(`/api/inscriptions/latest`);

  if (!response.ok) {
    throw new Error('Failed to fetch inscriptions list');
  }

  const data = await response.json();
  return data;
};

export const useInscriptionsListQuery = () => {
  return useQuery<InscriptionListResponse, Error>({
    queryKey: ['latest-inscriptions'],
    queryFn: () => fetchInscriptionsList()
  });
};
