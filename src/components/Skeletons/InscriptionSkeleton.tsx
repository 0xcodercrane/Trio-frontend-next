import { Dimensions } from '@/types/global.types';
import { Skeleton } from '@/components/ui/skeleton';

interface InscriptionSkeletonProps {
  dimensions?: Dimensions;
}

export default function InscriptionSkeleton({
  dimensions = { width: '--inscription-default', height: '--inscription-default' }
}: InscriptionSkeletonProps) {
  const { width, height } = dimensions;
  return <Skeleton className={`w-[${width}] h-[${height}] max-h-full min-h-full min-w-full max-w-full`} />;
}
