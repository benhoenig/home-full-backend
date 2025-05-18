import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ArrowUpRight, CreditCard, CheckSquare, Tag } from 'lucide-react';
import { cn } from '@/lib/utils';

const PerformanceStats = () => {
  // This would typically come from an API in a real application
  const statsData = {
    caseClosed: 48,
    totalCases: 82,
    conversionRate: 58.5,
    averageTicketSize: 302500
  };
  
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
  
  return (
    <Card className="h-full data-card">
      <CardHeader className="relative pb-2">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Performance :</h3>
        </div>
      </CardHeader>
      <CardContent>
        <StatItem 
          icon={<CheckSquare className="h-4 w-4 text-teal-600" />}
          iconBg="bg-teal-100" 
          iconColor="text-teal-600"
          label="Cases Closed"
          value={`${statsData.caseClosed}/${statsData.totalCases}`}
          change={`${Math.round((statsData.caseClosed / statsData.totalCases) * 100)}%`}
          changeColor="text-teal-600"
        />
        
        <StatItem 
          icon={<Tag className="h-4 w-4 text-blue-600" />}
          iconBg="bg-blue-100" 
          iconColor="text-blue-600"
          label="Conversion Rate"
          value={`${statsData.conversionRate}%`}
          change="8.2%"
          changeColor="text-blue-600"
        />
        
        <StatItem 
          icon={<CreditCard className="h-4 w-4 text-amber-600" />}
          iconBg="bg-amber-100" 
          iconColor="text-amber-600"
          label="Ticket Size"
          value={formatCurrency(statsData.averageTicketSize)}
          change="12.3%"
          changeColor="text-amber-600"
        />
      </CardContent>
    </Card>
  );
};

export default PerformanceStats; 