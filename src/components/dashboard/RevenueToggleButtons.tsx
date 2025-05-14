
import React from 'react';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { RevenuePeriod, RevenueType } from './RevenueSection';
import { CalendarDays, DollarSign } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

type RevenueToggleButtonsProps = {
  period: RevenuePeriod;
  setPeriod: React.Dispatch<React.SetStateAction<RevenuePeriod>>;
  revenueType: RevenueType;
  setRevenueType: React.Dispatch<React.SetStateAction<RevenueType>>;
};

const RevenueToggleButtons = ({ 
  period, 
  setPeriod, 
  revenueType, 
  setRevenueType 
}: RevenueToggleButtonsProps) => {
  return (
    <>
      {/* Period Toggle */}
      <Tooltip>
        <TooltipTrigger asChild>
          <ToggleGroup 
            type="single" 
            value={period} 
            onValueChange={(value) => {
              if (value) setPeriod(value as RevenuePeriod);
            }}
            className="bg-background border rounded-md"
          >
            <ToggleGroupItem value="monthly" aria-label="Monthly view" size="sm" className="text-xs">
              <span className="hidden sm:inline mr-1">Monthly</span>
              <span className="sm:hidden">M</span>
            </ToggleGroupItem>
            <ToggleGroupItem value="quarterly" aria-label="Quarterly view" size="sm" className="text-xs">
              <span className="hidden sm:inline mr-1">Quarterly</span>
              <span className="sm:hidden">Q</span>
            </ToggleGroupItem>
            <ToggleGroupItem value="annually" aria-label="Annual view" size="sm" className="text-xs">
              <span className="hidden sm:inline mr-1">Annually</span>
              <span className="sm:hidden">A</span>
            </ToggleGroupItem>
          </ToggleGroup>
        </TooltipTrigger>
        <TooltipContent>
          <p>Timeline View</p>
        </TooltipContent>
      </Tooltip>
      
      {/* Revenue Type Toggle */}
      <Tooltip>
        <TooltipTrigger asChild>
          <ToggleGroup 
            type="single" 
            value={revenueType} 
            onValueChange={(value) => {
              if (value) setRevenueType(value as RevenueType);
            }}
            className="bg-background border rounded-md"
          >
            <ToggleGroupItem value="closing" aria-label="Closing Revenue" size="sm" className="text-xs">
              <span className="hidden sm:inline mr-1">Closing</span>
              <span className="sm:hidden">C</span>
            </ToggleGroupItem>
            <ToggleGroupItem value="actual" aria-label="Actual Revenue" size="sm" className="text-xs">
              <span className="hidden sm:inline mr-1">Actual</span>
              <span className="sm:hidden">A</span>
            </ToggleGroupItem>
          </ToggleGroup>
        </TooltipTrigger>
        <TooltipContent>
          <p>Revenue Type</p>
        </TooltipContent>
      </Tooltip>
    </>
  );
};

export default RevenueToggleButtons;
