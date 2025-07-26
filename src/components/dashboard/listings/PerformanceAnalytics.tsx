import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Mock data for performance analytics
const topProjects = [
  { name: 'Noble Cube Pattanakarn', count: 3, leads: 12 },
  { name: 'The Issara Ladprao', count: 3, leads: 10 },
  { name: 'Life Ratchada', count: 3, leads: 8 },
  { name: 'Thru Thonglor', count: 3, leads: 7 },
  { name: 'Other Projects', count: 5, leads: 5 }
];

const topZones = [
  { name: 'Sukhumvit', count: 4, leads: 15 },
  { name: 'Bang Na', count: 3, leads: 12 },
  { name: 'Ratchada', count: 3, leads: 10 },
  { name: 'Krungthep Kreetha', count: 3, leads: 9 },
  { name: 'Petchburi', count: 4, leads: 8 }
];

const topPropertyTypes = [
  { name: 'House', count: 7, leads: 25 },
  { name: 'Condo', count: 6, leads: 18 },
  { name: 'Land', count: 3, leads: 9 }
];

const PerformanceAnalytics = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Top Projects */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Top Projects</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/50">
                  <th className="text-left p-3 text-xs font-medium text-muted-foreground">Project</th>
                  <th className="text-center p-3 text-xs font-medium text-muted-foreground">Total List</th>
                  <th className="text-center p-3 text-xs font-medium text-muted-foreground">Leads</th>
                </tr>
              </thead>
              <tbody>
                {topProjects.map((project, index) => (
                  <tr key={index} className="border-b last:border-b-0">
                    <td className="p-3 text-sm">{project.name}</td>
                    <td className="p-3 text-sm text-center">{project.count}</td>
                    <td className="p-3 text-sm text-center font-medium">{project.leads}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Top Zones */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Top Zones</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/50">
                  <th className="text-left p-3 text-xs font-medium text-muted-foreground">Zone</th>
                  <th className="text-center p-3 text-xs font-medium text-muted-foreground">Total List</th>
                  <th className="text-center p-3 text-xs font-medium text-muted-foreground">Leads</th>
                </tr>
              </thead>
              <tbody>
                {topZones.map((zone, index) => (
                  <tr key={index} className="border-b last:border-b-0">
                    <td className="p-3 text-sm">{zone.name}</td>
                    <td className="p-3 text-sm text-center">{zone.count}</td>
                    <td className="p-3 text-sm text-center font-medium">{zone.leads}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Top Property Types */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Top Property Types</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/50">
                  <th className="text-left p-3 text-xs font-medium text-muted-foreground">Property Type</th>
                  <th className="text-center p-3 text-xs font-medium text-muted-foreground">Total List</th>
                  <th className="text-center p-3 text-xs font-medium text-muted-foreground">Leads</th>
                </tr>
              </thead>
              <tbody>
                {topPropertyTypes.map((type, index) => (
                  <tr key={index} className="border-b last:border-b-0">
                    <td className="p-3 text-sm">{type.name}</td>
                    <td className="p-3 text-sm text-center">{type.count}</td>
                    <td className="p-3 text-sm text-center font-medium">{type.leads}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PerformanceAnalytics; 