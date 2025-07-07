import React from 'react';
import { TableRow, TableCell } from "@/components/ui/table";
import { ChevronDown, ChevronRight } from 'lucide-react';

type GroupHeaderProps = {
  groupId: string;
  name: string;
  count: number;
  color?: string;
  isCollapsed: boolean;
  isDraggedOver: boolean;
  toggleGroupCollapse: (groupId: string) => void;
  handleDragOver: (e: React.DragEvent, groupId: string) => void;
  handleDrop: (e: React.DragEvent) => void;
  setDragOverGroupId: (groupId: string | null) => void;
};

const GroupHeader = ({
  groupId,
  name,
  count,
  color,
  isCollapsed,
  isDraggedOver,
  toggleGroupCollapse,
  handleDragOver,
  handleDrop,
  setDragOverGroupId
}: GroupHeaderProps) => {
  return (
    <TableRow 
      className={`bg-muted/30 cursor-pointer hover:bg-muted/50 ${
        color ? `bg-${color}-100` : ''
      } ${isDraggedOver ? 'border-2 border-primary' : ''}`}
      onClick={() => toggleGroupCollapse(groupId)}
      onDragOver={(e) => handleDragOver(e, groupId)}
      onDrop={handleDrop}
      onDragEnter={() => setDragOverGroupId(groupId)}
      onDragLeave={() => setDragOverGroupId(null)}
    >
      <TableCell colSpan={999} className="font-medium py-2">
        <div className="flex items-center gap-1">
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
          <div className="flex items-center gap-2">
            {color && (
              <div className={`h-3 w-3 rounded-full bg-${color}-500`}></div>
            )}
            {name} ({count})
          </div>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default GroupHeader; 