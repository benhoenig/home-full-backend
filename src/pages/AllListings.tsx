import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import AllListingsTable from '@/components/dashboard/AllListingsTable';
import { useListingsTableData } from '@/hooks/useListingsTableData';

const AllListings = () => {
  const data = useListingsTableData();
  
  return (
    <DashboardLayout title="All Listings">
      <AllListingsTable data={data} />
    </DashboardLayout>
  );
};

export default AllListings; 