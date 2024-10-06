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
    return <Skeleton className='h-full min-h-[48px] w-full min-w-[48px]' />;
  }

  return (
    <Image
      src={url}
      alt='inscription'
      className='h-full w-full'
      loading='lazy'
      style={{ imageRendering: 'pixelated' }}
      width={1000}
      height={1000}
    />
  );
});

ImageRenderer.displayName = 'ImageRenderer';
