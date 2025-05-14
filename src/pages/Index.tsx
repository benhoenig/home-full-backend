
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

const Index = () => {
  return (
    <DashboardLayout title="Dashboard">
      <div className="flex flex-col items-center justify-center w-full h-[70vh] gap-4">
        <h2 className="text-3xl font-bold text-gray-700">Coming Soon</h2>
        <p className="text-gray-500">The Dashboard functionality is under development and will be available soon.</p>
      </div>
    </DashboardLayout>
  );
};

export default Index;
