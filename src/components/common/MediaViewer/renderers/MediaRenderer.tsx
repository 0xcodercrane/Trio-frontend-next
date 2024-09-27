import { memo, useEffect, useState } from 'react';

type MediaRendererProps = {
  content: Blob;
  mediaType: 'video' | 'audio';
  // type: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  controls?: boolean;
};

export const MediaRenderer = memo(
  ({ content, mediaType, autoPlay = false, muted = false, loop = false, controls = true }: MediaRendererProps) => {
    const [url, setUrl] = useState<string | null>(null);

    useEffect(() => {
      const objectUrl = URL.createObjectURL(content);
      setUrl(objectUrl);

      return () => {
        URL.revokeObjectURL(objectUrl);
        setUrl(null);
      };
    }, [content]);

    if (!url) {
      return <p>Loading {mediaType}...</p>;
    }

    return mediaType === 'video' ? (
      <video controls={controls} autoPlay={autoPlay} muted={muted} loop={loop}>
        <source src={url} type='video/mp4' />
        Your browser does not support the video element.
      </video>
    ) : (
      <audio controls={controls} muted={muted}>
        <source src={url} type='audio/mpeg' />
        Your browser does not support the audio element.
      </audio>
    );
  }
);

MediaRenderer.displayName = 'MediaRenderer';
