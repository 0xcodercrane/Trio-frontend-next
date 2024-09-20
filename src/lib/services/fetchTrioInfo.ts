import { useQuery } from '@tanstack/react-query';

const fetchTrioInfo = async () => {
  const response = await fetch('/api/trioPrice');

  if (!response.ok) {
    throw new Error('Failed to fetch trio price');
  }

  return response.json();
};

export const useTrioInfoQuery = () => {
  return useQuery({
    queryKey: ['trio-info-stats'],
    queryFn: fetchTrioInfo,
    staleTime: 600000,
    refetchOnWindowFocus: false
  });
};
