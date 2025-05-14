import React from 'react';
import LeadsTable from '@/components/dashboard/LeadsTable';
import { useLeadsTableData } from '@/hooks/useLeadsTableData';

export function LeadsTableSection() {
  const leadsData = useLeadsTableData();
  
  return (
    <div className="mb-0">
      <LeadsTable data={leadsData} />
    </div>
  );
}

export default LeadsTableSection;
