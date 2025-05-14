
import React from 'react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';
import { pipelineStages } from '@/components/dashboard/PipelineStageBadge';

interface PipelineSelectorProps {
  setSelectedPipeline: (pipeline: string | null) => void;
}

const PipelineSelector: React.FC<PipelineSelectorProps> = ({ setSelectedPipeline }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="rounded-full p-1">
          <ChevronDown className="h-4 w-4 text-gray-400" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="p-1 rounded-md shadow-md">
        <div className="text-xs font-medium px-2 py-1 text-gray-500">Pipeline Stage</div>
        {pipelineStages.map((stage) => (
          <DropdownMenuItem 
            key={stage.name}
            onClick={() => setSelectedPipeline(stage.name)}
            className="cursor-pointer p-0 focus:bg-transparent my-0.5"
          >
            <div className={`${stage.color} text-white w-full text-center py-1 px-2 text-xs rounded-sm`}>
              {stage.name}
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PipelineSelector;
