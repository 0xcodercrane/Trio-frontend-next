'use client';

import { useFilter } from '@/lib/hooks/useFilter';
import { EVIEW_TYPES, ViewTypeValues } from '@/lib/constants';
import { Button } from '@/components/ui/button';

export function ViewTypeSelector() {
  const { viewType, setViewType } = useFilter();
  return (
    <div className='flex flex-row items-center gap-4'>
      {ViewTypeValues.map((type: EVIEW_TYPES) => (
        <Button key={type} onClick={() => setViewType(type)} className={`${viewType === type ? 'active' : ''}`}>
          {type}
        </Button>
      ))}
    </div>
  );
}
