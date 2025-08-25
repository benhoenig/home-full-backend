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
const revenueData = [
  { month: 'Jan', "2023": 120000, "2024": 157000 },
  { month: 'Feb', "2023": 135000, "2024": 163000 },
  { month: 'Mar', "2023": 142000, "2024": 172000 },
  { month: 'Apr', "2023": 138000, "2024": 181000 },
  { month: 'May', "2023": 152000, "2024": 190000 },
  { month: 'Jun', "2023": 165000, "2024": 205000 },
  { month: 'Jul', "2023": 171000, "2024": 218000 },
  { month: 'Aug', "2023": 179000, "2024": 224000 },
  { month: 'Sep', "2023": 183000, "2024": 0 },
  { month: 'Oct', "2023": 195000, "2024": 0 },
  { month: 'Nov', "2023": 206000, "2024": 0 },
  { month: 'Dec', "2023": 218000, "2024": 0 },
];

const quarterlyData = [
  { quarter: 'Q1', "2023": 397000, "2024": 492000 },
  { quarter: 'Q2', "2023": 455000, "2024": 576000 },
  { quarter: 'Q3', "2023": 533000, "2024": 442000 },
  { quarter: 'Q4', "2023": 619000, "2024": 0 },
];

const RevenueChart = () => {
  const [timeframe, setTimeframe] = useState<'quarterly' | 'monthly'>('monthly');
  const [yearFilter, setYearFilter] = useState<'both' | '2023' | '2024'>('both');
  
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
  const chartData = timeframe === 'quarterly' ? quarterlyData : revenueData;
  const xAxisKey = timeframe === 'quarterly' ? 'quarter' : 'month';
  
  // Calculate totals and growth
  const totals = {
    "2023": chartData.reduce((sum, item) => sum + (item["2023"] || 0), 0),
    "2024": chartData.reduce((sum, item) => sum + (item["2024"] || 0), 0),
  };
  
  const growth = ((totals["2024"] / totals["2023"]) - 1) * 100;
  
  // Determine which lines to show based on filter
  const showLine2023 = yearFilter === 'both' || yearFilter === '2023';
  const showLine2024 = yearFilter === 'both' || yearFilter === '2024';
  
  return (
    <Card className="h-full overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Revenue Trends :</h3>
          <div className="flex items-center gap-2">
            <ToggleGroup 
              type="single" 
              value={yearFilter} 
              onValueChange={(value) => {
                if (value) setYearFilter(value as 'both' | '2023' | '2024');
              }}
              className="bg-background border rounded-md"
            >
              <ToggleGroupItem value="both" aria-label="View all years" size="sm" className="text-xs">
                <span>All</span>
              </ToggleGroupItem>
              <ToggleGroupItem value="2023" aria-label="2023 only" size="sm" className="text-xs">
                <span>2023</span>
              </ToggleGroupItem>
              <ToggleGroupItem value="2024" aria-label="2024 only" size="sm" className="text-xs">
                <span>2024</span>
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
              {showLine2023 && (
                <Line
                  type="monotone"
                  dataKey="2023"
                  stroke="#94a3b8"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                  name="2023"
                />
              )}
              {showLine2024 && (
                <Line
                  type="monotone"
                  dataKey="2024"
                  stroke="#0d9488"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                  name="2024"
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        {/* Summary Stats Container - Moved below the chart */}
        <div className="grid grid-cols-3 gap-2 mt-2 mx-6 bg-slate-50 p-3 rounded-md border overflow-hidden text-center">
          <div className="overflow-hidden">
            <div className="text-xs text-muted-foreground truncate">2023 Total</div>
            <div className="text-sm font-semibold truncate">{formatCurrency(totals["2023"])}</div>
          </div>
          <div className="overflow-hidden">
            <div className="text-xs text-muted-foreground truncate">2024 Total</div>
            <div className="text-sm font-semibold truncate">{formatCurrency(totals["2024"])}</div>
          </div>
          <div className="overflow-hidden">
            <div className="text-xs text-muted-foreground truncate">Growth</div>
            <div className="text-sm font-semibold text-teal-600 truncate">+{growth.toFixed(1)}%</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RevenueChart; 