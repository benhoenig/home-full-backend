import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface LeadSubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LeadSubmissionModal({ isOpen, onClose }: LeadSubmissionModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Lead Submission Form</DialogTitle>
          <DialogDescription>
            Submit a new lead by filling out the form below
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-6">
          <p className="text-muted-foreground text-center">
            Form content will be implemented based on your specifications.
          </p>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default LeadSubmissionModal; 