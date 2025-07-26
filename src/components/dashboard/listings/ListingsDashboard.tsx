import React from 'react';
import ListingsSummaryCard from './ListingsSummaryCard';
import MetricsDistributionCard from './MetricsDistributionCard';
import ListingsTable from './ListingsTable';
import PerformanceAnalytics from './PerformanceAnalytics';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ListingsDashboard = () => {
  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ListingsSummaryCard />
        <MetricsDistributionCard />
      </div>
      
      {/* Main Listings Table */}
      <Card>
        <CardContent className="p-6">
          <ListingsTable />
        </CardContent>
      </Card>
      
      {/* Performance Analytics Tables */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <PerformanceAnalytics />
        </CardContent>
      </Card>
    </div>
  );
};

export default ListingsDashboard; 