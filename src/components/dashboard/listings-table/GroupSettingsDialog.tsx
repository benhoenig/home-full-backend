import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from '@/components/ui/separator';
import { useOwnerGroups } from '@/hooks/useOwnerGroups';
import { useGroupDragDrop } from '../leads-table/hooks/useGroupDragDrop';
import NewGroupForm from '../leads-table/group-settings/NewGroupForm';
import GroupList from '../leads-table/group-settings/GroupList';

type GroupSettingsDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const GroupSettingsDialog = ({ open, onOpenChange }: GroupSettingsDialogProps) => {
  const {
    ownerGroups,
    createGroup,
    deleteGroup,
    updateGroupOrder,
    toggleGroupVisibility,
    updateGroupName,
    updateGroupColor
  } = useOwnerGroups();

  const dragHandlers = useGroupDragDrop(updateGroupOrder);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="sm:max-w-md"
      >
        <DialogHeader>
          <DialogTitle>Manage Owner Groups</DialogTitle>
          <DialogDescription>
            Create, rearrange, and customize owner groups. Drag and drop to reorder.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <NewGroupForm onCreateGroup={createGroup} />

          <Separator />

          <GroupList 
            leadGroups={ownerGroups.map(group => ({
              ...group,
              leads: group.listings as any // Type conversion to match LeadGroup structure
            }))}
            draggedGroupId={dragHandlers.draggedGroupId}
            dragHandlers={dragHandlers}
            onUpdateGroupName={updateGroupName}
            onToggleGroupVisibility={toggleGroupVisibility}
            onUpdateGroupColor={updateGroupColor}
            onDeleteGroup={deleteGroup}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GroupSettingsDialog; 