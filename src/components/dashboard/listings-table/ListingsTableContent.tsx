import React from 'react';
import { Listing } from '@/hooks/useListingsTableData';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { formatCurrency } from '@/lib/utils';

type Column = {
  header: string;
  accessorKey: keyof Listing;
  cell?: (listing: Listing, index: number) => React.ReactNode;
  className?: string;
};

type ListingsTableContentProps = {
  data: Listing[];
  columns: Column[];
  onRowClick: (listing: Listing) => void;
};

const ListingsTableContent = ({ 
  data, 
  columns, 
  onRowClick, 
}: ListingsTableContentProps) => {
  return (
    <div className="w-full overflow-hidden border rounded-md">
      <ScrollArea className="h-[calc(100vh-250px)] min-h-[400px] w-full">
        <div className="w-full min-w-max">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((column) => (
                  <TableHead 
                    key={String(column.accessorKey)}
                    className="sticky top-0 whitespace-nowrap bg-background"
                  >
                    {column.header}
                  </TableHead>
                ))}
                <TableHead className="sticky top-0 w-20 bg-background">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((listing, i) => (
                <TableRow 
                  key={`listing-${listing.listingCode}-${i}`}
                  className="hover:bg-muted/30 cursor-pointer"
                  onClick={() => onRowClick(listing)}
                >
                  {columns.map((column) => {
                    let cellContent;
                    if (column.cell) {
                      cellContent = column.cell(listing, i);
                    } else {
                      const value = listing[column.accessorKey];
                      
                      // Format values appropriately based on column
                      if (column.accessorKey === 'askingPrice' || column.accessorKey === 'rentalPrice' || 
                          column.accessorKey === 'netPrice' || column.accessorKey === 'pricePerSqw' ||
                          column.accessorKey === 'pricePerUsableArea' || column.accessorKey === 'pricePerSqm' ||
                          column.accessorKey === 'lastMatch') {
                        cellContent = value !== undefined && value !== null ? formatCurrency(value as number) : '-';
                      } else if (column.accessorKey === 'lastMatchDiff') {
                        cellContent = value !== undefined && value !== null ? `${value}%` : '-';
                      } else if (column.accessorKey === 'view' || column.accessorKey === 'matchingTags') {
                        cellContent = value !== undefined && value !== null ? (value as string[]).join(', ') : '-';
                      } else if (column.accessorKey === 'createdTime' || column.accessorKey === 'lastModifiedTime') {
                        cellContent = value ? new Date(value as string).toLocaleDateString() : '-';
                      } else {
                        cellContent = value !== undefined && value !== null ? String(value) : '-';
                      }
                    }
                    
                    return (
                      <TableCell 
                        key={`${listing.listingCode}-${String(column.accessorKey)}`}
                        className={`whitespace-nowrap ${column.className || ''}`}
                      >
                        {cellContent}
                      </TableCell>
                    );
                  })}
                  <TableCell>...</TableCell>
                </TableRow>
              ))}
              {data.length === 0 && (
                <TableRow>
                  <TableCell colSpan={columns.length + 1} className="text-center py-8 text-muted-foreground">
                    No listings found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default ListingsTableContent; 