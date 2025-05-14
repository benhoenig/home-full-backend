import React from 'react';
import LeadsTable from '@/components/dashboard/LeadsTable';
import LeadsStatsCard from '@/components/dashboard/LeadsStatsCard';
import { useLeadsTableData } from '@/hooks/useLeadsTableData';

export function LeadManagerSection() {
  const leadsData = useLeadsTableData();
  
  return (
    <div className="flex flex-col gap-3">
      <LeadsStatsCard data={leadsData} />
      <LeadsTable data={leadsData} />
    </div>
  );
}

export default LeadManagerSection; 