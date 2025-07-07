import React, { useState } from 'react';
import { Listing } from '@/hooks/useListingsTableData';
import { TableRow, TableCell } from "@/components/ui/table";
import { OwnerGroup } from '@/hooks/useOwnerGroups';
import GroupHeader from '../GroupHeader';
import ListingRow from '../ListingRow';
import { useListingDragDrop } from '../hooks/useListingDragDrop';

type Column = {
  header: string;
  accessorKey: keyof Listing;
  cell?: (listing: Listing, index: number) => React.ReactNode;
  className?: string;
};

type GroupedListingsViewProps = {
  ownerGroups: OwnerGroup[];
  columns: Column[];
  ungroupedListings: Listing[];
  onRowClick: (listing: Listing) => void;
};

const GroupedListingsView = ({
  ownerGroups,
  columns,
  ungroupedListings,
  onRowClick
}: GroupedListingsViewProps) => {
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({});
  const {
    dragOverGroupId,
    setDragOverGroupId,
    dragOverListingIndex,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
    handleListingDragOver,
    handleDrop,
    handleListingDropWithinGroup
  } = useListingDragDrop();

  const toggleGroupCollapse = (groupId: string) => {
    setCollapsedGroups(prev => ({
      ...prev,
      [groupId]: !prev[groupId]
    }));
  };

  return (
    <>
      {/* Render grouped listings */}
      {ownerGroups
        .filter(group => group.visible)
        .sort((a, b) => a.order - b.order)
        .map((group) => (
          <React.Fragment key={group.id}>
            <GroupHeader 
              groupId={group.id}
              name={group.name}
              count={group.listings.length}
              color={group.color}
              isCollapsed={collapsedGroups[group.id]}
              isDraggedOver={dragOverGroupId === group.id}
              toggleGroupCollapse={toggleGroupCollapse}
              handleDragOver={handleDragOver}
              handleDrop={(e) => handleDrop(e, group.id, ownerGroups)}
              setDragOverGroupId={setDragOverGroupId}
            />

            {!collapsedGroups[group.id] && group.listings.map((listing, i) => (
              <ListingRow 
                key={`${group.id}-${i}`}
                listing={listing}
                columns={columns}
                index={i}
                sourceGroup={group.id}
                onRowClick={onRowClick}
                handleDragStart={handleDragStart}
                handleDragEnd={handleDragEnd}
                handleListingDragOver={handleListingDragOver}
                handleListingDrop={handleListingDropWithinGroup}
                isDraggedOver={dragOverListingIndex === i && dragOverGroupId === group.id}
              />
            ))}
          </React.Fragment>
        ))}

      {/* Render ungrouped listings section */}
      {ungroupedListings.length > 0 && (
        <React.Fragment>
          <GroupHeader 
            groupId="ungrouped"
            name="Ungrouped"
            count={ungroupedListings.length}
            isCollapsed={collapsedGroups["ungrouped"]}
            isDraggedOver={dragOverGroupId === "ungrouped"}
            toggleGroupCollapse={toggleGroupCollapse}
            handleDragOver={handleDragOver}
            handleDrop={(e) => handleDrop(e, "ungrouped", ownerGroups)}
            setDragOverGroupId={setDragOverGroupId}
          />
          
          {!collapsedGroups["ungrouped"] && ungroupedListings.map((listing, i) => (
            <TableRow key={`ungrouped-${i}`}>
              <TableCell className="w-8"></TableCell>
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
        </React.Fragment>
      )}
    </>
  );
};

export default GroupedListingsView; 