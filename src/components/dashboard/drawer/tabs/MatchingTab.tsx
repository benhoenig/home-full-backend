import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { RefreshCw, Settings, Search, ListFilter } from 'lucide-react';
import { useMatchingTab } from './matching/useMatchingTab';
import { MatchingForm, MatchingPriorityConfig, MatchingResultsDialog, MatchingSummary } from './matching';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const MatchingTab = () => {
  const {
    formState,
    updateFormField,
    matchPercentage,
    handleMatchPercentageChange,
    matchCount,
    showMatches,
    setShowMatches,
    matchingResults,
    matchingFields,
    showPriorityConfig,
    setShowPriorityConfig,
    dragHandlers,
    handleToggleFieldEnabled,
    handleResetPriorities,
    handleHideAll,
    shownFields,
    hiddenFields,
    handleRefreshMatches
  } = useMatchingTab();

  // Get the IDs of enabled fields for the ColumnGroup component
  const enabledFieldIds = matchingFields.filter(f => f.enabled).map(f => f.id);

  // Get the enabled fields (used for filtering form fields)
  const enabledFields = matchingFields.filter(f => f.enabled);
  
  return (
    <div className="space-y-6">
      {/* Matching Properties Section */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center text-base font-medium">
              <Search className="mr-2 h-4 w-4" />
              Matching Properties
            </CardTitle>
            <div className="flex gap-2">
              <Dialog open={showPriorityConfig} onOpenChange={setShowPriorityConfig}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Settings size={16} className="mr-1" />
                    Configure
                  </Button>
                </DialogTrigger>
                <MatchingPriorityConfig 
                  matchPercentage={matchPercentage} 
                  onMatchPercentageChange={handleMatchPercentageChange} 
                  onResetPriorities={handleResetPriorities} 
                  onHideAll={handleHideAll} 
                  onToggleField={handleToggleFieldEnabled} 
                  dragHandlers={dragHandlers} 
                  shownFields={shownFields} 
                  hiddenFields={hiddenFields} 
                  enabledFieldIds={enabledFieldIds} 
                />
              </Dialog>
              
              <Button variant="outline" size="sm" onClick={handleRefreshMatches}>
                <RefreshCw size={16} className="mr-1" />
                Match
              </Button>
            </div>
          </div>
          <CardDescription>Search for properties that match this lead's criteria</CardDescription>
        </CardHeader>
        <CardContent>
          {matchCount > 0 && (
            <Dialog open={showMatches} onOpenChange={setShowMatches}>
              <DialogTrigger asChild>
                <Button variant="default" className="w-full mb-4" onClick={() => setShowMatches(true)}>
                  {matchCount} Properties Found - View Matches
                </Button>
              </DialogTrigger>
              <MatchingResultsDialog matchCount={matchCount} matchingResults={matchingResults} />
            </Dialog>
          )}
          
          {/* Form for matching properties */}
          <MatchingForm formState={formState} onChange={updateFormField} enabledFields={enabledFields} />
        </CardContent>
      </Card>
      
      {/* Matching Requirements */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center text-base font-medium">
            <ListFilter className="mr-2 h-4 w-4" />
            Matching Requirements
          </CardTitle>
          <CardDescription>Summary of enabled matching criteria</CardDescription>
        </CardHeader>
        <CardContent>
          <MatchingSummary 
            formState={formState} 
            matchPercentage={matchPercentage} 
            enabledFieldsCount={enabledFieldIds.length} 
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default MatchingTab;