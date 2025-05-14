
import React from 'react';
import { Badge } from "@/components/ui/badge";
import PipelineCard from './PipelineCard';

// Define PipelineStage type locally to avoid import issues
export type PipelineStage = {
  name: string;
  count: number;
  value: number;
  percentage: number;
  color: string;
};

export function PipelineSection() {
  // Sample data
  const stages: PipelineStage[] = [
    { name: "Lead", count: 42, value: 126000, percentage: 30, color: "#c7d2fe" },
    { name: "Called", count: 28, value: 84000, percentage: 20, color: "#a5b4fc" },
    { name: "Follow", count: 21, value: 63000, percentage: 15, color: "#818cf8" },
    { name: "Appointment", count: 14, value: 42000, percentage: 10, color: "#6366f1" },
    { name: "Showing", count: 7, value: 21000, percentage: 5, color: "#4f46e5" },
    { name: "Nego", count: 14, value: 42000, percentage: 10, color: "#4338ca" },
    { name: "Closed", count: 14, value: 42000, percentage: 10, color: "#3730a3" },
  ];
  
  return (
    <div className="w-full">
      <PipelineCard 
        stages={stages}
        totalCommission="$420,000"
        winCommission="$42,000" 
        className="w-full"
      />
    </div>
  );
}

export default PipelineSection;
