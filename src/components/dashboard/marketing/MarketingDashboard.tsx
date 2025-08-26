import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ArrowUpDown, ArrowDown } from 'lucide-react';

// Mock data for areas
const areas = [
  { id: 'all', name: 'All Areas' },
  // Core areas (always shown)
  { id: 'bangkok_central', name: 'Bangkok (Central)' },
  { id: 'bangkok_east', name: 'Bangkok (East)' },
  { id: 'bangkok_west', name: 'Bangkok (West)' },
  { id: 'phuket', name: 'Phuket' },
  { id: 'chiang_mai', name: 'Chiang Mai' },
  { id: 'pattaya', name: 'Pattaya' },
  { id: 'hua_hin', name: 'Hua Hin' },
  // Extended areas (shown when expanded)
  { id: 'bangkok_north', name: 'Bangkok (North)' },
  { id: 'bangkok_south', name: 'Bangkok (South)' },
  { id: 'samut_prakan', name: 'Samut Prakan' },
  { id: 'nonthaburi', name: 'Nonthaburi' },
  { id: 'pathum_thani', name: 'Pathum Thani' },
  { id: 'ayutthaya', name: 'Ayutthaya' },
  { id: 'kanchanaburi', name: 'Kanchanaburi' },
  { id: 'ratchaburi', name: 'Ratchaburi' },
  { id: 'nakhon_pathom', name: 'Nakhon Pathom' },
  { id: 'samut_sakhon', name: 'Samut Sakhon' },
  { id: 'krabi', name: 'Krabi' },
  { id: 'koh_samui', name: 'Koh Samui' },
  { id: 'koh_phangan', name: 'Koh Phangan' },
  { id: 'rayong', name: 'Rayong' },
  { id: 'chonburi', name: 'Chonburi' },
  { id: 'trat', name: 'Trat' },
  { id: 'prachuap_khiri_khan', name: 'Prachuap Khiri Khan' },
  { id: 'chiang_rai', name: 'Chiang Rai' },
  { id: 'mae_hong_son', name: 'Mae Hong Son' },
  { id: 'lampang', name: 'Lampang' },
  { id: 'phitsanulok', name: 'Phitsanulok' },
  { id: 'sukhothai', name: 'Sukhothai' },
  { id: 'tak', name: 'Tak' },
  { id: 'udon_thani', name: 'Udon Thani' },
  { id: 'khon_kaen', name: 'Khon Kaen' },
  { id: 'nakhon_ratchasima', name: 'Nakhon Ratchasima' },
  { id: 'buriram', name: 'Buriram' },
  { id: 'surin', name: 'Surin' },
];

// Mock data for property types
const propertyTypes = [
  { id: 'all', name: 'All Types' },
  { id: 'condo', name: 'Condo' },
  { id: 'house', name: 'House' },
  { id: 'land', name: 'Land' },
  { id: 'townhouse', name: 'Townhouse' },
];

// Mock data for price ranges
const priceRanges = [
  { id: 'all', name: 'All Prices' },
  { id: 'under_5m', name: 'Under 5M THB' },
  { id: '5m_15m', name: '5M - 15M THB' },
  { id: '15m_30m', name: '15M - 30M THB' },
  { id: 'over_30m', name: 'Over 30M THB' },
];

// Mock data for marketing channels
const marketingChannels = [
  { id: 'all', name: 'All Channels' },
  { id: 'ddproperty', name: 'Ddproperty' },
  { id: 'facebook_ad', name: 'Facebook Ad' },
  { id: 'instagram', name: 'Instagram' },
  { id: 'livinginsider', name: 'Livinginsider' },
  { id: 'events', name: 'Events' },
  { id: 'facebook_group', name: 'Facebook Group' },
];

// Generate random performance data for an area and property type
const generateRandomData = () => {
  const leads = Math.floor(Math.random() * 150) + 20; // 20-169 leads
  const amountSpent = Math.floor(Math.random() * 120000) + 60000; // 60K-180K spent
  const listings = Math.floor(Math.random() * 80) + 15; // 15-94 listings
  const cpl = Math.floor(amountSpent / leads) + Math.floor(Math.random() * 500); // Realistic CPL
  const revenue = listings * (Math.random() * 40000 + 10000); // 10K-50K per listing
  
  return { leads, amountSpent, listings, cpl, revenue: Math.floor(revenue) };
};

// Top 7 areas (always shown)
const corePerformanceMatrix = {
  'bangkok_central': {
    'condo': { leads: 145, amountSpent: 125000, listings: 89, cpl: 862, revenue: 2850000 },
    'house': { leads: 98, amountSpent: 180000, listings: 62, cpl: 1837, revenue: 1950000 },
    'land': { leads: 32, amountSpent: 95000, listings: 18, cpl: 2969, revenue: 680000 },
    'townhouse': { leads: 76, amountSpent: 140000, listings: 45, cpl: 1842, revenue: 1420000 },
  },
  'bangkok_east': {
    'condo': { leads: 112, amountSpent: 98000, listings: 72, cpl: 875, revenue: 2100000 },
    'house': { leads: 134, amountSpent: 165000, listings: 85, cpl: 1231, revenue: 2650000 },
    'land': { leads: 45, amountSpent: 75000, listings: 28, cpl: 1667, revenue: 890000 },
    'townhouse': { leads: 89, amountSpent: 125000, listings: 58, cpl: 1404, revenue: 1680000 },
  },
  'bangkok_west': {
    'condo': { leads: 87, amountSpent: 89000, listings: 56, cpl: 1023, revenue: 1750000 },
    'house': { leads: 102, amountSpent: 145000, listings: 68, cpl: 1422, revenue: 2100000 },
    'land': { leads: 58, amountSpent: 85000, listings: 35, cpl: 1466, revenue: 1150000 },
    'townhouse': { leads: 71, amountSpent: 110000, listings: 42, cpl: 1549, revenue: 1380000 },
  },
  'phuket': {
    'condo': { leads: 156, amountSpent: 195000, listings: 95, cpl: 1250, revenue: 3200000 },
    'house': { leads: 78, amountSpent: 165000, listings: 48, cpl: 2115, revenue: 1850000 },
    'land': { leads: 89, amountSpent: 145000, listings: 52, cpl: 1629, revenue: 1950000 },
    'townhouse': { leads: 45, amountSpent: 98000, listings: 28, cpl: 2178, revenue: 980000 },
  },
  'chiang_mai': {
    'condo': { leads: 67, amountSpent: 78000, listings: 42, cpl: 1164, revenue: 1250000 },
    'house': { leads: 118, amountSpent: 135000, listings: 76, cpl: 1144, revenue: 2150000 },
    'land': { leads: 142, amountSpent: 125000, listings: 89, cpl: 880, revenue: 2850000 },
    'townhouse': { leads: 85, amountSpent: 98000, listings: 54, cpl: 1153, revenue: 1520000 },
  },
  'pattaya': {
    'condo': { leads: 95, amountSpent: 112000, listings: 62, cpl: 1179, revenue: 1890000 },
    'house': { leads: 52, amountSpent: 125000, listings: 34, cpl: 2404, revenue: 1250000 },
    'land': { leads: 28, amountSpent: 85000, listings: 18, cpl: 3036, revenue: 560000 },
    'townhouse': { leads: 71, amountSpent: 105000, listings: 45, cpl: 1479, revenue: 1350000 },
  },
  'hua_hin': {
    'condo': { leads: 78, amountSpent: 98000, listings: 52, cpl: 1256, revenue: 1650000 },
    'house': { leads: 94, amountSpent: 125000, listings: 62, cpl: 1330, revenue: 1950000 },
    'land': { leads: 71, amountSpent: 95000, listings: 45, cpl: 1338, revenue: 1450000 },
    'townhouse': { leads: 58, amountSpent: 89000, listings: 38, cpl: 1534, revenue: 1180000 },
  },
};

// Additional areas (shown when expanded)
const extendedAreas = [
  'bangkok_north', 'bangkok_south', 'samut_prakan', 'nonthaburi', 'pathum_thani',
  'ayutthaya', 'kanchanaburi', 'ratchaburi', 'nakhon_pathom', 'samut_sakhon',
  'krabi', 'koh_samui', 'koh_phangan', 'rayong', 'chonburi', 'trat', 'prachuap_khiri_khan',
  'chiang_rai', 'mae_hong_son', 'lampang', 'phitsanulok', 'sukhothai', 'tak',
  'udon_thani', 'khon_kaen', 'nakhon_ratchasima', 'buriram', 'surin'
];

// Generate extended performance matrix
const extendedPerformanceMatrix = { ...corePerformanceMatrix };
extendedAreas.forEach(areaId => {
  extendedPerformanceMatrix[areaId] = {
    'condo': generateRandomData(),
    'house': generateRandomData(),
    'land': generateRandomData(),
    'townhouse': generateRandomData(),
  };
});

// Available metrics for heatmap
const availableMetrics = [
  { id: 'leads', name: 'Leads', unit: '' },
  { id: 'amountSpent', name: 'Amount Spent', unit: '฿' },
  { id: 'listings', name: '# of Listings', unit: '' },
  { id: 'cpl', name: 'CPL (Cost Per Lead)', unit: '฿' },
];

interface SelectedCellData {
  areaName: string;
  propertyType: string;
  leads: number;
  amountSpent: number;
  listings: number;
  cpl: number;
  revenue: number;
}

const MarketingDashboard = () => {
  const [selectedArea, setSelectedArea] = useState<string>('all');
  const [selectedPropertyType, setSelectedPropertyType] = useState<string>('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('all');
  const [selectedChannel, setSelectedChannel] = useState<string>('all');
  const [selectedMetric, setSelectedMetric] = useState<string>('leads');
  const [selectedCellData, setSelectedCellData] = useState<SelectedCellData | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [sortedColumn, setSortedColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [isExpanded, setIsExpanded] = useState(false);

  // Get current performance matrix based on expanded state
  const currentPerformanceMatrix = isExpanded ? extendedPerformanceMatrix : corePerformanceMatrix;

  // Calculate min and max values for the selected metric
  const getAllMetricValues = () => {
    const values: number[] = [];
    Object.values(currentPerformanceMatrix).forEach(areaData => {
      Object.values(areaData).forEach(data => {
        const value = data[selectedMetric as keyof typeof data] as number;
        if (value !== undefined) values.push(value);
      });
    });
    return values;
  };

  const allValues = getAllMetricValues();
  const minValue = Math.min(...allValues);
  const maxValue = Math.max(...allValues);

  // Calculate percentage based on min/max values
  const getPercentage = (value: number) => {
    if (maxValue === minValue) return 100;
    // For CPL, lower is better, so invert the calculation
    if (selectedMetric === 'cpl') {
      return ((maxValue - value) / (maxValue - minValue)) * 100;
    }
    return ((value - minValue) / (maxValue - minValue)) * 100;
  };

  // Get performance color based on percentage
  const getPerformanceColor = (percentage: number) => {
    if (percentage >= 80) return 'bg-green-500';
    if (percentage >= 60) return 'bg-green-400';
    if (percentage >= 40) return 'bg-yellow-400';
    if (percentage >= 20) return 'bg-orange-400';
    return 'bg-red-400';
  };

  // Get performance text color for contrast
  const getPerformanceTextColor = (percentage: number) => {
    return percentage >= 40 ? 'text-white' : 'text-gray-800';
  };

  // Format value for display
  const formatValue = (value: number, metricId: string) => {
    const metric = availableMetrics.find(m => m.id === metricId);
    if (metricId === 'amountSpent' || metricId === 'cpl') {
      return `${metric?.unit}${(value / 1000).toFixed(0)}K`;
    }
    return `${value}${metric?.unit}`;
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedArea('all');
    setSelectedPropertyType('all');
    setSelectedPriceRange('all');
    setSelectedChannel('all');
  };

  // Check if any filters are active
  const hasActiveFilters = selectedArea !== 'all' || selectedPropertyType !== 'all' || 
                          selectedPriceRange !== 'all' || selectedChannel !== 'all';

  // Get current metric name for display
  const currentMetric = availableMetrics.find(m => m.id === selectedMetric);

  // Handle cell click to show detailed metrics
  const handleCellClick = (areaName: string, propertyType: string, data: any) => {
    setSelectedCellData({
      areaName,
      propertyType: propertyType.charAt(0).toUpperCase() + propertyType.slice(1),
      leads: data.leads,
      amountSpent: data.amountSpent,
      listings: data.listings,
      cpl: data.cpl,
      revenue: data.revenue,
    });
    setIsDialogOpen(true);
  };

  // Handle column sorting
  const handleColumnSort = (propertyType: string) => {
    if (sortedColumn === propertyType) {
      // Toggle direction if same column
      setSortDirection(sortDirection === 'desc' ? 'asc' : 'desc');
    } else {
      // New column, default to descending (highest first)
      setSortedColumn(propertyType);
      setSortDirection('desc');
    }
  };

  // Get sorted areas based on the selected column and metric
  const getSortedAreas = () => {
    if (!sortedColumn) {
      return Object.entries(currentPerformanceMatrix);
    }

    const sortedEntries = Object.entries(currentPerformanceMatrix).sort((a, b) => {
      const aData = a[1][sortedColumn as keyof typeof a[1]];
      const bData = b[1][sortedColumn as keyof typeof b[1]];
      
      if (!aData || !bData) return 0;
      
      const aValue = aData[selectedMetric as keyof typeof aData] as number;
      const bValue = bData[selectedMetric as keyof typeof bData] as number;
      
      if (sortDirection === 'desc') {
        return bValue - aValue; // Highest to lowest
      } else {
        return aValue - bValue; // Lowest to highest
      }
    });

    return sortedEntries;
  };

  return (
    <div className="space-y-6">
      {/* Filters Section */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <CardTitle>Marketing Performance Analysis</CardTitle>
            {hasActiveFilters && (
              <Button variant="outline" size="sm" onClick={clearFilters}>
                Clear All Filters
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Area Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Area</label>
              <Select value={selectedArea} onValueChange={setSelectedArea}>
                <SelectTrigger>
                  <SelectValue placeholder="Select area" />
                </SelectTrigger>
                <SelectContent>
                  {areas.map(area => (
                    <SelectItem key={area.id} value={area.id}>
                      {area.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Property Type Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Property Type</label>
              <Select value={selectedPropertyType} onValueChange={setSelectedPropertyType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select property type" />
                </SelectTrigger>
                <SelectContent>
                  {propertyTypes.map(type => (
                    <SelectItem key={type.id} value={type.id}>
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Price Range Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Price Range</label>
              <Select value={selectedPriceRange} onValueChange={setSelectedPriceRange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select price range" />
                </SelectTrigger>
                <SelectContent>
                  {priceRanges.map(range => (
                    <SelectItem key={range.id} value={range.id}>
                      {range.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Marketing Channel Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Marketing Channel</label>
              <Select value={selectedChannel} onValueChange={setSelectedChannel}>
                <SelectTrigger>
                  <SelectValue placeholder="Select channel" />
                </SelectTrigger>
                <SelectContent>
                  {marketingChannels.map(channel => (
                    <SelectItem key={channel.id} value={channel.id}>
                      {channel.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Active Filters Display */}
          {hasActiveFilters && (
            <div className="mt-4 pt-4 border-t">
              <div className="flex flex-wrap gap-2">
                <span className="text-sm font-medium text-gray-600">Active Filters:</span>
                {selectedArea !== 'all' && (
                  <Badge variant="secondary">
                    Area: {areas.find(a => a.id === selectedArea)?.name}
                  </Badge>
                )}
                {selectedPropertyType !== 'all' && (
                  <Badge variant="secondary">
                    Type: {propertyTypes.find(t => t.id === selectedPropertyType)?.name}
                  </Badge>
                )}
                {selectedPriceRange !== 'all' && (
                  <Badge variant="secondary">
                    Price: {priceRanges.find(p => p.id === selectedPriceRange)?.name}
                  </Badge>
                )}
                {selectedChannel !== 'all' && (
                  <Badge variant="secondary">
                    Channel: {marketingChannels.find(c => c.id === selectedChannel)?.name}
                  </Badge>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Performance Heatmap Matrix */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
            <div>
              <CardTitle>Performance Heatmap: Areas vs Property Types</CardTitle>
              <p className="text-sm text-gray-600">
                Color intensity represents relative performance for selected metric
              </p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Metric to Display</label>
              <div className="flex gap-2">
                <Select value={selectedMetric} onValueChange={setSelectedMetric}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select metric" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableMetrics.map(metric => (
                      <SelectItem key={metric.id} value={metric.id}>
                        {metric.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {sortedColumn && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSortedColumn(null);
                      setSortDirection('desc');
                    }}
                    className="text-xs"
                  >
                    Clear Sort
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full">
              {/* Header Row */}
              <div className="grid grid-cols-5 gap-2 mb-2">
                <div className="p-3 text-sm font-medium text-gray-700">Area / Property Type</div>
                {[
                  { type: 'condo', icon: '🏢', label: 'Condo' },
                  { type: 'house', icon: '🏠', label: 'House' },
                  { type: 'land', icon: '🌾', label: 'Land' },
                  { type: 'townhouse', icon: '🏘️', label: 'Townhouse' }
                ].map(({ type, icon, label }) => (
                  <div key={type} className="bg-gray-50 rounded">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full h-full text-sm font-medium text-gray-700 hover:bg-gray-200 p-3 flex items-center justify-center gap-1"
                      onClick={() => handleColumnSort(type)}
                    >
                      <span>{icon} {label}</span>
                      {sortedColumn === type ? (
                        <ArrowDown className={`h-3 w-3 ml-1 ${sortDirection === 'asc' ? 'rotate-180' : ''}`} />
                      ) : (
                        <ArrowUpDown className="h-3 w-3 ml-1 opacity-50" />
                      )}
                    </Button>
                  </div>
                ))}
              </div>

              {/* Data Rows */}
              {getSortedAreas().map(([areaId, areaData]) => {
                const areaName = areas.find(a => a.id === areaId)?.name || areaId;
                
                return (
                  <div key={areaId} className="grid grid-cols-5 gap-2 mb-2">
                    {/* Area Name */}
                    <div className="p-3 text-sm font-medium text-gray-700 bg-gray-50 rounded flex items-center">
                      {areaName}
                    </div>

                    {/* Property Type Performance Cells */}
                    {['condo', 'house', 'land', 'townhouse'].map(propertyType => {
                      const data = areaData[propertyType as keyof typeof areaData];
                      if (!data) return null;

                      const metricValue = data[selectedMetric as keyof typeof data] as number;
                      const percentage = getPercentage(metricValue);
                      const leads = data.leads || 0;
                      const amountSpent = data.amountSpent || 0;
                      const listings = data.listings || 0;
                      const cpl = data.cpl || 0;
                      const revenue = data.revenue || 0;

                      return (
                        <div
                          key={`${areaId}-${propertyType}`}
                          className={`p-2 rounded cursor-pointer hover:opacity-80 hover:scale-105 transition-all ${getPerformanceColor(percentage)}`}
                          onClick={() => handleCellClick(areaName, propertyType, data)}
                          title={`Click for detailed metrics`}
                        >
                          <div className={`text-center ${getPerformanceTextColor(percentage)}`}>
                            <div className="text-base font-bold">{formatValue(metricValue, selectedMetric)}</div>
                            <div className="text-xs opacity-90">
                              {percentage.toFixed(0)}%
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Legend */}
          <div className="mt-6 pt-4 border-t">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  {currentMetric?.name} Scale Legend:
                </h4>
                <div className="flex flex-wrap gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-500 rounded"></div>
                    <span className="text-xs text-gray-600">80-100% (Top Performers)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-400 rounded"></div>
                    <span className="text-xs text-gray-600">60-79% (Good)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-yellow-400 rounded"></div>
                    <span className="text-xs text-gray-600">40-59% (Average)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-orange-400 rounded"></div>
                    <span className="text-xs text-gray-600">20-39% (Below Average)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-400 rounded"></div>
                    <span className="text-xs text-gray-600">0-19% (Lowest)</span>
                  </div>
                </div>
                <div className="text-xs text-gray-500">
                  Range: {formatValue(minValue, selectedMetric)} - {formatValue(maxValue, selectedMetric)}
                  {selectedMetric === 'cpl' && ' (Lower CPL = Better Performance)'}
                </div>
              </div>
              <div className="text-xs text-gray-500">
                <div>• Click cells for detailed metrics</div>
                <div>• Click column headers to sort by property type</div>
                <div>• Percentage shows relative rank</div>
                <div>• Green = Best, Red = Worst</div>
                {sortedColumn && (
                  <div className="mt-1 text-blue-600 font-medium">
                    ↓ Sorted by {sortedColumn.charAt(0).toUpperCase() + sortedColumn.slice(1)} 
                    ({sortDirection === 'desc' ? 'Highest to Lowest' : 'Lowest to Highest'})
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* See All / Collapse Button */}
          <div className="flex justify-center pt-4 border-t">
            <Button
              variant="outline"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-sm"
            >
              {isExpanded ? (
                <>
                  ↑ Show Less Areas ({Object.keys(corePerformanceMatrix).length} core areas)
                </>
              ) : (
                <>
                  ↓ See All Areas ({Object.keys(extendedPerformanceMatrix).length} total areas)
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Summary Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Key Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="font-medium text-green-800">Top Performer</span>
              </div>
              <p className="text-sm text-green-700">
                Phuket Condos lead with 88% performance score and ฿3.2M revenue
              </p>
            </div>
            
            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="font-medium text-yellow-800">Opportunity</span>
              </div>
              <p className="text-sm text-yellow-700">
                Chiang Mai Land shows 85% performance - potential for scaling
              </p>
            </div>
            
            <div className="p-4 bg-red-50 rounded-lg border border-red-200">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="font-medium text-red-800">Needs Attention</span>
              </div>
              <p className="text-sm text-red-700">
                Pattaya Land underperforming at 42% - review strategy needed
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Metrics Popup */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {selectedCellData?.areaName} - {selectedCellData?.propertyType}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {selectedCellData && (
              <div className="grid grid-cols-1 gap-3">
                <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                  <span className="font-medium text-purple-900">Total Listings</span>
                  <span className="text-purple-700 font-semibold">{selectedCellData.listings}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="font-medium text-green-900">Amount Spent</span>
                  <span className="text-green-700 font-semibold">฿{(selectedCellData.amountSpent / 1000).toFixed(0)}K</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <span className="font-medium text-blue-900">Leads</span>
                  <span className="text-blue-700 font-semibold">{selectedCellData.leads}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                  <span className="font-medium text-orange-900">Cost Per Lead</span>
                  <span className="text-orange-700 font-semibold">฿{selectedCellData.cpl.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border-t-2 border-gray-200">
                  <span className="font-medium text-gray-900">Revenue Generated</span>
                  <span className="text-gray-700 font-semibold">฿{(selectedCellData.revenue / 1000000).toFixed(1)}M</span>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MarketingDashboard;