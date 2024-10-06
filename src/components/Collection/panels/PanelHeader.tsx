import { Button } from '@/components/ui/button';
import { ETABS, TabValues } from '.';
import { EVIEW_TYPES } from '@/lib/constants';
import { Search } from 'lucide-react';
import Pagination, { NextPage, PrevPage } from '@/components/Pagination';
import { useFilter } from '@/lib/hooks/useFilter';

interface PanelHeaderProps {
  setCurrentTab: (tab: ETABS) => void;
  currentTab: ETABS;
  viewType: string;
  setViewType: (viewType: EVIEW_TYPES) => void;
}
export default function PanelHeader({ setCurrentTab, currentTab, viewType, setViewType }: PanelHeaderProps) {
  return (
    <div className='flex w-full flex-row justify-between'>
      <div className='flex-start flex flex-row items-center gap-4'>
        {TabValues.map((tab, index) => (
          <Button onClick={() => setCurrentTab(tab)} key={index} className={`${tab === currentTab ? 'active' : ''}`}>
            {tab}
          </Button>
        ))}
      </div>
      <Pagination />
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
  );
}
