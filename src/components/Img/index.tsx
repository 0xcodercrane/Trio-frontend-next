import { TriangleAlert } from 'lucide-react';
import { HTMLProps, ReactNode, useState } from 'react';

type ImgProps = HTMLProps<HTMLImageElement> & {
  fallback?: ReactNode;
};

export function Img({ fallback, ...props }: ImgProps) {
  const [isBroken, setIsBroken] = useState(false);

  function handleError() {
    setIsBroken(true);
  }

  if (isBroken) {
    return fallback || <TriangleAlert color='#FF001B' className={props.className} />;
  }

  return <img onError={handleError} {...props} />;
}
