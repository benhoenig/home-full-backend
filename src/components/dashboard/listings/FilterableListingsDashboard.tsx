import React, { useState } from 'react';
import ListingsSummaryCard from './ListingsSummaryCard';
import MetricsDistributionCard from './MetricsDistributionCard';
import ListingsTable from './ListingsTable';
import PerformanceAnalytics from './PerformanceAnalytics';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

interface FilterableListingsDashboardProps {
  isTeamView?: boolean;
}

const FilterableListingsDashboard: React.FC<FilterableListingsDashboardProps> = ({ 
  isTeamView = false 
}) => {
  const [selectedTeam, setSelectedTeam] = useState<string>('all');
  const [selectedMember, setSelectedMember] = useState<string>('all');

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
    setSelectedMember('all');
  };

  return (
    <div className="space-y-6">
      {/* Team and Member Filter - only show for team view */}
      {isTeamView && (
        <Card>
          <CardHeader className="pb-3">
            <div className="flex flex-col gap-4">
              <CardTitle>Team Listings Dashboard</CardTitle>
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
                    <Select value={selectedMember} onValueChange={setSelectedMember}>
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
              {selectedTeam !== 'all' && selectedMember !== 'all' && (
                <div className="text-sm text-muted-foreground">
                  Showing listings for: <span className="font-medium">{availableMembers.find(m => m.id === selectedMember)?.name}</span> in <span className="font-medium">{teamsData[selectedTeam as keyof typeof teamsData].name}</span>
                </div>
              )}
            </div>
          </CardHeader>
        </Card>
      )}

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

export default FilterableListingsDashboard;
