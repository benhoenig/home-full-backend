
import React from 'react';
import { Progress } from '@/components/ui/progress';

// Define stages in order for progress calculation
const stageOrder = [
  "Lead",
  "Called",
  "Following",
  "Appointment",
  "Showing",
  "Nego",
  "Closed",
  "Win (Transfer)"
];

// Calculate progress percentage based on current stage
const calculateProgress = (currentStage: string): number => {
  const index = stageOrder.indexOf(currentStage);
  if (index === -1) return 0;
  return Math.round(((index + 1) / stageOrder.length) * 100);
};

// Determine the gradient color based on the stage
const getProgressColor = (stage: string): string => {
  if (["Lead", "Called"].includes(stage)) {
    return "from-[#b11041] to-[#b11041]";
  } else if (["Following", "Appointment"].includes(stage)) {
    return "from-[#0f68a2] to-[#0f68a2]";
  } else if (["Showing", "Nego"].includes(stage)) {
    return "from-[#ffba06] to-[#ffba06]";
  } else if (stage === "Closed") {
    return "from-[#5e17eb] to-[#5e17eb]";
  } else if (stage === "Win (Transfer)") {
    return "from-[#2ac48a] to-[#2ac48a]";
  }
  return "from-gray-400 to-gray-500";
};

type PipelineProgressBarProps = {
  stage: string;
};

const PipelineProgressBar = ({ stage }: PipelineProgressBarProps) => {
  const progress = calculateProgress(stage);
  const colorClass = getProgressColor(stage);
  
  return (
    <div className="w-full flex items-center gap-2">
      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
        <div 
          className={`h-full bg-gradient-to-r ${colorClass} rounded-full`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <span className="text-xs text-muted-foreground whitespace-nowrap">{progress}%</span>
    </div>
  );
};

export default PipelineProgressBar;
