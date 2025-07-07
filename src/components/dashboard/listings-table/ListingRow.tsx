import React from 'react';
import { TableRow, TableCell } from "@/components/ui/table";
import { Listing } from '@/hooks/useListingsTableData';
import { GripVertical } from 'lucide-react';

type Column = {
  header: string;
  accessorKey: keyof Listing;
  cell?: (listing: Listing, index: number) => React.ReactNode;
  className?: string;
};

type ListingRowProps = {
  listing: Listing;
  columns: Column[];
  index: number;
  sourceGroup?: string;
  onRowClick: (listing: Listing) => void;
  handleDragStart: (e: React.DragEvent, listing: Listing, sourceGroup?: string, index?: number) => void;
  handleDragEnd: (e: React.DragEvent) => void;
  handleListingDragOver?: (e: React.DragEvent, index: number) => void;
  handleListingDrop?: (e: React.DragEvent, groupId: string, index: number) => void;
  isDraggedOver?: boolean;
};

const ListingRow = ({ 
  listing, 
  columns, 
  index, 
  sourceGroup, 
  onRowClick, 
  handleDragStart, 
  handleDragEnd,
  handleListingDragOver,
  handleListingDrop,
  isDraggedOver
}: ListingRowProps) => {
  return (
    <TableRow 
      className={`hover:bg-muted/30 cursor-pointer ${isDraggedOver ? 'border-2 border-primary bg-primary/10' : ''}`}
      onClick={() => onRowClick(listing)}
      onDragOver={handleListingDragOver ? (e) => handleListingDragOver(e, index) : undefined}
      onDrop={handleListingDrop && sourceGroup ? (e) => handleListingDrop(e, sourceGroup, index) : undefined}
    >
      {sourceGroup !== undefined && <TableCell></TableCell>}
      <TableCell className="p-0 w-8">
        <div 
          className="flex items-center justify-center h-full cursor-move p-1.5"
          draggable
          onDragStart={(e) => handleDragStart(e, listing, sourceGroup, index)}
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
            ? column.cell(listing, index) 
            : listing[column.accessorKey] !== undefined 
              ? String(listing[column.accessorKey]) 
              : '-'}
        </TableCell>
      ))}
      <TableCell>...</TableCell>
    </TableRow>
  );
};

export default ListingRow; 