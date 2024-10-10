import { Dimensions } from '@/types/global.types';
import { Skeleton } from '@/components/ui/skeleton';
import { getHeight, getWidth } from '../common/MediaViewer/MediaWrapper';
import { useMemo } from 'react';

interface InscriptionSkeletonProps {
  size?: Dimensions | string;
}

export default function InscriptionSkeleton({ size = '--inscription-larger' }: InscriptionSkeletonProps) {
  const width = useMemo(() => getWidth(true, size), [size]);
  const height = useMemo(() => getHeight(true, size), [size]);
  return <Skeleton className={`${getWidth(true, size)} ${getHeight(true, size)}`} />;
}
