import { useState, useEffect } from 'react';
import { Listing, defaultColumnOrder, defaultVisibleColumns } from '@/hooks/useListingsTableData';

export type Column = {
  header: string;
  accessorKey: keyof Listing;
};

// Define all possible columns
export const allColumns: Column[] = [
  // Basic listing information
  { header: "Listing Code", accessorKey: "listingCode" },
  { header: "Marketing Status", accessorKey: "marketingStatus" },
  { header: "Months On Sale", accessorKey: "monthsOnSale" },
  { header: "Listing Type", accessorKey: "listingType" },
  { header: "Listing Status", accessorKey: "listingStatus" },
  
  // Owner information
  { header: "Owner's Name", accessorKey: "ownerName" },
  { header: "Owner's Contact", accessorKey: "ownerContact" },
  
  // Property information
  { header: "Listing Name", accessorKey: "listingName" },
  { header: "Property Type", accessorKey: "propertyType" },
  { header: "Project Name", accessorKey: "projectName" },
  { header: "ใน/นอกโครงการ", accessorKey: "inProject" },
  { header: "ชื่อถนน-ซอย", accessorKey: "streetSoi" },
  { header: "Zone / Area", accessorKey: "zoneArea" },
  { header: "BTS", accessorKey: "bts" },
  { header: "MRT", accessorKey: "mrt" },
  { header: "ARL", accessorKey: "arl" },
  { header: "Location Grade", accessorKey: "locationGrade" },
  { header: "Bedrooms", accessorKey: "bedrooms" },
  { header: "Bathrooms", accessorKey: "bathrooms" },
  { header: "Unit No.", accessorKey: "unitNo" },
  { header: "ไร่", accessorKey: "rai" },
  { header: "งาน", accessorKey: "ngan" },
  { header: "วา", accessorKey: "wa" },
  { header: "พื้นที่ใช้สอย (ตรม.)", accessorKey: "usableArea" },
  { header: "คอนโด (ตรม.)", accessorKey: "condoArea" },
  { header: "จำนวนชั้น", accessorKey: "floors" },
  { header: "Building", accessorKey: "building" },
  { header: "อยู่ชั้นที่", accessorKey: "floor" },
  { header: "ที่จอดรถ", accessorKey: "parking" },
  { header: "Direction", accessorKey: "direction" },
  
  // Price information
  { header: "Asking Price", accessorKey: "askingPrice" },
  { header: "Rental Price", accessorKey: "rentalPrice" },
  { header: "Net Price", accessorKey: "netPrice" },
  { header: "Price / Sqw.", accessorKey: "pricePerSqw" },
  { header: "Price / พื้นที่ใช้สอย", accessorKey: "pricePerUsableArea" },
  { header: "Price / Sqm.", accessorKey: "pricePerSqm" },
  
  // Additional information
  { header: "Google Maps Link", accessorKey: "googleMapsLink" },
  { header: "Remark", accessorKey: "remark" },
  
  // Owner Focus
  { header: "Time Consulted", accessorKey: "timeConsulted" },
  { header: "Last Match", accessorKey: "lastMatch" },
  { header: "Owner Type", accessorKey: "ownerType" },
  { header: "Last Match % Diff", accessorKey: "lastMatchDiff" },
  
  // Metadata
  { header: "Created By", accessorKey: "createdBy" },
  { header: "Created Time", accessorKey: "createdTime" },
  { header: "Last Modified Time", accessorKey: "lastModifiedTime" },
  { header: "Assigned To", accessorKey: "assignedTo" },
];

export const useTableColumns = () => {
  const [visibleColumns, setVisibleColumns] = useState<(keyof Listing)[]>(() => {
    const savedColumns = localStorage.getItem('listingTableColumns');
    return savedColumns ? JSON.parse(savedColumns) : defaultVisibleColumns;
  });
  
  const [columnOrder, setColumnOrder] = useState<(keyof Listing)[]>(() => {
    const savedOrder = localStorage.getItem('listingTableColumnOrder');
    return savedOrder ? JSON.parse(savedOrder) : defaultColumnOrder;
  });
  
  // Generate columns array whenever visibleColumns or columnOrder changes
  const columns = (() => {
    // Create a copy of visible columns
    const visibleColumnKeys = [...visibleColumns];
    
    // Sort them based on column order
    visibleColumnKeys.sort((a, b) => {
      const indexA = columnOrder.indexOf(a);
      const indexB = columnOrder.indexOf(b);
      // If a column is not in the order, place it at the end
      if (indexA === -1) return indexB === -1 ? 0 : 1;
      if (indexB === -1) return -1;
      return indexA - indexB;
    });
    
    // Map the sorted keys to the actual column objects
    return visibleColumnKeys.map(key => {
      return allColumns.find(col => col.accessorKey === key)!;
    }).filter(Boolean);
  })();
  
  // Add any column that might be visible but not in the order
  useEffect(() => {
    const columnsNotInOrder = visibleColumns.filter(col => !columnOrder.includes(col));
    if (columnsNotInOrder.length > 0) {
      setColumnOrder(prev => [...prev, ...columnsNotInOrder]);
    }
  }, [visibleColumns]);
  
  // Save to localStorage when columns change
  useEffect(() => {
    localStorage.setItem('listingTableColumns', JSON.stringify(visibleColumns));
  }, [visibleColumns]);
  
  // Save to localStorage when order changes
  useEffect(() => {
    localStorage.setItem('listingTableColumnOrder', JSON.stringify(columnOrder));
  }, [columnOrder]);
  
  return {
    visibleColumns,
    setVisibleColumns,
    columnOrder,
    setColumnOrder,
    columns,
    allColumns,
  };
}; 