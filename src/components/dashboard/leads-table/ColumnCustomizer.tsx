
import React from 'react';
import {
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { ScrollArea } from "@/components/ui/scroll-area";
import ColumnGroup from './column-customizer/ColumnGroup';
import { useColumnCustomizer } from './column-customizer/useColumnCustomizer';
import { ColumnKey } from '@/hooks/useDataTableColumns';

export type CustomizerColumn = {
  header: string;
  accessorKey: string;
};

type ColumnCustomizerProps<T extends ColumnKey> = {
  allColumns: CustomizerColumn[];
  visibleColumns: T[];
  setVisibleColumns: React.Dispatch<React.SetStateAction<T[]>>;
  columnOrder: T[];
  setColumnOrder: React.Dispatch<React.SetStateAction<T[]>>;
  defaultVisibleColumns: T[];
  defaultColumnOrder: T[];
};

const ColumnCustomizer = <T extends ColumnKey>({
  allColumns,
  visibleColumns,
  setVisibleColumns,
  columnOrder,
  setColumnOrder,
  defaultVisibleColumns,
  defaultColumnOrder,
}: ColumnCustomizerProps<T>) => {
  const {
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
  } = useColumnCustomizer({
    allColumns,
    visibleColumns,
    setVisibleColumns,
    columnOrder,
    setColumnOrder,
    defaultVisibleColumns,
    defaultColumnOrder,
  });

  const dragHandlers = {
    draggedItem,
    isDragging,
    dragOverItem,
    handleDragStart,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleDragEnd,
  };

  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Customize Columns</DialogTitle>
        <DialogDescription>
          Select columns to display in the table. Drag to reorder visible columns.
        </DialogDescription>
      </DialogHeader>
      <div className="flex justify-between items-center mb-2">
        <Button variant="outline" size="sm" onClick={handleResetColumns}>
          Reset to Default
        </Button>
      </div>
      <ScrollArea className="h-[50vh] pr-4">
        <div className="space-y-4">
          {/* Shown columns section */}
          <ColumnGroup 
            title="Shown"
            columns={shownColumns}
            visibleColumns={visibleColumns}
            showHideAllButton={true}
            onHideAll={handleHideAll}
            onColumnToggle={handleColumnToggle}
            dragHandlers={dragHandlers}
          />

          {/* Hidden columns section */}
          <ColumnGroup
            title="Hidden"
            columns={hiddenColumns}
            visibleColumns={visibleColumns}
            onColumnToggle={handleColumnToggle}
          />
        </div>
      </ScrollArea>
    </DialogContent>
  );
};

export default ColumnCustomizer;
