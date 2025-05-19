import React from 'react';
import { Dialog } from "@/components/ui/dialog";
import ListingDetailsDrawer from './ListingDetailsDrawer';
import { Listing, defaultVisibleColumns, defaultColumnOrder } from '@/hooks/useListingsTableData';
import ListingsTableHeader from './listings-table/ListingsTableHeader';
import ListingsTableContent from './listings-table/ListingsTableContent';
import ColumnCustomizer from './listings-table/ColumnCustomizer';
import { useTableColumns, allColumns } from './listings-table/useTableColumns';
import { useListingsTableState } from './listings-table/hooks/useListingsTableState';
import { useTableColumnsEnhancer } from './listings-table/hooks/useTableColumnsEnhancer';

type ListingsTableProps = {
  data: Listing[];
};

export function ListingsTable({ data: initialData }: ListingsTableProps) {
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
    handleRowClick,
    handleCloseDrawer
  } = useListingsTableState(initialData);

  const {
    visibleColumns,
    setVisibleColumns,
    columnOrder,
    setColumnOrder,
    columns: baseColumns
  } = useTableColumns();

  const columns = useTableColumnsEnhancer(
    baseColumns,
    handleMarketingStatusChange,
    handleListingTypeChange
  );
  
  return (
    <div className="data-card">
      <ListingsTableHeader 
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
      />
    </div>
  );
}

export default ListingsTable; 