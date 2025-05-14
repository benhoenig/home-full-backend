
import React from 'react';
import { Button } from '@/components/ui/button';
import { EyeOff } from 'lucide-react';
import ColumnItem from './ColumnItem';
import { ColumnKey } from '@/hooks/useDataTableColumns';

type ColumnGroupProps<T extends ColumnKey> = {
  title: string;
  columns: { header: string; accessorKey: string }[];
  visibleColumns: T[];
  showHideAllButton?: boolean;
  onHideAll?: () => void;
  onColumnToggle: (accessorKey: string) => void;
  dragHandlers?: {
    draggedItem: string | null;
    isDragging: boolean;
    dragOverItem: string | null;
    handleDragStart: (e: React.DragEvent, accessorKey: string) => void;
    handleDragOver: (e: React.DragEvent, accessorKey: string) => void;
    handleDragLeave: () => void;
    handleDrop: (e: React.DragEvent, accessorKey: string) => void;
    handleDragEnd: () => void;
  };
};

const ColumnGroup = <T extends ColumnKey>({
  title,
  columns,
  visibleColumns,
  showHideAllButton = false,
  onHideAll,
  onColumnToggle,
  dragHandlers
}: ColumnGroupProps<T>) => {
  if (columns.length === 0) return null;
  
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h4 className="text-sm font-medium text-muted-foreground">{title} ({columns.length})</h4>
        {showHideAllButton && onHideAll && columns.length > 1 && (
          <Button variant="outline" size="sm" onClick={onHideAll} className="h-7 px-2 text-xs">
            <EyeOff className="h-3 w-3 mr-1" />
            Hide All
          </Button>
        )}
      </div>
      <div className="space-y-1">
        {columns.map((column) => {
          const isVisible = visibleColumns.includes(column.accessorKey as unknown as T);
          const isDraggable = !!dragHandlers && isVisible;
          
          return (
            <ColumnItem
              key={column.accessorKey}
              column={column}
              isVisible={isVisible}
              isDraggable={isDraggable}
              isDragging={!!dragHandlers?.isDragging}
              isDraggedItem={dragHandlers?.draggedItem === column.accessorKey}
              isDragOverItem={dragHandlers?.dragOverItem === column.accessorKey}
              onToggle={() => onColumnToggle(column.accessorKey)}
              onDragStart={isDraggable ? (e) => dragHandlers.handleDragStart(e, column.accessorKey) : undefined}
              onDragOver={isDraggable ? (e) => dragHandlers.handleDragOver(e, column.accessorKey) : undefined}
              onDragLeave={isDraggable ? dragHandlers.handleDragLeave : undefined}
              onDrop={isDraggable ? (e) => dragHandlers.handleDrop(e, column.accessorKey) : undefined}
              onDragEnd={isDraggable ? dragHandlers.handleDragEnd : undefined}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ColumnGroup;
