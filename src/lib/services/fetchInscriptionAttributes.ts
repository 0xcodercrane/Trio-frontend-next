import { useQuery } from '@tanstack/react-query';
import { getInscriptionAttributes } from '../supabase';

const useInscriptionAttributes = (inscriptionId: string | undefined) =>
  useQuery({
    queryKey: ['inscription-attributes', inscriptionId],
    queryFn: async () => getInscriptionAttributes(inscriptionId || ''),
    enabled: !!inscriptionId,
    select: (data) => data.data?.[0]
  });

export { useInscriptionAttributes };
