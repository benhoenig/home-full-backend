import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import RevenueSection from '@/components/dashboard/RevenueSection';
import PerformanceStats from '@/components/dashboard/performance/PerformanceStats';
import RevenueChart from '@/components/dashboard/performance/RevenueChart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type DisplayMode = 'revenue' | 'listings';

const Dashboard = () => {
  const [displayMode, setDisplayMode] = useState<DisplayMode>('revenue');
  
  return (
    <DashboardLayout 
      title="Dashboard"
      headerControls={
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
      }
    >
      <div className="space-y-6">
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
        
        <Tabs defaultValue="main" className="w-full">
          <TabsList className="w-full mb-6 grid grid-cols-3">
            <TabsTrigger value="main">Main</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
            <TabsTrigger value="employees">Employee Status</TabsTrigger>
          </TabsList>
          
          <TabsContent value="main" className="space-y-6">
            {displayMode === 'revenue' ? (
              <>
                {/* Revenue Section */}
                <RevenueSection />
                
                {/* Performance Stats and Charts */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-1">
                    <PerformanceStats />
                  </div>
                  <div className="md:col-span-2">
                    <RevenueChart />
                  </div>
                </div>
              </>
            ) : (
              <Card className="data-card">
                <CardHeader>
                  <CardTitle>Listings Dashboard</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Listings content will go here</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="team">
            <Card className="data-card">
              <CardHeader>
                <CardTitle>Team Dashboard</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Team performance content will go here</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="employees">
            <Card className="data-card">
              <CardHeader>
                <CardTitle>Employee Status</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Employee status content will go here</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard; 