import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import RevenueSection from '@/components/dashboard/RevenueSection';
import RevenueChart from '@/components/dashboard/performance/RevenueChart';
import PerformanceStats from '@/components/dashboard/performance/PerformanceStats';
import PendingTransfersTable from '@/components/dashboard/PendingTransfersTable';
import TransferredCasesTable from '@/components/dashboard/TransferredCasesTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Import Team components
import TeamRevenueSection from '@/components/dashboard/team/TeamRevenueSection';
import TeamRevenueChart from '@/components/dashboard/team/TeamRevenueChart';
import TeamPerformanceStats from '@/components/dashboard/team/TeamPerformanceStats';
import TeamTransfersTable from '@/components/dashboard/team/TeamTransfersTable';

// Import Employee Status component
import EmployeeStatusContent from '@/components/dashboard/employee-status/EmployeeStatusContent';

// Import Listings Dashboard component
import ListingsDashboard from '@/components/dashboard/listings/ListingsDashboard';

type DisplayMode = 'revenue' | 'listings';
type ActiveTab = 'main' | 'team' | 'employees';

const Dashboard = () => {
  const [displayMode, setDisplayMode] = useState<DisplayMode>('revenue');
  const [activeTab, setActiveTab] = useState<ActiveTab>('main');
  
  const handleTabChange = (value: string) => {
    setActiveTab(value as ActiveTab);
  };
  
  return (
    <DashboardLayout 
      title="Dashboard"
    >
      <div className="space-y-6">
        <Tabs defaultValue="main" className="w-full" onValueChange={handleTabChange}>
          {/* Tab controls and display mode buttons */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
            <div className="flex items-center">
              <TabsList className="w-full sm:w-auto">
                <TabsTrigger value="main">Main</TabsTrigger>
                <TabsTrigger value="team">Team</TabsTrigger>
                <TabsTrigger value="employees">Employee Status</TabsTrigger>
              </TabsList>
            </div>
            
            {/* Only show Revenue/Listings buttons for Main and Team tabs */}
            {activeTab !== 'employees' && (
              <div className="flex space-x-2">
                <Button 
                  variant={displayMode === 'revenue' ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => setDisplayMode('revenue')}
                >
                  Revenue
                </Button>
                <Button 
                  variant={displayMode === 'listings' ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => setDisplayMode('listings')}
                >
                  Listings
                </Button>
              </div>
            )}
          </div>
          
          {/* Banner Image Placeholder - 10:1 ratio */}
          <div className="w-full h-20 bg-gradient-to-r from-slate-100 to-slate-200 rounded-lg overflow-hidden relative mb-6">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-slate-400 text-sm font-medium">Banner Placeholder (10:1 ratio)</span>
            </div>
            <div className="absolute bottom-2 right-3">
              <Button variant="ghost" size="sm" className="h-6 text-xs bg-white/80 hover:bg-white/90">
                Change Banner
              </Button>
            </div>
          </div>
          
          <TabsContent value="main" className="space-y-6">
            {displayMode === 'revenue' ? (
              <>
                {/* Revenue Section */}
                <RevenueSection />
                
                {/* Charts and Stats Section - First Row */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Revenue Trends Chart - 2/3 width on large screens */}
                  <div className="lg:col-span-2" style={{ height: '400px' }}>
                    <RevenueChart />
                  </div>
                  
                  {/* Performance Stats - 1/3 width on large screens */}
                  <div className="lg:col-span-1">
                    <PerformanceStats />
                  </div>
                </div>
                
                {/* Case Tables Section - Second Row */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Pending Transfers Table - 2/3 width on large screens */}
                  <div className="lg:col-span-2">
                    <PendingTransfersTable />
                  </div>
                  
                  {/* Transferred Cases Table - 1/3 width on large screens */}
                  <div className="lg:col-span-1">
                    <TransferredCasesTable />
                  </div>
                </div>
              </>
            ) : (
              <ListingsDashboard />
            )}
          </TabsContent>
          
          <TabsContent value="team" className="space-y-6">
            {displayMode === 'revenue' ? (
              <>
                {/* Team Revenue Section */}
                <TeamRevenueSection />
                
                {/* Team Charts and Stats Section - First Row */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Team Revenue Trends Chart - 2/3 width on large screens */}
                  <div className="lg:col-span-2" style={{ height: '400px' }}>
                    <TeamRevenueChart />
                  </div>
                  
                  {/* Team Performance Stats - 1/3 width on large screens */}
                  <div className="lg:col-span-1">
                    <TeamPerformanceStats />
                  </div>
                </div>
                
                {/* Team Transfers Table - Full width */}
                <div>
                  <TeamTransfersTable />
                </div>
              </>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Team Listings Dashboard</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-center h-96">
                  <p className="text-muted-foreground">Team Listings Dashboard will be implemented in the future.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="employees">
            <EmployeeStatusContent />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard; 