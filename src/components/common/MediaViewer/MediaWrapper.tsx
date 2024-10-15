import { Dimensions } from '@/types/global.types';
import { MediaViewer } from '.';
import { getHeight, getWidth } from '@/lib/utilities';

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
  size = DEFAULT_INSCRIPTION_SIZE,
  id,
  blur,
  className = ''
}: WrapperProps) {
  return (
    <div
      className={`absolute top-0 z-0 ${blur ? 'blur-sm' : ''} ${getWidth(size)} ${getHeight(size)} ${className ? className : ''}`}
    >
      {id ? <MediaViewer id={id} /> : children}
    </div>
  );
}
