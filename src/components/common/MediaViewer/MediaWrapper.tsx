import { Dimensions } from '@/types/global.types';
import { MediaViewer } from '.';

interface WrapperProps {
  id?: string;
  children?: React.ReactNode;
  square?: boolean;
  size?: number | Dimensions | 'full' | string;
  className?: string;
  blur?: boolean;
}

const DEFAULT_INSCRIPTION_SIZE = 144;

export default function MediaWrapper({
  children = <MediaViewer id='fbc4bfbc475f468ca6bbe00b6d1dec4ba3026f3920cefa8fe5dadcee213c9409i0' />,
  square = true,
  size = DEFAULT_INSCRIPTION_SIZE,
  id,
  blur,
  className = ''
}: WrapperProps) {
  return (
    <div
      className={`absolute top-0 z-0 ${blur ? 'blur-sm' : ''} ${getWidth(square, size)} ${getHeight(square, size)} ${className}`}
    >
      {id ? <MediaViewer id={id} /> : children}
    </div>
  );
}

const getWidth = (square: boolean, size: number | 'full' | Dimensions | string) => {
  if (size === 'full') return 'w-full';
  else if (typeof size === 'string') return `min-w-[${size}] w-[${size}] max-w-[${size}]`;
  if (square || typeof size === 'number') return `min-w-[${size}px] w-[${size}px] max-w-[${size}px]`;
  return `min-w-[${size.width}px] w-[${size.width}px] max-w-[${size.width}px]`;
};

const getHeight = (square: boolean, size: number | 'full' | Dimensions | string) => {
  if (size === 'full') return 'h-full';
  else if (typeof size === 'string') return `min-h-[${size}] h-[${size}] max-h-[${size}]`;
  if (square || typeof size === 'number') return `h-[${size}px] max-h-[${size}px]`;
  return `min-h-[${size.height}px] h-[${size.height}px] max-h-[${size.height}px]`;
};
