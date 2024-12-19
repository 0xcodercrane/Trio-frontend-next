import React, { memo, useCallback, useState } from 'react';

const DEFAULT_FONT_SIZE = 16;
const WIDTH_TO_PIXEL_RATIO = 2;

export const TextRenderer = memo(({ content }: { content: string }) => {
  const [size, setSize] = useState(DEFAULT_FONT_SIZE);

  // MEMO: Can not use ref hook here because it does not trigger update
  //       when container size changes. see: https://legacy.reactjs.org/docs/hooks-faq.html#how-can-i-measure-a-dom-node
  const measuredRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (node !== null) {
        // Fill up 100% of parent container.
        const nodeToMeasure = node.parentElement ?? node;
        const nodeRect = nodeToMeasure.getBoundingClientRect();

        const containerWidth = nodeRect.width;
        const containerHeight = nodeRect.height;

        const contentWidth = Math.max(...content.split('\n').map((line) => line.length));
        const contentHeight = content.split('\n').length;

        // MEMO: CSS font-size is telling the browsers to render the letters at exactly the
        //       number of pixels in height. To get the pixel to width size we need to multiply it by ±2.
        const sizeX = (containerWidth / contentWidth) * WIDTH_TO_PIXEL_RATIO;
        const sizeY = containerHeight / contentHeight;

        // MEMO: Returns the smaller value to render the content fully.
        const size = Math.min(sizeX, sizeY);
        setSize(size);
      }
    },
    [content]
  );

  return (
    <div ref={measuredRef}>
      <div className='flex items-center justify-center'>
        <pre
          className='text-content max-w-full text-white md:flex'
          style={{ fontSize: `${size}px`, lineHeight: `${size}px` }}
        >
          {content}
        </pre>
      </div>
    </div>
  );
});

TextRenderer.displayName = 'TextViewer';
