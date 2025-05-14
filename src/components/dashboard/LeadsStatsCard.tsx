import React, { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Lead } from '@/hooks/useLeadsTableData';

interface LeadsStatsCardProps {
  data: Lead[];
}

export function LeadsStatsCard({ data }: LeadsStatsCardProps) {
  const [leadRequirement, setLeadRequirement] = useState<string>('all');
  const [leadType, setLeadType] = useState<string>('all');
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });

  // Calculate stats based on filtered data
  const totalLeads = data.length;
  const totalWarnings = data.filter(lead => lead.status === 'Inactive').length;

  return (
    <div className="data-card mb-3">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
        <h3 className="text-lg font-medium">Stats :</h3>
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            <Select 
              value={leadRequirement} 
              onValueChange={setLeadRequirement}
            >
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Lead Requirement" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Requirements</SelectItem>
                <SelectItem value="budget">Budget</SelectItem>
                <SelectItem value="location">Location</SelectItem>
                <SelectItem value="property-type">Property Type</SelectItem>
              </SelectContent>
            </Select>
            
            <Select 
              value={leadType} 
              onValueChange={setLeadType}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Lead Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="buyer">Buyer</SelectItem>
                <SelectItem value="owner">Owner</SelectItem>
              </SelectContent>
            </Select>
            
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[240px] justify-start text-left font-normal",
                    !dateRange.from && "text-muted-foreground"
                  )}
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
                    "Select date range"
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={dateRange.from}
                  selected={{
                    from: dateRange.from,
                    to: dateRange.to,
                  }}
                  onSelect={(range) => 
                    setDateRange({ 
                      from: range?.from, 
                      to: range?.to 
                    })
                  }
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="bg-card rounded-lg p-4 border border-border">
          <h4 className="text-sm font-medium text-muted-foreground mb-2">Total Leads</h4>
          <p className="text-3xl font-bold">{totalLeads}</p>
        </div>
        
        <div className="bg-card rounded-lg p-4 border border-border">
          <h4 className="text-sm font-medium text-muted-foreground mb-2">Total Warnings/Complaints</h4>
          <p className="text-3xl font-bold">{totalWarnings}</p>
        </div>
      </div>
    </div>
  );
}

export default LeadsStatsCard; 