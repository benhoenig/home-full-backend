
import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { CustomTag } from './types';

type TagDeleteDialogProps = {
  showDeleteConfirm: boolean;
  setShowDeleteConfirm: (show: boolean) => void;
  tagToDelete: CustomTag | null;
  onDeleteTag: () => void;
};

export const TagDeleteDialog = ({
  showDeleteConfirm,
  setShowDeleteConfirm,
  tagToDelete,
  onDeleteTag
}: TagDeleteDialogProps) => {
  return (
    <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Tag</DialogTitle>
        </DialogHeader>
        <p className="py-4">
          Are you sure you want to delete the tag "{tagToDelete?.name}"? This cannot be undone.
        </p>
        <DialogFooter>
          <Button variant="outline" onClick={() => setShowDeleteConfirm(false)}>Cancel</Button>
          <Button variant="destructive" onClick={onDeleteTag}>Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TagDeleteDialog;
