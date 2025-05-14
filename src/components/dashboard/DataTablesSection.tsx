import React, { useState } from 'react';
import { DataTable } from '@/components/dashboard/data-table';
import { useNewLeadsData } from '@/hooks/useNewLeadsData';
import { useWarningData, Warning } from '@/hooks/useWarningData';
import { useTransferData, Transfer } from '@/hooks/useTransferData';
import PipelineStageBadge from './PipelineStageBadge';
import { toast } from "sonner";
import { allColumns } from './leads-table/useTableColumns';
import { defaultVisibleColumns, defaultColumnOrder, Lead } from '@/hooks/useLeadsTableData';
import { useDataTableColumns } from '@/hooks/useDataTableColumns';
import { CustomizerColumn } from './leads-table/ColumnCustomizer';

interface CardVisibilityState {
  newLeads: boolean;
  warning: boolean;
  transfer: boolean;
}

interface DataTablesSectionProps {
  cardsVisibility: CardVisibilityState;
  toggleCardVisibility: (cardKey: keyof CardVisibilityState) => void;
}

export function DataTablesSection({ 
  cardsVisibility,
  toggleCardVisibility
}: DataTablesSectionProps) {
  // Get data from custom hooks
  const [newLeadsData, setNewLeadsData] = useState(useNewLeadsData());
  const warningData = useWarningData();
  const transferData = useTransferData();

  // Get visible card count for grid layout
  const visibleCardCount = Object.values(cardsVisibility).filter(Boolean).length;

  // Convert allColumns to a generic format usable by all tables
  const allTableColumns: CustomizerColumn[] = allColumns.map(col => ({
    header: col.header,
    accessorKey: col.accessorKey as string
  }));

  // Set up column customization for each data table
  const newLeadsColumns = useDataTableColumns<keyof Lead>({
    tableId: 'newLeads',
    defaultVisibleColumns: ['name', 'phone', 'projectInterest', 'orderType', 'budget', 'pipelineStage', 'adminRemark'],
    defaultColumnOrder
  });
  
  const warningColumns = useDataTableColumns<string>({
    tableId: 'warning',
    defaultVisibleColumns: ['name', 'phone', 'type'],
    defaultColumnOrder: ['name', 'phone', 'type', 'details'] as string[]
  });
  
  const transferColumns = useDataTableColumns<string>({
    tableId: 'transfer',
    defaultVisibleColumns: ['name', 'project', 'stage'],
    defaultColumnOrder: ['name', 'project', 'commission', 'stage', 'details'] as string[]
  });

  const handlePipelineStageChange = (index: number, stage: string) => {
    const updatedData = [...newLeadsData];
    updatedData[index] = { ...updatedData[index], pipelineStage: stage };
    setNewLeadsData(updatedData);
    toast.success(`Pipeline stage updated to ${stage}`);
  };

  // Filter and prepare columns for display based on visible columns and column order
  const getDisplayColumns = (visibleCols: string[], colOrder: string[]) => {
    // Create a copy of visible columns and sort based on column order
    const visibleColumnKeys = [...visibleCols];
    
    visibleColumnKeys.sort((a, b) => {
      const indexA = colOrder.indexOf(a);
      const indexB = colOrder.indexOf(b);
      
      if (indexA === -1) return indexB === -1 ? 0 : 1;
      if (indexB === -1) return -1;
      return indexA - indexB;
    });
    
    // Map the sorted keys to the actual column objects
    return visibleColumnKeys
      .map(key => allTableColumns.find(col => col.accessorKey === key))
      .filter(Boolean) as CustomizerColumn[];
  };

  // Get columns for each table
  const newLeadsDisplayColumns = getDisplayColumns(
    newLeadsColumns.visibleColumns as string[], 
    newLeadsColumns.columnOrder as string[]
  ).map(col => {
    if (col.accessorKey === 'pipelineStage') {
      return {
        ...col,
        cell: (row, index) => (
          <PipelineStageBadge 
            stage={row.pipelineStage} 
            onStageChange={(stage) => handlePipelineStageChange(index, stage)}
          />
        )
      };
    }
    return col;
  });
  
  // Create columns specific for warning table
  const warningDisplayColumns = getDisplayColumns(
    warningColumns.visibleColumns, 
    warningColumns.columnOrder
  );
  
  // Create columns specific for transfer table
  const transferDisplayColumns = getDisplayColumns(
    transferColumns.visibleColumns, 
    transferColumns.columnOrder
  );

  // Calculate grid columns based on visible cards
  const gridColumnsClass = visibleCardCount === 0 ? "hidden" : 
    visibleCardCount === 1 ? "grid-cols-1" : 
    visibleCardCount === 2 ? "grid-cols-1 md:grid-cols-2" : 
    "grid-cols-1 md:grid-cols-3";

  return (
    <div className={`grid gap-4 mb-0 ${gridColumnsClass}`}>
      {cardsVisibility.newLeads && (
        <DataTable 
          title="New Leads :"
          columns={newLeadsDisplayColumns}
          data={newLeadsData}
          visibleColumns={newLeadsColumns.visibleColumns}
          setVisibleColumns={newLeadsColumns.setVisibleColumns}
          columnOrder={newLeadsColumns.columnOrder}
          setColumnOrder={newLeadsColumns.setColumnOrder}
          defaultVisibleColumns={['name', 'phone', 'projectInterest', 'orderType', 'budget', 'pipelineStage', 'adminRemark'] as string[]}
          defaultColumnOrder={defaultColumnOrder as string[]}
          allPossibleColumns={allTableColumns}
          showColumnCustomizer={true}
        />
      )}
      
      {cardsVisibility.warning && (
        <DataTable 
          title="Warning / Complain :"
          columns={warningDisplayColumns}
          data={warningData}
          visibleColumns={warningColumns.visibleColumns}
          setVisibleColumns={warningColumns.setVisibleColumns}
          columnOrder={warningColumns.columnOrder}
          setColumnOrder={warningColumns.setColumnOrder}
          defaultVisibleColumns={['name', 'phone', 'type'] as string[]}
          defaultColumnOrder={['name', 'phone', 'type', 'details'] as string[]}
          allPossibleColumns={allTableColumns}
          showColumnCustomizer={true}
        />
      )}
      
      {cardsVisibility.transfer && (
        <DataTable 
          title="รอโอนกรรมสิทธิ์ :"
          columns={transferDisplayColumns}
          data={transferData}
          visibleColumns={transferColumns.visibleColumns}
          setVisibleColumns={transferColumns.setVisibleColumns}
          columnOrder={transferColumns.columnOrder}
          setColumnOrder={transferColumns.setColumnOrder}
          defaultVisibleColumns={['name', 'project', 'stage'] as string[]}
          defaultColumnOrder={['name', 'project', 'commission', 'stage', 'details'] as string[]}
          allPossibleColumns={allTableColumns}
          showColumnCustomizer={true}
        />
      )}
    </div>
  );
}

export default DataTablesSection;
