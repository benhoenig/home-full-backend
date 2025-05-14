
import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, Check, X } from 'lucide-react';
import { pipelineStages } from '../PipelineStageBadge';

type LeadStatusProps = {
  status?: string;
  pipelineStage?: string;
  onStatusChange?: (status: string) => void;
  onPipelineStageChange?: (stage: string) => void;
};

const LeadStatus = ({ 
  status = 'Active', 
  pipelineStage = 'Following',
  onStatusChange,
  onPipelineStageChange
}: LeadStatusProps) => {
  const [currentStatus, setCurrentStatus] = useState(status);
  const [currentStage, setCurrentStage] = useState(pipelineStage);

  // Find the color for the current stage
  const stageColor = pipelineStages.find(
    stage => stage.name === currentStage
  )?.color || "bg-[#7A41E6] hover:bg-[#7A41E6]/90"; // Default to darker purple if stage not found

  const handleStageChange = (stage: string) => {
    setCurrentStage(stage);
    if (onPipelineStageChange) {
      onPipelineStageChange(stage);
    }
  };

  const handleStatusChange = (newStatus: string) => {
    setCurrentStatus(newStatus);
    if (onStatusChange) {
      onStatusChange(newStatus);
    }
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'Active':
        return 'bg-[#2BC48A] hover:bg-[#2BC48A]/90';
      case 'Lose':
        return 'bg-[#F97066] hover:bg-[#F97066]/90';
      case 'Reject':
        return 'bg-[#F97066] hover:bg-[#F97066]/90';
      case 'Active (Saved)':
        return 'bg-[#2BC48A] hover:bg-[#2BC48A]/90';
      default:
        return 'bg-[#2BC48A] hover:bg-[#2BC48A]/90';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Active':
      case 'Active (Saved)':
        return <Check className="h-4 w-4 mr-1" />;
      case 'Lose':
      case 'Reject':
        return <X className="h-4 w-4 mr-1" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4 mb-6">
      {/* Two-column layout for status dropdowns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-sm mb-1">Lead Status :</p>
          <DropdownMenu>
            <DropdownMenuTrigger className="w-full">
              <div className={`h-8 ${getStatusColor(currentStatus)} rounded flex items-center justify-between text-white px-3`}>
                <span className="flex items-center">
                  {getStatusIcon(currentStatus)}
                  {currentStatus}
                </span>
                <ChevronDown className="h-4 w-4 ml-2" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-[200px] p-1.5 bg-background">
              {['Active', 'Lose', 'Reject', 'Active (Saved)'].map((statusOption, index) => (
                <DropdownMenuItem 
                  key={statusOption} 
                  onClick={() => handleStatusChange(statusOption)}
                  className={`cursor-pointer p-0 focus:bg-transparent ${index > 0 ? 'mt-1.5' : ''}`}
                >
                  <div className={`${getStatusColor(statusOption)} text-white w-full flex justify-between items-center py-1.5 px-2 text-xs rounded-sm font-medium transition-colors`}>
                    <span className="flex items-center">
                      {getStatusIcon(statusOption)}
                      {statusOption}
                    </span>
                    {currentStatus === statusOption && <Check className="h-4 w-4" />}
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <div>
          <p className="text-sm mb-1">Pipeline Stage :</p>
          <DropdownMenu>
            <DropdownMenuTrigger className="w-full">
              <div className={`h-8 ${stageColor} rounded flex items-center justify-between text-white px-3`}>
                <span>{currentStage}</span>
                <ChevronDown className="h-4 w-4 ml-2" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-[200px] p-1.5 bg-background">
              {pipelineStages.map((stage, index) => (
                <DropdownMenuItem 
                  key={stage.name} 
                  onClick={() => handleStageChange(stage.name)}
                  className={`cursor-pointer p-0 focus:bg-transparent ${index > 0 ? 'mt-1.5' : ''}`}
                >
                  <div className={`${stage.color} text-white w-full flex justify-between items-center py-1.5 px-2 text-xs rounded-sm font-medium transition-colors`}>
                    {stage.name}
                    {currentStage === stage.name && <Check className="h-4 w-4" />}
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default LeadStatus;
