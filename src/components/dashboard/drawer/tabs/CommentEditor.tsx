import React from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

type CommentEditorProps = {
  editContent: string;
  onEditContentChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSaveEdit: (id: string) => void;
  onEditCancel: () => void;
  itemId: string;
};

const CommentEditor = ({
  editContent,
  onEditContentChange,
  onSaveEdit,
  onEditCancel,
  itemId
}: CommentEditorProps) => {
  return (
    <div className="mt-1">
      <Textarea 
        value={editContent} 
        onChange={onEditContentChange}
        className="w-full text-sm min-h-[60px]"
      />
      <div className="flex justify-end mt-2 space-x-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onEditCancel}
        >
          Cancel
        </Button>
        <Button 
          size="sm" 
          onClick={() => onSaveEdit(itemId)}
          className="bg-teal-600 hover:bg-teal-700 text-white"
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default CommentEditor;
