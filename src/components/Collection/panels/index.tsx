'use client';

import { Container } from '@/components/Container';
import { Button } from '@/components/ui/button';
import { EVIEW_TYPES } from '@/lib/constants';
import { Collection, Tables } from '@/types/database.types';
import { Search } from 'lucide-react';
import { useState } from 'react';
import { AboutPanel } from './AboutPanel';
import { ActivityPanel } from './ActivityPanel';
import { FilterPanel } from './FilterPanel';
import { useCollectionByIdQuery } from '@/lib/services';
import LoadingScreen from '@/components/common/LoadingScreen';
import PanelHeader from './PanelHeader';

export enum ETABS {
  ITEMS = 'items',
  ACTIVITY = 'activity',
  ABOUT = 'about'
}

export const TabValues = Object.values(ETABS);
export const Panels = ({ collection }: { collection: Collection }) => {
  const [currentTab, setCurrentTab] = useState(ETABS.ITEMS);
  const [viewType, setViewType] = useState(EVIEW_TYPES.LIST);

  const renderTab = () => {
    switch (currentTab) {
      case ETABS.ITEMS:
        return <FilterPanel viewType={viewType} collectionId={collection.id} />;

      case ETABS.ABOUT:
        return <AboutPanel />;

      case ETABS.ACTIVITY:
        return <ActivityPanel />;
      default:
        return <></>;
    }
  };

  return (
    <div className='bg-ob-black-lighter py-[--section-vertical-padding]'>
      <Container padding>
        <div className='flex flex-col gap-8'>
          <PanelHeader setCurrentTab={setCurrentTab} currentTab={currentTab} viewType={viewType} setViewType={setViewType} />
          <div className='flex flex-row'>{renderTab()}</div>
        </div>
      </Container>
    </div>
  );
};

export default function PanelsWrapper({ collectionId }: { collectionId: number | undefined | null }) {
  const { data, isPending, error } = useCollectionByIdQuery(collectionId!);

  if (isPending) return <LoadingScreen />;

  if (!data) return <>No data</>;

  // @ts-expect-error - TODO: figure out how to pull in the right type from the join query in supabase
  return <Panels collection={data} />;
}
