import React, { memo, useMemo, useState } from 'react';
import { getImageDataURL } from '../helpers';

export const SVGRenderer = memo(({ content }: { content: string }) => {
  const [showSource, setShowSource] = useState(false);

  const contentReplace = useMemo(() => content.replaceAll('/content/', 'https://ordinals.com/content/'), [content]);

  return (
    <div className='html-viewer'>
      <label className='checkbox-label'>
        <input
          type='checkbox'
          className='checkbox'
          defaultChecked={showSource}
          onChange={() => setShowSource(!showSource)}
        />
        View Source
      </label>

      {showSource ? (
        <pre className='text-content'>{contentReplace}</pre>
      ) : (
        <iframe src={getImageDataURL(contentReplace)} sandbox='allow-scripts' scrolling='no' loading='lazy' />
      )}
    </div>
  );
});

SVGRenderer.displayName = 'SVGRenderer';
