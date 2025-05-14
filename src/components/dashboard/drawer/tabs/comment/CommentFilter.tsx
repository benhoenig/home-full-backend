
import React, { useState, useEffect } from 'react';
import { pipelineStages } from '@/components/dashboard/PipelineStageBadge';
import { teamMembers, sampleListings } from './data';
import { CustomTag } from './types';
import { TimelineItem } from '@/hooks/useTimelineItems';
import { FilterDropdown } from './filter';

export type FilterType = 'pipeline' | 'tag' | 'person' | 'listing';
export type FilterValue = string | null;

export interface FilterOption {
  type: FilterType;
  value: string;
  label: string;
  metadata?: {
    color?: string;
    initials?: string;
    id?: string;
  };
}

interface CommentFilterProps {
  customTags: CustomTag[];
  activeFilter: FilterOption | null;
  onFilterChange: (filter: FilterOption | null) => void;
  timelineItems?: TimelineItem[];
}

const CommentFilter: React.FC<CommentFilterProps> = ({
  customTags,
  activeFilter,
  onFilterChange,
  timelineItems = []
}) => {
  // Change to array of filters for multiple selection
  const [activeFilters, setActiveFilters] = useState<FilterOption[]>([]);

  // Initialize with the single filter if provided
  useEffect(() => {
    if (activeFilter && !activeFilters.some(filter => filter.value === activeFilter.value && filter.type === activeFilter.type)) {
      setActiveFilters(activeFilter ? [activeFilter] : []);
    }
  }, [activeFilter]);

  const clearFilter = () => {
    setActiveFilters([]);
    onFilterChange(null);
  };

  const toggleFilter = (filter: FilterOption, event: React.MouseEvent) => {
    // Prevent the dropdown from closing
    event.preventDefault();
    event.stopPropagation();
    
    const isSelected = activeFilters.some(f => f.type === filter.type && f.value === filter.value);
    
    if (isSelected) {
      // Remove the filter
      const newFilters = activeFilters.filter(f => !(f.type === filter.type && f.value === filter.value));
      setActiveFilters(newFilters);
      // Update parent with first filter or null
      onFilterChange(newFilters.length > 0 ? newFilters[0] : null);
    } else {
      // Add the filter
      const newFilters = [...activeFilters, filter];
      setActiveFilters(newFilters);
      // Update parent with first filter
      onFilterChange(newFilters[0]); // Still only passing the first one for backward compatibility
    }
  };

  // Extract used items from timeline
  const usedPipelineStages = timelineItems
    .filter(item => item.pipelineStage)
    .map(item => item.pipelineStage)
    .filter((value, index, self) => value && self.indexOf(value) === index) as string[];

  const usedTags = timelineItems
    .filter(item => item.customTag)
    .map(item => item.customTag?.name)
    .filter((value, index, self) => value && self.indexOf(value) === index) as string[];

  const usedPeople = timelineItems
    .filter(item => item.taggedPerson)
    .map(item => item.taggedPerson?.name)
    .filter((value, index, self) => value && self.indexOf(value) === index) as string[];

  const usedListings = timelineItems
    .filter(item => item.taggedListing)
    .map(item => item.taggedListing?.id)
    .filter((value, index, self) => value && self.indexOf(value) === index) as string[];

  // Filter the available tags to only show used ones
  const filteredPipelineStages = pipelineStages.filter(stage => 
    usedPipelineStages.length === 0 || usedPipelineStages.includes(stage.name)
  );

  const filteredCustomTags = customTags.filter(tag => 
    usedTags.length === 0 || usedTags.includes(tag.name)
  );

  const filteredTeamMembers = teamMembers.filter(person => 
    usedPeople.length === 0 || usedPeople.includes(person.name)
  );

  const filteredListings = sampleListings.filter(listing => 
    usedListings.length === 0 || usedListings.includes(listing.id)
  );

  // Prepare filter groups for the FilterDropdown component
  const filterGroups = [
    {
      label: 'Pipeline Stage',
      items: filteredPipelineStages.map(stage => ({
        type: 'pipeline',
        value: stage.name,
        label: stage.name,
        metadata: { color: stage.color }
      }))
    },
    {
      label: 'Custom Tag',
      items: filteredCustomTags.map(tag => ({
        type: 'tag',
        value: tag.name,
        label: tag.name,
        metadata: { color: tag.color }
      }))
    },
    {
      label: 'Person',
      items: filteredTeamMembers.map(person => ({
        type: 'person',
        value: person.name,
        label: person.name,
        metadata: { initials: person.initials }
      }))
    },
    {
      label: 'Listing',
      items: filteredListings.map(listing => ({
        type: 'listing',
        value: listing.id,
        label: listing.name,
        metadata: { id: listing.id }
      }))
    }
  ].filter(group => group.items.length > 0);

  return (
    <FilterDropdown
      activeFilters={activeFilters}
      clearFilter={clearFilter}
      toggleFilter={toggleFilter}
      filterGroups={filterGroups}
    />
  );
};

export default CommentFilter;
