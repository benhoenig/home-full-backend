
import { useState, useEffect } from 'react';
import { Lead, defaultColumnOrder as leadsDefaultColumnOrder } from '@/hooks/useLeadsTableData';

// Make this type generic to handle all types of data tables
export type ColumnKey = string | number | symbol;

export type UseDataTableColumnsProps<T extends ColumnKey> = {
  tableId: string;
  defaultVisibleColumns: T[];
  defaultColumnOrder?: T[];
};

export const useDataTableColumns = <T extends ColumnKey>({
  tableId,
  defaultVisibleColumns,
  defaultColumnOrder = leadsDefaultColumnOrder as unknown as T[],
}: UseDataTableColumnsProps<T>) => {
  const [visibleColumns, setVisibleColumns] = useState<T[]>(() => {
    const savedColumns = localStorage.getItem(`${tableId}Columns`);
    return savedColumns ? JSON.parse(savedColumns) : defaultVisibleColumns;
  });
  
  const [columnOrder, setColumnOrder] = useState<T[]>(() => {
    const savedOrder = localStorage.getItem(`${tableId}ColumnOrder`);
    return savedOrder ? JSON.parse(savedOrder) : defaultColumnOrder;
  });
  
  // Add any column that might be visible but not in the order
  useEffect(() => {
    const columnsNotInOrder = visibleColumns.filter(col => !columnOrder.includes(col));
    if (columnsNotInOrder.length > 0) {
      setColumnOrder(prev => [...prev, ...columnsNotInOrder]);
    }
  }, [visibleColumns, columnOrder]);
  
  // Save to localStorage when columns change
  useEffect(() => {
    localStorage.setItem(`${tableId}Columns`, JSON.stringify(visibleColumns));
  }, [visibleColumns, tableId]);
  
  // Save to localStorage when order changes
  useEffect(() => {
    localStorage.setItem(`${tableId}ColumnOrder`, JSON.stringify(columnOrder));
  }, [columnOrder, tableId]);
  
  return {
    visibleColumns,
    setVisibleColumns,
    columnOrder,
    setColumnOrder,
  };
};
