import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon, TrendingUp, TrendingDown, Minus, Info } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useTeamPipelineComparison } from '@/hooks/useTeamPipelineComparison';
import { usePipelineComparison } from '@/hooks/usePipelineComparison';

type TeamPipelineCardProps = {
  totalCommission: string;
  winCommission: string;
  selectedMember?: string;
  className?: string;
};

export default function TeamPipelineCard({ 
  totalCommission, 
  winCommission, 
  selectedMember = 'all',
  className 
}: TeamPipelineCardProps) {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: undefined,
  });

  // Use different hooks based on whether viewing team or individual
  const teamHook = useTeamPipelineComparison();
  const individualHook = usePipelineComparison();
  
  const isIndividualView = selectedMember !== 'all';
  const currentHook = isIndividualView ? individualHook : teamHook;
  
  const {
    comparisonTarget,
    setComparisonTarget,
    comparisonType,
    setComparisonType,
    timePeriod,
    setTimePeriod,
    comparisonData,
    comparisonTitle,
  } = currentHook;

  const handleComparisonTargetChange = (value: string) => {
    setComparisonTarget(value as any);
  };

  const handleComparisonTypeChange = (value: string) => {
    setComparisonType(value as any);
  };

  const handleTimePeriodChange = (value: string) => {
    setTimePeriod(value as any);
  };

  const showComparisonTypeSelector = comparisonTarget !== 'current';
  const showTimePeriodSelector = isIndividualView 
    ? comparisonTarget === 'myself' 
    : comparisonTarget === 'my_team';
  const showDatePicker = comparisonTarget === 'current';

  return (
    <TooltipProvider>
      <div className={cn("data-card", className)}>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              {comparisonTitle}
            </Badge>
          </div>
          
          <div className="flex gap-2 flex-wrap">
            {/* Comparison Target Selector */}
            <Select value={comparisonTarget as string} onValueChange={handleComparisonTargetChange}>
              <SelectTrigger className="w-[140px] h-8 text-xs">
                <SelectValue placeholder="Compare with" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="current">Current Only</SelectItem>
                {isIndividualView ? (
                  <>
                    <SelectItem value="myself">vs Myself</SelectItem>
                    <SelectItem value="top_1">vs Top Performer #1</SelectItem>
                    <SelectItem value="top_2">vs Top Performer #2</SelectItem>
                    <SelectItem value="top_3">vs Top Performer #3</SelectItem>
                    <SelectItem value="top_3_average">vs Top 3 Average</SelectItem>
                  </>
                ) : (
                  <>
                    <SelectItem value="my_team">vs My Team</SelectItem>
                    <SelectItem value="best_team">vs Best Team</SelectItem>
                    <SelectItem value="company">vs Company</SelectItem>
                  </>
                )}
              </SelectContent>
            </Select>

            {/* Comparison Type Selector */}
            {showComparisonTypeSelector && (
              <Select value={comparisonType} onValueChange={handleComparisonTypeChange}>
                <SelectTrigger className="w-[140px] h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="average">Average</SelectItem>
                  <SelectItem value="best_complete">Best Complete Pipeline</SelectItem>
                  <SelectItem value="best_peak">Best Peak Potential</SelectItem>
                </SelectContent>
              </Select>
            )}

            {/* Time Period Selector */}
            {showTimePeriodSelector && (
              <Select value={timePeriod} onValueChange={handleTimePeriodChange}>
                <SelectTrigger className="w-[130px] h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="last_month">Last Month</SelectItem>
                  <SelectItem value="past_3_months">Past 3 Months</SelectItem>
                  <SelectItem value="past_6_months">Past 6 Months</SelectItem>
                  <SelectItem value="past_9_months">Past 9 Months</SelectItem>
                  <SelectItem value="past_12_months">Past 12 Months</SelectItem>
                </SelectContent>
              </Select>
            )}

            {/* Date Picker - only show when in current mode */}
            {showDatePicker && (
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-[120px] h-8 text-xs px-2 justify-between">
                    {dateRange?.from ? (
                      dateRange.to ? (
                        <>
                          {format(dateRange.from, "LLL dd")} - {format(dateRange.to, "LLL dd")}
                        </>
                      ) : (
                        format(dateRange.from, "LLL dd, y")
                      )
                    ) : (
                      <span>Pick a date</span>
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
            )}
          </div>
        </div>
        
        {/* Performance Insight Banner */}
        {comparisonTarget !== 'current' && (
          <div className="mb-4 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
            <div className="flex items-center gap-2">
              <Info className="h-4 w-4 text-blue-600" />
              <div className="text-sm text-blue-800">
                <div>
                  Comparing with <span className="font-semibold">{comparisonTitle}</span>
                </div>
                {showComparisonTypeSelector && (
                  <div className="mt-1 text-xs text-blue-700">
                    {comparisonTarget === 'my_team' && comparisonType === 'average' && '📊 Average: ผลงานโดยเฉลี่ยของทีมคุณตามช่วงเวลา'}
                    {comparisonTarget === 'my_team' && comparisonType === 'best_complete' && '🏆 Best Complete Pipeline: ผลงานจริงจากช่วงเวลาที่ดีที่สุดของทีมคุณ'}
                    {comparisonTarget === 'my_team' && comparisonType === 'best_peak' && '🎯 Best Peak Potential: ผลงานที่ดีที่สุดของทีมคุณในแต่ละขั้นตอน (จากช่วงเวลาต่างๆ)'}
                    {comparisonTarget === 'best_team' && comparisonType === 'average' && '📊 Average: ผลงานโดยเฉลี่ยของทีมที่ดีที่สุดตามช่วงเวลา'}
                    {comparisonTarget === 'best_team' && comparisonType === 'best_complete' && '🏆 Best Complete Pipeline: ผลงานจริงจากช่วงเวลาที่ดีที่สุดของทีมที่ดีที่สุด'}
                    {comparisonTarget === 'best_team' && comparisonType === 'best_peak' && '🎯 Best Peak Potential: ผลงานที่ดีที่สุดของทีมที่ดีที่สุดในแต่ละขั้นตอน (จากช่วงเวลาต่างๆ)'}
                    {comparisonTarget === 'company' && comparisonType === 'average' && '📊 Average: ผลงานโดยเฉลี่ยของบริษัททั้งหมดตามช่วงเวลา'}
                    {comparisonTarget === 'company' && comparisonType === 'best_complete' && '🏆 Best Complete Pipeline: ผลงานจริงจากช่วงเวลาที่ดีที่สุดของบริษัททั้งหมด'}
                    {comparisonTarget === 'company' && comparisonType === 'best_peak' && '🎯 Best Peak Potential: ผลงานที่ดีที่สุดของบริษัททั้งหมดในแต่ละขั้นตอน (จากช่วงเวลาต่างๆ)'}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        
        <div className="space-y-3">
          {comparisonData.map((stage, index) => (
            <div key={index} className="flex items-center justify-between group">
              <div className="flex items-center gap-2 w-32">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: stage.color }}
                />
                <span className="text-sm font-medium">{stage.name}</span>
              </div>
              
              <div className="flex-1 mx-4">
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                  <span>{stage.current.count} leads</span>
                  <span>•</span>
                  <span>{stage.current.value.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })}</span>
                  <span>•</span>
                  <span>{stage.current.conversionRate.toFixed(1)}% conversion</span>
                </div>
                
                <div className="relative">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full transition-all duration-300" 
                      style={{ 
                        width: `${stage.current.percentage}%`,
                        backgroundColor: stage.color 
                      }}
                    />
                  </div>
                  
                  {stage.comparison && (
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-xs text-muted-foreground">vs benchmark:</span>
                      <div className="flex items-center gap-1">
                        {stage.comparison.trend === 'up' && <TrendingUp className="h-3 w-3 text-green-500" />}
                        {stage.comparison.trend === 'down' && <TrendingDown className="h-3 w-3 text-red-500" />}
                        {stage.comparison.trend === 'neutral' && <Minus className="h-3 w-3 text-gray-500" />}
                        <span className={`text-xs font-medium ${
                          stage.comparison.trend === 'up' ? 'text-green-600' : 
                          stage.comparison.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                        }`}>
                          {stage.comparison.difference > 0 ? '+' : ''}{stage.comparison.difference.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="text-right w-16">
                <div className="text-sm font-semibold">{stage.current.percentage}%</div>
              </div>
            </div>
          ))}
        </div>

        {/* Commission Summary */}
        <div className="flex justify-between items-center mt-6 pt-4 border-t border-border">
          <div className="text-center">
            <div className="text-sm text-muted-foreground">Total Commission</div>
            <div className="text-xl font-bold mt-1 text-primary">{totalCommission}</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-muted-foreground">Win Commission</div>
            <div className="text-lg font-bold mt-1 text-secondary">{winCommission}</div>
          </div>
        </div>

        {/* Performance Summary */}
        {comparisonTarget !== 'current' && (
          <div className="mt-4 pt-4 border-t border-border">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Overall Team Performance vs {comparisonTitle}:</span>
                <div className="font-medium mt-1">
                  {(() => {
                    const avgDifference = comparisonData.reduce((acc, stage) => 
                      acc + (stage.comparison?.difference || 0), 0) / comparisonData.length;
                    const isPositive = avgDifference > 0;
                    return (
                      <span className={isPositive ? 'text-green-600' : 'text-red-600'}>
                        {isPositive ? '+' : ''}{avgDifference.toFixed(1)}% 
                        {isPositive ? ' Above' : ' Below'} Average
                      </span>
                    );
                  })()}
                </div>
              </div>
              <div>
                <span className="text-muted-foreground">Best Performing Stage:</span>
                <div className="font-medium mt-1">
                  {(() => {
                    const bestStage = comparisonData.reduce((best, stage) => 
                      (stage.comparison?.difference || -Infinity) > (best.comparison?.difference || -Infinity) ? stage : best
                    );
                    return `${bestStage.name} (+${(bestStage.comparison?.difference || 0).toFixed(1)}%)`;
                  })()}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </TooltipProvider>
  );
}
