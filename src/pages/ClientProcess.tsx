
import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import PipelineSection from '@/components/dashboard/PipelineSection';
import StatsSection from '@/components/dashboard/StatsSection';
import RevenueSection from '@/components/dashboard/RevenueSection';
import DataTablesSection from '@/components/dashboard/DataTablesSection';
import LeadsTableSection from '@/components/dashboard/LeadsTableSection';
import CardVisibilityControls from '@/components/dashboard/CardVisibilityControls';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Switch } from '@/components/ui/switch';
import { toast } from "sonner";

const ClientProcess = () => {
  // State for controlling the visibility of data tables
  const [cardsVisibility, setCardsVisibility] = useState({
    newLeads: true,
    warning: true,
    transfer: true
  });

  // State for controlling the visibility of main sections
  const [sectionsVisibility, setSectionsVisibility] = useState({
    stats: true,
    revenue: true,
    dataTables: true,
    leadsTable: true,
    pipeline: true
  });

  const toggleCardVisibility = (cardKey: keyof typeof cardsVisibility) => {
    setCardsVisibility(prev => ({
      ...prev,
      [cardKey]: !prev[cardKey]
    }));
  };

  const toggleSectionVisibility = (sectionKey: keyof typeof sectionsVisibility) => {
    setSectionsVisibility(prev => ({
      ...prev,
      [sectionKey]: !prev[sectionKey]
    }));
    
    const status = !sectionsVisibility[sectionKey] ? 'visible' : 'hidden';
    const sectionNames: Record<string, string> = {
      stats: 'Stats',
      revenue: 'Revenue',
      dataTables: 'Data Tables',
      leadsTable: 'Leads Table',
      pipeline: 'Pipeline'
    };
    
    toast.info(`${sectionNames[sectionKey]} section is now ${status}`);
  };

  // Count how many sections are hidden
  const hiddenSectionCount = Object.values(sectionsVisibility).filter(value => !value).length;

  return (
    <DashboardLayout 
      title="UCP (Client Process)"
      headerControls={
        <>
          {/* CardVisibilityControls now first, with reduced margin */}
          <div className="flex items-center gap-1">
            <CardVisibilityControls 
              cardsVisibility={cardsVisibility}
              toggleCardVisibility={toggleCardVisibility}
            />
            
            {/* Section visibility button with Settings icon and switches, with reduced margin */}
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
              <PopoverContent className="w-72" align="end">
                <div className="space-y-4">
                  <h4 className="text-sm font-medium">Section Visibility</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label htmlFor="stats-visibility" className="text-sm font-medium">
                        Stats
                      </label>
                      <Switch 
                        id="stats-visibility" 
                        checked={sectionsVisibility.stats}
                        onCheckedChange={() => toggleSectionVisibility('stats')}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <label htmlFor="revenue-visibility" className="text-sm font-medium">
                        Revenue
                      </label>
                      <Switch 
                        id="revenue-visibility" 
                        checked={sectionsVisibility.revenue}
                        onCheckedChange={() => toggleSectionVisibility('revenue')}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <label htmlFor="dataTables-visibility" className="text-sm font-medium">
                        Data Tables
                      </label>
                      <Switch 
                        id="dataTables-visibility" 
                        checked={sectionsVisibility.dataTables}
                        onCheckedChange={() => toggleSectionVisibility('dataTables')}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <label htmlFor="leadsTable-visibility" className="text-sm font-medium">
                        Leads Table
                      </label>
                      <Switch 
                        id="leadsTable-visibility" 
                        checked={sectionsVisibility.leadsTable}
                        onCheckedChange={() => toggleSectionVisibility('leadsTable')}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <label htmlFor="pipeline-visibility" className="text-sm font-medium">
                        Pipeline
                      </label>
                      <Switch 
                        id="pipeline-visibility" 
                        checked={sectionsVisibility.pipeline}
                        onCheckedChange={() => toggleSectionVisibility('pipeline')}
                      />
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </>
      }
    >
      <div className="flex flex-col w-full gap-6">
        {/* Stats Cards Section */}
        {sectionsVisibility.stats && <StatsSection />}
        
        {/* Revenue Section */}
        {sectionsVisibility.revenue && <RevenueSection />}
        
        {/* Data Tables Section (with visibility controls) */}
        {sectionsVisibility.dataTables && (
          <DataTablesSection 
            cardsVisibility={cardsVisibility}
            toggleCardVisibility={toggleCardVisibility}
          />
        )}
        
        {/* Leads Table Section */}
        {sectionsVisibility.leadsTable && <LeadsTableSection />}
        
        {/* Pipeline Section - Kept at the end */}
        {sectionsVisibility.pipeline && <PipelineSection />}
      </div>
    </DashboardLayout>
  );
};

export default ClientProcess;
