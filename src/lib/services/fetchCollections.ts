import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { TPagination } from '../hooks/usePagination/pagination.types';
import { getCollections } from '../supabase';
import { useEffect, useMemo } from 'react';
import { useFilter } from '../hooks';

export const useCollections = (pagination: TPagination, searchKeyword = '') => {
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

  const result = useMemo(() => {
    if (data) {
      const filteredData = searchKeyword
        ? data.filter(
            (collection) =>
              collection.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
              collection.slug.toLowerCase().includes(searchKeyword.toLowerCase())
          )
        : data;
      return filteredData.slice(pagination.offset, pagination.offset + pagination.limit);
    }
    return [];
  }, [data, pagination, searchKeyword]);
  return { data: result, isPending };
};
