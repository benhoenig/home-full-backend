import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { CartesianGrid, Line, LineChart, XAxis, YAxis, ResponsiveContainer } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

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

// Chart component
const RevenueChart = () => {
  const [timeframe, setTimeframe] = useState<'quarterly' | 'monthly'>('monthly');
  const [yearFilter, setYearFilter] = useState<'both' | '2023' | '2024'>('both');
  
  // Format the currency on the tooltip
  const formatTooltipValue = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };
  
  // Format quarters if quarterly view is selected
  const getQuarterlyData = () => {
    return [
      { quarter: 'Q1', "2023": 397000, "2024": 492000 },
      { quarter: 'Q2', "2023": 455000, "2024": 576000 },
      { quarter: 'Q3', "2023": 533000, "2024": 442000 },
      { quarter: 'Q4', "2023": 619000, "2024": 0 },
    ];
  };
  
  const chartData = timeframe === 'quarterly' ? getQuarterlyData() : revenueData;
  const xAxisKey = timeframe === 'quarterly' ? 'quarter' : 'month';
  
  // Calculate year totals for summary
  const totals = {
    "2023": chartData.reduce((sum, item) => sum + (item["2023"] || 0), 0),
    "2024": chartData.reduce((sum, item) => sum + (item["2024"] || 0), 0),
  };
  
  const growth = ((totals["2024"] / totals["2023"]) - 1) * 100;
  
  // Chart configuration for shadcn/ui Chart
  const chartConfig: ChartConfig = {
    "2023": {
      label: "2023",
      color: "#94a3b8",
    },
    "2024": {
      label: "2024",
      color: "#0d9488",
    },
  };

  // Filter chart data based on yearFilter
  const getVisibleDataKeys = () => {
    if (yearFilter === 'both') return ["2023", "2024"];
    return [yearFilter];
  };
  
  const visibleDataKeys = getVisibleDataKeys();
  
  return (
    <Card className="h-full data-card">
      <CardHeader className="relative pb-2">
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
      <CardContent>
        {/* Summary Stats Container */}
        <div className="grid grid-cols-3 gap-2 mb-6 mt-2 mx-1 bg-slate-50 p-3 rounded-md border w-full overflow-hidden text-center">
          <div className="overflow-hidden">
            <div className="text-xs text-muted-foreground truncate">2023 Total</div>
            <div className="text-sm font-semibold truncate">{formatTooltipValue(totals["2023"])}</div>
          </div>
          <div className="overflow-hidden">
            <div className="text-xs text-muted-foreground truncate">2024 Total</div>
            <div className="text-sm font-semibold truncate">{formatTooltipValue(totals["2024"])}</div>
          </div>
          <div className="overflow-hidden">
            <div className="text-xs text-muted-foreground truncate">Growth</div>
            <div className="text-sm font-semibold text-teal-600 truncate">+{growth.toFixed(1)}%</div>
          </div>
        </div>
        
        {/* Chart Container */}
        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height={250}>
            <ChartContainer config={chartConfig} className="h-full" id="revenue-chart">
              <LineChart
                accessibilityLayer
                data={chartData}
                margin={{
                  top: 5,
                  right: 5,
                  left: 25,
                  bottom: 5,
                }}
              >
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis
                  dataKey={xAxisKey}
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  fontSize={11}
                />
                <YAxis 
                  tickFormatter={(value) => `$${value / 1000}k`}
                  axisLine={false}
                  tickLine={false}
                  tickMargin={8}
                  fontSize={11}
                  width={50}
                />
                <ChartTooltip
                  cursor={false}
                  content={
                    <ChartTooltipContent 
                      indicator="line" 
                      formatter={(value) => formatTooltipValue(value as number)}
                    />
                  }
                />
                {visibleDataKeys.includes("2023") && (
                  <Line
                    dataKey="2023"
                    type="monotone"
                    stroke="var(--color-2023)"
                    strokeWidth={2}
                    dot={{
                      r: 3,
                      fill: "var(--color-2023)",
                    }}
                    activeDot={{
                      r: 5,
                      stroke: "var(--color-2023)",
                      strokeWidth: 2,
                    }}
                  />
                )}
                {visibleDataKeys.includes("2024") && (
                  <Line
                    dataKey="2024"
                    type="monotone"
                    stroke="var(--color-2024)"
                    strokeWidth={2}
                    dot={{
                      r: 3,
                      fill: "var(--color-2024)",
                    }}
                    activeDot={{
                      r: 5,
                      stroke: "var(--color-2024)",
                      strokeWidth: 2,
                    }}
                  />
                )}
              </LineChart>
            </ChartContainer>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default RevenueChart; 