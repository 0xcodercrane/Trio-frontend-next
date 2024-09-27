import { memo, useState } from 'react';
import { HtmlProps } from './types';

// NOTE what was className doing?
export const HTMLRenderer = memo(({ content, id, type }: HtmlProps) => {
  const [showSource, setShowSource] = useState(false);

  const iframeSrc = id
    ? `${process.env.NEXT_PUBLIC_ORDINALSBOT_EXPLORER_URL}/content/${id}`
    : `data:${type},${encodeURIComponent(content)}`;

  return (
    <div className='html-viewer'>
      <label className='checkbox-label'>
        <input type='checkbox' className='checkbox' checked={showSource} onChange={() => setShowSource((prev) => !prev)} />
        View Source
      </label>

      {showSource ? (
        <pre className='text-content'>{content}</pre>
      ) : (
        <iframe
          src={iframeSrc}
          sandbox='allow-scripts'
          scrolling='no'
          loading='lazy'
          style={{ width: '100%', height: '500px', border: 'none' }}
        />
      )}
    </div>
  );
});

HTMLRenderer.displayName = 'HTMLRenderer';

/**
 *
 * from legacy
 *
  .html-viewer {
      width: 100%;

      .checkbox-label {
        margin-bottom: 30px;
      }

      iframe {
        width: 100%;
        aspect-ratio: 1 / 1;
        border: none;
      }
    }
 */
