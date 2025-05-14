
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { pipelineStages } from '@/components/dashboard/PipelineStageBadge';

type PipelineBadgeProps = {
  pipelineName: string;
};

const PipelineBadge = ({ pipelineName }: PipelineBadgeProps) => {
  const badgeColor = pipelineStages.find(stage => stage.name === pipelineName)?.color || "bg-[#0f68a2]";
  
  return (
    <Badge className={`text-white py-0.5 px-2 text-xs ${badgeColor}`}>
      {pipelineName}
    </Badge>
  );
};

export default PipelineBadge;
