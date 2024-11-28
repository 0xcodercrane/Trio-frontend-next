import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { TPagination } from '../hooks/usePagination/pagination.types';
import { getCollections } from '../supabase';
import { useEffect } from 'react';
import { useFilter } from '../hooks';

export const useCollections = (pagination: TPagination, searchKeyword = '') => {
  // TODO: filter should be moved out of global state
  const { setMax } = useFilter();
  const { data, isPending } = useQuery({
    queryKey: ['collections', pagination.offset, pagination.offset + pagination.limit, searchKeyword],
    queryFn: async () => getCollections(pagination, searchKeyword),
    select: ({ count, collections }) => ({ count: count.data, collections: collections.data || [] }),
    placeholderData: keepPreviousData
  });

  useEffect(() => {
    if (data?.count) {
      setMax(data.count);
    }
  }, [data?.count]);

  return { data: data?.collections || [], isPending };
};
