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

// Mock team members data
const teamMembers = [
  { id: 'all', name: 'All Team Members' },
  { id: 'alex', name: 'Alex Johnson' },
  { id: 'sarah', name: 'Sarah Williams' },
  { id: 'michael', name: 'Michael Brown' },
  { id: 'emma', name: 'Emma Davis' },
  { id: 'david', name: 'David Chen' },
];

interface FilterableListingsDashboardProps {
  isTeamView?: boolean;
}

const FilterableListingsDashboard: React.FC<FilterableListingsDashboardProps> = ({ 
  isTeamView = false 
}) => {
  const [selectedMember, setSelectedMember] = useState<string>('all');

  return (
    <div className="space-y-6">
      {/* Team Member Filter - only show for team view */}
      {isTeamView && (
        <Card>
          <CardHeader className="pb-3">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <CardTitle>Team Listings Dashboard</CardTitle>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Filter by:</span>
                <Select value={selectedMember} onValueChange={setSelectedMember}>
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
            {selectedMember !== 'all' && (
              <div className="text-sm text-muted-foreground">
                Showing listings for: <span className="font-medium">{teamMembers.find(m => m.id === selectedMember)?.name}</span>
              </div>
            )}
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
