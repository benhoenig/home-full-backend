import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import FilterableListingsDashboard from '@/components/dashboard/listings/FilterableListingsDashboard';
import EmployeeStatusContent from '@/components/dashboard/employee-status/EmployeeStatusContent';
import TeamRevenueSection from '@/components/dashboard/team/TeamRevenueSection';
import TeamRevenueChart from '@/components/dashboard/team/TeamRevenueChart';
import PerformanceStats from '@/components/dashboard/performance/PerformanceStats';
import PendingTransfersTable from '@/components/dashboard/PendingTransfersTable';
import TransferredCasesTable from '@/components/dashboard/TransferredCasesTable';
import TeamPipelineCard from '@/components/dashboard/TeamPipelineCard';
import StatsDashboard from '@/components/dashboard/stats/StatsDashboard';
import MarketingDashboard from '@/components/dashboard/marketing/MarketingDashboard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type DisplayMode = 'marketing' | 'revenue' | 'listings' | 'stats';

// Mock teams and members data
const teamsData = {
  all: { name: 'All Teams', members: [] },
  team1: { 
    name: 'Team Alpha', 
    members: [
      { id: 'alex', name: 'Alex Johnson' },
      { id: 'sarah', name: 'Sarah Williams' }
    ]
  },
  team2: { 
    name: 'Team Beta', 
    members: [
      { id: 'michael', name: 'Michael Brown' },
      { id: 'emma', name: 'Emma Davis' }
    ]
  },
  team3: { 
    name: 'Team Gamma', 
    members: [
      { id: 'david', name: 'David Chen' }
    ]
  },
  team4: { 
    name: 'Team Delta', 
    members: [
      { id: 'jessica', name: 'Jessica Wilson' },
      { id: 'ryan', name: 'Ryan Martinez' }
    ]
  },
  team5: { 
    name: 'Team Epsilon', 
    members: [
      { id: 'lisa', name: 'Lisa Anderson' }
    ]
  }
};

const teamOptions = Object.entries(teamsData).map(([id, team]) => ({
  id,
  name: team.name
}));

const ListingSupportDashboard = () => {
  const [displayMode, setDisplayMode] = useState<DisplayMode>('marketing');
  const [activeTab, setActiveTab] = useState<string>('team');
  const [selectedTeam, setSelectedTeam] = useState<string>('all');
  const [selectedTeamMember, setSelectedTeamMember] = useState<string>('all');

  // Get available members for selected team
  const availableMembers = selectedTeam === 'all' 
    ? [] 
    : [
        { id: 'all', name: 'All Team Members' },
        ...teamsData[selectedTeam as keyof typeof teamsData].members
      ];

  // Reset member selection when team changes
  const handleTeamChange = (teamId: string) => {
    setSelectedTeam(teamId);
    setSelectedTeamMember('all');
  };
  
  return (
    <DashboardLayout 
      title="Listing Support Dashboard"
    >
      <div className="space-y-6">
        <Tabs 
          defaultValue="team" 
          value={activeTab}
          className="w-full" 
          onValueChange={setActiveTab}
        >
          {/* Tab controls and display mode buttons */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
            <div className="flex items-center">
              <TabsList className="w-full sm:w-auto">
                <TabsTrigger value="team">Report</TabsTrigger>
                <TabsTrigger value="employees">Employee Status</TabsTrigger>
              </TabsList>
            </div>
            
            {/* Display Mode Buttons - only show for Team tab */}
            {activeTab === 'team' && (
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={displayMode === 'marketing' ? 'default' : 'outline'}
                  onClick={() => setDisplayMode('marketing')}
                  size="sm"
                >
                  Marketing
                </Button>
                <Button
                  variant={displayMode === 'revenue' ? 'default' : 'outline'}
                  onClick={() => setDisplayMode('revenue')}
                  size="sm"
                >
                  Revenue
                </Button>
                <Button
                  variant={displayMode === 'listings' ? 'default' : 'outline'}
                  onClick={() => setDisplayMode('listings')}
                  size="sm"
                >
                  Listings
                </Button>
                <Button
                  variant={displayMode === 'stats' ? 'default' : 'outline'}
                  onClick={() => setDisplayMode('stats')}
                  size="sm"
                >
                  Stats
                </Button>
              </div>
            )}
          </div>
          
          {/* Banner Image Placeholder */}
          <div className="w-full h-32 bg-gradient-to-r from-green-500 to-teal-600 rounded-lg mb-8 flex items-center justify-center">
            <span className="text-white text-xl font-semibold">Listing Support Dashboard Banner</span>
          </div>
          
          <TabsContent value="team" className="space-y-6">
            {displayMode === 'marketing' ? (
              <MarketingDashboard />
            ) : displayMode === 'revenue' ? (
              <>
                {/* Team and Member Filter */}
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex flex-col gap-4">
                      <CardTitle>Team Revenue Dashboard</CardTitle>
                      <div className="flex flex-col sm:flex-row gap-4">
                        {/* Team Selection */}
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">Team:</span>
                          <Select value={selectedTeam} onValueChange={handleTeamChange}>
                            <SelectTrigger className="w-[200px]">
                              <SelectValue placeholder="Select team" />
                            </SelectTrigger>
                            <SelectContent>
                              {teamOptions.map(team => (
                                <SelectItem key={team.id} value={team.id}>
                                  {team.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        {/* Member Selection - only show if a specific team is selected */}
                        {selectedTeam !== 'all' && (
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">Member:</span>
                            <Select value={selectedTeamMember} onValueChange={setSelectedTeamMember}>
                              <SelectTrigger className="w-[200px]">
                                <SelectValue placeholder="Select member" />
                              </SelectTrigger>
                              <SelectContent>
                                {availableMembers.map(member => (
                                  <SelectItem key={member.id} value={member.id}>
                                    {member.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                </Card>
                
                {/* Team Revenue Section */}
                <TeamRevenueSection selectedMember={selectedTeamMember} />
                
                {/* Charts and Stats Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2" style={{ height: '400px' }}>
                    <TeamRevenueChart selectedMember={selectedTeamMember} />
                  </div>
                  <div className="lg:col-span-1">
                    <PerformanceStats />
                  </div>
                </div>
                
                {/* Case Tables Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <PendingTransfersTable />
                  </div>
                  <div className="lg:col-span-1">
                    <TransferredCasesTable />
                  </div>
                </div>
                
                {/* Pipeline Section */}
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
            ) : ( // displayMode === 'stats'
              <>
                {/* Team and Member Filter for Stats */}
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex flex-col gap-4">
                      <CardTitle>Team Stats Dashboard</CardTitle>
                      <div className="flex flex-col sm:flex-row gap-4">
                        {/* Team Selection */}
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">Team:</span>
                          <Select value={selectedTeam} onValueChange={handleTeamChange}>
                            <SelectTrigger className="w-[200px]">
                              <SelectValue placeholder="Select team" />
                            </SelectTrigger>
                            <SelectContent>
                              {teamOptions.map(team => (
                                <SelectItem key={team.id} value={team.id}>
                                  {team.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        {/* Member Selection - only show if a specific team is selected */}
                        {selectedTeam !== 'all' && (
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">Member:</span>
                            <Select value={selectedTeamMember} onValueChange={setSelectedTeamMember}>
                              <SelectTrigger className="w-[200px]">
                                <SelectValue placeholder="Select member" />
                              </SelectTrigger>
                              <SelectContent>
                                {availableMembers.map(member => (
                                  <SelectItem key={member.id} value={member.id}>
                                    {member.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        )}
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

export default ListingSupportDashboard;
