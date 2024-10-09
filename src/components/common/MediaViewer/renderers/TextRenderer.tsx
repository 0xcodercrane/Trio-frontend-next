import React, { memo } from 'react';

const getFontSize = (length: number) => {
  switch (true) {
    case length === 1:
      return 310;
    case length < 3:
      return 200;
    case length < 6:
      return 150;
    case length < 15:
      return 100;
    case length < 20:
      return 90;
    default:
      return 50;
  }
};

export const TextRenderer = memo(({ content }: { content: string }) => {
  const fontSize = getFontSize(content.length);

  // TODO add the different text sizes/styles
  return (
    <pre className={`text-content max-w-full md:flex ${content.length < 150 ? 'short-text' : ''}`} style={{ fontSize }}>
      {content}
    </pre>
  );
});

TextRenderer.displayName = 'TextViewer';
