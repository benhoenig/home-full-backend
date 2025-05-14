
import React from 'react';
import { DropdownMenuGroup, DropdownMenuLabel, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import FilterItem from './FilterItem';
import { FilterOption } from '../CommentFilter';

interface FilterGroupProps {
  label: string;
  items: {
    type: string;
    value: string;
    label: string;
    metadata?: {
      color?: string;
      initials?: string;
      id?: string;
    };
  }[];
  activeFilters: FilterOption[];
  showSeparator?: boolean;
  toggleFilter: (filter: FilterOption, event: React.MouseEvent) => void;
  handleCheckboxClick: (event: React.MouseEvent) => void;
}

const FilterGroup = ({
  label,
  items,
  activeFilters,
  showSeparator = true,
  toggleFilter,
  handleCheckboxClick
}: FilterGroupProps) => {
  if (items.length === 0) return null;

  return (
    <>
      <DropdownMenuGroup>
        <DropdownMenuLabel className="text-xs">{label}</DropdownMenuLabel>
        {items.map((item) => (
          <FilterItem
            key={`${item.type}-${item.value}`}
            checked={activeFilters.some(f => f.type === item.type && f.value === item.value)}
            label={item.label}
            color={item.type === 'pipeline' || item.type === 'tag' ? item.metadata?.color : undefined}
            initials={item.type === 'person' ? item.metadata?.initials : undefined}
            secondaryLabel={item.type === 'listing' ? 'Property' : undefined}
            onClick={(e) => toggleFilter({
              type: item.type as any,
              value: item.value,
              label: item.label,
              metadata: item.metadata
            }, e)}
            onCheckboxClick={handleCheckboxClick}
          />
        ))}
      </DropdownMenuGroup>
      {showSeparator && items.length > 0 && <DropdownMenuSeparator />}
    </>
  );
};

export default FilterGroup;
