import { useState, useCallback, useMemo } from 'react';

interface UsePaginationProps {
  initialOffset?: number;
  initialLimit?: number;
  max: number;
}

const usePagination = ({ initialOffset = 0, initialLimit = 10, max }: UsePaginationProps) => {
  const [offset, setOffset] = useState(initialOffset);
  const [limit, setLimit] = useState(initialLimit);

  const nextPage = useCallback(() => {
    setOffset((prevOffset) => {
      const newOffset = prevOffset + limit;
      return newOffset < max ? newOffset : prevOffset;
    });
  }, [limit, max]);

  const prevPage = useCallback(() => {
    setOffset((prevOffset) => Math.max(0, prevOffset - limit));
  }, [limit]);

  const hasNextPage = useMemo(() => {
    return offset + limit < max;
  }, [offset, limit, max]);

  const hasPrevPage = useMemo(() => {
    return offset > 0;
  }, [offset]);

  return {
    offset,
    limit,
    nextPage,
    prevPage,
    setOffset,
    setLimit,
    hasNextPage,
    hasPrevPage
  };
};

export default usePagination;
