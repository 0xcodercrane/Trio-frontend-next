import { ESIZES, EVIEW_TYPES } from '@/lib/constants';
import { FilterState } from '@/types';
import { create } from 'zustand';

const DEFAULT_MAX = 100;

export const useFilter = create<FilterState>()((set, get) => ({
  filters: {},
  viewType: EVIEW_TYPES.GRID,
  setViewType: (viewType: EVIEW_TYPES) => set({ viewType }),
  size: ESIZES.MD,
  setSize: (size: ESIZES) => set({ size }),
  offset: 0,
  searchKeyword: '',
  setSearchKeyword: (searchKeyword) => set({ searchKeyword }),
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
