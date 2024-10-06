import { create } from 'zustand';
import { FilterState } from './filter.types';

const DEFAULT_MAX = 100;

export const useFilter = create<FilterState>()((set, get) => ({
  filters: {},
  offset: 0,
  limit: 10,
  max: DEFAULT_MAX,
  hasNext: () => get().offset + get().limit < get().max,
  hasPrev: () => get().offset > 0,
  setFilters: (filters) => set({ filters, offset: 0 }), // Reset pagination when filters change
  setOffset: (offset) => set({ offset }),
  setLimit: (limit) => set({ limit }),
  setMax: (max) => set({ max }),
  nextPage: () => {
    const { offset, limit, max } = get();
    const newOffset = Math.min(offset + limit, max - 1);
    set({ offset: newOffset });
  },
  prevPage: () => {
    const { offset, limit } = get();
    const newOffset = Math.max(0, offset - limit);
    set({ offset: newOffset });
  }
}));

// Usage in a component:
const FilterComponent = () => {
  const { filters, setFilters } = useFilter();
  // ... rest of the component
};

const PaginationComponent = () => {
  const { offset, limit, nextPage, prevPage, max } = useFilter();
  // ... rest of the component
};

const ResultsComponent = () => {
  const { filters, offset, limit } = useFilter();
  // Use these values to fetch and display results
};
