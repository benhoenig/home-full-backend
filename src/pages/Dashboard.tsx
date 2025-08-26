import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import RevenueSection from '@/components/dashboard/RevenueSection';
import RevenueChart from '@/components/dashboard/performance/RevenueChart';
import PerformanceStats from '@/components/dashboard/performance/PerformanceStats';
import PendingTransfersTable from '@/components/dashboard/PendingTransfersTable';
import TransferredCasesTable from '@/components/dashboard/TransferredCasesTable';
import FilterableListingsDashboard from '@/components/dashboard/listings/FilterableListingsDashboard';
import EmployeeStatusContent from '@/components/dashboard/employee-status/EmployeeStatusContent';
import TeamRevenueSection from '@/components/dashboard/team/TeamRevenueSection';
import TeamRevenueChart from '@/components/dashboard/team/TeamRevenueChart';
import EnhancedPipelineCard from '@/components/dashboard/EnhancedPipelineCard';
import TeamPipelineCard from '@/components/dashboard/TeamPipelineCard';
import StatsDashboard from '@/components/dashboard/stats/StatsDashboard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type DisplayMode = 'revenue' | 'listings' | 'stats';

// Mock team members data - consistent with listings dashboard
const teamMembers = [
  { id: 'all', name: 'All Team Members' },
  { id: 'alex', name: 'Alex Johnson' },
  { id: 'sarah', name: 'Sarah Williams' },
  { id: 'michael', name: 'Michael Brown' },
  { id: 'emma', name: 'Emma Davis' },
  { id: 'david', name: 'David Chen' },
];

const Dashboard = () => {
  const [displayMode, setDisplayMode] = useState<DisplayMode>('revenue');
  const [activeTab, setActiveTab] = useState<string>('main');
  const [selectedTeamMember, setSelectedTeamMember] = useState<string>('all');
  
  return (
    <DashboardLayout 
      title="Dashboard"
    >
      <div className="space-y-6">
        <Tabs 
          defaultValue="main" 
          value={activeTab}
          className="w-full" 
          onValueChange={setActiveTab}
        >
          {/* Tab controls and display mode buttons */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
            <div className="flex items-center">
              <TabsList className="w-full sm:w-auto">
                <TabsTrigger value="main">Main</TabsTrigger>
                <TabsTrigger value="team">Team</TabsTrigger>
                <TabsTrigger value="employees">Employee Status</TabsTrigger>
              </TabsList>
            </div>
            
            {/* Display Mode Buttons - only show when not on Employee Status tab */}
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
                <Button 
                  variant={displayMode === 'stats' ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => setDisplayMode('stats')}
                >
                  Stats
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
                
                {/* Pipeline Section - Third Row */}
                <div className="w-full">
                  <EnhancedPipelineCard 
                    totalCommission="$420,000"
                    winCommission="$42,000" 
                    className="w-full"
                  />
                </div>
              </>
            ) : displayMode === 'listings' ? (
              <FilterableListingsDashboard isTeamView={false} />
            ) : (
              <StatsDashboard selectedMember="current_user" />
                        )}
          </TabsContent>
          
          <TabsContent value="team" className="space-y-6">
            {displayMode === 'revenue' ? (
              <>
                {/* Team Member Filter */}
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                      <CardTitle>Team Revenue Dashboard</CardTitle>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">Filter by:</span>
                        <Select value={selectedTeamMember} onValueChange={setSelectedTeamMember}>
                          <SelectTrigger className="w-[200px]">
                            <SelectValue placeholder="Select team member" />
                          </SelectTrigger>
                          <SelectContent>
                            {teamMembers.map(member => (
                              <SelectItem key={member.id} value={member.id}>
                                {member.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    {selectedTeamMember !== 'all' && (
                      <div className="text-sm text-muted-foreground">
                        Showing revenue for: <span className="font-medium">{teamMembers.find(m => m.id === selectedTeamMember)?.name}</span>
                      </div>
                    )}
                  </CardHeader>
                </Card>

                {/* Team Revenue Section - similar to individual revenue */}
                <TeamRevenueSection selectedMember={selectedTeamMember} />
                
                {/* Charts and Stats Section - First Row */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Team Revenue Trends Chart - 2/3 width on large screens */}
                  <div className="lg:col-span-2" style={{ height: '400px' }}>
                    <TeamRevenueChart selectedMember={selectedTeamMember} />
                  </div>
                  
                  {/* Team Performance Stats - 1/3 width on large screens */}
                  <div className="lg:col-span-1">
                    <PerformanceStats />
                  </div>
                </div>
                
                {/* Case Tables Section - Second Row (same as individual) */}
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
                
                {/* Pipeline Section - Third Row */}
                <div className="w-full">
                  <TeamPipelineCard 
                    totalCommission="$620,000"
                    winCommission="$62,000" 
                    selectedMember={selectedTeamMember}
                    className="w-full"
                  />
                </div>
              </>
            ) : displayMode === 'listings' ? (
              <FilterableListingsDashboard isTeamView={true} />
            ) : (
              <>
                {/* Team Member Filter for Stats */}
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                      <CardTitle>Team Stats Dashboard</CardTitle>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">Filter by:</span>
                        <Select value={selectedTeamMember} onValueChange={setSelectedTeamMember}>
                          <SelectTrigger className="w-[200px]">
                            <SelectValue placeholder="Select team member" />
                          </SelectTrigger>
                          <SelectContent>
                            {teamMembers.map(member => (
                              <SelectItem key={member.id} value={member.id}>
                                {member.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
                
                <StatsDashboard selectedMember={selectedTeamMember} />
              </>
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