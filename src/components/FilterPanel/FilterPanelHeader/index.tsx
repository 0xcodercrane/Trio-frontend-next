import { Button } from '@/components/ui/button';
import Pagination from '@/components/Pagination';
import { EVIEW_TYPES } from '@/lib/constants';
import { FilterPanelSearchbar } from './Searchbar';

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
          {viewType === EVIEW_TYPES.LIST && (
            <>
              <FilterPanelSearchbar /> <Pagination />
            </>
          )}

          {/* <SortBy /> */}
          {/* <ViewTypeSelector /> */}
          {/* {viewType === EVIEW_TYPES.GRID && <SizeSelector />} */}
        </div>
      )}
    </div>
  );
}
