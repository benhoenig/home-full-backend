import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import OwnerFocusTable from '@/components/dashboard/OwnerFocusTable';
import { useListingsTableData } from '@/hooks/useListingsTableData';

const OwnerFocus = () => {
  const allData = useListingsTableData();
  // Filter for only starred listings
  const starredData = allData.filter(listing => listing.isStarred);
  
  return (
    <DashboardLayout title="Owner Focus">
      <OwnerFocusTable data={starredData} />
    </DashboardLayout>
  );
};

export default OwnerFocus; 