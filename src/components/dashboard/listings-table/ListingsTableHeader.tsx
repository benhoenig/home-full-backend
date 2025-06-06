import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusIcon } from "lucide-react";
import ListingsFilter, { ListingFilterOptions } from './ListingsFilter';
import AddListingModal from './AddListingModal';

type ListingsTableHeaderProps = {
  isCustomizeDialogOpen: boolean;
  setIsCustomizeDialogOpen: (isOpen: boolean) => void;
  selectedListingType: string | null;
  setSelectedListingType: (type: string | null) => void;
  onFilterChange?: (filters: ListingFilterOptions) => void;
};

const ListingsTableHeader = ({ 
  isCustomizeDialogOpen, 
  setIsCustomizeDialogOpen,
  selectedListingType,
  setSelectedListingType,
  onFilterChange
}: ListingsTableHeaderProps) => {
  // Add state for the AddListingModal
  const [isAddListingModalOpen, setIsAddListingModalOpen] = useState(false);
  
  const handleFilterChange = (filters: ListingFilterOptions) => {
    if (onFilterChange) {
      onFilterChange(filters);
    }
  };
  
  const handleSubmitListing = (data: any) => {
    console.log('New listing data:', data);
    // Handle the submission data
    setIsAddListingModalOpen(false);
  };
  
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
      <div className="flex flex-wrap items-center gap-4">
        <h3 className="text-xl font-semibold">My Listings</h3>
        
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
        
        <Button size="sm" onClick={() => setIsAddListingModalOpen(true)}>
          <PlusIcon className="h-4 w-4 mr-2" />
          New Listing
        </Button>
      </div>
      
      {/* Add Listing Modal */}
      <AddListingModal 
        isOpen={isAddListingModalOpen}
        onClose={() => setIsAddListingModalOpen(false)}
        onSubmit={handleSubmitListing}
      />
    </div>
  );
};

export default ListingsTableHeader; 