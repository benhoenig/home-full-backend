
import { useState, useEffect } from 'react';
import { Lead, defaultColumnOrder, defaultVisibleColumns } from '@/hooks/useLeadsTableData';

export type Column = {
  header: string;
  accessorKey: keyof Lead;
};

// Define all possible columns
export const allColumns: Column[] = [
  { header: "Date Received", accessorKey: "dateReceived" },
  { header: "Agent", accessorKey: "agent" },
  { header: "Agent Remark", accessorKey: "agentRemark" },
  { header: "Admin Remark", accessorKey: "adminRemark" },
  { header: "Source", accessorKey: "source" },
  { header: "Contact By", accessorKey: "contactBy" },
  { header: "Order Type", accessorKey: "orderType" },
  { header: "Listing Code Interest", accessorKey: "listingCodeInterest" },
  { header: "Listing Type Interest", accessorKey: "listingTypeInterest" },
  { header: "Listing Name Interest", accessorKey: "listingNameInterest" },
  { header: "Property Type Interest", accessorKey: "propertyTypeInterest" },
  { header: "Project Interest", accessorKey: "projectInterest" },
  { header: "Property Type", accessorKey: "propertyType" },
  { header: "Zone / Area", accessorKey: "zoneArea" },
  { header: "Lead Name", accessorKey: "name" },
  { header: "Lead Phone", accessorKey: "phone" },
  { header: "Additional Phone", accessorKey: "additionalPhone" },
  { header: "Lead LINE ID", accessorKey: "leadLineId" },
  { header: "Email", accessorKey: "email" },
  { header: "Gender", accessorKey: "gender" },
  { header: "Nationality", accessorKey: "nationality" },
  { header: "Birthday", accessorKey: "birthday" },
  { header: "Age", accessorKey: "age" },
  { header: "Occupation", accessorKey: "occupation" },
  { header: "Hobby / Interest", accessorKey: "hobbyInterest" },
  { header: "Estimate Income / Month", accessorKey: "estimateIncome" },
  { header: "Pain Point", accessorKey: "painPoint" },
  { header: "Rapport", accessorKey: "rapport" },
  { header: "Potential", accessorKey: "potential" },
  { header: "Budget", accessorKey: "budget" },
  { header: "Schedule", accessorKey: "schedule" },
  { header: "Time Left", accessorKey: "timeLeft" },
  { header: "Prefer Direction", accessorKey: "preferDirection" },
  { header: "Unit Sent", accessorKey: "unitSent" },
  { header: "Unit Type (Condo)", accessorKey: "unitTypeCondo" },
  { header: "Remark", accessorKey: "remark" },
  { header: "Matching Tag", accessorKey: "matchingTag" },
  { header: "Pipeline Stage", accessorKey: "pipelineStage" },
  { header: "Pipeline Progress", accessorKey: "pipelineProgress" },
  { header: "Lead Status", accessorKey: "status" },
  { header: "Closing Date", accessorKey: "closingDate" },
  { header: "Transfer Date", accessorKey: "transferDate" },
  { header: "Commission", accessorKey: "commission" },
  { header: "Listing Code", accessorKey: "listingCode" },
];

export const useTableColumns = () => {
  const [visibleColumns, setVisibleColumns] = useState<(keyof Lead)[]>(() => {
    const savedColumns = localStorage.getItem('leadTableColumns');
    return savedColumns ? JSON.parse(savedColumns) : defaultVisibleColumns;
  });
  
  const [columnOrder, setColumnOrder] = useState<(keyof Lead)[]>(() => {
    const savedOrder = localStorage.getItem('leadTableColumnOrder');
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
  // This useEffect is now safely separated from the columns calculation
  useEffect(() => {
    const columnsNotInOrder = visibleColumns.filter(col => !columnOrder.includes(col));
    if (columnsNotInOrder.length > 0) {
      setColumnOrder(prev => [...prev, ...columnsNotInOrder]);
    }
  }, [visibleColumns]); // Only depend on visibleColumns, not columnOrder
  
  // Save to localStorage when columns change
  useEffect(() => {
    localStorage.setItem('leadTableColumns', JSON.stringify(visibleColumns));
  }, [visibleColumns]);
  
  // Save to localStorage when order changes
  useEffect(() => {
    localStorage.setItem('leadTableColumnOrder', JSON.stringify(columnOrder));
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
