'use client';

import { useContext, useState } from 'react';
import { AboutPanel } from '@/components/Collection/FilterPanels/AboutPanel';
import { SingleCollectionFilterPanel } from '@/components/Collection/FilterPanels/SingleCollectionFilterPanel';
import Section from '@/components/Section';
import { FilterPanelHeader } from '@/components/FilterPanel';
import { EVIEW_TYPES } from '@/lib/constants';
import { MyItemsPanel } from './MyItems';
import { AuthContext } from '@/app/providers/AuthContext';

export enum ETABS {
  ITEMS = 'Items',
  // ACTIVITY = 'Activity',
  MY_ITEMS = 'My Items',
  ABOUT = 'About'
}

export const TabValues = Object.values(ETABS);

const getTabValues = (showOnlyItems: boolean, isWalletConnected: boolean) => {
  if (showOnlyItems) {
    return [ETABS.ITEMS];
  }
  if (!isWalletConnected) {
    return TabValues.filter((value) => value !== ETABS.MY_ITEMS);
  }
  return TabValues;
};

export const Panels = ({ slug, showOnlyItems = false }: { slug: string; showOnlyItems?: boolean }) => {
  const { wallet } = useContext(AuthContext);
  const [currentTab, setCurrentTab] = useState(ETABS.ITEMS);

  const renderTab = () => {
    switch (currentTab) {
      case ETABS.ITEMS:
        return <SingleCollectionFilterPanel slug={slug} />;
      case ETABS.MY_ITEMS:
        return <MyItemsPanel slug={slug} />;
      case ETABS.ABOUT:
        return <AboutPanel slug={slug} />;
      // case ETABS.ACTIVITY:
      //   return <ActivityPanel slug={slug} />;
      default:
        return <></>;
    }
  };

  return (
    <div className='bg-ob-purple-darkest'>
      <Section>
        <div className='flex flex-col gap-8'>
          <FilterPanelHeader
            setCurrentTab={(tab: string) => setCurrentTab(tab as ETABS)}
            currentTab={currentTab}
            tabValues={getTabValues(showOnlyItems, !!wallet)}
            toolbar={currentTab === ETABS.ITEMS}
            viewType={EVIEW_TYPES.GRID}
          />
          <div className='flex flex-row'>{renderTab()}</div>
        </div>
      </Section>
    </div>
  );
};
