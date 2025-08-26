import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingUp, TrendingDown, Minus, BarChart3, Table2, CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';

// Mock team data
const teamMembers = [
  { id: 'alex', name: 'Alex Johnson', multiplier: 0.85 },
  { id: 'sarah', name: 'Sarah Williams', multiplier: 1.2 },
  { id: 'michael', name: 'Michael Brown', multiplier: 0.7 },
  { id: 'emma', name: 'Emma Davis', multiplier: 0.9 },
  { id: 'david', name: 'David Chen', multiplier: 0.8 },
];

const pipelineStages = [
  { name: 'Listings', baseActions: 85, color: '#f0fdfa' },
  { name: 'Consults', baseActions: 142, color: '#ccfbf1' },
  { name: 'A-List', baseActions: 78, color: '#99f6e4' },
  { name: 'Exclusives', baseActions: 52, color: '#5eead4' },
  { name: 'Leads', baseActions: 320, color: '#2dd4bf' },
  { name: 'Follow-ups', baseActions: 680, color: '#14b8a6' },
  { name: 'Appointments', baseActions: 156, color: '#0d9488' },
  { name: 'Showings', baseActions: 89, color: '#0f766e' },
  { name: 'Negotiations', baseActions: 124, color: '#115e59' },
  { name: 'Closings', baseActions: 47, color: '#134e4a' },
  { name: 'Bank Process', baseActions: 42, color: '#1e3a3a' },
  { name: 'Wins', baseActions: 38, color: '#0f2419' },
];

const TeamPipelineOverview: React.FC = () => {
  const [viewMode, setViewMode] = useState<'table' | 'chart'>('table');
  const [dateRange, setDateRange] = useState<string>('thisMonth');
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [customDateOpen, setCustomDateOpen] = useState(false);

  // Generate team data with date filtering
  const getTeamData = (dateRange?: string, startDate?: Date, endDate?: Date) => {
    // Apply date range filtering (mock different data for different periods)
    let periodMultiplier = 1;
    if (dateRange === 'thisWeek') {
      periodMultiplier = 0.25; // 25% of monthly data
    } else if (dateRange === 'lastWeek') {
      periodMultiplier = 0.3;
    } else if (dateRange === 'thisMonth') {
      periodMultiplier = 1;
    } else if (dateRange === 'lastMonth') {
      periodMultiplier = 0.85;
    } else if (dateRange === 'thisQuarter') {
      periodMultiplier = 2.8;
    } else if (dateRange === 'lastQuarter') {
      periodMultiplier = 2.5;
    } else if (dateRange === 'thisYear') {
      periodMultiplier = 11;
    } else if (dateRange === 'custom' && startDate && endDate) {
      // Calculate multiplier based on date range (mock)
      const daysDiff = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24));
      periodMultiplier = daysDiff / 30; // Assuming 30 days as base
    }

    return teamMembers.map(member => ({
      ...member,
      stages: pipelineStages.map(stage => ({
        ...stage,
        actions: Math.round(stage.baseActions * member.multiplier * periodMultiplier)
      })),
      totalActions: pipelineStages.reduce((sum, stage) => sum + Math.round(stage.baseActions * member.multiplier * periodMultiplier), 0)
    }));
  };

  const teamData = getTeamData(dateRange, startDate, endDate);
  const maxActionsPerStage = pipelineStages.map((_, stageIndex) => 
    Math.max(...teamData.map(member => member.stages[stageIndex].actions))
  );

  // Table View Component
  const TableView = () => (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="text-left p-3 font-medium">Team Member</th>
            {pipelineStages.map(stage => (
              <th key={stage.name} className="text-center p-2 font-medium text-xs min-w-[80px]">
                {stage.name}
              </th>
            ))}
            <th className="text-center p-3 font-medium">Total</th>
            <th className="text-center p-3 font-medium">Total Scores</th>
          </tr>
        </thead>
        <tbody>
          {teamData.map(member => {
            const memberTotalScore = member.stages.reduce((sum, stage, stageIndex) => sum + (stage.actions * (12 - stageIndex)), 0);
            return (
              <tr key={member.id} className="border-b hover:bg-gray-50">
                <td className="p-3 font-medium">{member.name}</td>
                {member.stages.map((stage, stageIndex) => {
                  const max = maxActionsPerStage[stageIndex];
                  const percentage = (stage.actions / max) * 100;
                  return (
                    <td key={stage.name} className="p-2 text-center">
                      <div className="flex flex-col items-center gap-1">
                        <div className="text-sm font-medium">{stage.actions}</div>
                        <div className="w-full bg-gray-200 rounded-full h-1">
                          <div 
                            className="h-1 rounded-full transition-all duration-300"
                            style={{ 
                              width: `${percentage}%`,
                              backgroundColor: stage.color 
                            }}
                          />
                        </div>
                      </div>
                    </td>
                  );
                })}
                <td className="p-3 text-center">
                  <Badge variant="outline" className="font-medium">
                    {member.totalActions}
                  </Badge>
                </td>
                <td className="p-3 text-center">
                  <Badge className="font-medium bg-teal-600 hover:bg-teal-700">
                    {memberTotalScore}
                  </Badge>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  // Chart View Component
  const ChartView = () => (
    <div className="space-y-6">
      {pipelineStages.map((stage, stageIndex) => {
        const maxForStage = maxActionsPerStage[stageIndex];
        return (
          <div key={stage.name} className="border rounded-lg p-4">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-medium">{stage.name}</h4>
              <div className="text-sm text-muted-foreground">
                Max: {maxForStage} actions
              </div>
            </div>
            <div className="space-y-2">
              {teamData.map(member => {
                const actions = member.stages[stageIndex].actions;
                const stageScore = actions * (12 - stageIndex);
                const percentage = (actions / maxForStage) * 100;
                return (
                  <div key={member.id} className="flex items-center gap-4">
                    <div className="w-24 text-sm">{member.name}</div>
                    <div className="flex-1 relative">
                      <div className="w-full bg-gray-200 rounded-full h-6">
                        <div
                          className="h-6 rounded-full transition-all duration-500 flex items-center justify-between px-2"
                          style={{
                            width: `${percentage}%`,
                            backgroundColor: stage.color,
                            minWidth: actions > 0 ? '60px' : '0'
                          }}
                        >
                          <span className="text-xs font-medium text-gray-700">
                            {actions}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="w-12 text-right text-sm font-medium">
                      {actions}
                    </div>
                    <div className="w-16 text-right">
                      <Badge className="text-xs bg-teal-600 hover:bg-teal-700">
                        {stageScore}
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-semibold">Team Pipeline Overview</CardTitle>
            <div className="text-sm text-muted-foreground">
              All Team Members • Pipeline Activity Comparison
            </div>
          </div>
          <div className="flex items-center gap-4">
            {/* Date Range Filter */}
            <div className="flex items-center gap-2">
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="thisWeek">This Week</SelectItem>
                  <SelectItem value="lastWeek">Last Week</SelectItem>
                  <SelectItem value="thisMonth">This Month</SelectItem>
                  <SelectItem value="lastMonth">Last Month</SelectItem>
                  <SelectItem value="thisQuarter">This Quarter</SelectItem>
                  <SelectItem value="lastQuarter">Last Quarter</SelectItem>
                  <SelectItem value="thisYear">This Year</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
              
              {dateRange === 'custom' && (
                <Popover open={customDateOpen} onOpenChange={setCustomDateOpen}>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-[200px] justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate && endDate ? (
                        `${format(startDate, 'MMM dd')} - ${format(endDate, 'MMM dd')}`
                      ) : (
                        <span>Pick dates</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="end">
                    <div className="p-3">
                      <div className="space-y-2">
                        <div className="text-sm font-medium">Start Date</div>
                        <Calendar
                          mode="single"
                          selected={startDate}
                          onSelect={setStartDate}
                          disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                          initialFocus
                        />
                        <div className="text-sm font-medium">End Date</div>
                        <Calendar
                          mode="single"
                          selected={endDate}
                          onSelect={setEndDate}
                          disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                        />
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              )}
            </div>

            {/* View Mode Toggle */}
            <div className="flex gap-2">
              <Button
                variant={viewMode === 'table' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('table')}
              >
                <Table2 className="h-4 w-4 mr-1" />
                Table
              </Button>
              <Button
                variant={viewMode === 'chart' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('chart')}
              >
                <BarChart3 className="h-4 w-4 mr-1" />
                Chart
              </Button>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {viewMode === 'table' && <TableView />}
        {viewMode === 'chart' && <ChartView />}
        
        {/* Summary Stats */}
        <div className="mt-6 pt-4 border-t grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
          <div className="text-center">
            <div className="font-semibold text-teal-600">
              {teamData.reduce((sum, member) => sum + member.totalActions, 0)}
            </div>
            <div className="text-muted-foreground">Total Team Actions</div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-teal-700">
              {teamData.reduce((sum, member) => sum + member.stages.reduce((stageSum, stage, stageIndex) => stageSum + (stage.actions * (12 - stageIndex)), 0), 0)}
            </div>
            <div className="text-muted-foreground">Total Action Scores</div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-teal-500">
              {Math.round(teamData.reduce((sum, member) => sum + member.totalActions, 0) / teamData.length)}
            </div>
            <div className="text-muted-foreground">Avg per Member</div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-teal-400">
              {Math.round(teamData.reduce((sum, member) => sum + member.stages.reduce((stageSum, stage, stageIndex) => stageSum + (stage.actions * (12 - stageIndex)), 0), 0) / teamData.length)}
            </div>
            <div className="text-muted-foreground">Avg Scores per Member</div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-teal-800">
              {teamData.find(m => m.totalActions === Math.max(...teamData.map(member => member.totalActions)))?.name}
            </div>
            <div className="text-muted-foreground">Top Performer</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TeamPipelineOverview;
