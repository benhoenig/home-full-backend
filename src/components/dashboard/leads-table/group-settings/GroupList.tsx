
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { LeadGroup } from '@/hooks/useLeadGroups';
import GroupItem from './GroupItem';
import { DragDropHandlers } from '../hooks/useGroupDragDrop';

type GroupListProps = {
  leadGroups: LeadGroup[];
  draggedGroupId: string | null;
  dragHandlers: DragDropHandlers;
  onUpdateGroupName: (id: string, name: string) => void;
  onToggleGroupVisibility: (id: string) => void;
  onUpdateGroupColor: (id: string, color: string) => void;
  onDeleteGroup: (id: string) => void;
};

const GroupList = ({ 
  leadGroups, 
  draggedGroupId, 
  dragHandlers,
  onUpdateGroupName,
  onToggleGroupVisibility,
  onUpdateGroupColor,
  onDeleteGroup
}: GroupListProps) => {
  return (
    <ScrollArea className="max-h-[350px] pr-3 -mr-3">
      <div className="space-y-2">
        {leadGroups.map((group) => (
          <GroupItem 
            key={group.id}
            group={group} 
            dragHandlers={dragHandlers}
            isDragged={draggedGroupId === group.id}
            onNameChange={onUpdateGroupName}
            onToggleVisibility={onToggleGroupVisibility}
            onColorChange={onUpdateGroupColor}
            onDeleteGroup={onDeleteGroup}
          />
        ))}
        
        {leadGroups.length === 0 && (
          <div className="p-4 text-center text-muted-foreground">
            No groups created yet. Add a new group to get started.
          </div>
        )}
      </div>
    </ScrollArea>
  );
};

export default GroupList;
