import { HTMLProps, ReactNode, useState } from 'react';

type ImgProps = HTMLProps<HTMLImageElement> & {
  fallback?: ReactNode;
};

export function Img({ fallback, alt, ...props }: ImgProps) {
  const [isBroken, setIsBroken] = useState(false);

  function handleError() {
    setIsBroken(true);
  }

  if (isBroken) {
    return fallback || <div className={`aspect-square rounded-md bg-white/20 ${props.className}`} />;
  }

  return <img onError={handleError} alt={alt} {...props} />;
}
