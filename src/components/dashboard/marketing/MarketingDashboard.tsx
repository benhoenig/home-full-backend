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
import { ArrowUpDown, ArrowDown, X } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import ListingDetailsDrawer from '@/components/dashboard/ListingDetailsDrawer';
import { Listing } from '@/hooks/useListingsTableData';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';

// Mock data for areas (used for display names)
const areas = [
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

// Mock data for listing types
const listingTypes = [
  { id: 'all', name: 'All Types' },
  { id: 'normal', name: 'Normal' },
  { id: 'a_list', name: 'A List' },
  { id: 'exclusive', name: 'Exclusive' },
];

// Price range configuration for slider
const priceRangeConfig = {
  min: 0,
  max: 50,
  step: 1,
  defaultValue: [0, 50], // 0M to 50M THB
  formatValue: (value: number) => `${value}M฿`,
};

// Mock data for marketing channels (single-select)
const marketingChannels = [
  { id: 'all', name: 'All Channels' },
  { id: 'ddproperty', name: 'Ddproperty' },
  { id: 'facebook_ad', name: 'Facebook Ad' },
  { id: 'instagram', name: 'Instagram' },
  { id: 'livinginsider', name: 'Livinginsider' },
  { id: 'events', name: 'Events' },
  { id: 'youtube', name: 'YouTube' },
  { id: 'tiktok', name: 'TikTok' },
  { id: 'offline_ads', name: 'Offline Ads' },
  { id: 'referral', name: 'Referral' },
  { id: 'email_marketing', name: 'Email Marketing' },
];

// Mock data for teams
const teams = [
  { id: 'all', name: 'All Teams' },
  { id: 'team_alpha', name: 'Team Alpha' },
  { id: 'team_beta', name: 'Team Beta' },
  { id: 'team_gamma', name: 'Team Gamma' },
  { id: 'team_delta', name: 'Team Delta' },
  { id: 'team_epsilon', name: 'Team Epsilon' },
];

// Mock data for salespersons
const salespersons = [
  { id: 'all', name: 'All Salespersons' },
  // Team Alpha
  { id: 'sarah_jones', name: 'Sarah Jones', teamId: 'team_alpha' },
  { id: 'michael_chen', name: 'Michael Chen', teamId: 'team_alpha' },
  { id: 'emma_davis', name: 'Emma Davis', teamId: 'team_alpha' },
  // Team Beta
  { id: 'david_kim', name: 'David Kim', teamId: 'team_beta' },
  { id: 'alex_wilson', name: 'Alex Wilson', teamId: 'team_beta' },
  { id: 'lisa_anderson', name: 'Lisa Anderson', teamId: 'team_beta' },
  // Team Gamma
  { id: 'james_brown', name: 'James Brown', teamId: 'team_gamma' },
  { id: 'sophia_taylor', name: 'Sophia Taylor', teamId: 'team_gamma' },
  { id: 'ryan_martinez', name: 'Ryan Martinez', teamId: 'team_gamma' },
  // Team Delta
  { id: 'olivia_garcia', name: 'Olivia Garcia', teamId: 'team_delta' },
  { id: 'ethan_rodriguez', name: 'Ethan Rodriguez', teamId: 'team_delta' },
  { id: 'ava_lopez', name: 'Ava Lopez', teamId: 'team_delta' },
  // Team Epsilon
  { id: 'noah_hernandez', name: 'Noah Hernandez', teamId: 'team_epsilon' },
  { id: 'mia_gonzalez', name: 'Mia Gonzalez', teamId: 'team_epsilon' },
  { id: 'lucas_perez', name: 'Lucas Perez', teamId: 'team_epsilon' },
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

// Mock data for individual listings
const generateListingsData = () => {
  const propertyTypes = ['Condo', 'House', 'Land', 'Townhouse'];
  const listingTypeValues = ['Normal', 'A List', 'Exclusive'];
  
  const sampleListings = [
    { name: 'Luxury Downtown Penthouse', area: 'Bangkok (Central)', type: 'Condo' },
    { name: 'Modern Family Villa', area: 'Bangkok (East)', type: 'House' },
    { name: 'Prime Commercial Land', area: 'Bangkok (West)', type: 'Land' },
    { name: 'Contemporary Townhouse', area: 'Phuket', type: 'Townhouse' },
    { name: 'Beachfront Condo Resort', area: 'Phuket', type: 'Condo' },
    { name: 'Mountain View Villa', area: 'Chiang Mai', type: 'House' },
    { name: 'Development Land Plot', area: 'Chiang Mai', type: 'Land' },
    { name: 'City Center Apartment', area: 'Pattaya', type: 'Condo' },
    { name: 'Suburban Family Home', area: 'Hua Hin', type: 'House' },
    { name: 'Resort Development Site', area: 'Hua Hin', type: 'Land' },
    { name: 'Executive Townhouse', area: 'Bangkok (North)', type: 'Townhouse' },
    { name: 'High-Rise Condo Unit', area: 'Bangkok (South)', type: 'Condo' },
    { name: 'Traditional Thai House', area: 'Ayutthaya', type: 'House' },
    { name: 'Agricultural Land', area: 'Nakhon Pathom', type: 'Land' },
    { name: 'Gated Community Home', area: 'Samut Prakan', type: 'Townhouse' },
    { name: 'Luxury Condo Tower', area: 'Nonthaburi', type: 'Condo' },
    { name: 'Country Estate', area: 'Kanchanaburi', type: 'House' },
    { name: 'Investment Land Parcel', area: 'Ratchaburi', type: 'Land' },
    { name: 'Modern Townhouse Complex', area: 'Pathum Thani', type: 'Townhouse' },
    { name: 'Riverside Condo', area: 'Samut Sakhon', type: 'Condo' },
    { name: 'Island Villa Resort', area: 'Krabi', type: 'House' },
    { name: 'Beachfront Land', area: 'Koh Samui', type: 'Land' },
    { name: 'Beach Resort Condo', area: 'Koh Phangan', type: 'Condo' },
    { name: 'Coastal Villa', area: 'Rayong', type: 'House' },
    { name: 'Industrial Land Zone', area: 'Chonburi', type: 'Land' },
  ];

  return sampleListings.map((listing, index) => {
    const basePrice = Math.floor(Math.random() * 40000000) + 2000000; // 2M - 42M THB
    const totalLeads = Math.floor(Math.random() * 25) + 5; // 5-30 leads
    const amountSpent = Math.floor(Math.random() * 80000) + 20000; // 20K-100K THB spent
    const cpl = Math.floor(amountSpent / totalLeads);
    
    // Generate date within last 6 months
    const monthsAgo = Math.floor(Math.random() * 6);
    const daysAgo = Math.floor(Math.random() * 30);
    const publishDate = new Date();
    publishDate.setMonth(publishDate.getMonth() - monthsAgo);
    publishDate.setDate(publishDate.getDate() - daysAgo);

    // Calculate days on market
    const today = new Date();
    const timeDiff = today.getTime() - publishDate.getTime();
    const daysOnMarket = Math.floor(timeDiff / (1000 * 3600 * 24));

    // Assign random team and salesperson
    const randomTeam = teams[Math.floor(Math.random() * (teams.length - 1)) + 1]; // Exclude 'all'
    const teamSalespersons = salespersons.filter(sp => sp.teamId === randomTeam.id);
    const randomSalesperson = teamSalespersons[Math.floor(Math.random() * teamSalespersons.length)];

    return {
      id: `LST-${(index + 1).toString().padStart(4, '0')}`,
      listingCode: `LST-${(index + 1).toString().padStart(4, '0')}`,
      datePublished: publishDate.toLocaleDateString('en-GB'),
      listingName: listing.name,
      propertyType: listing.type,
      area: listing.area,
      price: basePrice,
      listingType: listingTypeValues[Math.floor(Math.random() * listingTypeValues.length)],
      totalLeads: totalLeads,
      amountSpent: amountSpent,
      cpl: cpl,
      marketingChannel: marketingChannels[Math.floor(Math.random() * (marketingChannels.length - 1)) + 1].id, // Exclude 'all'
      daysOnMarket: daysOnMarket,
      teamId: randomTeam.id,
      teamName: randomTeam.name,
      salespersonId: randomSalesperson.id,
      salespersonName: randomSalesperson.name,
    };
  });
};

const mockListingsData = generateListingsData();

// Mock data for team marketing performance summary
const generateTeamPerformanceData = () => {
  return (teams || []).slice(1).map(team => { // Exclude 'all' team
    const activeListings = Math.floor(Math.random() * 15) + 5; // 5-20 listings
    const budgetSpent = Math.floor(Math.random() * 300000) + 150000; // 150K-450K
    const totalLeads = Math.floor(Math.random() * 100) + 50; // 50-150 leads
    const revenue = Math.floor(Math.random() * 50000000) + 20000000; // 20M-70M
    const cpl = Math.floor(budgetSpent / totalLeads);
    
    return {
      teamId: team.id,
      teamName: team.name,
      activeListings,
      budgetSpent,
      totalLeads,
      revenue,
      cpl
    };
  });
};

// Mock data for annual performance trends
const generateAnnualTrendsData = () => {
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  
  return months.map(month => {
    const base = {
      month,
      totalListings: Math.floor(Math.random() * 50) + 30,
      totalBudget: Math.floor(Math.random() * 500000) + 300000,
      totalLeads: Math.floor(Math.random() * 200) + 100,
      totalRevenue: Math.floor(Math.random() * 80000000) + 40000000,
      avgCPL: Math.floor(Math.random() * 2000) + 1000
    };
    
    // Add team-specific data
    (teams || []).slice(1).forEach(team => {
      base[`${team.id}_listings`] = Math.floor(Math.random() * 15) + 5;
      base[`${team.id}_budget`] = Math.floor(Math.random() * 100000) + 50000;
      base[`${team.id}_leads`] = Math.floor(Math.random() * 50) + 20;
      base[`${team.id}_revenue`] = Math.floor(Math.random() * 20000000) + 10000000;
      base[`${team.id}_cpl`] = Math.floor(Math.random() * 1000) + 800;
    });

    // Add salesperson-specific data
    salespersons.slice(1).forEach(person => { // Skip 'all' option
      base[`${person.id}_listings`] = Math.floor(Math.random() * 8) + 2;
      base[`${person.id}_budget`] = Math.floor(Math.random() * 30000) + 15000;
      base[`${person.id}_leads`] = Math.floor(Math.random() * 20) + 5;
      base[`${person.id}_revenue`] = Math.floor(Math.random() * 8000000) + 3000000;
      base[`${person.id}_cpl`] = Math.floor(Math.random() * 1200) + 700;
    });
    
    return base;
  });
};

// Available years for selection
const availableYears = [
  { id: '2022', name: '2022' },
  { id: '2023', name: '2023' },
  { id: '2024', name: '2024' },
];

// Timeline filter options
const timeframeOptions = [
  { id: 'monthly', name: 'Monthly' },
  { id: 'quarterly', name: 'Quarterly' },
  { id: 'annually', name: 'Annually' },
];

// Period options based on timeframe
const getPeriodOptions = (timeframe: string) => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const currentQuarter = Math.ceil(currentMonth / 3);

  switch (timeframe) {
    case 'monthly':
      return [
        { id: 'current', name: `Current Month (${currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })})` },
        { id: 'last', name: 'Last Month' },
        { id: 'last3', name: 'Last 3 Months' },
        { id: 'last6', name: 'Last 6 Months' },
        { id: 'last12', name: 'Last 12 Months' },
      ];
    case 'quarterly':
      return [
        { id: 'current', name: `Current Quarter (Q${currentQuarter} ${currentYear})` },
        { id: 'last', name: 'Last Quarter' },
        { id: 'last4', name: 'Last 4 Quarters' },
        { id: 'ytd', name: 'Year to Date' },
      ];
    case 'annually':
      return [
        { id: 'current', name: `Current Year (${currentYear})` },
        { id: 'last', name: 'Last Year' },
        { id: 'last3', name: 'Last 3 Years' },
        { id: 'last5', name: 'Last 5 Years' },
      ];
    default:
      return [{ id: 'current', name: 'Current Period' }];
  }
};



const teamPerformanceData = generateTeamPerformanceData();
const annualTrendsData = generateAnnualTrendsData();

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

  const [selectedListingType, setSelectedListingType] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<number[]>(priceRangeConfig.defaultValue);
  const [selectedChannel, setSelectedChannel] = useState<string>('all');
  const [selectedMetric, setSelectedMetric] = useState<string>('leads');
  const [selectedCellData, setSelectedCellData] = useState<SelectedCellData | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [sortedColumn, setSortedColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHeatmapModalOpen, setIsHeatmapModalOpen] = useState(false);
  
  // Listings table state
  const [listingsSortColumn, setListingsSortColumn] = useState<string>('datePublished');
  const [listingsSortDirection, setListingsSortDirection] = useState<'asc' | 'desc'>('desc');
  
  // Additional filter states
  const [selectedArea, setSelectedArea] = useState<string>('all');
  const [selectedTeam, setSelectedTeam] = useState<string>('all');
  const [selectedSalesperson, setSelectedSalesperson] = useState<string>('all');
  
  // Listing details drawer state
  const [isListingDrawerOpen, setIsListingDrawerOpen] = useState(false);
  const [selectedListingForDrawer, setSelectedListingForDrawer] = useState<Listing | null>(null);
  
  // Annual trends chart state
  const [selectedChartMetric, setSelectedChartMetric] = useState<string>('totalLeads');
  const [selectedChartTeam, setSelectedChartTeam] = useState<string>('all');
  const [selectedChartSalesperson, setSelectedChartSalesperson] = useState<string>('all');
  const [selectedYear, setSelectedYear] = useState<string>('2024');
  
  // Date range filter state for team performance
  const [dateRange, setDateRange] = useState<{from: Date | undefined, to: Date | undefined}>({
    from: new Date(2024, 0, 1), // January 1, 2024
    to: new Date() // Today
  });

  // Summary cards timeline filter state
  const [summaryTimeframe, setSummaryTimeframe] = useState<string>('monthly');
  const [summaryPeriod, setSummaryPeriod] = useState<string>('current');

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

  // Get available salespersons based on selected team
  const getAvailableSalespersons = () => {
    if (selectedTeam === 'all') {
      return salespersons;
    }
    return [
      { id: 'all', name: 'All Salespersons' },
      ...salespersons.filter(sp => sp.teamId === selectedTeam)
    ];
  };

  // Handle team change and reset salesperson if needed
  const handleTeamChange = (teamId: string) => {
    setSelectedTeam(teamId);
    // Reset salesperson if current selection is not available in new team
    if (teamId !== 'all') {
      const availableSalespersons = salespersons.filter(sp => sp.teamId === teamId);
      if (selectedSalesperson !== 'all' && !availableSalespersons.find(sp => sp.id === selectedSalesperson)) {
        setSelectedSalesperson('all');
      }
    }
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedListingType('all');
    setPriceRange(priceRangeConfig.defaultValue);
    setSelectedChannel('all');
    setSelectedArea('all');
    setSelectedTeam('all');
    setSelectedSalesperson('all');
  };

  // Check if any filters are active
  const hasActiveFilters = selectedListingType !== 'all' || 
                          priceRange[0] !== priceRangeConfig.defaultValue[0] || 
                          priceRange[1] !== priceRangeConfig.defaultValue[1] ||
                          selectedChannel !== 'all' ||
                          selectedArea !== 'all' ||
                          selectedTeam !== 'all' ||
                          selectedSalesperson !== 'all';

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
  const getSortedAreas = (useExtendedMatrix = false) => {
    const matrix = useExtendedMatrix ? extendedPerformanceMatrix : currentPerformanceMatrix;
    
    if (!sortedColumn) {
      return Object.entries(matrix);
    }

    const sortedEntries = Object.entries(matrix).sort((a, b) => {
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

  // Filter and sort listings data based on current filters
  const getFilteredListings = () => {
    let filtered = [...mockListingsData];

    // Apply filters
    if (selectedListingType !== 'all') {
      const filterType = selectedListingType === 'a_list' ? 'A List' : 
                        selectedListingType === 'normal' ? 'Normal' : 
                        selectedListingType === 'exclusive' ? 'Exclusive' : '';
      if (filterType) {
        filtered = filtered.filter(listing => listing.listingType === filterType);
      }
    }

    if (selectedChannel !== 'all') {
      filtered = filtered.filter(listing => listing.marketingChannel === selectedChannel);
    }

    if (selectedArea !== 'all') {
      filtered = filtered.filter(listing => listing.area === selectedArea);
    }

    if (selectedTeam !== 'all') {
      filtered = filtered.filter(listing => listing.teamId === selectedTeam);
    }

    if (selectedSalesperson !== 'all') {
      filtered = filtered.filter(listing => listing.salespersonId === selectedSalesperson);
    }

    // Filter by price range (convert from millions to actual price)
    const minPrice = priceRange[0] * 1000000;
    const maxPrice = priceRange[1] * 1000000;
    filtered = filtered.filter(listing => listing.price >= minPrice && listing.price <= maxPrice);

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue: any = a[listingsSortColumn as keyof typeof a];
      let bValue: any = b[listingsSortColumn as keyof typeof b];

      // Handle different data types
      if (listingsSortColumn === 'datePublished') {
        aValue = new Date(aValue.split('/').reverse().join('-')).getTime();
        bValue = new Date(bValue.split('/').reverse().join('-')).getTime();
      } else if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (listingsSortDirection === 'desc') {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      } else {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      }
    });

    return filtered;
  };

  // Handle listings table sorting
  const handleListingsSort = (column: string) => {
    if (listingsSortColumn === column) {
      setListingsSortDirection(listingsSortDirection === 'desc' ? 'asc' : 'desc');
    } else {
      setListingsSortColumn(column);
      setListingsSortDirection('desc');
    }
  };

  // Format price for display
  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return `฿${(price / 1000000).toFixed(1)}M`;
    }
    return `฿${(price / 1000).toFixed(0)}K`;
  };

  // Get marketing channel display name
  const getChannelDisplayName = (channelId: string) => {
    return marketingChannels.find(c => c.id === channelId)?.name || channelId;
  };

  // Convert marketing listing to Listing type for the drawer
  const convertToListing = (marketingListing: any): Listing => {
    // Convert DD/MM/YYYY format to ISO string
    const convertDateToISO = (dateString: string): string => {
      if (!dateString) return new Date().toISOString();
      
      try {
        // Split DD/MM/YYYY format
        const parts = dateString.split('/');
        if (parts.length === 3) {
          const [day, month, year] = parts;
          // Create date in YYYY-MM-DD format for proper parsing
          const isoDate = new Date(`${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`);
          return isoDate.toISOString();
        }
        // Fallback to current date if format is unexpected
        return new Date().toISOString();
      } catch (error) {
        // Fallback to current date if parsing fails
        return new Date().toISOString();
      }
    };

    return {
      listingCode: marketingListing.listingCode,
      marketingStatus: 'Active',
      monthsOnSale: Math.floor(marketingListing.daysOnMarket / 30),
      listingType: marketingListing.listingType === 'A List' ? 'A List' : 
                   marketingListing.listingType === 'Exclusive' ? 'Exclusive List' : 'Normal List',
      listingStatus: 'For Sale',
      ownerName: 'Marketing Owner',
      ownerContact: '+66-80-123-4567',
      listingName: marketingListing.listingName,
      propertyType: marketingListing.propertyType,
      projectName: marketingListing.listingName,
      inProject: 'ในโครงการ',
      streetSoi: 'Marketing Street',
      zoneArea: marketingListing.area,
      bts: 'BTS Station',
      mrt: '',
      arl: '',
      locationGrade: 'A',
      bedrooms: Math.floor(Math.random() * 4) + 1,
      bathrooms: Math.floor(Math.random() * 3) + 1,
      unitNo: Math.floor(Math.random() * 999) + 1 + '',
      rai: 0,
      ngan: 0,
      wa: 0,
      usableArea: Math.floor(Math.random() * 200) + 50,
      condoArea: Math.floor(Math.random() * 200) + 50,
      floors: Math.floor(Math.random() * 40) + 5,
      building: 'A',
      floor: Math.floor(Math.random() * 30) + 1,
      parking: Math.floor(Math.random() * 2) + 1,
      view: ['City', 'Garden'],
      direction: 'North',
      matchingTags: ['Modern', 'Convenient'],
      askingPrice: marketingListing.price,
      rentalPrice: Math.floor(marketingListing.price * 0.004),
      netPrice: marketingListing.price * 0.98,
      pricePerSqm: Math.floor(marketingListing.price / 80),
      googleMapsLink: 'https://goo.gl/maps/example',
      remark: `Marketing listing with ${marketingListing.totalLeads} leads generated`,
      listingPhotos: ['photo1.jpg', 'photo2.jpg'],
      thumbnailUrl: 'https://placehold.co/600x400/png',
      propertyHook: `${marketingListing.listingType} listing with excellent marketing performance`,
      giveaways: ['Furniture Package'],
      commonAreas: ['Pool', 'Gym'],
      environment: ['Quiet', 'Safe'],
      locations: [marketingListing.area],
      targetBuyer: ['Family', 'Investor'],
      isStarred: false,
      ownerType: 'Chill',
      createdBy: marketingListing.salespersonName,
      createdTime: convertDateToISO(marketingListing.datePublished),
      lastModifiedTime: new Date().toISOString(),
      assignedTo: marketingListing.salespersonName
    };
  };

  // Handle listing row click
  const handleListingRowClick = (marketingListing: any) => {
    const listing = convertToListing(marketingListing);
    setSelectedListingForDrawer(listing);
    setIsListingDrawerOpen(true);
  };

  // Handle listing drawer close
  const handleListingDrawerClose = () => {
    setIsListingDrawerOpen(false);
    setTimeout(() => setSelectedListingForDrawer(null), 300);
  };

  // Handle star toggle (not used for marketing listings but required by drawer)
  const handleStarToggle = (listing: Listing) => {
    // This could be implemented to update marketing listing starred status if needed
    console.log('Star toggle for listing:', listing.listingCode);
  };

  // Available chart metrics
  const chartMetrics = [
    { id: 'totalListings', name: 'Total Listings', unit: '' },
    { id: 'totalBudget', name: 'Total Budget', unit: '฿' },
    { id: 'totalLeads', name: 'Total Leads', unit: '' },
    { id: 'totalRevenue', name: 'Total Revenue', unit: '฿' },
    { id: 'avgCPL', name: 'Average CPL', unit: '฿' },
  ];

  // Format chart values for display
  const formatChartValue = (value: number, metricId: string) => {
    if (metricId === 'totalBudget' || metricId === 'totalRevenue') {
      return `${(value / 1000000).toFixed(2)}M`;
    }
    if (metricId === 'avgCPL') {
      return `${(value / 1000).toFixed(2)}K`;
    }
    return Math.round(value).toString();
  };

  // Format large numbers for table display
  const formatLargeNumber = (value: number) => {
    if (value >= 1000000) {
      return `฿${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
      return `฿${(value / 1000).toFixed(0)}K`;
    }
    return `฿${value}`;
  };

  // Get available salespersons for chart based on selected team
  const getAvailableChartSalespersons = () => {
    if (selectedChartTeam === 'all') {
      return [];
    }
    return [
      { id: 'all', name: 'All Team Members' },
      ...salespersons.filter(sp => sp.teamId === selectedChartTeam)
    ];
  };

  // Handle chart team change and reset salesperson if needed
  const handleChartTeamChange = (teamId: string) => {
    setSelectedChartTeam(teamId);
    // Reset salesperson when team changes
    setSelectedChartSalesperson('all');
  };

  // Handle timeframe change and reset period
  const handleTimeframeChange = (timeframe: string) => {
    setSummaryTimeframe(timeframe);
    setSummaryPeriod('current');
  };

  // Generate summary card data based on timeframe and period
  const generateSummaryCardData = () => {
    // Platform channels (property listing platforms)
    const platformChannels = ['ddproperty', 'livinginsider', 'proppit'];
    
    // Social media channels
    const socialMediaChannels = ['facebook_ad', 'facebook_group', 'instagram', 'youtube', 'tiktok'];

    // Base data generation with some variance based on timeframe and period
    const baseMultiplier = summaryTimeframe === 'monthly' ? 1 : 
                          summaryTimeframe === 'quarterly' ? 3 : 12;
    
    const periodMultiplier = summaryPeriod === 'current' ? 1 :
                            summaryPeriod === 'last' ? 0.95 :
                            summaryPeriod.includes('3') ? 3 :
                            summaryPeriod.includes('4') ? 4 :
                            summaryPeriod.includes('6') ? 6 :
                            summaryPeriod.includes('12') ? 12 :
                            summaryPeriod.includes('5') ? 5 : 1;

    // Platform data
    const platformLeads = Math.floor((Math.random() * 800 + 400) * baseMultiplier * periodMultiplier);
    const platformSpend = Math.floor((Math.random() * 200000 + 100000) * baseMultiplier * periodMultiplier);
    const platformCPL = Math.floor(platformSpend / platformLeads);

    // Social Media data
    const socialLeads = Math.floor((Math.random() * 600 + 300) * baseMultiplier * periodMultiplier);
    const socialSpend = Math.floor((Math.random() * 150000 + 80000) * baseMultiplier * periodMultiplier);
    const socialCPL = Math.floor(socialSpend / socialLeads);

    // Total leads (combining both)
    const totalLeads = platformLeads + socialLeads;

    // Generate performance indicators (simulated comparison with previous period)
    const totalLeadsChange = (Math.random() - 0.5) * 0.3; // -15% to +15%
    const platformLeadsChange = (Math.random() - 0.5) * 0.4; // -20% to +20%
    const socialLeadsChange = (Math.random() - 0.5) * 0.4; // -20% to +20%
    const platformCPLChange = (Math.random() - 0.5) * 0.3; // -15% to +15% (negative is better for CPL)
    const socialCPLChange = (Math.random() - 0.5) * 0.3; // -15% to +15% (negative is better for CPL)

    return {
      totalLeads,
      platformLeads,
      socialLeads,
      platformCPL,
      socialCPL,
      platformSpend,
      socialSpend,
      // Performance indicators
      totalLeadsChange,
      platformLeadsChange,
      socialLeadsChange,
      platformCPLChange,
      socialCPLChange,
    };
  };

  // Helper function to render performance indicator
  const renderPerformanceIndicator = (change: number, isCPL: boolean = false) => {
    // For CPL, negative change is good (lower cost), positive is bad
    // For leads, positive change is good (more leads), negative is bad
    const isPositive = isCPL ? change < 0 : change > 0;
    const percentage = Math.abs(change * 100).toFixed(1);
    
    if (Math.abs(change) < 0.01) {
      return (
        <div className="flex items-center text-gray-500">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
          <span className="text-xs">No change</span>
        </div>
      );
    }

    return (
      <div className={`flex items-center ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
        {isPositive ? (
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        ) : (
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        )}
        <span className="text-xs font-medium">{percentage}%</span>
      </div>
    );
  };

  // Get the appropriate data key for chart and stats
  const getChartDataKey = () => {
    if (selectedChartTeam === 'all') {
      return selectedChartMetric;
    } else if (selectedChartSalesperson === 'all') {
      // Team-level data
      switch (selectedChartMetric) {
        case 'totalListings': return `${selectedChartTeam}_listings`;
        case 'totalBudget': return `${selectedChartTeam}_budget`;
        case 'totalLeads': return `${selectedChartTeam}_leads`;
        case 'totalRevenue': return `${selectedChartTeam}_revenue`;
        case 'avgCPL': return `${selectedChartTeam}_cpl`;
        default: return `${selectedChartTeam}_leads`;
      }
    } else {
      // Salesperson-level data
      switch (selectedChartMetric) {
        case 'totalListings': return `${selectedChartSalesperson}_listings`;
        case 'totalBudget': return `${selectedChartSalesperson}_budget`;
        case 'totalLeads': return `${selectedChartSalesperson}_leads`;
        case 'totalRevenue': return `${selectedChartSalesperson}_revenue`;
        case 'avgCPL': return `${selectedChartSalesperson}_cpl`;
        default: return `${selectedChartSalesperson}_leads`;
      }
    }
  };



  const filteredListings = getFilteredListings();
  const summaryData = generateSummaryCardData();

  return (
    <div className="space-y-6">
      {/* Summary Cards with Timeline Filter */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
            <div>
              <CardTitle>Marketing Performance Summary</CardTitle>
              <p className="text-sm text-gray-600">
                Key metrics overview for the selected period
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Select value={summaryTimeframe} onValueChange={handleTimeframeChange}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Timeframe" />
                </SelectTrigger>
                <SelectContent>
                  {timeframeOptions.map(option => (
                    <SelectItem key={option.id} value={option.id}>
                      {option.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={summaryPeriod} onValueChange={setSummaryPeriod}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Period" />
                </SelectTrigger>
                <SelectContent>
                  {getPeriodOptions(summaryTimeframe).map(option => (
                    <SelectItem key={option.id} value={option.id}>
                      {option.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Total Leads */}
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600">Total Leads</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{summaryData.totalLeads.toLocaleString()}</p>
                  <div className="mt-2">
                    {renderPerformanceIndicator(summaryData.totalLeadsChange)}
                  </div>
                </div>
                <div className="bg-gray-100 rounded-lg p-2">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Platform Leads */}
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600">Platform Leads</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{summaryData.platformLeads.toLocaleString()}</p>
                  <div className="mt-2">
                    {renderPerformanceIndicator(summaryData.platformLeadsChange)}
                  </div>
                </div>
                <div className="bg-gray-100 rounded-lg p-2">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Social Media Leads */}
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600">Social Media Leads</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{summaryData.socialLeads.toLocaleString()}</p>
                  <div className="mt-2">
                    {renderPerformanceIndicator(summaryData.socialLeadsChange)}
                  </div>
                </div>
                <div className="bg-gray-100 rounded-lg p-2">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2h4a1 1 0 011 1v2a1 1 0 01-1 1h-1v10a2 2 0 01-2 2H6a2 2 0 01-2-2V8H3a1 1 0 01-1-1V5a1 1 0 011-1h4zm2-1v1h6V3H9z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Platform CPL */}
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600">Platform CPL</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">฿{summaryData.platformCPL.toLocaleString()}</p>
                  <div className="mt-2">
                    {renderPerformanceIndicator(summaryData.platformCPLChange, true)}
                  </div>
                </div>
                <div className="bg-gray-100 rounded-lg p-2">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Social Media CPL */}
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600">Social Media CPL</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">฿{summaryData.socialCPL.toLocaleString()}</p>
                  <div className="mt-2">
                    {renderPerformanceIndicator(summaryData.socialCPLChange, true)}
                  </div>
                </div>
                <div className="bg-gray-100 rounded-lg p-2">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Team Performance Summary - 1/3 width */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                <div>
                  <CardTitle>Team Performance Summary</CardTitle>
                  <p className="text-sm text-gray-600">
                    Marketing performance metrics by team
                  </p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Date Range</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={`w-[240px] justify-start text-left font-normal ${
                          !dateRange.from && "text-muted-foreground"
                        }`}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateRange.from ? (
                          dateRange.to ? (
                            <>
                              {format(dateRange.from, "LLL dd, y")} -{" "}
                              {format(dateRange.to, "LLL dd, y")}
                            </>
                          ) : (
                            format(dateRange.from, "LLL dd, y")
                          )
                        ) : (
                          <span>Pick a date range</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={dateRange.from}
                        selected={dateRange}
                        onSelect={setDateRange}
                        numberOfMonths={2}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-xs">Team</TableHead>
                        <TableHead className="text-xs text-center">Listings</TableHead>
                        <TableHead className="text-xs text-center">Budget</TableHead>
                        <TableHead className="text-xs text-center">Leads</TableHead>
                        <TableHead className="text-xs text-center">Revenue</TableHead>
                        <TableHead className="text-xs text-center">CPL</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {teamPerformanceData.map((team) => (
                        <TableRow key={team.teamId} className="hover:bg-gray-50">
                          <TableCell className="font-medium text-sm">
                            {team.teamName}
                          </TableCell>
                          <TableCell className="text-center text-sm">
                            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                              {team.activeListings}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-center text-sm font-medium">
                            {formatLargeNumber(team.budgetSpent)}
                          </TableCell>
                          <TableCell className="text-center text-sm">
                            <Badge variant="secondary" className="bg-green-100 text-green-800">
                              {team.totalLeads}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-center text-sm font-semibold text-teal-600">
                            {formatLargeNumber(team.revenue)}
                          </TableCell>
                          <TableCell className="text-center text-sm font-medium">
                            ฿{team.cpl.toLocaleString()}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                
                {/* Team Summary Stats */}
                <div className="grid grid-cols-2 gap-3 pt-4 border-t">
                  <div className="text-center">
                    <div className="text-sm font-medium text-gray-600">Total Listings</div>
                    <div className="text-lg font-bold text-blue-600">
                      {teamPerformanceData.reduce((sum, team) => sum + team.activeListings, 0)}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium text-gray-600">Total Leads</div>
                    <div className="text-lg font-bold text-green-600">
                      {teamPerformanceData.reduce((sum, team) => sum + team.totalLeads, 0)}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium text-gray-600">Total Budget</div>
                    <div className="text-lg font-bold text-orange-600">
                      {formatLargeNumber(teamPerformanceData.reduce((sum, team) => sum + team.budgetSpent, 0))}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium text-gray-600">Total Revenue</div>
                    <div className="text-lg font-bold text-teal-600">
                      {formatLargeNumber(teamPerformanceData.reduce((sum, team) => sum + team.revenue, 0))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Annual Trends Chart - 2/3 width */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                <div>
                  <CardTitle>Annual Performance Trends</CardTitle>
                  <p className="text-sm text-gray-600">
                    Monthly marketing performance analysis and team comparison
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Select value={selectedYear} onValueChange={setSelectedYear}>
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Year" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableYears.map(year => (
                        <SelectItem key={year.id} value={year.id}>
                          {year.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={selectedChartMetric} onValueChange={setSelectedChartMetric}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select metric" />
                    </SelectTrigger>
                    <SelectContent>
                      {chartMetrics.map(metric => (
                        <SelectItem key={metric.id} value={metric.id}>
                          {metric.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={selectedChartTeam} onValueChange={handleChartTeamChange}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select team" />
                    </SelectTrigger>
                    <SelectContent>
                      {teams.map(team => (
                        <SelectItem key={team.id} value={team.id}>
                          {team.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {selectedChartTeam !== 'all' && (
                    <Select value={selectedChartSalesperson} onValueChange={setSelectedChartSalesperson}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select salesperson" />
                      </SelectTrigger>
                      <SelectContent>
                        {getAvailableChartSalespersons().map(person => (
                          <SelectItem key={person.id} value={person.id}>
                            {person.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={annualTrendsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="month" 
                        tick={{ fontSize: 12 }}
                        interval={0}
                      />
                      <YAxis 
                        tick={{ fontSize: 12 }}
                        tickFormatter={(value) => formatChartValue(value, selectedChartMetric)}
                      />
                      <Tooltip 
                        formatter={(value: number) => [
                          formatChartValue(value, selectedChartMetric),
                          chartMetrics.find(m => m.id === selectedChartMetric)?.name
                        ]}
                        labelStyle={{ color: '#374151' }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey={getChartDataKey()}
                        stroke="#0d9488" 
                        strokeWidth={3}
                        dot={{ fill: '#0d9488', strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6, stroke: '#0d9488', strokeWidth: 2 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                
                {/* Chart Summary Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t">
                  <div className="text-center">
                    <div className="text-sm font-medium text-gray-600">Best Month</div>
                    <div className="text-lg font-bold text-green-600">
                      {(() => {
                        const dataKey = getChartDataKey();
                        return annualTrendsData.reduce((max, current) => 
                          current[dataKey] > max[dataKey] ? current : max
                        ).month;
                      })()}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium text-gray-600">Average</div>
                    <div className="text-lg font-bold text-blue-600">
                      {(() => {
                        const dataKey = getChartDataKey();
                        return formatChartValue(
                          annualTrendsData.reduce((sum, month) => sum + month[dataKey], 0) / annualTrendsData.length,
                          selectedChartMetric
                        );
                      })()}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium text-gray-600">Growth Trend</div>
                    <div className="text-lg font-bold text-teal-600">
                      {(() => {
                        const dataKey = getChartDataKey();
                        const firstValue = annualTrendsData[0][dataKey];
                        const lastValue = annualTrendsData[11][dataKey];
                        const isGrowth = lastValue > firstValue;
                        const growthPercent = ((lastValue - firstValue) / firstValue) * 100;
                        return `${isGrowth ? '↗️ +' : '↘️ '}${growthPercent.toFixed(1)}%`;
                      })()}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Listings Table */}
      <Card>
        <CardHeader>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
              <div>
                <CardTitle>Marketing Listings Performance</CardTitle>
                <p className="text-sm text-gray-600">
                  Showing {filteredListings.length} listings matching current filters
                </p>
              </div>
              <div className="text-sm text-gray-500">
                {hasActiveFilters && "Filtered view - adjust filters below to see more listings"}
              </div>
            </div>

            {/* Filter Section */}
            <div className="pt-4 border-t">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {/* Filter By Area */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Filter By Area</label>
                  <Select value={selectedArea} onValueChange={setSelectedArea}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select area" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Areas</SelectItem>
                      {areas.map(area => (
                        <SelectItem key={area.id} value={area.name}>
                          {area.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Filter By Team */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Filter By Team</label>
                  <Select value={selectedTeam} onValueChange={handleTeamChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select team" />
                    </SelectTrigger>
                    <SelectContent>
                      {teams.map(team => (
                        <SelectItem key={team.id} value={team.id}>
                          {team.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Filter By Salesperson */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Filter By Salesperson</label>
                  <Select value={selectedSalesperson} onValueChange={setSelectedSalesperson}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select salesperson" />
                    </SelectTrigger>
                    <SelectContent>
                      {getAvailableSalespersons().map(person => (
                        <SelectItem key={person.id} value={person.id}>
                          {person.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Filter By Listing Type */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Filter By Listing Type</label>
                  <Select value={selectedListingType} onValueChange={setSelectedListingType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select listing type" />
                    </SelectTrigger>
                    <SelectContent>
                      {listingTypes.map(type => (
                        <SelectItem key={type.id} value={type.id}>
                          {type.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Filter By Marketing Channel */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Filter By Marketing Channel</label>
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

              {/* Active Filters and Clear All */}
              {hasActiveFilters && (
                <div className="mt-4 pt-4 border-t">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-medium text-gray-600">Active Filters:</span>
                    {selectedArea !== 'all' && (
                      <Badge variant="secondary" className="cursor-pointer" onClick={() => setSelectedArea('all')}>
                        Area: {selectedArea} <X className="h-3 w-3 ml-1" />
                      </Badge>
                    )}
                    {selectedTeam !== 'all' && (
                      <Badge variant="secondary" className="cursor-pointer" onClick={() => setSelectedTeam('all')}>
                        Team: {teams.find(t => t.id === selectedTeam)?.name} <X className="h-3 w-3 ml-1" />
                      </Badge>
                    )}
                    {selectedSalesperson !== 'all' && (
                      <Badge variant="secondary" className="cursor-pointer" onClick={() => setSelectedSalesperson('all')}>
                        Salesperson: {salespersons.find(s => s.id === selectedSalesperson)?.name} <X className="h-3 w-3 ml-1" />
                      </Badge>
                    )}
                    {selectedListingType !== 'all' && (
                      <Badge variant="secondary" className="cursor-pointer" onClick={() => setSelectedListingType('all')}>
                        Listing: {listingTypes.find(t => t.id === selectedListingType)?.name} <X className="h-3 w-3 ml-1" />
                      </Badge>
                    )}
                    {selectedChannel !== 'all' && (
                      <Badge variant="secondary" className="cursor-pointer" onClick={() => setSelectedChannel('all')}>
                        Channel: {marketingChannels.find(c => c.id === selectedChannel)?.name} <X className="h-3 w-3 ml-1" />
                      </Badge>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearFilters}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 ml-2"
                    >
                      Clear All Filters
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="cursor-pointer hover:bg-gray-50" onClick={() => handleListingsSort('listingCode')}>
                    <div className="flex items-center gap-1">
                      Listing Code
                      {listingsSortColumn === 'listingCode' ? (
                        <ArrowDown className={`h-3 w-3 ${listingsSortDirection === 'asc' ? 'rotate-180' : ''}`} />
                      ) : (
                        <ArrowUpDown className="h-3 w-3 opacity-50" />
                      )}
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer hover:bg-gray-50" onClick={() => handleListingsSort('datePublished')}>
                    <div className="flex items-center gap-1">
                      Date Published
                      {listingsSortColumn === 'datePublished' ? (
                        <ArrowDown className={`h-3 w-3 ${listingsSortDirection === 'asc' ? 'rotate-180' : ''}`} />
                      ) : (
                        <ArrowUpDown className="h-3 w-3 opacity-50" />
                      )}
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer hover:bg-gray-50" onClick={() => handleListingsSort('listingName')}>
                    <div className="flex items-center gap-1">
                      Listing Name
                      {listingsSortColumn === 'listingName' ? (
                        <ArrowDown className={`h-3 w-3 ${listingsSortDirection === 'asc' ? 'rotate-180' : ''}`} />
                      ) : (
                        <ArrowUpDown className="h-3 w-3 opacity-50" />
                      )}
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer hover:bg-gray-50" onClick={() => handleListingsSort('propertyType')}>
                    <div className="flex items-center gap-1">
                      Property Type
                      {listingsSortColumn === 'propertyType' ? (
                        <ArrowDown className={`h-3 w-3 ${listingsSortDirection === 'asc' ? 'rotate-180' : ''}`} />
                      ) : (
                        <ArrowUpDown className="h-3 w-3 opacity-50" />
                      )}
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer hover:bg-gray-50" onClick={() => handleListingsSort('area')}>
                    <div className="flex items-center gap-1">
                      Area
                      {listingsSortColumn === 'area' ? (
                        <ArrowDown className={`h-3 w-3 ${listingsSortDirection === 'asc' ? 'rotate-180' : ''}`} />
                      ) : (
                        <ArrowUpDown className="h-3 w-3 opacity-50" />
                      )}
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer hover:bg-gray-50" onClick={() => handleListingsSort('price')}>
                    <div className="flex items-center gap-1">
                      Price
                      {listingsSortColumn === 'price' ? (
                        <ArrowDown className={`h-3 w-3 ${listingsSortDirection === 'asc' ? 'rotate-180' : ''}`} />
                      ) : (
                        <ArrowUpDown className="h-3 w-3 opacity-50" />
                      )}
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer hover:bg-gray-50" onClick={() => handleListingsSort('listingType')}>
                    <div className="flex items-center gap-1">
                      Listing Type
                      {listingsSortColumn === 'listingType' ? (
                        <ArrowDown className={`h-3 w-3 ${listingsSortDirection === 'asc' ? 'rotate-180' : ''}`} />
                      ) : (
                        <ArrowUpDown className="h-3 w-3 opacity-50" />
                      )}
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer hover:bg-gray-50" onClick={() => handleListingsSort('totalLeads')}>
                    <div className="flex items-center gap-1">
                      Total Leads
                      {listingsSortColumn === 'totalLeads' ? (
                        <ArrowDown className={`h-3 w-3 ${listingsSortDirection === 'asc' ? 'rotate-180' : ''}`} />
                      ) : (
                        <ArrowUpDown className="h-3 w-3 opacity-50" />
                      )}
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer hover:bg-gray-50" onClick={() => handleListingsSort('amountSpent')}>
                    <div className="flex items-center gap-1">
                      Amount Spent
                      {listingsSortColumn === 'amountSpent' ? (
                        <ArrowDown className={`h-3 w-3 ${listingsSortDirection === 'asc' ? 'rotate-180' : ''}`} />
                      ) : (
                        <ArrowUpDown className="h-3 w-3 opacity-50" />
                      )}
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer hover:bg-gray-50" onClick={() => handleListingsSort('cpl')}>
                    <div className="flex items-center gap-1">
                      CPL
                      {listingsSortColumn === 'cpl' ? (
                        <ArrowDown className={`h-3 w-3 ${listingsSortDirection === 'asc' ? 'rotate-180' : ''}`} />
                      ) : (
                        <ArrowUpDown className="h-3 w-3 opacity-50" />
                      )}
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer hover:bg-gray-50" onClick={() => handleListingsSort('daysOnMarket')}>
                    <div className="flex items-center gap-1">
                      Time on Market
                      {listingsSortColumn === 'daysOnMarket' ? (
                        <ArrowDown className={`h-3 w-3 ${listingsSortDirection === 'asc' ? 'rotate-180' : ''}`} />
                      ) : (
                        <ArrowUpDown className="h-3 w-3 opacity-50" />
                      )}
                    </div>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredListings.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={11} className="text-center py-8 text-gray-500">
                      No listings found matching the current filters.
                      <br />
                      <Button 
                        variant="link" 
                        onClick={clearFilters}
                        className="mt-2 text-teal-600 hover:text-teal-700"
                      >
                        Clear all filters to see all listings
                      </Button>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredListings.map((listing) => (
                    <TableRow 
                      key={listing.id} 
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => handleListingRowClick(listing)}
                    >
                      <TableCell className="font-medium text-teal-600">
                        {listing.listingCode}
                      </TableCell>
                      <TableCell>{listing.datePublished}</TableCell>
                      <TableCell className="max-w-xs">
                        <div className="truncate" title={listing.listingName}>
                          {listing.listingName}
                        </div>
                      </TableCell>
                      <TableCell>
                        {listing.propertyType}
                      </TableCell>
                      <TableCell>{listing.area}</TableCell>
                      <TableCell className="font-medium">
                        {formatPrice(listing.price)}
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={
                            listing.listingType === 'Exclusive' ? 'default' :
                            listing.listingType === 'A List' ? 'secondary' : 'outline'
                          }
                          className={
                            listing.listingType === 'Exclusive' ? 'bg-purple-100 text-purple-800 border-purple-300' :
                            listing.listingType === 'A List' ? 'bg-blue-100 text-blue-800 border-blue-300' : 
                            'bg-gray-100 text-gray-800 border-gray-300'
                          }
                        >
                          {listing.listingType}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-300">
                          {listing.totalLeads}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">
                        ฿{(listing.amountSpent / 1000).toFixed(0)}K
                      </TableCell>
                      <TableCell className="font-medium">
                        ฿{listing.cpl.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge 
                          variant="outline" 
                          className={
                            listing.daysOnMarket <= 30 ? 'bg-green-50 text-green-700 border-green-300' :
                            listing.daysOnMarket <= 60 ? 'bg-yellow-50 text-yellow-700 border-yellow-300' :
                            listing.daysOnMarket <= 90 ? 'bg-orange-50 text-orange-700 border-orange-300' :
                            'bg-red-50 text-red-700 border-red-300'
                          }
                        >
                          {listing.daysOnMarket} days
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
          
          {/* Table Summary */}
          {filteredListings.length > 0 && (
            <div className="mt-4 pt-4 border-t bg-gray-50 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                <div className="text-center">
                  <div className="font-semibold text-gray-700">Total Listings</div>
                  <div className="text-lg font-bold text-teal-600">{filteredListings.length}</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-gray-700">Total Leads</div>
                  <div className="text-lg font-bold text-green-600">
                    {filteredListings.reduce((sum, listing) => sum + listing.totalLeads, 0)}
                  </div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-gray-700">Total Spent</div>
                  <div className="text-lg font-bold text-blue-600">
                    ฿{(filteredListings.reduce((sum, listing) => sum + listing.amountSpent, 0) / 1000).toFixed(0)}K
                  </div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-gray-700">Avg CPL</div>
                  <div className="text-lg font-bold text-orange-600">
                    ฿{Math.round(filteredListings.reduce((sum, listing) => sum + listing.cpl, 0) / filteredListings.length).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Performance Heatmap Matrix with Integrated Filters */}
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
          
          {/* See All Button */}
          <div className="flex justify-center pt-4 border-t">
            <Button
              variant="outline"
              onClick={() => setIsHeatmapModalOpen(true)}
              className="text-sm"
            >
              🔍 View Full Heatmap ({Object.keys(extendedPerformanceMatrix).length} total areas)
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

      {/* Full-Screen Heatmap Modal */}
      <Dialog open={isHeatmapModalOpen} onOpenChange={setIsHeatmapModalOpen}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] w-full h-full p-0">
          <div className="flex flex-col h-full">
            {/* Modal Header with Filters */}
            <div className="sticky top-0 bg-white border-b z-10">
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <DialogTitle className="text-xl font-semibold">
                      Complete Marketing Performance Heatmap
                    </DialogTitle>
                    <p className="text-sm text-gray-600 mt-1">
                      All {Object.keys(extendedPerformanceMatrix).length} areas with advanced filtering capabilities
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

                {/* Advanced Filters in Modal - 3 Column Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Listing Type Filter */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Listing Type</label>
                    <Select value={selectedListingType} onValueChange={setSelectedListingType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select listing type" />
                      </SelectTrigger>
                      <SelectContent>
                        {listingTypes.map(type => (
                          <SelectItem key={type.id} value={type.id}>
                            {type.name}
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

                  {/* Price Range Slider */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Price Range: {priceRangeConfig.formatValue(priceRange[0])} - {priceRangeConfig.formatValue(priceRange[1])}
                    </label>
                    <div className="px-3 py-4">
                      <Slider
                        value={priceRange}
                        onValueChange={setPriceRange}
                        min={priceRangeConfig.min}
                        max={priceRangeConfig.max}
                        step={priceRangeConfig.step}
                        className="w-full"
                        minStepsBetweenThumbs={1}
                      />
                    </div>
                  </div>
                </div>

                {/* Active Filters in Modal */}
                {hasActiveFilters && (
                  <div className="pt-4 border-t">
                    <div className="flex flex-wrap gap-2">
                      <span className="text-sm font-medium text-gray-600">Active Filters:</span>
                      {selectedListingType !== 'all' && (
                        <Badge variant="secondary" className="cursor-pointer" onClick={() => setSelectedListingType('all')}>
                          Listing: {listingTypes.find(t => t.id === selectedListingType)?.name} <X className="h-3 w-3 ml-1" />
                        </Badge>
                      )}
                      {(priceRange[0] !== priceRangeConfig.defaultValue[0] || priceRange[1] !== priceRangeConfig.defaultValue[1]) && (
                        <Badge variant="secondary" className="cursor-pointer" onClick={() => setPriceRange(priceRangeConfig.defaultValue)}>
                          Price: {priceRangeConfig.formatValue(priceRange[0])} - {priceRangeConfig.formatValue(priceRange[1])} <X className="h-3 w-3 ml-1" />
                        </Badge>
                      )}
                      {selectedChannel !== 'all' && (
                        <Badge variant="secondary" className="cursor-pointer" onClick={() => setSelectedChannel('all')}>
                          Channel: {marketingChannels.find(c => c.id === selectedChannel)?.name} <X className="h-3 w-3 ml-1" />
                        </Badge>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearFilters}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        Clear All
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Content - Scrollable Heatmap */}
            <div className="flex-1 overflow-auto p-6">
              <div className="space-y-4">
                {/* Column Headers */}
                <div className="grid grid-cols-5 gap-2 sticky top-0 bg-white py-2 z-5">
                  <div className="p-3 text-sm font-medium text-gray-700 bg-gray-100 rounded">Area / Property Type</div>
                  {[
                    { type: 'condo', icon: '🏢', label: 'Condo' },
                    { type: 'house', icon: '🏠', label: 'House' },
                    { type: 'land', icon: '🌾', label: 'Land' },
                    { type: 'townhouse', icon: '🏘️', label: 'Townhouse' }
                  ].map(({ type, icon, label }) => (
                    <div key={type} className="bg-gray-100 rounded">
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

                {/* All Areas Data - Using Extended Matrix */}
                {getSortedAreas(true).map(([areaId, areaData]) => {
                  const areaName = areas.find(a => a.id === areaId)?.name || areaId;
                  
                  return (
                    <div key={areaId} className="grid grid-cols-5 gap-2">
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

                        return (
                          <div
                            key={`${areaId}-${propertyType}`}
                            className={`p-2 rounded cursor-pointer hover:opacity-80 hover:scale-105 transition-all ${getPerformanceColor(percentage)}`}
                            onClick={() => handleCellClick(areaName, propertyType, data)}
                            title="Click for detailed metrics"
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

                {/* Legend in Modal */}
                <div className="mt-6 pt-4 border-t bg-gray-50 rounded-lg p-4">
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
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Listing Details Drawer */}
      <ListingDetailsDrawer 
        isOpen={isListingDrawerOpen}
        onClose={handleListingDrawerClose}
        listing={selectedListingForDrawer}
        onStarToggle={handleStarToggle}
      />
    </div>
  );
};

export default MarketingDashboard;