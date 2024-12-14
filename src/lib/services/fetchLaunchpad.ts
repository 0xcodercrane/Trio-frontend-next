import { useQuery } from '@tanstack/react-query';
import { getLaunchpadBySlug } from '../supabase/launchpad';

export const useLaunchpad = (slug: string) => {
  return useQuery({
    queryKey: ['launchpad', slug],
    queryFn: async () => getLaunchpadBySlug(slug),
    enabled: !!slug,
    select: ({ data }) => (data && data[0]) || null
  });
};
