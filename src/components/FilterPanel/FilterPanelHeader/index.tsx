import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import Pagination from '@/components/Pagination';
import { SortBy } from './SortBy';
import { ViewTypeSelector } from './ViewTypeSelector';
import { SizeSelector } from './SizeSelector';

interface FilterPanelHeaderProps {
  setCurrentTab: (tab: string) => void;
  currentTab: string;
  tabValues: string[];
  toolbar?: boolean;
}
export function FilterPanelHeader({ setCurrentTab, currentTab, tabValues, toolbar = false }: FilterPanelHeaderProps) {
  return (
    <div className='flex w-full flex-row justify-between'>
      <div className='flex-start flex flex-row items-center gap-4'>
        {tabValues.map((tab, index) => (
          <Button onClick={() => setCurrentTab(tab)} key={index} className={`${tab === currentTab ? 'active' : ''}`}>
            {tab}
          </Button>
        ))}
      </div>
      {toolbar && (
        <div className='flex flex-row items-center gap-4'>
          <Pagination />
          <Button>
            Search
            <Search size={16} />
          </Button>
          <SortBy />
          <ViewTypeSelector />
          <SizeSelector />
        </div>
      )}
    </div>
  );
}
