import React from 'react';
import { useToast } from "@/hooks/use-toast";
import { CustomizerColumn } from '../ColumnCustomizer';
import { ColumnKey } from '@/hooks/useDataTableColumns';

type UseColumnCustomizerProps<T extends ColumnKey> = {
  allColumns: CustomizerColumn[];
  visibleColumns: T[];
  setVisibleColumns: React.Dispatch<React.SetStateAction<T[]>>;
  columnOrder: T[];
  setColumnOrder: React.Dispatch<React.SetStateAction<T[]>>;
  defaultVisibleColumns: T[];
  defaultColumnOrder: T[];
};

export const useColumnCustomizer = <T extends ColumnKey>({
  allColumns,
  visibleColumns,
  setVisibleColumns,
  columnOrder,
  setColumnOrder,
  defaultVisibleColumns,
  defaultColumnOrder,
}: UseColumnCustomizerProps<T>) => {
  const { toast } = useToast();
  const [draggedItem, setDraggedItem] = React.useState<string | null>(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const [dragOverItem, setDragOverItem] = React.useState<string | null>(null);

  const handleColumnToggle = (accessorKey: string) => {
    setVisibleColumns(prev => {
      if (prev.includes(accessorKey as unknown as T)) {
        // Don't allow removing the last column
        if (prev.length === 1) {
          toast({
            title: "Error",
            description: "At least one column must be visible",
            variant: "destructive",
          });
          return prev;
        }
        return prev.filter(key => key !== accessorKey as unknown as T);
      } else {
        // When adding a column, also add it to the column order if it's not already there
        if (!columnOrder.includes(accessorKey as unknown as T)) {
          setColumnOrder(prevOrder => [...prevOrder, accessorKey as unknown as T]);
        }
        return [...prev, accessorKey as unknown as T];
      }
    });
  };
  
  // Handle drag start of a column in the customize dialog
  const handleDragStart = (e: React.DragEvent, accessorKey: string) => {
    setDraggedItem(accessorKey);
    setIsDragging(true);
    
    // Set data to ensure dragging works across browsers
    e.dataTransfer.setData("text/plain", accessorKey);
    e.dataTransfer.effectAllowed = 'move';
    
    // Set the drag image to be the element itself
    const element = e.currentTarget as HTMLElement;
    if (element) {
      const rect = element.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const offsetY = e.clientY - rect.top;
      e.dataTransfer.setDragImage(element, offsetX, offsetY);
    }
  };

  // Handle drag over to allow drop
  const handleDragOver = (e: React.DragEvent, accessorKey: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    
    if (draggedItem !== accessorKey) {
      setDragOverItem(accessorKey);
    }
  };
  
  const handleDragLeave = () => {
    setDragOverItem(null);
  };
  
  // Handle drop to reorder columns
  const handleDrop = (e: React.DragEvent, targetAccessorKey: string) => {
    e.preventDefault();
    
    if (!draggedItem || draggedItem === targetAccessorKey) {
      setDragOverItem(null);
      return;
    }
    
    // Only allow reordering if both columns are visible
    if (visibleColumns.includes(draggedItem as unknown as T) && visibleColumns.includes(targetAccessorKey as unknown as T)) {
      // Create a new array with all column keys to maintain a consistent order
      const newColumnOrder = [...columnOrder];
      
      const draggedIdx = newColumnOrder.indexOf(draggedItem as unknown as T);
      const targetIdx = newColumnOrder.indexOf(targetAccessorKey as unknown as T);
      
      if (draggedIdx !== -1 && targetIdx !== -1) {
        // Remove the dragged item
        newColumnOrder.splice(draggedIdx, 1);
        // Insert it at the new position
        newColumnOrder.splice(targetIdx, 0, draggedItem as unknown as T);
        
        // Update the column order
        setColumnOrder(newColumnOrder);
        
        toast({
          title: "Column Order Updated",
          description: `Column order has been updated successfully.`,
        });
      }
    }
    
    // Reset drag state
    setIsDragging(false);
    setDraggedItem(null);
    setDragOverItem(null);
  };
  
  const handleDragEnd = () => {
    setIsDragging(false);
    setDraggedItem(null);
    setDragOverItem(null);
  };

  const handleResetColumns = () => {
    setVisibleColumns(defaultVisibleColumns);
    setColumnOrder(defaultColumnOrder);
    toast({
      title: "Columns Reset",
      description: "Column settings have been reset to default",
    });
  };

  const handleHideAll = () => {
    // Keep at least one column visible
    const firstVisibleColumn = visibleColumns[0];
    setVisibleColumns([firstVisibleColumn]);
    toast({
      title: "Columns Hidden",
      description: "All columns except one have been hidden",
    });
  };

  // Group columns into shown and hidden
  const shownColumns = allColumns.filter(col => 
    visibleColumns.includes(col.accessorKey as unknown as T)
  ).sort((a, b) => {
    const indexA = columnOrder.indexOf(a.accessorKey as unknown as T);
    const indexB = columnOrder.indexOf(b.accessorKey as unknown as T);
    return indexA - indexB;
  });
  
  const hiddenColumns = allColumns.filter(col => 
    !visibleColumns.includes(col.accessorKey as unknown as T)
  );

  return {
    draggedItem,
    isDragging,
    dragOverItem,
    handleDragStart,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleDragEnd,
    handleColumnToggle,
    handleResetColumns,
    handleHideAll,
    shownColumns,
    hiddenColumns,
  };
};
