'use client';

import { usePagination } from '@/lib/hooks';
import { useRandomArtistsQuery } from '@/lib/services/fetchArtists';
import Carousel from '.';
import LoadingScreen from '../common/LoadingScreen';

export default function ArtistCarousel() {
  const { offset, limit } = usePagination({ max: 12 });
  const { data, isPending, error } = useRandomArtistsQuery({ offset, limit });

  if (error) return <div>Error</div>;
  if (!data) return <LoadingScreen />;
  // @ts-ignore
  return <Carousel inscriptions={data[0].collections[0].inscriptions.slice(0, 12)} loading={isPending} />;
}
