import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import ListingsFilter, { ListingFilterOptions } from './ListingsFilter';
import GroupingButton from './GroupingButton';
import GroupSettingsDialog from './GroupSettingsDialog';

type OwnerFocusTableHeaderProps = {
  isCustomizeDialogOpen: boolean;
  setIsCustomizeDialogOpen: (isOpen: boolean) => void;
  selectedListingType: string | null;
  setSelectedListingType: (type: string | null) => void;
  selectedOwnerType: string;
  setSelectedOwnerType: (type: string) => void;
  onFilterChange?: (filters: ListingFilterOptions) => void;
  isGroupingEnabled: boolean;
  toggleGrouping: () => void;
};

const OwnerFocusTableHeader = ({ 
  isCustomizeDialogOpen, 
  setIsCustomizeDialogOpen,
  selectedListingType,
  setSelectedListingType,
  selectedOwnerType,
  setSelectedOwnerType,
  onFilterChange,
  isGroupingEnabled,
  toggleGrouping
}: OwnerFocusTableHeaderProps) => {
  const [isGroupSettingsOpen, setIsGroupSettingsOpen] = useState(false);
  
  const handleFilterChange = (filters: ListingFilterOptions) => {
    if (onFilterChange) {
      onFilterChange(filters);
    }
  };
  
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
      <div className="flex flex-wrap items-center gap-4">
        <h3 className="text-xl font-semibold">Owner Focus</h3>
        
        <Tabs 
          value={selectedListingType || "all"} 
          onValueChange={(value) => setSelectedListingType(value === "all" ? null : value)}
        >
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="Normal List">Normal</TabsTrigger>
            <TabsTrigger value="A List">A List</TabsTrigger>
            <TabsTrigger value="Exclusive List">Exclusive</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div className="flex flex-wrap items-center gap-2">
        <GroupingButton 
          isGroupingEnabled={isGroupingEnabled} 
          toggleGrouping={toggleGrouping} 
          onManageGroups={() => setIsGroupSettingsOpen(true)} 
        />
        
        <Select 
          value={selectedOwnerType} 
          onValueChange={setSelectedOwnerType}
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Owner Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="Critical">Critical</SelectItem>
            <SelectItem value="Alert">Alert</SelectItem>
            <SelectItem value="Chill">Chill</SelectItem>
          </SelectContent>
        </Select>
        
        {onFilterChange && (
          <ListingsFilter onFilterChange={handleFilterChange} />
        )}
        
        <Button variant="outline" size="sm" onClick={() => setIsCustomizeDialogOpen(true)}>
          Customize
        </Button>
      </div>
      
      <GroupSettingsDialog
        open={isGroupSettingsOpen}
        onOpenChange={setIsGroupSettingsOpen}
      />
    </div>
  );
};

export default OwnerFocusTableHeader; 