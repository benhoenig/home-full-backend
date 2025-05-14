
import React from 'react';
import { Dialog } from "@/components/ui/dialog";
import LeadDetailsDrawer from './LeadDetailsDrawer';
import { Lead, defaultVisibleColumns, defaultColumnOrder } from '@/hooks/useLeadsTableData';
import LeadsTableHeader from './leads-table/LeadsTableHeader';
import LeadsTableContent from './leads-table/LeadsTableContent';
import ColumnCustomizer from './leads-table/ColumnCustomizer';
import { useTableColumns, allColumns } from './leads-table/useTableColumns';
import { useLeadGroups } from '@/hooks/useLeadGroups';
import { LeadDragProvider } from './leads-table/LeadDragContext';
import { useLeadsTableState } from './leads-table/hooks/useLeadsTableState';
import { useTableColumnsEnhancer } from './leads-table/hooks/useTableColumnsEnhancer';

type LeadsTableProps = {
  data: Lead[];
};

export function LeadsTable({ data: initialData }: LeadsTableProps) {
  const {
    data,
    selectedPotential,
    setSelectedPotential,
    isDrawerOpen,
    selectedLead,
    isCustomizeDialogOpen,
    setIsCustomizeDialogOpen,
    isGroupingEnabled,
    toggleGrouping,
    handlePipelineStageChange,
    handlePotentialChange,
    handleRowClick,
    handleCloseDrawer
  } = useLeadsTableState(initialData);

  const {
    visibleColumns,
    setVisibleColumns,
    columnOrder,
    setColumnOrder,
    columns: baseColumns
  } = useTableColumns();

  const { leadGroups } = useLeadGroups();

  const columns = useTableColumnsEnhancer(
    baseColumns,
    handlePipelineStageChange,
    handlePotentialChange
  );
  
  return (
    <LeadDragProvider>
      <div className="data-card">
        <LeadsTableHeader 
          isCustomizeDialogOpen={isCustomizeDialogOpen}
          setIsCustomizeDialogOpen={setIsCustomizeDialogOpen}
          selectedPotential={selectedPotential}
          setSelectedPotential={setSelectedPotential}
          isGroupingEnabled={isGroupingEnabled}
          toggleGrouping={toggleGrouping}
        />
        
        <LeadsTableContent 
          data={data} 
          columns={columns} 
          onRowClick={handleRowClick}
          isGroupingEnabled={isGroupingEnabled}
          leadGroups={leadGroups}
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
        
        <LeadDetailsDrawer 
          isOpen={isDrawerOpen}
          onClose={handleCloseDrawer}
          lead={selectedLead}
        />
      </div>
    </LeadDragProvider>
  );
}

export default LeadsTable;
