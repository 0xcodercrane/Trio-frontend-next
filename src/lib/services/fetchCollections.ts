import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { TPagination } from '../hooks/usePagination/pagination.types';
import { getCollections } from '../supabase';
import { useEffect, useMemo } from 'react';
import { useFilter } from '../hooks';

export const useCollections = (pagination: TPagination) => {
  // MEMO: dummy handling of pagination just for launch, to be improved later
  //       filter should be moved out of global state
  const { setMax } = useFilter();
  const { data, isPending } = useQuery({
    queryKey: [
      'collections'
      //  pagination.offset, pagination.offset + pagination.limit
    ],
    queryFn: async () => getCollections(),
    select: ({ data }) => data || [],
    placeholderData: keepPreviousData
  });

  useEffect(() => {
    if (data) {
      setMax(data.length);
    }
  }, [data]);
  console.log(data);
  const paginatedResult = useMemo(
    () => (data ? data.slice(pagination.offset, pagination.offset + pagination.limit) : []),
    [data, pagination]
  );
  return { data: paginatedResult, isPending };
};
