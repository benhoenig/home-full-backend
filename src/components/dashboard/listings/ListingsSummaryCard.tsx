import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

// Mock data for the listings
const listingData = {
  total: {
    count: 17,
    active: 15,
    distribution: [
      { name: 'Exclusive', value: 2, color: '#6366f1' }, // Indigo
      { name: 'A List', value: 6, color: '#dc2626' },    // Red
      { name: 'Normal', value: 9, color: '#f59e0b' }     // Amber
    ]
  },
  active: {
    count: 15,
    distribution: [
      { name: 'Exclusive', value: 2, color: '#6366f1' }, // Indigo
      { name: 'A List', value: 5, color: '#dc2626' },    // Red
      { name: 'Normal', value: 8, color: '#f59e0b' }     // Amber
    ]
  }
};

const COLORS = ['#6366f1', '#dc2626', '#f59e0b'];

const ListingsSummaryCard = () => {
  const [viewMode, setViewMode] = useState<'total' | 'active'>('total');
  
  // Get the appropriate data based on the view mode
  const currentData = viewMode === 'total' ? listingData.total : listingData.active;
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle>Listings Summary</CardTitle>
          <ToggleGroup 
            type="single" 
            value={viewMode} 
            onValueChange={(value) => {
              if (value) setViewMode(value as 'total' | 'active');
            }}
            className="bg-background border rounded-md"
          >
            <ToggleGroupItem value="total" aria-label="Total listings" size="sm" className="text-xs">
              <span>Total</span>
            </ToggleGroupItem>
            <ToggleGroupItem value="active" aria-label="Active listings" size="sm" className="text-xs">
              <span>Active</span>
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Summary Stats */}
          <div className="md:col-span-1 flex flex-col justify-center">
            <div className="space-y-4">
              <div>
                <div className="text-sm font-medium text-muted-foreground">Total Listings</div>
                <div className="text-3xl font-bold">{listingData.total.count}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">Active Listings</div>
                <div className="text-3xl font-bold">{listingData.total.active}</div>
              </div>
              <div className="pt-4">
                <div className="text-sm font-medium mb-2">Distribution</div>
                {currentData.distribution.map((item, index) => (
                  <div key={index} className="flex items-center justify-between mb-1">
                    <div className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-2" 
                        style={{ backgroundColor: item.color }}
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
                    data={currentData.distribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    innerRadius={60}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {currentData.distribution.map((entry, index) => (
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

export default ListingsSummaryCard; 