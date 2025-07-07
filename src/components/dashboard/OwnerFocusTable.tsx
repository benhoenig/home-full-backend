import React, { useMemo } from 'react';
import { Dialog } from "@/components/ui/dialog";
import ListingDetailsDrawer from './ListingDetailsDrawer';
import { Listing, defaultVisibleColumns } from '@/hooks/useListingsTableData';
import ListingsTableContent from './listings-table/ListingsTableContent';
import ColumnCustomizer from './listings-table/ColumnCustomizer';
import { useTableColumns, allColumns } from './listings-table/useTableColumns';
import { useListingsTableState } from './listings-table/hooks/useListingsTableState';
import { useTableColumnsEnhancer } from './listings-table/hooks/useTableColumnsEnhancer';
import OwnerFocusTableHeader from '../dashboard/listings-table/OwnerFocusTableHeader';
import { useOwnerGroups } from '@/hooks/useOwnerGroups';

type OwnerFocusTableProps = {
  data: Listing[];
};

// Custom column order for Owner Focus page that prioritizes Owner Focus fields
const ownerFocusColumnOrder: (keyof Listing)[] = [
  "listingCode",
  "thumbnailUrl",
  "ownerType",
  "lastMatch",
  "lastMatchDiff",
  "timeConsulted",
  "marketingStatus",
  "listingType",
  "listingName",
  "propertyType",
  "ownerName",
  "askingPrice",
  "bedrooms",
  "assignedTo",
  "isStarred"
];

// Custom visible columns for Owner Focus page
const ownerFocusVisibleColumns: (keyof Listing)[] = [
  "listingCode",
  "thumbnailUrl",
  "ownerType",
  "lastMatch",
  "lastMatchDiff",
  "timeConsulted",
  "marketingStatus",
  "listingType",
  "listingName",
  "propertyType",
  "ownerName",
  "askingPrice",
  "isStarred"
];

export function OwnerFocusTable({ data: initialData }: OwnerFocusTableProps) {
  const {
    data,
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
  } = useListingsTableState(initialData);
  
  const { ownerGroups } = useOwnerGroups();

  // Use custom column order and visible columns for Owner Focus page
  const {
    visibleColumns,
    setVisibleColumns,
    columnOrder,
    setColumnOrder,
    columns: baseColumns
  } = useTableColumns(handleStarToggle, ownerFocusVisibleColumns, ownerFocusColumnOrder);

  const columns = useTableColumnsEnhancer(
    baseColumns,
    handleMarketingStatusChange,
    handleListingTypeChange
  );
  
  return (
    <div className="data-card">
      <OwnerFocusTableHeader 
        isCustomizeDialogOpen={isCustomizeDialogOpen}
        setIsCustomizeDialogOpen={setIsCustomizeDialogOpen}
        selectedListingType={selectedListingType}
        setSelectedListingType={setSelectedListingType}
        selectedOwnerType={selectedOwnerType}
        setSelectedOwnerType={setSelectedOwnerType}
        onFilterChange={handleFilterChange}
        isGroupingEnabled={isGroupingEnabled}
        toggleGrouping={toggleGrouping}
      />
      
      <ListingsTableContent 
        data={data} 
        columns={columns} 
        onRowClick={handleRowClick}
        isGroupingEnabled={isGroupingEnabled}
        ownerGroups={ownerGroups}
      />
      
      <Dialog open={isCustomizeDialogOpen} onOpenChange={setIsCustomizeDialogOpen}>
        <ColumnCustomizer 
          allColumns={allColumns}
          visibleColumns={visibleColumns}
          setVisibleColumns={setVisibleColumns}
          columnOrder={columnOrder}
          setColumnOrder={setColumnOrder}
          defaultVisibleColumns={ownerFocusVisibleColumns}
          defaultColumnOrder={ownerFocusColumnOrder}
        />
      </Dialog>
      
      <ListingDetailsDrawer 
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
        listing={selectedListing}
        onStarToggle={handleStarToggle}
      />
    </div>
  );
}

export default OwnerFocusTable; 