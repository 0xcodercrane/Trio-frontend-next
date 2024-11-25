import { Dimensions } from '@/types/global.types';
import { Skeleton } from '@/components/ui/skeleton';
import { useMemo } from 'react';
import { getHeight, getWidth } from '@/lib/utilities';

interface InscriptionSkeletonProps {
  size?: number | Dimensions | string;
}

export default function InscriptionSkeleton({ size = '--inscription-larger' }: InscriptionSkeletonProps) {
  const width = useMemo(() => getWidth(size), [size]);
  const height = useMemo(() => getHeight(size), [size]);
  return <Skeleton className={`${getWidth(width)} ${getHeight(height)}`} />;
}
