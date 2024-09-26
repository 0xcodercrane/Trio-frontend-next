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

enum ETABS {
  ITEMS = 'items',
  ACTIVITY = 'activity',
  ABOUT = 'about'
}

const TabValues = Object.values(ETABS);
export const Panels = ({ collection }: { collection: Collection }) => {
  const [currentTab, setCurrentTab] = useState(ETABS.ITEMS);
  const [viewType, setViewType] = useState(EVIEW_TYPES.GRID);

  const renderTab = () => {
    switch (currentTab) {
      case ETABS.ITEMS:
        return <FilterPanel viewType={viewType} inscriptions={collection.inscriptions} />;

      case ETABS.ABOUT:
        return <AboutPanel />;

      case ETABS.ACTIVITY:
        return <ActivityPanel />;
      default:
        return <></>;
    }
  };

  return (
    <div className='h-screen bg-ob-black-lighter py-[--section-vertical-padding]'>
      <Container padding>
        <div className='flex flex-col gap-8'>
          <div className='flex w-full flex-row justify-between'>
            <div className='flex-start flex flex-row items-center gap-4'>
              {TabValues.map((tab, index) => (
                <Button onClick={() => setCurrentTab(tab)} key={index} className={`${tab === currentTab ? 'active' : ''}`}>
                  {tab}
                </Button>
              ))}
            </div>
            {currentTab === ETABS.ITEMS && (
              <div className='flex flex-row items-center gap-4'>
                <Button>
                  Search
                  <Search size={16} />
                </Button>
                <Button>Sort By: Popular</Button>
                <Button
                  onClick={() => setViewType(EVIEW_TYPES.LIST)}
                  className={`${viewType === EVIEW_TYPES.LIST ? 'active' : ''}`}
                >
                  List
                </Button>
                <Button
                  onClick={() => setViewType(EVIEW_TYPES.GRID)}
                  className={`${viewType === EVIEW_TYPES.GRID ? 'active' : ''}`}
                >
                  Grid
                </Button>
              </div>
            )}
          </div>

          <div className='flex flex-row'>{renderTab()}</div>
        </div>
      </Container>
    </div>
  );
};
