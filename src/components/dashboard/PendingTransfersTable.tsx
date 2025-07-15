import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

type TimeFrame = 'monthly' | 'quarterly' | 'annually';

// Mock data for pending transfers
const mockPendingTransfers = [
  {
    id: 1,
    buyerName: 'คุณสมศักดิ์ รักดี',
    projectName: 'The Forestias',
    closingPrice: 8500000,
    latestFollowedDate: '2024-08-10',
    commission: 212500
  },
  {
    id: 2,
    buyerName: 'คุณวิภา สมบูรณ์',
    projectName: 'Ashton Residence',
    closingPrice: 6200000,
    latestFollowedDate: '2024-08-05',
    commission: 155000
  },
  {
    id: 3,
    buyerName: 'คุณนิติ พงศ์ธร',
    projectName: 'Noble Around',
    closingPrice: 4800000,
    latestFollowedDate: '2024-07-28',
    commission: 120000
  },
  {
    id: 4,
    buyerName: 'คุณพิมพ์ใจ วงศ์สุข',
    projectName: 'Life Asoke',
    closingPrice: 3900000,
    latestFollowedDate: '2024-07-25',
    commission: 97500
  },
  {
    id: 5,
    buyerName: 'คุณธนา ศรีวิไล',
    projectName: 'Ideo Q Sukhumvit',
    closingPrice: 7200000,
    latestFollowedDate: '2024-07-20',
    commission: 180000
  },
  {
    id: 6,
    buyerName: 'คุณรัตนา ใจดี',
    projectName: 'The Line Sukhumvit',
    closingPrice: 5500000,
    latestFollowedDate: '2024-07-15',
    commission: 137500
  },
  {
    id: 7,
    buyerName: 'คุณสมชาย มั่งมี',
    projectName: 'Rhythm Ekkamai',
    closingPrice: 6800000,
    latestFollowedDate: '2024-07-12',
    commission: 170000
  }
];

const PendingTransfersTable = () => {
  const [timeframe, setTimeframe] = useState<TimeFrame>('monthly');
  const [period, setPeriod] = useState<string>(getCurrentPeriod('monthly'));
  
  // Get current period based on timeframe
  function getCurrentPeriod(tf: TimeFrame): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    
    switch(tf) {
      case 'monthly':
        return `${year}-${month.toString().padStart(2, '0')}`;
      case 'quarterly':
        const quarter = Math.ceil(month / 3);
        return `${year}-Q${quarter}`;
      case 'annually':
      default:
        return year.toString();
    }
  }
  
  // Get period options based on timeframe
  const getPeriodOptions = () => {
    const currentYear = new Date().getFullYear();
    
    switch(timeframe) {
      case 'monthly':
        const months = [
          { value: `${currentYear}-01`, label: 'January' },
          { value: `${currentYear}-02`, label: 'February' },
          { value: `${currentYear}-03`, label: 'March' },
          { value: `${currentYear}-04`, label: 'April' },
          { value: `${currentYear}-05`, label: 'May' },
          { value: `${currentYear}-06`, label: 'June' },
          { value: `${currentYear}-07`, label: 'July' },
          { value: `${currentYear}-08`, label: 'August' },
          { value: `${currentYear}-09`, label: 'September' },
          { value: `${currentYear}-10`, label: 'October' },
          { value: `${currentYear}-11`, label: 'November' },
          { value: `${currentYear}-12`, label: 'December' }
        ];
        return months;
      case 'quarterly':
        return [
          { value: `${currentYear}-Q1`, label: 'Q1' },
          { value: `${currentYear}-Q2`, label: 'Q2' },
          { value: `${currentYear}-Q3`, label: 'Q3' },
          { value: `${currentYear}-Q4`, label: 'Q4' }
        ];
      case 'annually':
      default:
        return [
          { value: currentYear.toString(), label: currentYear.toString() },
          { value: (currentYear - 1).toString(), label: (currentYear - 1).toString() },
          { value: (currentYear - 2).toString(), label: (currentYear - 2).toString() }
        ];
    }
  };
  
  // Filter data based on timeframe and period
  const getFilteredData = () => {
    // In a real app, this would filter based on the actual dates
    // For demo purposes, we'll just return all data
    return mockPendingTransfers;
  };
  
  const pendingTransfers = getFilteredData();
  
  // Calculate total pending commission
  const totalPendingCommission = pendingTransfers.reduce((sum, item) => sum + item.commission, 0);
  
  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('th-TH', { 
      style: 'currency', 
      currency: 'THB',
      maximumFractionDigits: 0
    }).format(value);
  };
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  // Handle timeframe change
  const handleTimeframeChange = (value: string) => {
    if (value) {
      const newTimeframe = value as TimeFrame;
      setTimeframe(newTimeframe);
      setPeriod(getCurrentPeriod(newTimeframe));
    }
  };
  
  return (
    <Card className="h-full data-card">
      <CardHeader className="py-3">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold">เคสรอโอนกรรมสิทธิ์</h3>
            <div className="text-sm font-medium mt-1">
              คอมมิชชั่นค้างรับ <span className="text-teal-600 font-semibold">{formatCurrency(totalPendingCommission)}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ToggleGroup 
              type="single" 
              value={timeframe} 
              onValueChange={handleTimeframeChange}
              className="bg-background border rounded-md"
            >
              <ToggleGroupItem value="monthly" aria-label="Monthly view" size="sm" className="text-xs">
                <span>M</span>
              </ToggleGroupItem>
              <ToggleGroupItem value="quarterly" aria-label="Quarterly view" size="sm" className="text-xs">
                <span>Q</span>
              </ToggleGroupItem>
              <ToggleGroupItem value="annually" aria-label="Annual view" size="sm" className="text-xs">
                <span>Y</span>
              </ToggleGroupItem>
            </ToggleGroup>
            
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="w-[100px] h-8 text-xs">
                <SelectValue placeholder="Period" />
              </SelectTrigger>
              <SelectContent>
                {getPeriodOptions().map(option => (
                  <SelectItem key={option.value} value={option.value} className="text-xs">
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="w-full overflow-hidden border rounded-md">
          <ScrollArea className="h-[320px] w-full">
            <div className="w-full min-w-max">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="sticky top-0 whitespace-nowrap">Buyer Name</TableHead>
                    <TableHead className="sticky top-0 whitespace-nowrap">Closing Project</TableHead>
                    <TableHead className="sticky top-0 whitespace-nowrap text-right">Closing Price</TableHead>
                    <TableHead className="sticky top-0 whitespace-nowrap">Latest Followed</TableHead>
                    <TableHead className="sticky top-0 whitespace-nowrap text-right">Commission</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingTransfers.map(item => (
                    <TableRow key={item.id} className="cursor-pointer hover:bg-muted/30">
                      <TableCell className="whitespace-nowrap font-medium">{item.buyerName}</TableCell>
                      <TableCell className="whitespace-nowrap">{item.projectName}</TableCell>
                      <TableCell className="whitespace-nowrap text-right">{formatCurrency(item.closingPrice)}</TableCell>
                      <TableCell className="whitespace-nowrap">{formatDate(item.latestFollowedDate)}</TableCell>
                      <TableCell className="whitespace-nowrap text-right font-medium text-teal-600">{formatCurrency(item.commission)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  );
};

export default PendingTransfersTable; 