import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { 
  ArrowUpRight, 
  CheckSquare, 
  Tag, 
  CreditCard,
  Users
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type TimeFrame = 'monthly' | 'quarterly' | 'annually';

const TeamPerformanceStats = () => {
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
  
  // Get stats data based on selected timeframe and period
  const getStatsData = () => {
    // In a real application, this would fetch data from an API based on timeframe and period
    // For now, we'll use mock data that changes slightly based on selections
    
    // Base values for team
    let caseClosed = 165;
    let totalCases = 240;
    let conversionRate = 68.8;
    let averageTicketSize = 285000;
    let activeMembers = 5;
    
    // Adjust based on timeframe
    if (timeframe === 'quarterly') {
      caseClosed *= 3;
      totalCases *= 3;
      averageTicketSize *= 0.98;
    } else if (timeframe === 'annually') {
      caseClosed *= 12;
      totalCases *= 12;
      averageTicketSize *= 0.95;
    }
    
    // Adjust based on period (just for demo purposes)
    const periodNum = parseInt(period.split('-').pop()?.replace('Q', '') || '0');
    const adjustFactor = periodNum / 10;
    
    caseClosed = Math.round(caseClosed * (1 + adjustFactor * 0.1));
    totalCases = Math.round(totalCases * (1 + adjustFactor * 0.05));
    conversionRate = parseFloat((conversionRate * (1 + adjustFactor * 0.02)).toFixed(1));
    averageTicketSize = Math.round(averageTicketSize * (1 + adjustFactor * 0.03));
    
    return {
      caseClosed,
      totalCases,
      conversionRate,
      averageTicketSize,
      activeMembers
    };
  };
  
  const statsData = getStatsData();
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };

  // Stat item component for consistent styling
  const StatItem = ({ 
    icon, 
    iconBg, 
    iconColor, 
    label, 
    value, 
    change, 
    changeColor 
  }: { 
    icon: React.ReactNode; 
    iconBg: string; 
    iconColor: string; 
    label: string; 
    value: string; 
    change: string; 
    changeColor: string;
  }) => (
    <div className="flex items-center gap-4 py-3 border-b last:border-0 border-border/50">
      <div className={cn("rounded-full p-2.5", iconBg)}>
        {icon}
      </div>
      <div className="flex-1">
        <div className="text-sm text-muted-foreground mb-1">{label}</div>
        <div className="flex justify-between items-baseline">
          <span className="text-xl font-semibold">{value}</span>
          <span className={cn("text-xs font-medium flex items-center", changeColor)}>
            <ArrowUpRight className="h-3 w-3 mr-1" />
            {change}
          </span>
        </div>
      </div>
    </div>
  );
  
  // Handle timeframe change
  const handleTimeframeChange = (value: string) => {
    if (value) {
      const newTimeframe = value as TimeFrame;
      setTimeframe(newTimeframe);
      setPeriod(getCurrentPeriod(newTimeframe));
    }
  };
  
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Team Performance :</h3>
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
      <CardContent>
        <StatItem 
          icon={<Users className="h-4 w-4 text-indigo-600" />}
          iconBg="bg-indigo-100" 
          iconColor="text-indigo-600"
          label="Active Team Members"
          value={statsData.activeMembers.toString()}
          change="+1 from last period"
          changeColor="text-indigo-600"
        />
        
        <StatItem 
          icon={<CheckSquare className="h-4 w-4 text-teal-600" />}
          iconBg="bg-teal-100" 
          iconColor="text-teal-600"
          label="Team Cases Closed"
          value={`${statsData.caseClosed}/${statsData.totalCases}`}
          change={`${Math.round((statsData.caseClosed / statsData.totalCases) * 100)}%`}
          changeColor="text-teal-600"
        />
        
        <StatItem 
          icon={<Tag className="h-4 w-4 text-blue-600" />}
          iconBg="bg-blue-100" 
          iconColor="text-blue-600"
          label="Team Conversion Rate"
          value={`${statsData.conversionRate}%`}
          change="9.5%"
          changeColor="text-blue-600"
        />
        
        <StatItem 
          icon={<CreditCard className="h-4 w-4 text-amber-600" />}
          iconBg="bg-amber-100" 
          iconColor="text-amber-600"
          label="Average Ticket Size"
          value={formatCurrency(statsData.averageTicketSize)}
          change="14.2%"
          changeColor="text-amber-600"
        />
      </CardContent>
    </Card>
  );
};

export default TeamPerformanceStats; 