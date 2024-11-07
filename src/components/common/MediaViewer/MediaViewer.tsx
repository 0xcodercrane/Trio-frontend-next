'use client';

import { useInscriptionDataQuery } from './useInscriptionDataQuery';
import { HTMLRenderer, ImageRenderer, SVGRenderer, TextRenderer } from './renderers';
import { MediaRenderer } from './renderers/MediaRenderer';
import { useMemo } from 'react';
import InscriptionSkeleton from '@/components/Skeletons/InscriptionSkeleton';

interface BaseRendererProps {
  type: string;
}

interface ContentAsString extends BaseRendererProps {
  content: string;
}

interface HTMLRendererProps extends BaseRendererProps {
  content: string;
  id?: string;
}

interface ImageRendererProps extends BaseRendererProps {
  content: Blob;
}

interface MediaRendererProps extends BaseRendererProps {
  content: Blob;
  mediaType: 'video' | 'audio';
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  controls?: boolean;
}

type RendererProps = ContentAsString | HTMLRendererProps | ImageRendererProps | MediaRendererProps;

type ContentType = 'svg' | 'html' | 'image' | 'text' | 'json' | 'video' | 'audio' | 'unsupported';

const rendererMap: Record<ContentType, React.ComponentType<RendererProps>> = {
  svg: SVGRenderer as React.ComponentType<RendererProps>,
  html: HTMLRenderer as React.ComponentType<RendererProps>,
  image: ImageRenderer as React.ComponentType<RendererProps>,
  text: TextRenderer as React.ComponentType<RendererProps>,
  json: TextRenderer as React.ComponentType<RendererProps>,
  video: (props) => <MediaRenderer {...(props as MediaRendererProps)} mediaType='video' autoPlay muted loop />,
  audio: (props) => <MediaRenderer {...(props as MediaRendererProps)} mediaType='audio' controls />,
  unsupported: ({ type }: BaseRendererProps) => (
    <div>
      <p>Type &quot;{type}&quot; not supported yet.</p>
    </div>
  )
};

const getContentType = (mimeType: string): ContentType => {
  if (mimeType.includes('image/svg+xml')) return 'svg';
  if (mimeType.includes('text/html')) return 'html';
  if (mimeType.includes('image/')) return 'image';
  if (mimeType.includes('application/json')) return 'json';
  if (mimeType.includes('text/')) return 'text';
  if (mimeType.includes('video/')) return 'video';
  if (mimeType.includes('audio/')) return 'audio';
  return 'unsupported';
};

const MediaViewer = ({ id }: { id: string }) => {
  const { data, isLoading, error } = useInscriptionDataQuery(id);

  const content = useMemo(() => {
    if (!data) return null;

    const { details, content } = data;
    const contentType = getContentType(details.content_type);
    const Renderer = rendererMap[contentType];

    if (contentType === 'html' || contentType === 'text' || contentType === 'json') {
      return <Renderer content={content as string} type={details.content_type} id={id} />;
    } else {
      return <Renderer content={content as Blob} type={details.content_type} />;
    }
  }, [data, id]);

  if (isLoading) return <InscriptionSkeleton />;
  if (error) return <div>Error: {error.message}</div>;
  if (!content) return <div>No data available</div>;

  return content;
};

export default MediaViewer;
