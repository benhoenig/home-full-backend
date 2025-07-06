import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Tabs, 
  TabsList, 
  TabsTrigger, 
  TabsContent 
} from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  LineChart as RechartsLineChart, 
  Line, 
  BarChart as RechartsBarChart, 
  Bar, 
  PieChart as RechartsPieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend 
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  Calendar, 
  BarChart2, 
  PieChart as PieChartIcon, 
  LineChart as LineChartIcon, 
  ArrowRight, 
  Download, 
  Share2,
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  AlertCircle
} from 'lucide-react';
import { Goal } from './GoalCard';
import { cn } from '../../../lib/utils';

// Define types for analytics data
export type ProgressPoint = {
  date: string;
  value: number;
};

export type ComparisonData = {
  label: string;
  current: number;
  previous: number;
  change: number;
};

export type BreakdownItem = {
  label: string;
  value: number;
  color: string;
};

export type GoalAnalyticsData = {
  progressHistory: ProgressPoint[];
  comparisons: ComparisonData[];
  breakdown: BreakdownItem[];
  projectedCompletion: string;
  riskLevel: 'low' | 'medium' | 'high';
  recommendations: string[];
};

interface GoalAnalyticsProps {
  data: GoalAnalyticsData;
  goalTitle: string;
}

export const GoalAnalytics: React.FC<GoalAnalyticsProps> = ({ 
  data = {
    progressHistory: [],
    comparisons: [],
    breakdown: [],
    projectedCompletion: 'N/A',
    riskLevel: 'medium',
    recommendations: []
  }, 
  goalTitle = 'Goal Analysis'
}) => {
  const { progressHistory, comparisons, breakdown, projectedCompletion, riskLevel, recommendations } = data;
  
  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case 'high':
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300 flex items-center gap-1">
            <AlertTriangle className="h-3 w-3" />
            <span>High Risk</span>
          </Badge>
        );
      case 'medium':
        return (
          <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-300 flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            <span>Medium Risk</span>
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300 flex items-center gap-1">
            <CheckCircle2 className="h-3 w-3" />
            <span>Low Risk</span>
          </Badge>
        );
    }
  };
  
  const getTrendIcon = (change: number) => {
    if (change > 0) {
      return <TrendingUp className="h-4 w-4 text-green-500" />;
    } else if (change < 0) {
      return <TrendingDown className="h-4 w-4 text-red-500" />;
    } else {
      return <ChevronRight className="h-4 w-4 text-gray-500" />;
    }
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border rounded-md shadow-sm">
          <p className="text-sm font-medium">{`${label}`}</p>
          <p className="text-sm text-gray-600">{`Progress: ${payload[0].value}%`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="shadow-md">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-bold">Goal Analytics</CardTitle>
        <div className="flex items-center justify-between mt-1">
          <span className="text-sm text-gray-500">{goalTitle}</span>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-sm">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span className="text-gray-500">Projected: {projectedCompletion}</span>
            </div>
            {getRiskBadge(riskLevel)}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="progress" className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="progress" className="flex items-center gap-1">
              <LineChartIcon className="h-4 w-4" />
              <span>Progress</span>
            </TabsTrigger>
            <TabsTrigger value="comparison" className="flex items-center gap-1">
              <BarChart2 className="h-4 w-4" />
              <span>Comparison</span>
            </TabsTrigger>
            <TabsTrigger value="breakdown" className="flex items-center gap-1">
              <PieChartIcon className="h-4 w-4" />
              <span>Breakdown</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="progress">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsLineChart
                  data={progressHistory}
                  margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 12 }} 
                    tickLine={false}
                    axisLine={{ stroke: '#e5e7eb' }}
                    interval="preserveStartEnd"
                  />
                  <YAxis 
                    domain={[0, 100]} 
                    tick={{ fontSize: 12 }} 
                    tickLine={false}
                    axisLine={{ stroke: '#e5e7eb' }}
                    tickFormatter={(value) => `${value}%`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#2563eb" 
                    strokeWidth={2}
                    dot={{ r: 3, fill: '#2563eb', strokeWidth: 0 }}
                    activeDot={{ r: 5, stroke: '#2563eb', strokeWidth: 1, fill: '#ffffff' }}
                  />
                </RechartsLineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4">
              <h3 className="text-sm font-medium mb-2">Recommendations</h3>
              <ul className="space-y-1">
                {recommendations && recommendations.map((recommendation, index) => (
                  <li key={index} className="text-sm flex items-start gap-2">
                    <ChevronRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>{recommendation}</span>
                  </li>
                ))}
              </ul>
            </div>
          </TabsContent>
          
          <TabsContent value="comparison">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart
                  data={comparisons}
                  margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis 
                    dataKey="label" 
                    tick={{ fontSize: 12 }} 
                    tickLine={false}
                    axisLine={{ stroke: '#e5e7eb' }}
                  />
                  <YAxis 
                    domain={[0, 100]} 
                    tick={{ fontSize: 12 }} 
                    tickLine={false}
                    axisLine={{ stroke: '#e5e7eb' }}
                    tickFormatter={(value) => `${value}%`}
                  />
                  <Tooltip />
                  <Legend />
                  <Bar name="Current" dataKey="current" fill="#2563eb" radius={[4, 4, 0, 0]} />
                  <Bar name="Previous" dataKey="previous" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                </RechartsBarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4">
              {comparisons && comparisons.map((item, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500 mb-1">{item.label}</div>
                  <div className="flex items-center justify-between">
                    <div className="text-lg font-bold">{item.current}%</div>
                    <div className="flex items-center gap-1 text-sm">
                      {getTrendIcon(item.change)}
                      <span className={cn(
                        item.change > 0 ? "text-green-600" : 
                        item.change < 0 ? "text-red-600" : "text-gray-600"
                      )}>
                        {item.change > 0 ? '+' : ''}{item.change}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="breakdown">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={breakdown}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    innerRadius={40}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="label"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {breakdown && breakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {breakdown && breakdown.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: item.color }} 
                  />
                  <div className="text-sm">{item.label}</div>
                  <div className="text-sm font-medium ml-auto">{item.value}%</div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default GoalAnalytics; 