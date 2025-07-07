import React from 'react';
import { Dialog } from "@/components/ui/dialog";
import ListingDetailsDrawer from './ListingDetailsDrawer';
import { Listing, defaultVisibleColumns, defaultColumnOrder } from '@/hooks/useListingsTableData';
import AllListingsTableHeader from './listings-table/AllListingsTableHeader';
import ListingsTableContent from './listings-table/ListingsTableContent';
import ColumnCustomizer from './listings-table/ColumnCustomizer';
import { useTableColumns, allColumns } from './listings-table/useTableColumns';
import { useListingsTableState } from './listings-table/hooks/useListingsTableState';
import { useTableColumnsEnhancer } from './listings-table/hooks/useTableColumnsEnhancer';

type AllListingsTableProps = {
  data: Listing[];
};

export function AllListingsTable({ data: initialData }: AllListingsTableProps) {
  const {
    data,
    selectedListingType,
    setSelectedListingType,
    isDrawerOpen,
    selectedListing,
    isCustomizeDialogOpen,
    setIsCustomizeDialogOpen,
    handleFilterChange,
    handleMarketingStatusChange,
    handleListingTypeChange,
    handleStarToggle,
    handleRowClick,
    handleCloseDrawer
  } = useListingsTableState(initialData);

  const {
    visibleColumns,
    setVisibleColumns,
    columnOrder,
    setColumnOrder,
    columns: baseColumns
  } = useTableColumns(handleStarToggle);

  const columns = useTableColumnsEnhancer(
    baseColumns,
    handleMarketingStatusChange,
    handleListingTypeChange
  );
  
  return (
    <div className="data-card">
      <AllListingsTableHeader 
        isCustomizeDialogOpen={isCustomizeDialogOpen}
        setIsCustomizeDialogOpen={setIsCustomizeDialogOpen}
        selectedListingType={selectedListingType}
        setSelectedListingType={setSelectedListingType}
        onFilterChange={handleFilterChange}
      />
      
      <ListingsTableContent 
        data={data} 
        columns={columns} 
        onRowClick={handleRowClick}
      />
      
      <Dialog open={isCustomizeDialogOpen} onOpenChange={setIsCustomizeDialogOpen}>
        <ColumnCustomizer 
          allColumns={allColumns}
          visibleColumns={visibleColumns}
          setVisibleColumns={setVisibleColumns}
          columnOrder={columnOrder}
          setColumnOrder={setColumnOrder}
          defaultVisibleColumns={defaultVisibleColumns}
          defaultColumnOrder={defaultColumnOrder}
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

export default AllListingsTable; 