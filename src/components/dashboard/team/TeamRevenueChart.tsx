import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

// Sample data for the chart
const teamMonthlyData = [
  { month: 'Jan', "Team Total": 1200000, "Top Performer": 420000, "Average": 240000 },
  { month: 'Feb', "Team Total": 1300000, "Top Performer": 450000, "Average": 260000 },
  { month: 'Mar', "Team Total": 1400000, "Top Performer": 480000, "Average": 280000 },
  { month: 'Apr', "Team Total": 1450000, "Top Performer": 500000, "Average": 290000 },
  { month: 'May', "Team Total": 1520000, "Top Performer": 520000, "Average": 304000 },
  { month: 'Jun', "Team Total": 1600000, "Top Performer": 550000, "Average": 320000 },
  { month: 'Jul', "Team Total": 1650000, "Top Performer": 570000, "Average": 330000 },
  { month: 'Aug', "Team Total": 1700000, "Top Performer": 590000, "Average": 340000 },
  { month: 'Sep', "Team Total": 0, "Top Performer": 0, "Average": 0 },
  { month: 'Oct', "Team Total": 0, "Top Performer": 0, "Average": 0 },
  { month: 'Nov', "Team Total": 0, "Top Performer": 0, "Average": 0 },
  { month: 'Dec', "Team Total": 0, "Top Performer": 0, "Average": 0 },
];

const teamQuarterlyData = [
  { quarter: 'Q1', "Team Total": 3900000, "Top Performer": 1350000, "Average": 780000 },
  { quarter: 'Q2', "Team Total": 4570000, "Top Performer": 1570000, "Average": 914000 },
  { quarter: 'Q3', "Team Total": 3350000, "Top Performer": 1160000, "Average": 670000 },
  { quarter: 'Q4', "Team Total": 0, "Top Performer": 0, "Average": 0 },
];

const TeamRevenueChart = () => {
  const [timeframe, setTimeframe] = useState<'quarterly' | 'monthly'>('monthly');
  const [dataView, setDataView] = useState<'all' | 'total' | 'individual'>('all');
  
  // Format currency for display
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };
  
  // Get the appropriate data based on timeframe
  const chartData = timeframe === 'quarterly' ? teamQuarterlyData : teamMonthlyData;
  const xAxisKey = timeframe === 'quarterly' ? 'quarter' : 'month';
  
  // Calculate totals
  const totals = {
    "Team Total": chartData.reduce((sum, item) => sum + (item["Team Total"] || 0), 0),
    "Top Performer": chartData.reduce((sum, item) => sum + (item["Top Performer"] || 0), 0),
    "Average": chartData.reduce((sum, item) => sum + (item["Average"] || 0), 0),
  };
  
  return (
    <Card className="h-full overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Team Revenue Trends :</h3>
          <div className="flex items-center gap-2">
            <ToggleGroup 
              type="single" 
              value={dataView} 
              onValueChange={(value) => {
                if (value) setDataView(value as 'all' | 'total' | 'individual');
              }}
              className="bg-background border rounded-md"
            >
              <ToggleGroupItem value="all" aria-label="View all data" size="sm" className="text-xs">
                <span>All</span>
              </ToggleGroupItem>
              <ToggleGroupItem value="total" aria-label="Total only" size="sm" className="text-xs">
                <span>Total</span>
              </ToggleGroupItem>
              <ToggleGroupItem value="individual" aria-label="Individual" size="sm" className="text-xs">
                <span>Individual</span>
              </ToggleGroupItem>
            </ToggleGroup>
            <ToggleGroup 
              type="single" 
              value={timeframe} 
              onValueChange={(value) => {
                if (value) setTimeframe(value as 'quarterly' | 'monthly');
              }}
              className="bg-background border rounded-md"
            >
              <ToggleGroupItem value="monthly" aria-label="Monthly view" size="sm" className="text-xs">
                <span>M</span>
              </ToggleGroupItem>
              <ToggleGroupItem value="quarterly" aria-label="Quarterly view" size="sm" className="text-xs">
                <span>Q</span>
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0 pb-8">
        {/* Chart Container */}
        <div style={{ width: '100%', height: 240, paddingRight: '10px' }}>
          <ResponsiveContainer>
            <LineChart
              data={chartData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 15,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey={xAxisKey} 
                tick={{ fontSize: 12 }}
                tickLine={false}
                dy={10}
              />
              <YAxis 
                tickFormatter={(value) => `$${value / 1000}k`}
                tick={{ fontSize: 12 }}
                tickLine={false}
                width={60}
              />
              <Tooltip 
                formatter={(value) => formatCurrency(value as number)}
                labelFormatter={(label) => timeframe === 'quarterly' ? `Quarter ${label.substring(1)}` : label}
                contentStyle={{ 
                  borderRadius: '6px',
                  padding: '8px',
                  backgroundColor: '#fff',
                  boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)'
                }}
              />
              <Legend wrapperStyle={{ paddingTop: '5px', marginBottom: '5px' }} />
              {(dataView === 'all' || dataView === 'total') && (
                <Line
                  type="monotone"
                  dataKey="Team Total"
                  stroke="#0d9488"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                />
              )}
              {(dataView === 'all' || dataView === 'individual') && (
                <Line
                  type="monotone"
                  dataKey="Top Performer"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                />
              )}
              {(dataView === 'all' || dataView === 'individual') && (
                <Line
                  type="monotone"
                  dataKey="Average"
                  stroke="#94a3b8"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        {/* Summary Stats Container */}
        <div className="grid grid-cols-3 gap-2 mt-2 mx-6 bg-slate-50 p-3 rounded-md border overflow-hidden text-center">
          <div className="overflow-hidden">
            <div className="text-xs text-muted-foreground truncate">Team Total</div>
            <div className="text-sm font-semibold truncate text-teal-600">{formatCurrency(totals["Team Total"])}</div>
          </div>
          <div className="overflow-hidden">
            <div className="text-xs text-muted-foreground truncate">Top Performer</div>
            <div className="text-sm font-semibold truncate text-blue-600">{formatCurrency(totals["Top Performer"])}</div>
          </div>
          <div className="overflow-hidden">
            <div className="text-xs text-muted-foreground truncate">Average</div>
            <div className="text-sm font-semibold truncate">{formatCurrency(totals["Average"])}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TeamRevenueChart; 