import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import Pagination from '@/components/Pagination';
import { SortBy } from './SortBy';
import { ViewTypeSelector } from './ViewTypeSelector';
import { SizeSelector } from './SizeSelector';
import { EVIEW_TYPES } from '@/lib/constants';

interface FilterPanelHeaderProps {
  setCurrentTab: (tab: string) => void;
  currentTab: string;
  tabValues: string[];
  viewType: EVIEW_TYPES;
  toolbar?: boolean;
}
export function FilterPanelHeader({
  setCurrentTab,
  currentTab,
  tabValues,
  viewType,
  toolbar = false
}: FilterPanelHeaderProps) {
  return (
    <div className='flex w-full flex-row justify-between'>
      <div className='flex-start flex flex-row items-center gap-4'>
        {tabValues.map((tab, index) => (
          <Button
            variant='tab'
            onClick={() => setCurrentTab(tab)}
            key={index}
            className={`${tab === currentTab ? 'active bg-ob-purple-light' : ''}`}
          >
            {tab}
          </Button>
        ))}
      </div>
      {toolbar && (
        <div className='flex flex-row items-center gap-4'>
          {viewType === EVIEW_TYPES.LIST && <Pagination />}
          {/* <Button>
            Search
            <Search size={16} />
          </Button> */}
          <SortBy />
          {/* <ViewTypeSelector /> */}
          {viewType === EVIEW_TYPES.GRID && <SizeSelector />}
        </div>
      )}
    </div>
  );
}
