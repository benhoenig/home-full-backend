
import React from 'react';
import { Lead } from '@/hooks/useLeadsTableData';
import LeadRow from '../LeadRow';
import useLeadDragDrop from '../hooks/useLeadDragDrop';

type Column = {
  header: string;
  accessorKey: keyof Lead;
  cell?: (lead: Lead, index: number) => React.ReactNode;
  className?: string;
};

type UngroupedLeadsViewProps = {
  data: Lead[];
  columns: Column[];
  onRowClick: (lead: Lead) => void;
};

const UngroupedLeadsView = ({
  data,
  columns,
  onRowClick
}: UngroupedLeadsViewProps) => {
  const { handleDragStart, handleDragEnd } = useLeadDragDrop();

  return (
    <>
      {data.map((row, i) => (
        <LeadRow 
          key={i}
          lead={row}
          columns={columns}
          index={i}
          onRowClick={onRowClick}
          handleDragStart={handleDragStart}
          handleDragEnd={handleDragEnd}
        />
      ))}
    </>
  );
};

export default UngroupedLeadsView;
