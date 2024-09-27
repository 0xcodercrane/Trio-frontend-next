'use client';

import { useState } from 'react';
import { Filters } from './Filters';
import { EFILTERS, EVIEW_TYPES } from '@/lib/constants';
import { InscriptionsGrid } from '@/components/Grids';
import { InscriptionsTable } from '@/components/Tables';
import { Inscription } from '@/types/database.types';

export const FilterPanel = ({ viewType, inscriptions }: { viewType: EVIEW_TYPES; inscriptions: Inscription[] }) => {
  const [currentFilter, setCurrentFilter] = useState(EFILTERS.MOST_LIKED);
  return (
    <>
      <div className='basis-1/6'>
        <Filters currentFilter={currentFilter} setCurrentFilter={setCurrentFilter} />
      </div>
      <div className='basis-5/6'>
        {viewType === EVIEW_TYPES.GRID ? (
          <InscriptionsGrid inscriptions={inscriptions} />
        ) : (
          <InscriptionsTable inscriptions={inscriptions} />
        )}
      </div>
    </>
  );
};
