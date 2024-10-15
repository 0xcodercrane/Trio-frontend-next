import { EComponentVariants } from '@/types';
import { Dimensions } from '@/types/global.types';

export const getWidth = (size: number | 'full' | Dimensions | string) => {
  if (size === 'full') return 'w-full max-w-full';
  else if (typeof size === 'string') return `min-w-[${size}] w-[${size}] max-w-[${size}]`;
  if (typeof size === 'number') return `min-w-[${size}px] w-[${size}px] max-w-[${size}px]`;
  return `min-w-[${size.width}] w-[${size.width}] max-w-[${size.width}]`;
};

export const getHeight = (size: number | 'full' | Dimensions | string) => {
  if (size === 'full') return 'h-full max-h-full';
  else if (typeof size === 'string') return `min-h-[${size}] h-[${size}] max-h-[${size}]`;
  if (typeof size === 'number') return `h-[${size}px] max-h-[${size}px]`;
  return `min-h-[${size.height}] h-[${size.height}] max-h-[${size.height}]`;
};

export const mapComponentVariantsToColor = (variant: EComponentVariants) => {
  switch (variant) {
    case EComponentVariants.Success:
      return {
        bg: 'bg-ob-green-light',
        text: 'text-ob-black',
        border: 'border border-ob-green-light'
      };
    case EComponentVariants.Info:
      return {
        bg: 'bg-ob-blue',
        text: 'text-ob-black',
        border: 'border border-ob-blue'
      };
    case EComponentVariants.Error:
      return {
        bg: 'bg-ob-red-lighter',
        text: 'text-ob-black',
        border: 'border border-ob-red-lighter'
      };
    case EComponentVariants.Disabled: {
      return {
        bg: 'bg-ob-black-lightest',
        text: 'text-ob-white-40',
        border: 'border border-ob-white-40'
      };
    }
    case EComponentVariants.Default:
      return {
        bg: 'bg-ob-transparent',
        text: 'text-ob-white',
        border: 'border border-ob-white'
      };
    default:
      return {
        bg: 'bg-ob-black-light',
        text: 'text-ob-white',
        border: 'border border-ob-black-light'
      };
  }
};
