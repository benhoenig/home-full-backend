
import React from 'react';
import { Badge } from "@/components/ui/badge";
import EnhancedPipelineCard from './EnhancedPipelineCard';

// Define PipelineStage type locally to avoid import issues
export type PipelineStage = {
  name: string;
  count: number;
  value: number;
  percentage: number;
  color: string;
};

export function PipelineSection() {
  return (
    <div className="w-full">
      <EnhancedPipelineCard 
        totalCommission="$420,000"
        winCommission="$42,000" 
        className="w-full"
      />
    </div>
  );
}

export default PipelineSection;
