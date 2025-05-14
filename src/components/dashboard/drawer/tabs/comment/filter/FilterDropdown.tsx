
import React, { useState } from 'react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem,
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import FilterGroup from './FilterGroup';
import { FilterOption } from '../CommentFilter';

interface FilterDropdownProps {
  activeFilters: FilterOption[];
  clearFilter: () => void;
  toggleFilter: (filter: FilterOption, event: React.MouseEvent) => void;
  filterGroups: {
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
  }[];
}

const FilterDropdown = ({
  activeFilters,
  clearFilter,
  toggleFilter,
  filterGroups
}: FilterDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Count active filters for display
  const activeFilterCount = activeFilters.length;
  
  // Function to handle checkbox click without triggering dropdown close
  const handleCheckboxClick = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="icon" 
          className={`h-9 w-9 ${activeFilterCount > 0 ? 'bg-accent text-accent-foreground' : ''}`}
        >
          {activeFilterCount > 0 ? (
            <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground rounded-full w-4 h-4 text-[10px] flex items-center justify-center">
              {activeFilterCount}
            </span>
          ) : null}
          <Filter className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-[280px] bg-white border border-gray-200 shadow-lg rounded-md max-h-[80vh]"
        avoidCollisions={true}
        sticky="always"
      >
        <DropdownMenuLabel>Filter Timeline</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {activeFilterCount > 0 && (
          <>
            <DropdownMenuItem 
              onClick={(e) => {
                e.preventDefault();
                clearFilter();
              }} 
              className="text-red-500 hover:text-red-600"
            >
              Clear All Filters
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}
        
        <div className="h-[50vh] overflow-y-auto touch-auto">
          <ScrollArea className="h-full w-full pr-3">
            <div className="p-1">
              {filterGroups.map((group, index) => (
                <FilterGroup
                  key={group.label}
                  label={group.label}
                  items={group.items}
                  activeFilters={activeFilters}
                  showSeparator={index < filterGroups.length - 1}
                  toggleFilter={toggleFilter}
                  handleCheckboxClick={handleCheckboxClick}
                />
              ))}
            </div>
          </ScrollArea>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FilterDropdown;
