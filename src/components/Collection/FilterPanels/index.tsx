'use client';

import { Collection } from '@/types/database';
import { useState } from 'react';
import { AboutPanel } from '@/components/Collection/FilterPanels/AboutPanel';
import { ActivityPanel } from '@/components/Collection/FilterPanels/ActivityPanel';
import { SingleCollectionFilterPanel } from '@/components/Collection/FilterPanels/SingleCollectionFilterPanel';
import { useCollectionBySlugQuery } from '@/lib/services';
import LoadingScreen from '@/components/common/LoadingScreen';
import Section from '@/components/Section';
import { FilterPanelHeader } from '@/components/FilterPanel';
import { useFilter } from '@/lib/hooks/useFilter';

export enum ETABS {
  ITEMS = 'items',
  ACTIVITY = 'activity',
  ABOUT = 'about'
}

export const TabValues = Object.values(ETABS);
export const Panels = ({ slug }: { slug: string }) => {
  const [currentTab, setCurrentTab] = useState(ETABS.ITEMS);

  const renderTab = () => {
    switch (currentTab) {
      case ETABS.ITEMS:
        return <SingleCollectionFilterPanel slug={slug} />;

      case ETABS.ABOUT:
        return <AboutPanel slug={slug} />;

      case ETABS.ACTIVITY:
        return <ActivityPanel slug={slug} />;
      default:
        return <></>;
    }
  };

  return (
    <div className='bg-ob-purple-dark'>
      <Section>
        <div className='flex flex-col gap-8'>
          <FilterPanelHeader
            setCurrentTab={(tab: string) => setCurrentTab(tab as ETABS)}
            currentTab={currentTab}
            tabValues={TabValues}
            toolbar={currentTab === ETABS.ITEMS}
          />
          <div className='flex flex-row'>{renderTab()}</div>
        </div>
      </Section>
    </div>
  );
};

export function PanelsWrapper({ slug }: { slug: string }) {
  const { offset, limit } = useFilter();
  const { data, isPending, error } = useCollectionBySlugQuery(slug);

  if (isPending) return <LoadingScreen />;

  if (!data) return <>No data</>;

  return <Panels slug={slug} />;
}
