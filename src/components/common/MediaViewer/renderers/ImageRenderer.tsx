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
    return <p>Loading image...</p>;
  }

  // eslint-disable-next-line @next/next/no-img-element
  return <img src={url} alt='inscription' style={{ imageRendering: 'pixelated', height: '30vh' }} />;
});

ImageRenderer.displayName = 'ImageRenderer';
