
import React from 'react';
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { Settings } from "lucide-react";

type SectionVisibility = {
  statsCards: boolean;
  revenue: boolean;
  dataTables: boolean;
  leadsTable: boolean;
  pipelineCard: boolean;
};

type DashboardCustomizerProps = {
  visibleSections: SectionVisibility;
  toggleSectionVisibility: (section: keyof SectionVisibility) => void;
};

export function DashboardCustomizer({ visibleSections, toggleSectionVisibility }: DashboardCustomizerProps) {
  // Count how many sections are hidden
  const hiddenSectionCount = Object.values(visibleSections).filter(value => !value).length;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Settings className="h-5 w-5" />
          {hiddenSectionCount > 0 && (
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-bold flex items-center justify-center text-primary-foreground">
              {hiddenSectionCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72 md:w-80" align="end">
        <div className="space-y-4">
          <h4 className="font-medium text-sm">Customize Dashboard</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="stats-visibility" className="text-sm font-medium">
                Stats Cards
              </label>
              <Switch 
                id="stats-visibility" 
                checked={visibleSections.statsCards}
                onCheckedChange={() => toggleSectionVisibility('statsCards')}
              />
            </div>
            <div className="flex items-center justify-between">
              <label htmlFor="revenue-visibility" className="text-sm font-medium">
                Revenue
              </label>
              <Switch 
                id="revenue-visibility" 
                checked={visibleSections.revenue}
                onCheckedChange={() => toggleSectionVisibility('revenue')}
              />
            </div>
            <div className="flex items-center justify-between">
              <label htmlFor="datatables-visibility" className="text-sm font-medium">
                Data Tables
              </label>
              <Switch 
                id="datatables-visibility" 
                checked={visibleSections.dataTables}
                onCheckedChange={() => toggleSectionVisibility('dataTables')}
              />
            </div>
            <div className="flex items-center justify-between">
              <label htmlFor="leadstable-visibility" className="text-sm font-medium">
                Leads Table
              </label>
              <Switch 
                id="leadstable-visibility" 
                checked={visibleSections.leadsTable}
                onCheckedChange={() => toggleSectionVisibility('leadsTable')}
              />
            </div>
            <div className="flex items-center justify-between">
              <label htmlFor="pipeline-visibility" className="text-sm font-medium">
                Pipeline
              </label>
              <Switch 
                id="pipeline-visibility" 
                checked={visibleSections.pipelineCard}
                onCheckedChange={() => toggleSectionVisibility('pipelineCard')}
              />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default DashboardCustomizer;
