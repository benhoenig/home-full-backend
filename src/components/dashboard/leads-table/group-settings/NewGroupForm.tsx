
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

type NewGroupFormProps = {
  onCreateGroup: (name: string) => void;
};

const NewGroupForm = ({ onCreateGroup }: NewGroupFormProps) => {
  const [newGroupName, setNewGroupName] = useState("");

  const handleCreateGroup = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    if (newGroupName.trim()) {
      onCreateGroup(newGroupName);
      setNewGroupName("");
    }
  };

  return (
    <div className="flex items-center gap-2">
      <input
        type="text"
        className="flex-1 h-9 px-3 border rounded-md"
        placeholder="New group name..."
        value={newGroupName}
        onChange={(e) => setNewGroupName(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleCreateGroup();
        }}
      />
      <Button 
        onClick={handleCreateGroup} 
        size="sm"
      >
        Add Group
      </Button>
    </div>
  );
};

export default NewGroupForm;
