
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { DateRange } from 'react-day-picker';

type PipelineStage = {
  name: string;
  count: number;
  value: number;
  percentage: number;
  color: string;
};

type PipelineCardProps = {
  stages: PipelineStage[];
  totalCommission: string;
  winCommission: string;
  className?: string;
};

export function PipelineCard({ stages, totalCommission, winCommission, className }: PipelineCardProps) {
  // Date range state
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: undefined,
  });

  return (
    <div className={cn("data-card", className)}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Pipeline :</h3>
        <div className="flex gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[140px] h-8 text-xs">
              <SelectValue placeholder="Lead Potential" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Potential</SelectItem>
              <SelectItem value="a">A Lead</SelectItem>
              <SelectItem value="b">B Lead</SelectItem>
              <SelectItem value="c">C Lead</SelectItem>
            </SelectContent>
          </Select>
          
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-[120px] h-8 text-xs px-2 justify-between">
                {dateRange?.from ? (
                  dateRange.to ? (
                    <span className="truncate">
                      {format(dateRange.from, "MMM d")} - {format(dateRange.to, "MMM d")}
                    </span>
                  ) : (
                    <span>{format(dateRange.from, "MMM d")}</span>
                  )
                ) : (
                  <span>Filter Timeline</span>
                )}
                <CalendarIcon className="h-3 w-3 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={dateRange?.from}
                selected={dateRange}
                onSelect={setDateRange}
                numberOfMonths={1}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      
      <div className="space-y-3">
        {stages.map((stage, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-2 w-32">
              <span className="text-sm font-medium">{stage.name}</span>
              <span className="text-xs text-muted-foreground">: {stage.count}</span>
            </div>
            <div className="flex-1 mx-2">
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full progress-bar-gradient"
                  style={{ width: `${stage.percentage}%` }}
                ></div>
              </div>
            </div>
            <div className="w-24 text-right">
              <span className="text-sm">${stage.value.toLocaleString()}</span>
              <span className="text-xs text-muted-foreground ml-1">{stage.percentage}%</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-border flex justify-between">
        <div>
          <div className="text-sm text-muted-foreground">Total Commission</div>
          <div className="text-lg font-bold mt-1">{totalCommission}</div>
        </div>
        <div className="text-right">
          <div className="text-sm text-muted-foreground">Win Commission</div>
          <div className="text-lg font-bold mt-1 text-secondary">{winCommission}</div>
        </div>
      </div>
    </div>
  );
}

export default PipelineCard;
