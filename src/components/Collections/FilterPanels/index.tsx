'use client';

import { useState } from 'react';
import { FilterPanelHeader } from '@/components/FilterPanel';
import Section from '@/components/Section';
import { MultiCollectionFilterPanel } from './MultiCollectionFilterPanel';

export enum ETABS {
  ALL_COLLECTIONS = 'all collections',
  FEATURED_COLLECTIONS = 'featured'
}

export const TabValues = Object.values(ETABS);
const Panels = () => {
  const [currentTab, setCurrentTab] = useState(ETABS.ALL_COLLECTIONS);

  const renderTab = () => {
    switch (currentTab) {
      case ETABS.ALL_COLLECTIONS:
        return <MultiCollectionFilterPanel />;
      case ETABS.FEATURED_COLLECTIONS:
        return (
          <div className='flex min-h-[80vh] flex-col gap-8'>
            <h2>Featured Collections</h2>
          </div>
        );
      default:
        return <></>;
    }
  };

  return (
    <Section className='bg-ob-purple-dark'>
      <div className='flex flex-col gap-8'>
        <FilterPanelHeader
          setCurrentTab={(tab: string) => setCurrentTab(tab as ETABS)}
          currentTab={currentTab}
          tabValues={TabValues}
          toolbar={currentTab === ETABS.ALL_COLLECTIONS}
        />
        <div className='flex flex-row'>{renderTab()}</div>
      </div>
    </Section>
  );
};

export function PanelsWrapper() {
  return <Panels />;
}
