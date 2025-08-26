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
import { CalendarIcon, TrendingUp, TrendingDown, Minus, Info } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { 
  usePipelineComparison, 
  ComparisonTarget, 
  ComparisonType,
  TimePeriod, 
  PipelineStageComparison 
} from '@/hooks/usePipelineComparison';

type EnhancedPipelineCardProps = {
  totalCommission: string;
  winCommission: string;
  className?: string;
};

const ComparisonIndicator = ({ stage }: { stage: PipelineStageComparison }) => {
  if (!stage.comparison) return null;

  const { difference, trend } = stage.comparison;
  const absValue = Math.abs(difference);

  if (trend === 'equal') {
    return (
      <div className="flex items-center gap-1 text-gray-500">
        <Minus className="h-3 w-3" />
        <span className="text-xs">±0%</span>
      </div>
    );
  }

  const isPositive = trend === 'up';
  const colorClass = isPositive ? 'text-green-600' : 'text-red-600';
  const Icon = isPositive ? TrendingUp : TrendingDown;

  return (
    <div className={`flex items-center gap-1 ${colorClass}`}>
      <Icon className="h-3 w-3" />
      <span className="text-xs font-medium">
        {isPositive ? '+' : '-'}{absValue.toFixed(1)}%
      </span>
    </div>
  );
};

const StageProgressBar = ({ stage }: { stage: PipelineStageComparison }) => {
  const currentWidth = stage.current.percentage;
  const comparisonWidth = stage.comparison?.percentage;

  return (
    <div className="relative">
      {/* Current performance bar */}
      <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
        <div 
          className="h-full rounded-full progress-bar-gradient transition-all duration-300"
          style={{ width: `${currentWidth}%` }}
        />
      </div>
      
      {/* Comparison benchmark indicator */}
      {comparisonWidth && comparisonWidth !== currentWidth && (
        <div 
          className="absolute top-0 w-0.5 h-2 bg-gray-400 opacity-60"
          style={{ left: `${Math.min(comparisonWidth, 100)}%` }}
        />
      )}
    </div>
  );
};

export function EnhancedPipelineCard({ totalCommission, winCommission, className }: EnhancedPipelineCardProps) {
  // Date range state
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: undefined,
  });

  const {
    comparisonTarget,
    setComparisonTarget,
    comparisonType,
    setComparisonType,
    timePeriod,
    setTimePeriod,
    showAnonymous,
    setShowAnonymous,
    comparisonData,
    topPerformers,
    comparisonTitle,
  } = usePipelineComparison();

  const handleComparisonTargetChange = (value: ComparisonTarget) => {
    setComparisonTarget(value);
  };

  const handleComparisonTypeChange = (value: ComparisonType) => {
    setComparisonType(value);
  };

  const handleTimePeriodChange = (value: TimePeriod) => {
    setTimePeriod(value);
  };

  const showComparisonTypeSelector = comparisonTarget === 'myself' || comparisonTarget.startsWith('top_');
  const showTimePeriodSelector = comparisonTarget === 'myself';
  const showAnonymousToggle = ['top_1', 'top_2', 'top_3'].includes(comparisonTarget);
  const showDatePicker = comparisonTarget === 'current'; // Only show date picker when in current mode

  return (
    <TooltipProvider>
      <div className={cn("data-card", className)}>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-medium">Pipeline:</h3>
            <Badge variant="outline" className="text-xs">
              {comparisonTitle}
            </Badge>
          </div>
          
          <div className="flex gap-2 flex-wrap">
            {/* Comparison Target Selector */}
            <Select value={comparisonTarget} onValueChange={handleComparisonTargetChange}>
              <SelectTrigger className="w-[140px] h-8 text-xs">
                <SelectValue placeholder="Compare with" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="current">Current Only</SelectItem>
                <SelectItem value="myself">vs Myself</SelectItem>
                <SelectItem value="top_1">vs Top Performer #1</SelectItem>
                <SelectItem value="top_2">vs Top Performer #2</SelectItem>
                <SelectItem value="top_3">vs Top Performer #3</SelectItem>
                <SelectItem value="top_3_average">vs Top 3 Average</SelectItem>
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
                <SelectTrigger className="w-[100px] h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="annually">Annually</SelectItem>
                </SelectContent>
              </Select>
            )}

            {/* Anonymous Toggle */}
            {showAnonymousToggle && (
              <Button
                variant="outline"
                size="sm"
                className="h-8 text-xs px-3"
                onClick={() => setShowAnonymous(!showAnonymous)}
              >
                {showAnonymous ? 'Anonymous' : 'Named'}
              </Button>
            )}

            {/* Lead Potential Filter */}
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
            
            {/* Date Range Picker - Only show when in current mode */}
            {showDatePicker && (
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
                  {comparisonTarget.startsWith('top_') && (
                    <span className="ml-1 text-blue-600">
                      (Conversion Rate: {topPerformers[parseInt(comparisonTarget.split('_')[1]) - 1]?.overallConversionRate || 'N/A'}%)
                    </span>
                  )}
                </div>
                {showComparisonTypeSelector && (
                  <div className="mt-1 text-xs text-blue-700">
                    {comparisonTarget === 'myself' && comparisonType === 'average' && '📊 Average: ผลงานโดยเฉลี่ยของคุณตามช่วงเวลา'}
                    {comparisonTarget === 'myself' && comparisonType === 'best_complete' && '🏆 Best Complete Pipeline: ผลงานจริงจากช่วงเวลาที่ดีที่สุดของคุณ'}
                    {comparisonTarget === 'myself' && comparisonType === 'best_peak' && '🎯 Best Peak Potential: ผลงานที่ดีที่สุดของคุณในแต่ละขั้นตอน (จากช่วงเวลาต่างๆ)'}
                    {comparisonTarget.startsWith('top_') && comparisonType === 'average' && '📊 Average: ผลงานโดยเฉลี่ยของพวกเขาตามช่วงเวลา'}
                    {comparisonTarget.startsWith('top_') && comparisonType === 'best_complete' && '🏆 Best Complete Pipeline: ผลงานจริงจากช่วงเวลาที่ดีที่สุดของพวกเขา'}
                    {comparisonTarget.startsWith('top_') && comparisonType === 'best_peak' && '🎯 Best Peak Potential: ผลงานที่ดีที่สุดของพวกเขาในแต่ละขั้นตอน (จากช่วงเวลาต่างๆ)'}
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
                <span className="text-sm font-medium">{stage.name}</span>
                <span className="text-xs text-muted-foreground">: {stage.current.count}</span>
              </div>
              
              <div className="flex-1 mx-2">
                <StageProgressBar stage={stage} />
                {stage.comparison && (
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>Current: {stage.current.conversionRate.toFixed(1)}%</span>
                    <span>Target: {stage.comparison.conversionRate.toFixed(1)}%</span>
                  </div>
                )}
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-24 text-right">
                  <span className="text-sm">${stage.current.value.toLocaleString()}</span>
                  <span className="text-xs text-muted-foreground ml-1">{stage.current.percentage}%</span>
                </div>
                
                {/* Comparison Indicator */}
                <div className="w-16 flex justify-center">
                  <ComparisonIndicator stage={stage} />
                </div>
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

        {/* Performance Summary */}
        {comparisonTarget !== 'current' && (
          <div className="mt-4 pt-4 border-t border-border">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Overall Performance vs {comparisonTitle}:</span>
                <div className="font-medium mt-1">
                  {(() => {
                    const avgDifference = comparisonData.reduce((acc, stage) => 
                      acc + (stage.comparison?.difference || 0), 0) / comparisonData.length;
                    const isPositive = avgDifference > 0;
                    return (
                      <span className={isPositive ? 'text-green-600' : 'text-red-600'}>
                        {isPositive ? '+' : ''}{avgDifference.toFixed(1)}% average
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
                      (stage.comparison?.difference || -999) > (best.comparison?.difference || -999) ? stage : best
                    );
                    return bestStage.name;
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

export default EnhancedPipelineCard;
