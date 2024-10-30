import { INSCRIPTIONS_DETAILS_CACHE_AGE } from '@/lib/constants';
import { useQuery } from '@tanstack/react-query';

export interface InscriptionDetails {
  address: string;
  charms: string[];
  children: string[];
  content_length: number;
  content_type: string;
  effective_content_type: string;
  fee: number;
  height: number;
  id: string;
  next: string | null;
  number: number;
  parents: string[];
  previous: string | null;
  rune: string | null;
  sat: number;
  satpoint: string;
  timestamp: number;
  value: number;
}

export const fetchInscriptionDetails = async (id: string): Promise<InscriptionDetails> => {
  const response = await fetch(`/api/inscriptions/details/${id}`, {
    cache: 'force-cache',
    next: { revalidate: INSCRIPTIONS_DETAILS_CACHE_AGE.as('seconds') }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch inscriptions list');
  }

  const data = await response.json();
  return data;
};

export const useInscriptionDetailsQuery = (id: string) => {
  return useQuery({
    queryKey: ['inscription-details', id],
    queryFn: () => fetchInscriptionDetails(id),
    enabled: !!id
  });
};
