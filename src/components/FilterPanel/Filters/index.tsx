import { Button } from '@/components/ui/button';
import { EFILTERS, FiltersValues } from '@/lib/constants';

interface FiltersProps {
  currentFilter: EFILTERS;
  setCurrentFilter: (filter: EFILTERS) => void;
}

export const Filters = ({ currentFilter, setCurrentFilter }: FiltersProps) => {
  return (
    <div className='flex flex-col gap-8'>
      <h3>Filters</h3>
      <div className='flex w-full flex-col gap-4'>
        {FiltersValues.map((filter, index) => (
          <Button
            key={index}
            onClick={() => setCurrentFilter(filter)}
            className={`${filter === currentFilter ? 'active' : ''}`}
          >
            {filter}
          </Button>
        ))}
      </div>
    </div>
  );
};
