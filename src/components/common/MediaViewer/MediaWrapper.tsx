import { MediaViewer } from '.';

interface WrapperProps {
  id?: string;
  children?: React.ReactNode;
  square?: boolean;
  size?: number | Dimensions | 'full';
  className?: string;
}

type Dimensions = {
  width: number;
  height: number;
};

const DEFAULT_INSCRIPTION_SIZE = 144;

export default function MediaWrapper({
  children = <MediaViewer id='fbc4bfbc475f468ca6bbe00b6d1dec4ba3026f3920cefa8fe5dadcee213c9409i0' />,
  square = true,
  size = DEFAULT_INSCRIPTION_SIZE,
  id,
  className = ''
}: WrapperProps) {
  return (
    <div className={`absolute top-0 z-0 ${getWidth(square, size)} ${getHeight(square, size)} ${className}`}>
      {id ? <MediaViewer id={id} /> : children}
    </div>
  );
}

const getWidth = (square: boolean, size: number | 'full' | Dimensions) => {
  if (size === 'full') return 'w-full';
  if (square || typeof size === 'number') return `min-w-[${size}px] w-[${size}px]`;
  return `min-w-[${size.width}px] w-[${size.width}px]`;
};

const getHeight = (square: boolean, size: number | 'full' | Dimensions) => {
  if (size === 'full') return 'h-full';
  if (square || typeof size === 'number') return `h-[${size}px]`;
  return `h-[${size.height}px]`;
};
