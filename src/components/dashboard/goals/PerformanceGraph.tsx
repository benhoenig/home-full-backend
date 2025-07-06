import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// Mock data for performance graphs
const mockRevenueData = [
  { month: 'Jan', personal: 1200000, teamAvg: 980000, topPerformer: 1450000 },
  { month: 'Feb', personal: 950000, teamAvg: 1050000, topPerformer: 1600000 },
  { month: 'Mar', personal: 1100000, teamAvg: 1100000, topPerformer: 1700000 },
  { month: 'Apr', personal: 1300000, teamAvg: 1150000, topPerformer: 1750000 },
  { month: 'May', personal: 1250000, teamAvg: 1200000, topPerformer: 1800000 },
  { month: 'Jun', personal: 1400000, teamAvg: 1250000, topPerformer: 1900000 },
];

const mockKpiData = {
  'new-list': [
    { month: 'Jan', personal: 3, teamAvg: 2.5, topPerformer: 5 },
    { month: 'Feb', personal: 4, teamAvg: 2.7, topPerformer: 6 },
    { month: 'Mar', personal: 2, teamAvg: 2.8, topPerformer: 5 },
    { month: 'Apr', personal: 3, teamAvg: 3.0, topPerformer: 7 },
    { month: 'May', personal: 5, teamAvg: 3.2, topPerformer: 6 },
    { month: 'Jun', personal: 4, teamAvg: 3.5, topPerformer: 8 },
  ],
  'consult': [
    { month: 'Jan', personal: 8, teamAvg: 6.5, topPerformer: 12 },
    { month: 'Feb', personal: 10, teamAvg: 7.0, topPerformer: 14 },
    { month: 'Mar', personal: 7, teamAvg: 7.2, topPerformer: 13 },
    { month: 'Apr', personal: 9, teamAvg: 7.5, topPerformer: 15 },
    { month: 'May', personal: 11, teamAvg: 8.0, topPerformer: 16 },
    { month: 'Jun', personal: 10, teamAvg: 8.2, topPerformer: 17 },
  ],
  'survey': [
    { month: 'Jan', personal: 5, teamAvg: 4.0, topPerformer: 8 },
    { month: 'Feb', personal: 6, teamAvg: 4.2, topPerformer: 9 },
    { month: 'Mar', personal: 4, teamAvg: 4.5, topPerformer: 8 },
    { month: 'Apr', personal: 7, teamAvg: 4.8, topPerformer: 10 },
    { month: 'May', personal: 6, teamAvg: 5.0, topPerformer: 11 },
    { month: 'Jun', personal: 8, teamAvg: 5.2, topPerformer: 12 },
  ],
  'buyer-review': [
    { month: 'Jan', personal: 4, teamAvg: 3.0, topPerformer: 6 },
    { month: 'Feb', personal: 3, teamAvg: 3.2, topPerformer: 7 },
    { month: 'Mar', personal: 5, teamAvg: 3.5, topPerformer: 8 },
    { month: 'Apr', personal: 6, teamAvg: 3.8, topPerformer: 9 },
    { month: 'May', personal: 4, teamAvg: 4.0, topPerformer: 8 },
    { month: 'Jun', personal: 7, teamAvg: 4.2, topPerformer: 10 },
  ],
  'owner-review': [
    { month: 'Jan', personal: 3, teamAvg: 2.0, topPerformer: 5 },
    { month: 'Feb', personal: 2, teamAvg: 2.2, topPerformer: 4 },
    { month: 'Mar', personal: 4, teamAvg: 2.5, topPerformer: 6 },
    { month: 'Apr', personal: 3, teamAvg: 2.8, topPerformer: 5 },
    { month: 'May', personal: 5, teamAvg: 3.0, topPerformer: 7 },
    { month: 'Jun', personal: 4, teamAvg: 3.2, topPerformer: 6 },
  ],
  'skillset': [
    { month: 'Jan', personal: 75, teamAvg: 70, topPerformer: 90 },
    { month: 'Feb', personal: 78, teamAvg: 72, topPerformer: 92 },
    { month: 'Mar', personal: 80, teamAvg: 74, topPerformer: 93 },
    { month: 'Apr', personal: 82, teamAvg: 76, topPerformer: 94 },
    { month: 'May', personal: 85, teamAvg: 78, topPerformer: 95 },
    { month: 'Jun', personal: 88, teamAvg: 80, topPerformer: 96 },
  ],
  'action-score': [
    { month: 'Jan', personal: 65, teamAvg: 60, topPerformer: 85 },
    { month: 'Feb', personal: 70, teamAvg: 62, topPerformer: 87 },
    { month: 'Mar', personal: 68, teamAvg: 64, topPerformer: 88 },
    { month: 'Apr', personal: 72, teamAvg: 66, topPerformer: 90 },
    { month: 'May', personal: 75, teamAvg: 68, topPerformer: 92 },
    { month: 'Jun', personal: 78, teamAvg: 70, topPerformer: 94 },
  ],
};

// Helper function to calculate target based on setting type and current performance
export const calculateTargetValue = (
  settingType: string,
  goalType: string,
  kpiType: string | undefined,
  timelineType: string
): string => {
  if (goalType === 'target-revenue') {
    // Get the latest month's revenue
    const latestRevenue = mockRevenueData[mockRevenueData.length - 1].personal;
    
    switch (settingType) {
      case 'maintain':
        return latestRevenue.toString();
      case 'boost':
        return Math.round(latestRevenue * 1.15).toString(); // 15% increase
      case 'supercharge':
        return Math.round(latestRevenue * 2).toString(); // Double
      default:
        return latestRevenue.toString();
    }
  } else if (goalType === 'kpi' && kpiType) {
    const kpiData = mockKpiData[kpiType as keyof typeof mockKpiData];
    if (!kpiData) return '0';
    
    const latestValue = kpiData[kpiData.length - 1].personal;
    
    switch (settingType) {
      case 'maintain':
        return latestValue.toString();
      case 'boost':
        // For percentage-based KPIs (skillset, action-score)
        if (kpiType === 'skillset' || kpiType === 'action-score') {
          const boostedValue = Math.min(Math.round(latestValue * 1.1), 100); // 10% increase, max 100
          return boostedValue.toString();
        } else {
          // For count-based KPIs
          return Math.round(latestValue * 1.25).toString(); // 25% increase
        }
      case 'supercharge':
        // For percentage-based KPIs (skillset, action-score)
        if (kpiType === 'skillset' || kpiType === 'action-score') {
          const superchargedValue = Math.min(Math.round(latestValue * 1.2), 100); // 20% increase, max 100
          return superchargedValue.toString();
        } else {
          // For count-based KPIs
          return Math.round(latestValue * 2).toString(); // Double
        }
      default:
        return latestValue.toString();
    }
  }
  
  return '0';
};

// Helper function to get the appropriate data for the selected KPI type
const getKpiData = (kpiType: string | undefined) => {
  if (!kpiType) return mockKpiData['new-list'];
  return mockKpiData[kpiType as keyof typeof mockKpiData] || mockKpiData['new-list'];
};

// Helper function to format numbers
const formatNumber = (value: number): string => {
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(1)}M`;
  } else if (value >= 1000) {
    return `$${(value / 1000).toFixed(0)}K`;
  }
  return value.toString();
};

type PerformanceGraphProps = {
  goalType: string;
  kpiType?: string;
  onPreviousValueChange?: (value: number) => void;
};

const PerformanceGraph: React.FC<PerformanceGraphProps> = ({ 
  goalType,
  kpiType,
  onPreviousValueChange
}) => {
  const [viewType, setViewType] = useState<'personal' | 'team'>('personal');
  
  // Determine which data to use based on goal type
  const data = goalType === 'target-revenue' ? mockRevenueData : getKpiData(kpiType);
  
  // Get the latest performance value
  const latestValue = data[data.length - 1].personal;
  
  // Notify parent component of the latest value
  React.useEffect(() => {
    if (onPreviousValueChange) {
      onPreviousValueChange(latestValue);
    }
  }, [latestValue, onPreviousValueChange]);
  
  // Format Y-axis ticks
  const formatYAxis = (value: number) => {
    if (goalType === 'target-revenue') {
      return formatNumber(value);
    }
    return value.toString();
  };
  
  // Get chart title
  const getChartTitle = () => {
    if (goalType === 'target-revenue') {
      return 'Revenue Performance';
    } else if (goalType === 'kpi') {
      switch (kpiType) {
        case 'new-list': return 'New Listings Performance';
        case 'consult': return 'Consultations Performance';
        case 'survey': return 'Surveys Performance';
        case 'buyer-review': return 'Buyer Reviews Performance';
        case 'owner-review': return 'Owner Reviews Performance';
        case 'skillset': return 'Skillset Score Performance';
        case 'action-score': return 'Action Score Performance';
        default: return 'KPI Performance';
      }
    }
    return 'Performance History';
  };
  
  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">{getChartTitle()}</CardTitle>
          <Tabs value={viewType} onValueChange={(v) => setViewType(v as 'personal' | 'team')}>
            <TabsList className="h-8">
              <TabsTrigger value="personal" className="text-xs">Personal</TabsTrigger>
              <TabsTrigger value="team" className="text-xs">Team Comparison</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={formatYAxis} />
              <Tooltip 
                formatter={(value) => {
                  if (goalType === 'target-revenue') {
                    return [`$${Number(value).toLocaleString()}`, ''];
                  }
                  return [value, ''];
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="personal" 
                name="Your Performance" 
                stroke="#3b82f6" 
                strokeWidth={2} 
                activeDot={{ r: 8 }} 
              />
              {viewType === 'team' && (
                <>
                  <Line 
                    type="monotone" 
                    dataKey="teamAvg" 
                    name="Team Average" 
                    stroke="#6b7280" 
                    strokeDasharray="5 5" 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="topPerformer" 
                    name="Top Performer" 
                    stroke="#10b981" 
                  />
                </>
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4 p-3 bg-muted/30 rounded-md">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium">Latest Performance</p>
              <p className="text-2xl font-bold">
                {goalType === 'target-revenue' ? `$${latestValue.toLocaleString()}` : latestValue}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">Compared to Team Avg</p>
              {latestValue > data[data.length - 1].teamAvg ? (
                <p className="text-green-600 font-medium">
                  +{Math.round((latestValue / data[data.length - 1].teamAvg - 1) * 100)}% Above
                </p>
              ) : (
                <p className="text-red-600 font-medium">
                  {Math.round((latestValue / data[data.length - 1].teamAvg - 1) * 100)}% Below
                </p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceGraph; 