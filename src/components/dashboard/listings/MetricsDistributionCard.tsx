import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Define metric types
type MetricType = 'zone' | 'propertyType' | 'priceRange' | 'unitCondition' | 'projectLocation';

// Mock data for the metrics
const metricsData = {
  zone: [
    { name: 'Sukhumvit', value: 5, color: '#6366f1' },
    { name: 'Bang Na', value: 3, color: '#dc2626' },
    { name: 'Ratchada', value: 3, color: '#f59e0b' },
    { name: 'Krungthep Kreetha', value: 3, color: '#10b981' },
    { name: 'Petchburi', value: 3, color: '#8b5cf6' }
  ],
  propertyType: [
    { name: 'House', value: 7, color: '#6366f1' },
    { name: 'Condo', value: 7, color: '#dc2626' },
    { name: 'Land', value: 3, color: '#f59e0b' }
  ],
  priceRange: [
    { name: '0-3M', value: 3, color: '#6366f1' },
    { name: '3-6M', value: 5, color: '#dc2626' },
    { name: '6-10M', value: 4, color: '#f59e0b' },
    { name: '10-15M', value: 3, color: '#10b981' },
    { name: '15-30M', value: 1, color: '#8b5cf6' },
    { name: '30-50M', value: 1, color: '#ec4899' },
    { name: '50M+', value: 0, color: '#14b8a6' }
  ],
  unitCondition: [
    { name: 'Perfect', value: 5, color: '#6366f1' },
    { name: 'Good', value: 7, color: '#dc2626' },
    { name: 'Old', value: 3, color: '#f59e0b' },
    { name: 'Need Renovation', value: 2, color: '#10b981' }
  ],
  projectLocation: [
    { name: 'ในโครงการ', value: 14, color: '#6366f1' },
    { name: 'นอกโครงการ', value: 3, color: '#dc2626' }
  ]
};

// Color palette for the pie chart
const COLORS = ['#6366f1', '#dc2626', '#f59e0b', '#10b981', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316'];

const MetricsDistributionCard = () => {
  const [metricType, setMetricType] = useState<MetricType>('zone');
  
  // Get the appropriate data based on the metric type
  const currentData = metricsData[metricType];
  
  // Get the display name for the metric type
  const getMetricDisplayName = (type: MetricType): string => {
    switch (type) {
      case 'zone':
        return 'Zone / Area';
      case 'propertyType':
        return 'Property Type';
      case 'priceRange':
        return 'Price Range';
      case 'unitCondition':
        return 'Unit Condition';
      case 'projectLocation':
        return 'ใน/นอกโครงการ';
      default:
        return 'Distribution';
    }
  };
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle>Metrics Distribution</CardTitle>
          <Select value={metricType} onValueChange={(value) => setMetricType(value as MetricType)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select metric" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="zone">Zone / Area</SelectItem>
              <SelectItem value="propertyType">Property Type</SelectItem>
              <SelectItem value="priceRange">Price Range</SelectItem>
              <SelectItem value="unitCondition">Unit Condition</SelectItem>
              <SelectItem value="projectLocation">ใน/นอกโครงการ</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Summary Stats */}
          <div className="md:col-span-1 flex flex-col justify-center">
            <div className="space-y-4">
              <div>
                <div className="text-sm font-medium text-muted-foreground">Metric</div>
                <div className="text-xl font-bold">{getMetricDisplayName(metricType)}</div>
              </div>
              <div className="pt-4">
                <div className="text-sm font-medium mb-2">Distribution</div>
                {currentData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between mb-1">
                    <div className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-2" 
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      ></div>
                      <span className="text-sm">{item.name}</span>
                    </div>
                    <span className="text-sm font-medium">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Pie Chart */}
          <div className="md:col-span-2">
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={currentData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    innerRadius={60}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => 
                      percent > 0.05 ? `${name} ${(percent * 100).toFixed(0)}%` : ''
                    }
                  >
                    {currentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [`${value} listings`, 'Count']}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MetricsDistributionCard; 