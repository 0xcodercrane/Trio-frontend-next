'use client';

import { useState } from 'react';
import { FilterPanelHeader } from '@/components/FilterPanel';
import Section from '@/components/Section';
import { MultiCollectionFilterPanel } from '@/components/Collections/FilterPanels/MultiCollectionFilterPanel';

export enum ETABS {
  ALL_ARTISTS = 'all artists',
  FEATURED_ARTISTS = 'featured'
}

export const TabValues = Object.values(ETABS);
const Panels = () => {
  const [currentTab, setCurrentTab] = useState(ETABS.ALL_ARTISTS);

  const renderTab = () => {
    switch (currentTab) {
      case ETABS.ALL_ARTISTS:
        return <MultiCollectionFilterPanel />;
      case ETABS.FEATURED_ARTISTS:
        return (
          <div className='flex min-h-[80vh] flex-col gap-8'>
            <h2>Featured Artists</h2>
          </div>
        );
      default:
        return <></>;
    }
  };

  return (
    <Section className='bg-ob-black-lighter'>
      <div className='flex flex-col gap-8'>
        <FilterPanelHeader
          setCurrentTab={(tab: string) => setCurrentTab(tab as ETABS)}
          currentTab={currentTab}
          tabValues={TabValues}
          toolbar={currentTab === ETABS.ALL_ARTISTS}
        />
        <div className='flex flex-row'>{renderTab()}</div>
      </div>
    </Section>
  );
};

export function PanelsWrapper() {
  return <Panels />;
}
