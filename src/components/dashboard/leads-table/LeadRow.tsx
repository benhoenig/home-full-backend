
import React from 'react';
import { TableRow, TableCell } from "@/components/ui/table";
import { Lead } from '@/hooks/useLeadsTableData';
import { GripVertical } from 'lucide-react';
import { LeadColumn } from './types/column';

type LeadRowProps = {
  lead: Lead;
  columns: LeadColumn[];
  index: number;
  sourceGroup?: string;
  onRowClick: (lead: Lead) => void;
  handleDragStart: (e: React.DragEvent, lead: Lead, sourceGroup?: string, index?: number) => void;
  handleDragEnd: (e: React.DragEvent) => void;
  handleLeadDragOver?: (e: React.DragEvent, index: number) => void;
  handleLeadDrop?: (e: React.DragEvent, groupId: string, index: number) => void;
  isDraggedOver?: boolean;
};

const LeadRow = ({ 
  lead, 
  columns, 
  index, 
  sourceGroup, 
  onRowClick, 
  handleDragStart, 
  handleDragEnd,
  handleLeadDragOver,
  handleLeadDrop,
  isDraggedOver
}: LeadRowProps) => {
  return (
    <TableRow 
      className={`hover:bg-muted/30 cursor-pointer ${isDraggedOver ? 'border-2 border-primary bg-primary/10' : ''}`}
      onClick={() => onRowClick(lead)}
      onDragOver={handleLeadDragOver ? (e) => handleLeadDragOver(e, index) : undefined}
      onDrop={handleLeadDrop && sourceGroup ? (e) => handleLeadDrop(e, sourceGroup, index) : undefined}
    >
      {sourceGroup !== undefined && <TableCell></TableCell>}
      <TableCell className="p-0 w-8">
        <div 
          className="flex items-center justify-center h-full cursor-move p-1.5"
          draggable
          onDragStart={(e) => handleDragStart(e, lead, sourceGroup, index)}
          onDragEnd={handleDragEnd}
          onClick={(e) => e.stopPropagation()}
        >
          <GripVertical className="h-3.5 w-3.5 text-muted-foreground" />
        </div>
      </TableCell>
      {columns.map((column) => (
        <TableCell 
          key={`${sourceGroup || 'ungrouped'}-${index}-${String(column.accessorKey)}`}
          className={`whitespace-nowrap ${column.className || ''}`}
        >
          {column.cell 
            ? column.cell(lead, index) 
            : lead[column.accessorKey as keyof Lead] !== undefined 
              ? String(lead[column.accessorKey as keyof Lead]) 
              : '-'}
        </TableCell>
      ))}
      <TableCell>...</TableCell>
    </TableRow>
  );
};

export default LeadRow;
