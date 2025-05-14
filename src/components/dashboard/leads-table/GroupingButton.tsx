
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Layers } from 'lucide-react';

type GroupingButtonProps = {
  isGroupingEnabled: boolean;
  toggleGrouping: () => void;
  onManageGroups: () => void;
};

const GroupingButton = ({ isGroupingEnabled, toggleGrouping, onManageGroups }: GroupingButtonProps) => {
  const handleToggleGrouping = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleGrouping();
  };

  const handleManageGroups = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onManageGroups();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant={isGroupingEnabled ? "default" : "outline"} 
          size="sm" 
          className="h-9 flex items-center gap-1"
        >
          <Layers className="h-4 w-4" />
          Group
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-48">
        <DropdownMenuItem onClick={handleToggleGrouping}>
          {isGroupingEnabled ? "Disable Grouping" : "Enable Grouping"}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleManageGroups}>
          Manage Group Settings
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default GroupingButton;
