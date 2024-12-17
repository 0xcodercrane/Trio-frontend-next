import { useQuery } from '@tanstack/react-query';
import { getOrdinalAddressFromId } from '../supabase';

export const useAddressFromId = (id: number | undefined | null) =>
  useQuery({
    queryKey: ['address-from-id', id],
    queryFn: async () => await getOrdinalAddressFromId(id || -1),
    select: (data) => data?.data?.[0],
    enabled: !!id
  });
