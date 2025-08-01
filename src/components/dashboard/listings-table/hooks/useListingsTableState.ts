import { useState, useCallback, useMemo } from 'react';
import { Listing } from '@/hooks/useListingsTableData';
import { ListingFilterOptions } from '../ListingsFilter';
import { toast } from "sonner";

export function useListingsTableState(initialData: Listing[]) {
  const [data, setData] = useState<Listing[]>(initialData);
  const [selectedListingType, setSelectedListingType] = useState<string | null>(null);
  const [selectedOwnerType, setSelectedOwnerType] = useState<string>("all");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [isCustomizeDialogOpen, setIsCustomizeDialogOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<ListingFilterOptions | null>(null);
  const [isGroupingEnabled, setIsGroupingEnabled] = useState(false);
  
  // Apply filters to data
  const filteredData = useMemo(() => {
    let result = [...data];
    
    // First apply selected listing type filter (from tabs)
    if (selectedListingType) {
      result = result.filter(listing => listing.listingType === selectedListingType);
    }
    
    // Apply owner type filter
    if (selectedOwnerType !== 'all') {
      result = result.filter(listing => listing.ownerType === selectedOwnerType);
    }
    
    // Then apply additional filters if any are active
    if (activeFilters) {
      // Filter by marketing status
      if (activeFilters.marketingStatus.length > 0) {
        result = result.filter(listing => activeFilters.marketingStatus.includes(listing.marketingStatus));
      }
      
      // Filter by listing type (in case filters are applied alongside tabs)
      if (activeFilters.listingType.length > 0) {
        result = result.filter(listing => activeFilters.listingType.includes(listing.listingType));
      }
      
      // Filter by property type
      if (activeFilters.propertyType.length > 0) {
        result = result.filter(listing => activeFilters.propertyType.includes(listing.propertyType));
      }
      
      // Filter by bedrooms
      if (activeFilters.bedrooms) {
        const [min, max] = activeFilters.bedrooms;
        result = result.filter(listing => {
          if (max === 6) {
            // 6+ bedrooms
            return listing.bedrooms >= min;
          }
          return listing.bedrooms >= min && listing.bedrooms <= max;
        });
      }
      
      // Filter by price range
      if (activeFilters.priceRange) {
        const [min, max] = activeFilters.priceRange;
        result = result.filter(listing => 
          listing.askingPrice >= min && listing.askingPrice <= max
        );
      }
      
      // Filter by starred status
      if (activeFilters.isStarred !== null) {
        result = result.filter(listing => 
          // If isStarred is true, only show starred listings
          // If isStarred is false, only show non-starred listings
          listing.isStarred === activeFilters.isStarred
        );
      }
      
      // Filter by location
      if (activeFilters.location.length > 0) {
        result = result.filter(listing => {
          // Check if listing location includes any of the selected locations
          return activeFilters.location.some(location => 
            listing.zoneArea.includes(location) || 
            (listing.bts && listing.bts.includes(location)) || 
            (listing.projectName && listing.projectName.includes(location))
          );
        });
      }
    }
    
    return result;
  }, [data, selectedListingType, activeFilters]);
  
  // Handler for filter changes
  const handleFilterChange = useCallback((filters: ListingFilterOptions) => {
    setActiveFilters(filters);
  }, []);
  
  // Handler for marketing status changes
  const handleMarketingStatusChange = useCallback((listing: Listing, newStatus: string) => {
    setData(prevData => 
      prevData.map(item => 
        item.listingCode === listing.listingCode 
          ? { ...item, marketingStatus: newStatus } 
          : item
      )
    );
  }, []);
  
  // Handler for listing type changes
  const handleListingTypeChange = useCallback((listing: Listing, newType: string) => {
    setData(prevData => 
      prevData.map(item => 
        item.listingCode === listing.listingCode 
          ? { ...item, listingType: newType as 'Normal List' | 'A List' | 'Exclusive List' } 
          : item
      )
    );
  }, []);
  
  // Handler for star toggle
  const handleStarToggle = useCallback((listing: Listing) => {
    setData(prevData => 
      prevData.map(item => 
        item.listingCode === listing.listingCode 
          ? { ...item, isStarred: !item.isStarred } 
          : item
      )
    );
    
    // If the drawer is open and the selected listing is being toggled, update it too
    if (selectedListing && selectedListing.listingCode === listing.listingCode) {
      setSelectedListing(prev => prev ? { ...prev, isStarred: !prev.isStarred } : null);
    }
  }, [selectedListing]);
  
  // Handler for row click
  const handleRowClick = useCallback((listing: Listing) => {
    setSelectedListing(listing);
    setIsDrawerOpen(true);
  }, []);
  
  // Handler for drawer close
  const handleCloseDrawer = useCallback(() => {
    setIsDrawerOpen(false);
    setTimeout(() => setSelectedListing(null), 300); // Clear after animation
  }, []);
  
  // Toggle grouping
  const toggleGrouping = useCallback(() => {
    setIsGroupingEnabled(!isGroupingEnabled);
    toast.success(isGroupingEnabled ? "Grouping disabled" : "Grouping enabled");
  }, [isGroupingEnabled]);
  
  return {
    data: filteredData,
    selectedListingType,
    setSelectedListingType,
    selectedOwnerType,
    setSelectedOwnerType,
    isDrawerOpen,
    selectedListing,
    isCustomizeDialogOpen,
    setIsCustomizeDialogOpen,
    isGroupingEnabled,
    toggleGrouping,
    handleFilterChange,
    handleMarketingStatusChange,
    handleListingTypeChange,
    handleStarToggle,
    handleRowClick,
    handleCloseDrawer
  };
} 