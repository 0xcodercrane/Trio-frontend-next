import { useInscriptionsByCollectionSlug } from '@/lib/services/fetchInscriptionsByCollectionSlug';
import { MediaViewer } from '../common';
import { Img } from '../Img';
import { useInscriptionDataQuery } from '../common/MediaViewer/useInscriptionDataQuery';
import { getContentType } from '../common/MediaViewer/MediaViewer';

const RENDERABLE_CONTENT_TYPES = ['image', 'svg'];

const hasRenderableContentType = (mimeType: string) => RENDERABLE_CONTENT_TYPES.includes(getContentType(mimeType));

const CollectionIcon = ({
  slug,
  src,
  className,
  showFallback = false
}: {
  slug: string;
  src?: string;
  className?: string;
  showFallback?: boolean;
}) => {
  const { data: inscriptions } = useInscriptionsByCollectionSlug(slug, {
    offset: 0,
    limit: 1
  });

  const firstInscriptionId = inscriptions?.[0]?.inscription_id;
  const { data } = useInscriptionDataQuery(firstInscriptionId || '');

  const firstInscription =
    inscriptions && data?.details.content_type && hasRenderableContentType(data.details.content_type) ? (
      <div className={`${className} overflow-hidden rounded-lg`}>
        <MediaViewer id={inscriptions[0].inscription_id} />
      </div>
    ) : showFallback ? (
      <div className={`rounded-md bg-white/20 ${className}`} />
    ) : null;
  if (src) {
    return <Img fallback={firstInscription} className={className} src={src} />;
  }
  return firstInscription;
};

export { CollectionIcon };
