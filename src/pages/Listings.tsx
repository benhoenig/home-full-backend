import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import ListingsTable from '@/components/dashboard/ListingsTable';
import { useListingsTableData } from '@/hooks/useListingsTableData';

const Listings = () => {
  const data = useListingsTableData();
  
  return (
    <DashboardLayout title="My Listings">
      <ListingsTable data={data} />
    </DashboardLayout>
  );
};

export default Listings; 