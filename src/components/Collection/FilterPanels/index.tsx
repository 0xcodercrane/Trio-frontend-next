'use client';

import { Collection } from '@/types/database';
import { useState } from 'react';
import { AboutPanel } from '@/components/Collection/FilterPanels/AboutPanel';
import { ActivityPanel } from '@/components/Collection/FilterPanels/ActivityPanel';
import { SingleCollectionFilterPanel } from '@/components/Collection/FilterPanels/SingleCollectionFilterPanel';
import { useCollectionByIdQuery } from '@/lib/services';
import LoadingScreen from '@/components/common/LoadingScreen';
import Section from '@/components/Section';
import { FilterPanelHeader } from '@/components/FilterPanel';

export enum ETABS {
  ITEMS = 'items',
  ACTIVITY = 'activity',
  ABOUT = 'about'
}

export const TabValues = Object.values(ETABS);
export const Panels = ({ collection }: { collection: Collection }) => {
  const [currentTab, setCurrentTab] = useState(ETABS.ITEMS);

  const renderTab = () => {
    switch (currentTab) {
      case ETABS.ITEMS:
        return <SingleCollectionFilterPanel collectionId={collection.id} />;

      case ETABS.ABOUT:
        return <AboutPanel />;

      case ETABS.ACTIVITY:
        return <ActivityPanel />;
      default:
        return <></>;
    }
  };

  return (
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
  );
};

export function PanelsWrapper({ collectionId }: { collectionId: number | undefined | null }) {
  const { data, isPending, error } = useCollectionByIdQuery(collectionId!);

  if (isPending) return <LoadingScreen />;

  if (!data) return <>No data</>;

  return <Panels collection={data as Collection} />;
}
