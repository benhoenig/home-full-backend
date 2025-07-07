import React from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ListingsFilter, { ListingFilterOptions } from './ListingsFilter';

type AllListingsTableHeaderProps = {
  isCustomizeDialogOpen: boolean;
  setIsCustomizeDialogOpen: (isOpen: boolean) => void;
  selectedListingType: string | null;
  setSelectedListingType: (type: string | null) => void;
  onFilterChange?: (filters: ListingFilterOptions) => void;
};

const AllListingsTableHeader = ({ 
  isCustomizeDialogOpen, 
  setIsCustomizeDialogOpen,
  selectedListingType,
  setSelectedListingType,
  onFilterChange
}: AllListingsTableHeaderProps) => {
  
  const handleFilterChange = (filters: ListingFilterOptions) => {
    if (onFilterChange) {
      onFilterChange(filters);
    }
  };
  
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
      <div className="flex flex-wrap items-center gap-4">
        <h3 className="text-xl font-semibold">All Listings</h3>
        
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
        {onFilterChange && (
          <ListingsFilter onFilterChange={handleFilterChange} />
        )}
        
        <Button variant="outline" size="sm" onClick={() => setIsCustomizeDialogOpen(true)}>
          Customize
        </Button>
      </div>
    </div>
  );
};

export default AllListingsTableHeader; 