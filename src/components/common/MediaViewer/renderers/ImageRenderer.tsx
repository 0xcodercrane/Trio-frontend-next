import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';
import { memo, useEffect, useState } from 'react';
import React from 'react';

export const ImageRenderer = memo(({ content }: { content: Blob }) => {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    const objectUrl = URL.createObjectURL(content);
    setUrl(objectUrl);

    // Clean up when the component unmounts or when the content changes
    return () => {
      URL.revokeObjectURL(objectUrl);
      setUrl(null);
    };
  }, [content]);

  if (!url) {
    return (
      <Skeleton className='h-full max-h-[--inscription-largest] min-h-[--inscription-tiniest] w-full min-w-[--inscription-tiniest] max-w-[--inscription-largest]' />
    );
  }

  return (
    <Image
      src={url}
      alt={`bitcoin inscription`}
      className='h-full w-full'
      loading='lazy'
      style={{ imageRendering: 'pixelated', objectFit: 'cover' }}
      width={1000}
      height={1000}
    />
  );
});

ImageRenderer.displayName = 'ImageRenderer';
