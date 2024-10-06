export interface FilterState {
  filters: Record<string, any>;
  offset: number;
  limit: number;
  max: number;
  setFilters: (filters: Record<string, any>) => void;
  setOffset: (offset: number) => void;
  setLimit: (limit: number) => void;
  setMax: (total: number) => void;
  nextPage: () => void;
  prevPage: () => void;

  hasNext: () => boolean;
  hasPrev: () => boolean;
}
