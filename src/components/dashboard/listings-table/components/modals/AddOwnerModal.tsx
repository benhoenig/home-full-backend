import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Phone } from "lucide-react";
import { AddOwnerModalProps } from '../../types';

export const AddOwnerModal: React.FC<AddOwnerModalProps> = ({ isOpen, onClose, onSave }) => {
  const [ownerName, setOwnerName] = useState("");
  const [ownerContact, setOwnerContact] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (ownerName.trim() && ownerContact.trim()) {
      onSave({
        name: ownerName,
        contact: ownerContact
      });
      setOwnerName("");
      setOwnerContact("");
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Owner</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="new-owner-name">
                <User className="h-4 w-4 inline mr-1" />
                Owner Name
              </Label>
              <Input 
                id="new-owner-name" 
                placeholder="Enter owner name" 
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
                autoFocus
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="new-owner-contact">
                <Phone className="h-4 w-4 inline mr-1" />
                Owner Contact
              </Label>
              <Input 
                id="new-owner-contact" 
                placeholder="Enter contact number" 
                value={ownerContact}
                onChange={(e) => setOwnerContact(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" type="button" onClick={onClose}>Cancel</Button>
            <Button type="submit" disabled={!ownerName.trim() || !ownerContact.trim()}>
              Save Owner
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}; 