import { useFilter } from '@/lib/hooks';
import React, { useCallback } from 'react';
import { Searchbar } from '@/components/Searchbar';

const FilterPanelSearchbar = () => {
  const { setSearchKeyword, setOffset } = useFilter();

  const onSearchChange = useCallback(
    (keyword: string) => {
      setSearchKeyword(keyword);
      setOffset(0);
    },
    [setOffset, setSearchKeyword]
  );

  return <Searchbar onChange={onSearchChange} />;
};

export { FilterPanelSearchbar };
