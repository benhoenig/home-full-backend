
import React from 'react';
import { Lead } from '@/hooks/useLeadsTableData';
import PipelineStageBadge from '../../PipelineStageBadge';
import PotentialBadge from '../../PotentialBadge';
import PipelineProgressBar from '../../PipelineProgressBar';

export function useTableColumnsEnhancer(
  baseColumns: any[],
  onPipelineStageChange: (index: number, stage: string) => void,
  onPotentialChange: (index: number, potential: string) => void
) {
  // Enhanced columns with custom cell renderers
  const enhancedColumns = baseColumns.map(column => {
    if (column.accessorKey === 'pipelineStage') {
      return {
        ...column,
        cell: (lead: Lead, index: number) => (
          <PipelineStageBadge 
            stage={lead.pipelineStage || 'Called'} 
            onStageChange={(stage) => onPipelineStageChange(index, stage)}
          />
        )
      };
    }
    if (column.accessorKey === 'potential') {
      return {
        ...column,
        cell: (lead: Lead, index: number) => (
          <PotentialBadge 
            potential={lead.potential || 'C'} 
            onPotentialChange={(potential) => onPotentialChange(index, potential)}
          />
        )
      };
    }
    if (column.accessorKey === 'pipelineProgress') {
      return {
        ...column,
        className: 'min-w-[180px]',
        cell: (lead: Lead) => (
          <PipelineProgressBar stage={lead.pipelineStage || 'Called'} />
        )
      };
    }
    return column;
  });
  
  return enhancedColumns;
}
