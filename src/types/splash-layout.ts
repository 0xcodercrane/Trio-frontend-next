import { ReactNode } from 'react';

export enum EOrientation {
  LTR = 'ltr',
  RTL = 'rtl'
}

export enum EMediaType {
  INSCRIPTION = 'inscription',
  IMG = 'img',
  RAW = 'raw'
}

export enum EJustify {
  CENTER = 'center',
  BETWEEN = 'between',
  START = 'start',
  END = 'end',
  AROUND = 'around',
  STRETCH = 'stretch',
  EVENLY = 'evenly'
}

export interface TSplashPageLayoutProps {
  children: ReactNode;
  orientation?: EOrientation;
  media: {
    type: EMediaType;
    id?: string;
    src?: string | null;
  };
  className?: string;
  childrenWrapperJustify?: EJustify;
}
