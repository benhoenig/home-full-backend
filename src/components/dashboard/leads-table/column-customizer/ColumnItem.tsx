
import React from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { GripVertical, EyeOff } from 'lucide-react';
import { ColumnKey } from '@/hooks/useDataTableColumns';

type ColumnItemProps = {
  column: { header: string; accessorKey: string };
  isVisible: boolean;
  isDraggable: boolean;
  isDragging: boolean;
  isDraggedItem: boolean;
  isDragOverItem: boolean;
  onToggle: () => void;
  onDragStart?: (e: React.DragEvent) => void;
  onDragOver?: (e: React.DragEvent) => void;
  onDragLeave?: () => void;
  onDrop?: (e: React.DragEvent) => void;
  onDragEnd?: () => void;
};

const ColumnItem = ({
  column,
  isVisible,
  isDraggable,
  isDragging,
  isDraggedItem,
  isDragOverItem,
  onToggle,
  onDragStart,
  onDragOver,
  onDragLeave,
  onDrop,
  onDragEnd
}: ColumnItemProps) => {
  return (
    <div 
      className={`flex items-center space-x-2 p-2 rounded-md transition-colors
        ${isVisible ? 'bg-muted/30' : ''}
        ${isDragging && isDraggedItem ? 'opacity-50' : ''}
        ${isDragOverItem ? 'bg-primary/10 border border-primary/30' : ''}
        ${isDraggable ? 'cursor-grab active:cursor-grabbing' : ''}`}
      draggable={isDraggable}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onDragEnd={onDragEnd}
    >
      <div className={isDraggable ? "cursor-grab active:cursor-grabbing touch-none" : "w-4"}>
        {isVisible ? (
          <GripVertical className="h-4 w-4 text-muted-foreground" />
        ) : (
          <EyeOff className="h-4 w-4 text-muted-foreground" />
        )}
      </div>
      <label
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex-1"
      >
        {column.header}
      </label>
      <Checkbox 
        id={`column-${column.accessorKey}`}
        checked={isVisible}
        onCheckedChange={onToggle}
      />
    </div>
  );
};

export default ColumnItem;
