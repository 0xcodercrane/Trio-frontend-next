import { ESIZES, EVIEW_TYPES } from '@/lib/constants';

export interface FilterState {
  filters: Record<string, any>;
  setFilters: (filters: Record<string, any>) => void;
  size: ESIZES;
  setSize: (size: ESIZES) => void;
  offset: number;
  setOffset: (offset: number) => void;
  limit: number;
  setLimit: (limit: number) => void;
  max: number;
  setMax: (total: number) => void;
  viewType: EVIEW_TYPES;
  setViewType: (viewType: EVIEW_TYPES) => void;
  nextPage: () => void;
  prevPage: () => void;

  hasNext: () => boolean;
  hasPrev: () => boolean;
}
