import React from 'react';
import { Listing } from '@/hooks/useListingsTableData';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Table, TableHeader, TableRow, TableHead, TableBody } from "@/components/ui/table";
import { OwnerGroup } from '@/hooks/useOwnerGroups';
import GroupedListingsView from './listings-content/GroupedListingsView';
import UngroupedListingsView from './listings-content/UngroupedListingsView';

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
  isGroupingEnabled?: boolean;
  ownerGroups?: OwnerGroup[];
};

const ListingsTableContent = ({ 
  data, 
  columns, 
  onRowClick, 
  isGroupingEnabled = false,
  ownerGroups = []
}: ListingsTableContentProps) => {
  // Get ungrouped listings (listings not assigned to any group)
  const ungroupedListings = isGroupingEnabled 
    ? data.filter(listing => 
        !ownerGroups.some(group => 
          group.listings.some(groupListing => 
            groupListing.listingCode === listing.listingCode
          )
        )
      )
    : data;

  return (
    <div className="w-full overflow-hidden border rounded-md">
      <ScrollArea className="h-[500px] w-full">
        <div className="w-full min-w-max">
          <Table>
            <TableHeader>
              <TableRow>
                {isGroupingEnabled && <TableHead className="sticky top-0 w-8"></TableHead>}
                <TableHead className="sticky top-0 w-10"></TableHead>
                {columns.map((column) => (
                  <TableHead 
                    key={String(column.accessorKey)}
                    className="sticky top-0 whitespace-nowrap"
                  >
                    {column.header}
                  </TableHead>
                ))}
                <TableHead className="sticky top-0">...</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isGroupingEnabled ? (
                <GroupedListingsView 
                  ownerGroups={ownerGroups}
                  columns={columns}
                  ungroupedListings={ungroupedListings}
                  onRowClick={onRowClick}
                />
              ) : (
                <UngroupedListingsView 
                  data={data}
                  columns={columns}
                  onRowClick={onRowClick}
                />
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