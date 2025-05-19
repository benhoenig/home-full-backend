import React from 'react';
import { 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Listing } from '@/hooks/useListingsTableData';

type Column = {
  header: string;
  accessorKey: keyof Listing;
};

type ColumnCustomizerProps = {
  allColumns: Column[];
  visibleColumns: (keyof Listing)[];
  setVisibleColumns: (columns: (keyof Listing)[]) => void;
  columnOrder: (keyof Listing)[];
  setColumnOrder: (order: (keyof Listing)[]) => void;
  defaultVisibleColumns: (keyof Listing)[];
  defaultColumnOrder: (keyof Listing)[];
};

const ColumnCustomizer = ({
  allColumns,
  visibleColumns,
  setVisibleColumns,
  columnOrder,
  setColumnOrder,
  defaultVisibleColumns,
  defaultColumnOrder
}: ColumnCustomizerProps) => {
  
  const handleColumnToggle = (columnKey: keyof Listing) => {
    if (visibleColumns.includes(columnKey)) {
      setVisibleColumns(visibleColumns.filter(col => col !== columnKey));
    } else {
      setVisibleColumns([...visibleColumns, columnKey]);
    }
  };
  
  const resetToDefault = () => {
    setVisibleColumns([...defaultVisibleColumns]);
    setColumnOrder([...defaultColumnOrder]);
  };
  
  // Group columns by section
  const basicColumns = allColumns.filter(col => 
    ['listingCode', 'marketingStatus', 'monthsOnSale', 'listingType', 'listingStatus'].includes(col.accessorKey as string)
  );
  
  const ownerColumns = allColumns.filter(col => 
    ['ownerName', 'ownerContact'].includes(col.accessorKey as string)
  );
  
  const propertyColumns = allColumns.filter(col => 
    ['listingName', 'propertyType', 'projectName', 'inProject', 'streetSoi', 'zoneArea', 
     'bts', 'mrt', 'arl', 'locationGrade', 'bedrooms', 'bathrooms', 'unitNo', 
     'rai', 'ngan', 'wa', 'usableArea', 'condoArea', 'floors', 'building', 'floor', 
     'parking', 'direction'].includes(col.accessorKey as string)
  );
  
  const priceColumns = allColumns.filter(col => 
    ['askingPrice', 'rentalPrice', 'netPrice', 'pricePerSqw', 'pricePerUsableArea', 'pricePerSqm'].includes(col.accessorKey as string)
  );
  
  const additionalColumns = allColumns.filter(col => 
    ['googleMapsLink', 'remark'].includes(col.accessorKey as string)
  );
  
  const ownerFocusColumns = allColumns.filter(col => 
    ['timeConsulted', 'lastMatch', 'ownerType', 'lastMatchDiff'].includes(col.accessorKey as string)
  );
  
  const metadataColumns = allColumns.filter(col => 
    ['createdBy', 'createdTime', 'lastModifiedTime', 'assignedTo'].includes(col.accessorKey as string)
  );
  
  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Customize Table Columns</DialogTitle>
      </DialogHeader>
      
      <div className="max-h-[60vh] overflow-y-auto pr-6 -mr-6">
        <div className="space-y-6 py-2">
          <div>
            <h4 className="font-medium mb-3">Basic Information</h4>
            <div className="grid grid-cols-2 gap-2">
              {basicColumns.map((column) => (
                <div key={String(column.accessorKey)} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`col-${String(column.accessorKey)}`}
                    checked={visibleColumns.includes(column.accessorKey)}
                    onCheckedChange={() => handleColumnToggle(column.accessorKey)}
                  />
                  <Label htmlFor={`col-${String(column.accessorKey)}`}>{column.header}</Label>
                </div>
              ))}
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h4 className="font-medium mb-3">Owner Information</h4>
            <div className="grid grid-cols-2 gap-2">
              {ownerColumns.map((column) => (
                <div key={String(column.accessorKey)} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`col-${String(column.accessorKey)}`}
                    checked={visibleColumns.includes(column.accessorKey)}
                    onCheckedChange={() => handleColumnToggle(column.accessorKey)}
                  />
                  <Label htmlFor={`col-${String(column.accessorKey)}`}>{column.header}</Label>
                </div>
              ))}
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h4 className="font-medium mb-3">Property Information</h4>
            <div className="grid grid-cols-2 gap-2">
              {propertyColumns.map((column) => (
                <div key={String(column.accessorKey)} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`col-${String(column.accessorKey)}`}
                    checked={visibleColumns.includes(column.accessorKey)}
                    onCheckedChange={() => handleColumnToggle(column.accessorKey)}
                  />
                  <Label htmlFor={`col-${String(column.accessorKey)}`}>{column.header}</Label>
                </div>
              ))}
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h4 className="font-medium mb-3">Price Information</h4>
            <div className="grid grid-cols-2 gap-2">
              {priceColumns.map((column) => (
                <div key={String(column.accessorKey)} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`col-${String(column.accessorKey)}`}
                    checked={visibleColumns.includes(column.accessorKey)}
                    onCheckedChange={() => handleColumnToggle(column.accessorKey)}
                  />
                  <Label htmlFor={`col-${String(column.accessorKey)}`}>{column.header}</Label>
                </div>
              ))}
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h4 className="font-medium mb-3">Additional Information</h4>
            <div className="grid grid-cols-2 gap-2">
              {additionalColumns.map((column) => (
                <div key={String(column.accessorKey)} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`col-${String(column.accessorKey)}`}
                    checked={visibleColumns.includes(column.accessorKey)}
                    onCheckedChange={() => handleColumnToggle(column.accessorKey)}
                  />
                  <Label htmlFor={`col-${String(column.accessorKey)}`}>{column.header}</Label>
                </div>
              ))}
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h4 className="font-medium mb-3">Owner Focus</h4>
            <div className="grid grid-cols-2 gap-2">
              {ownerFocusColumns.map((column) => (
                <div key={String(column.accessorKey)} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`col-${String(column.accessorKey)}`}
                    checked={visibleColumns.includes(column.accessorKey)}
                    onCheckedChange={() => handleColumnToggle(column.accessorKey)}
                  />
                  <Label htmlFor={`col-${String(column.accessorKey)}`}>{column.header}</Label>
                </div>
              ))}
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h4 className="font-medium mb-3">Metadata</h4>
            <div className="grid grid-cols-2 gap-2">
              {metadataColumns.map((column) => (
                <div key={String(column.accessorKey)} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`col-${String(column.accessorKey)}`}
                    checked={visibleColumns.includes(column.accessorKey)}
                    onCheckedChange={() => handleColumnToggle(column.accessorKey)}
                  />
                  <Label htmlFor={`col-${String(column.accessorKey)}`}>{column.header}</Label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <DialogFooter className="flex justify-between items-center border-t pt-4 mt-4">
        <Button variant="outline" onClick={resetToDefault}>Reset to Default</Button>
        <span className="text-sm text-muted-foreground">{visibleColumns.length} columns selected</span>
      </DialogFooter>
    </DialogContent>
  );
};

export default ColumnCustomizer; 