'use client';

import { useFilter } from '@/lib/hooks/useFilter';
import { ESIZES, EVIEW_TYPES, SizesValues } from '@/lib/constants';
import { Button } from '@/components/ui/button';

type SizeSelectorConfig = { [key in ESIZES]?: boolean };
interface SizeSelectorProps {
  config?: SizeSelectorConfig;
}

const DEFAULT_CONFIG: SizeSelectorConfig = {
  [ESIZES.XS]: true,
  [ESIZES.SM]: false,
  [ESIZES.MD]: true,
  [ESIZES.LG]: false,
  [ESIZES.XL]: false,
  [ESIZES.XXL]: true
};

export function SizeSelector({ config = DEFAULT_CONFIG }: SizeSelectorProps) {
  const { size, setSize, viewType } = useFilter();
  if (viewType !== EVIEW_TYPES.GRID) return null;
  return (
    <div className='flex flex-row items-center gap-4'>
      {SizesValues.map((s: ESIZES) => (
        <Button
          key={s}
          onClick={() => setSize(s)}
          className={`${size === s ? 'active' : ''} ${config[s] ? 'visible' : 'hidden'} text-xs uppercase`}
        >
          {s}
        </Button>
      ))}
    </div>
  );
}

export const mapSizeToGlobalVar = (size: ESIZES) => {
  switch (size) {
    case ESIZES.XS:
      return '--inscription-tinier';
    case ESIZES.SM:
      return '--inscription-small';
    case ESIZES.MD:
      return '--inscription-default';
    case ESIZES.LG:
      return '--inscription-large';
    case ESIZES.XL:
      return '--inscription-larger';
    case ESIZES.XXL:
      return '--inscription-largest';
  }
};
