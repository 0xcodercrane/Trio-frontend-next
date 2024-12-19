import React, { memo, useMemo } from 'react';
import { getImageDataURL } from '../helpers';

export const SVGRenderer = memo(({ content }: { content: string }) => {
  const contentReplace = useMemo(() => content.replaceAll('/content/', 'https://ordinals.com/content/'), [content]);

  return (
    <div className='html-viewer'>
      <iframe
        src={getImageDataURL(contentReplace)}
        style={{ width: '100%', aspectRatio: '1/1', border: 'none' }}
        sandbox='allow-scripts'
        scrolling='no'
        loading='lazy'
      />
    </div>
  );
});

SVGRenderer.displayName = 'SVGRenderer';
