
import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';

// Updated color palette based on the specified color codes
export const pipelineStages = [
  { name: "Lead", color: "bg-[#b11041] hover:bg-[#b11041]/90" },       // Red
  { name: "Called", color: "bg-[#b11041] hover:bg-[#b11041]/90" },      // Red
  { name: "Following", color: "bg-[#0f68a2] hover:bg-[#0f68a2]/90" },   // Blue
  { name: "Appointment", color: "bg-[#0f68a2] hover:bg-[#0f68a2]/90" }, // Blue
  { name: "Showing", color: "bg-[#ffba06] hover:bg-[#ffba06]/90" },     // Yellow
  { name: "Nego", color: "bg-[#ffba06] hover:bg-[#ffba06]/90" },        // Yellow
  { name: "Closed", color: "bg-[#5e17eb] hover:bg-[#5e17eb]/90" },      // Purple (updated)
  { name: "Win (Transfer)", color: "bg-[#2ac48a] hover:bg-[#2ac48a]/90" }, // Green
];

type PipelineStageBadgeProps = {
  stage: string;
  onStageChange?: (stage: string) => void;
  readOnly?: boolean;
};

const PipelineStageBadge = ({ 
  stage, 
  onStageChange,
  readOnly = false 
}: PipelineStageBadgeProps) => {
  const [currentStage, setCurrentStage] = useState(stage);

  // Find the color for the current stage
  const stageColor = pipelineStages.find(
    s => s.name === currentStage
  )?.color || "bg-[#0f68a2] hover:bg-[#0f68a2]/90";

  const handleStageChange = (selectedStage: string) => {
    setCurrentStage(selectedStage);
    if (onStageChange) {
      onStageChange(selectedStage);
    }
  };

  // If read-only, just show the badge without dropdown
  if (readOnly) {
    return (
      <Badge className={`${stageColor} text-white py-1 px-2`}>
        {currentStage}
      </Badge>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-full focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded">
        <div className={`${stageColor} rounded-md flex items-center justify-between text-white px-2 py-1.5 text-xs font-medium transition-colors`}>
          <span>{currentStage}</span>
          <ChevronDown className="h-3 w-3 ml-1 opacity-70" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[140px] p-1.5 rounded-md shadow-md">
        {pipelineStages.map((stageOption, index) => (
          <DropdownMenuItem 
            key={stageOption.name} 
            onClick={() => handleStageChange(stageOption.name)}
            className={`cursor-pointer p-0 focus:bg-transparent ${index > 0 ? 'mt-1.5' : ''}`}
          >
            <div className={`${stageOption.color} text-white w-full flex justify-center py-1.5 px-2 text-xs rounded-sm font-medium transition-colors`}>
              {stageOption.name}
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PipelineStageBadge;
