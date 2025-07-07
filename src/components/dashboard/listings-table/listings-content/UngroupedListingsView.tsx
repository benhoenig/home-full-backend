import React from 'react';
import { Listing } from '@/hooks/useListingsTableData';
import { TableRow, TableCell } from "@/components/ui/table";

type Column = {
  header: string;
  accessorKey: keyof Listing;
  cell?: (listing: Listing, index: number) => React.ReactNode;
  className?: string;
};

type UngroupedListingsViewProps = {
  data: Listing[];
  columns: Column[];
  onRowClick: (listing: Listing) => void;
};

const UngroupedListingsView = ({ data, columns, onRowClick }: UngroupedListingsViewProps) => {
  return (
    <>
      {data.map((listing, i) => (
        <TableRow 
          key={listing.listingCode} 
          className="cursor-pointer hover:bg-muted/50"
          onClick={() => onRowClick(listing)}
        >
          <TableCell className="w-10"></TableCell>
          {columns.map((column) => (
            <TableCell key={String(column.accessorKey)}>
              {column.cell 
                ? column.cell(listing, i) 
                : String(listing[column.accessorKey] || '')}
            </TableCell>
          ))}
          <TableCell>...</TableCell>
        </TableRow>
      ))}
    </>
  );
};

export default UngroupedListingsView; 