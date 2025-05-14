import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { RefreshCw, Settings } from 'lucide-react';
import { useMatchingTab } from './matching/useMatchingTab';
import { MatchingForm, MatchingPriorityConfig, MatchingResultsDialog, MatchingSummary } from './matching';
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
  return <div className="pt-4 space-y-4">
      {/* Matching Properties Section */}
      <div className="space-y-2">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-lg font-semibold">Matching Properties :</h3>
          <div className="flex gap-2">
            <Dialog open={showPriorityConfig} onOpenChange={setShowPriorityConfig}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Settings size={16} className="mr-1" />
                  Configure
                </Button>
              </DialogTrigger>
              <MatchingPriorityConfig matchPercentage={matchPercentage} onMatchPercentageChange={handleMatchPercentageChange} onResetPriorities={handleResetPriorities} onHideAll={handleHideAll} onToggleField={handleToggleFieldEnabled} dragHandlers={dragHandlers} shownFields={shownFields} hiddenFields={hiddenFields} enabledFieldIds={enabledFieldIds} />
            </Dialog>
            
            <Button variant="outline" size="sm" onClick={handleRefreshMatches}>
              <RefreshCw size={16} className="mr-1" />
              Match
            </Button>
          </div>
        </div>
        
        {matchCount > 0 && <Dialog open={showMatches} onOpenChange={setShowMatches}>
            <DialogTrigger asChild>
              <Button variant="default" className="w-full mb-2" onClick={() => setShowMatches(true)}>
                {matchCount} Properties Found - View Matches
              </Button>
            </DialogTrigger>
            <MatchingResultsDialog matchCount={matchCount} matchingResults={matchingResults} />
          </Dialog>}
        
        {/* Form for matching properties */}
        <MatchingForm formState={formState} onChange={updateFormField} enabledFields={enabledFields} />
      </div>
      
      {/* Matching Details */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Matching Requirements</h3>
        <MatchingSummary formState={formState} matchPercentage={matchPercentage} enabledFieldsCount={enabledFieldIds.length} />
      </div>
    </div>;
};
export default MatchingTab;