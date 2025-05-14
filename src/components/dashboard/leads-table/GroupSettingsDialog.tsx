
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from '@/components/ui/separator';
import { useLeadGroups } from '@/hooks/useLeadGroups';
import { useGroupDragDrop } from './hooks/useGroupDragDrop';
import NewGroupForm from './group-settings/NewGroupForm';
import GroupList from './group-settings/GroupList';

type GroupSettingsDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const GroupSettingsDialog = ({ open, onOpenChange }: GroupSettingsDialogProps) => {
  const {
    leadGroups,
    createGroup,
    deleteGroup,
    updateGroupOrder,
    toggleGroupVisibility,
    updateGroupName,
    updateGroupColor
  } = useLeadGroups();

  const dragHandlers = useGroupDragDrop(updateGroupOrder);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="sm:max-w-md"
      >
        <DialogHeader>
          <DialogTitle>Manage Lead Groups</DialogTitle>
          <DialogDescription>
            Create, rearrange, and customize lead groups. Drag and drop to reorder.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <NewGroupForm onCreateGroup={createGroup} />

          <Separator />

          <GroupList 
            leadGroups={leadGroups}
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
