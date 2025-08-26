import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { TrendingUp, TrendingDown, Minus, CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';

interface CompletePipelineFunnelProps {
  selectedMember?: string;
}

// Pipeline actions taken by salesperson in selected timeframe
const getPipelineData = (memberKey: string = 'all', dateRange?: string, startDate?: Date, endDate?: Date) => {
  const baseData = [
    { name: 'Listings Added', actions: 85, revenue: 0, description: 'New properties listed', color: '#f0fdfa' },
    { name: 'Consultations', actions: 142, revenue: 0, description: 'Owner consultations held', color: '#ccfbf1' },
    { name: 'A-List Created', actions: 78, revenue: 0, description: 'A-List proposals made', color: '#99f6e4' },
    { name: 'Exclusives Signed', actions: 52, revenue: 0, description: 'Exclusive agreements', color: '#5eead4' },
    { name: 'Leads Generated', actions: 320, revenue: 1260000, description: 'New leads acquired', color: '#2dd4bf' },
    { name: 'Follow-ups Made', actions: 680, revenue: 1050000, description: 'Client follow-up calls', color: '#14b8a6' },
    { name: 'Appointments Set', actions: 156, revenue: 840000, description: 'Viewing appointments', color: '#0d9488' },
    { name: 'Showings Done', actions: 89, revenue: 630000, description: 'Property showings', color: '#0f766e' },
    { name: 'Negotiations', actions: 124, revenue: 504000, description: 'Price negotiations', color: '#115e59' },
    { name: 'Closings', actions: 47, revenue: 420000, description: 'Deals closed', color: '#134e4a' },
    { name: 'Bank Processes', actions: 42, revenue: 378000, description: 'Loan facilitations', color: '#1e3a3a' },
    { name: 'Wins', actions: 38, revenue: 342000, description: 'Successful transactions', color: '#0f2419' },
  ];

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

  let adjustedData = baseData.map(item => ({
    ...item,
    actions: Math.round(item.actions * periodMultiplier),
    revenue: Math.round(item.revenue * periodMultiplier)
  }));

  // Adjust values based on selected member (mock variation)
  if (memberKey === 'all') return adjustedData;
  
  const memberMultipliers: Record<string, number> = {
    alex: 0.85,
    sarah: 1.2,
    michael: 0.7,
    emma: 0.9,
    david: 0.8,
  };

  const multiplier = memberMultipliers[memberKey] || 1;
  
  return adjustedData.map((item) => ({
    ...item,
    actions: Math.round(item.actions * multiplier),
    revenue: Math.round(item.revenue * multiplier)
  }));
};

const CompletePipelineFunnel: React.FC<CompletePipelineFunnelProps> = ({ selectedMember = 'all' }) => {
  const [dateRange, setDateRange] = useState<string>('thisMonth');
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [customDateOpen, setCustomDateOpen] = useState(false);

  const data = getPipelineData(selectedMember, dateRange, startDate, endDate);
  const totalRevenue = data.reduce((sum, stage) => sum + stage.revenue, 0);
  
  // Get member name for display
  const memberNames: Record<string, string> = {
    all: 'Team',
    alex: 'Alex Johnson',
    sarah: 'Sarah Williams', 
    michael: 'Michael Brown',
    emma: 'Emma Davis',
    david: 'David Chen'
  };

  // Get max actions for scaling
  const maxActions = Math.max(...data.map(stage => stage.actions));
  
  const getActivityLevel = (actions: number) => {
    const ratio = actions / maxActions;
    if (ratio >= 0.8) return { icon: <TrendingUp className="h-3 w-3 text-green-500" />, level: 'High' };
    if (ratio >= 0.5) return { icon: <Minus className="h-3 w-3 text-yellow-500" />, level: 'Medium' };
    return { icon: <TrendingDown className="h-3 w-3 text-red-500" />, level: 'Low' };
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-semibold">Complete Pipeline Funnel</CardTitle>
            <div className="text-sm text-muted-foreground">
              {memberNames[selectedMember]} • Activity & Performance Tracking
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
            
            <div className="text-right">
              <div className="text-2xl font-bold text-teal-600">
                {totalRevenue.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })}
              </div>
              <div className="text-xs text-muted-foreground">Total Revenue</div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Pipeline Visualization */}
        <div className="space-y-2">
          {data.map((stage, index) => {
            const activityLevel = getActivityLevel(stage.actions);
            const width = (stage.actions / maxActions) * 100;
            
            return (
              <div key={stage.name} className="relative">
                {/* Activity Bar */}
                <div className="flex items-center gap-4 group hover:bg-gray-50 p-2 rounded-lg transition-colors">
                  <div className="w-32 text-sm">
                    <div className="font-medium">{stage.name}</div>
                  </div>
                  
                  {/* Activity Bar */}
                  <div className="flex-1 relative">
                    <div className="w-full bg-gray-100 rounded-full h-6 relative overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-500 relative"
                        style={{ 
                          width: `${width}%`,
                          backgroundColor: stage.color,
                          background: `linear-gradient(90deg, ${stage.color}, ${stage.color}dd)`
                        }}
                      >
                        {/* Action Count Overlay */}
                        <div className={`absolute inset-0 flex items-center justify-center px-3 text-xs font-medium ${
                          index >= 6 ? 'text-white' : 'text-gray-700'
                        }`}>
                          <span>{stage.actions} actions</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Activity Level */}
                  <div className="w-20 flex items-center gap-2">
                    {activityLevel.icon}
                    <span className="text-xs font-medium">{activityLevel.level}</span>
                  </div>
                  
                  {/* Action Count & Score Badges */}
                  <div className="w-32 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Badge variant="outline" className="text-xs">
                        {stage.actions}
                      </Badge>
                      <Badge className="text-xs bg-teal-600 hover:bg-teal-700">
                        {stage.actions * (12 - index)}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Summary Stats */}
        <div className="mt-6 pt-4 border-t grid grid-cols-3 gap-4 text-sm">
          <div className="text-center">
            <div className="font-semibold text-teal-600">{data.reduce((sum, stage) => sum + stage.actions, 0)}</div>
            <div className="text-muted-foreground">Total Actions</div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-teal-700">{data.reduce((sum, stage) => sum + (stage.actions * (12 - data.indexOf(stage))), 0)}</div>
            <div className="text-muted-foreground">Total Action Scores</div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-teal-800">
              {totalRevenue > 0 ? (totalRevenue / (data[data.length - 1]?.actions || 1)).toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }) : '$0'}
            </div>
            <div className="text-muted-foreground">Revenue/Win</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompletePipelineFunnel;
