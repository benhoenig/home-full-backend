import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AddProjectModalProps } from '../../types';

const AddProjectModal: React.FC<AddProjectModalProps> = ({ isOpen, onClose, onSave }) => {
  const [projectName, setProjectName] = useState("");
  const [projectThaiName, setProjectThaiName] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (projectName.trim() && projectThaiName.trim()) {
      onSave({
        name: projectName,
        thaiName: projectThaiName
      });
      setProjectName("");
      setProjectThaiName("");
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Project</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="new-project-name">Project Name (English)</Label>
              <Input 
                id="new-project-name" 
                placeholder="Enter project name in English" 
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                autoFocus
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="new-project-thai-name">Project Name (Thai)</Label>
              <Input 
                id="new-project-thai-name" 
                placeholder="Enter project name in Thai" 
                value={projectThaiName}
                onChange={(e) => setProjectThaiName(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" type="button" onClick={onClose}>Cancel</Button>
            <Button type="submit" disabled={!projectName.trim() || !projectThaiName.trim()}>Save Project</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddProjectModal; 