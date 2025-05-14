
import React from 'react';
import { DialogHeader, DialogTitle, DialogContent } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Slider } from '@/components/ui/slider';
import ColumnGroup from '../../../leads-table/column-customizer/ColumnGroup';
import { ColumnKey } from '@/hooks/useDataTableColumns';
import { MatchingDragHandlers } from './MatchingTypes';

interface MatchingPriorityConfigProps {
  matchPercentage: number;
  onMatchPercentageChange: (value: number[]) => void;
  onResetPriorities: () => void;
  onHideAll: () => void;
  onToggleField: (fieldId: string) => void;
  dragHandlers: MatchingDragHandlers;
  shownFields: { header: string; accessorKey: string }[];
  hiddenFields: { header: string; accessorKey: string }[];
  enabledFieldIds: string[];
}

const MatchingPriorityConfig: React.FC<MatchingPriorityConfigProps> = ({
  matchPercentage,
  onMatchPercentageChange,
  onResetPriorities,
  onHideAll,
  onToggleField,
  dragHandlers,
  shownFields,
  hiddenFields,
  enabledFieldIds
}) => {
  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Configure Matching Priority</DialogTitle>
      </DialogHeader>
      <div className="flex justify-between items-center mb-2">
        <Button variant="outline" size="sm" onClick={onResetPriorities}>
          Reset to Default
        </Button>
      </div>
      <ScrollArea className="h-[400px] pr-4">
        <div className="space-y-4">
          {/* Shown columns section */}
          <ColumnGroup 
            title="Enabled Fields"
            columns={shownFields}
            visibleColumns={enabledFieldIds as unknown as ColumnKey[]}
            showHideAllButton={true}
            onHideAll={onHideAll}
            onColumnToggle={onToggleField}
            dragHandlers={dragHandlers}
          />

          {/* Hidden columns section */}
          <ColumnGroup
            title="Disabled Fields"
            columns={hiddenFields}
            visibleColumns={enabledFieldIds as unknown as ColumnKey[]}
            onColumnToggle={onToggleField}
          />
        </div>
      </ScrollArea>
      <div className="pt-4 border-t">
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Match Percentage</h4>
          <div className="flex items-center gap-4">
            <Slider
              value={[matchPercentage]}
              min={50}
              max={100}
              step={5}
              onValueChange={onMatchPercentageChange}
              className="flex-1"
            />
            <span className="w-12 text-right">{matchPercentage}%</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Set minimum match percentage for property suggestions
          </p>
        </div>
      </div>
    </DialogContent>
  );
};

export default MatchingPriorityConfig;
