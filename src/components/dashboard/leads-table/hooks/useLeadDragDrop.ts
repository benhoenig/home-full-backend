
import { useState } from 'react';
import { Lead } from '@/hooks/useLeadsTableData';
import { useLeadDrag } from '../LeadDragContext';
import { toast } from "sonner";

export type DragPayload = {
  lead: Lead;
  sourceGroup?: string;
  leadIndex: number;
};

export const useLeadDragDrop = () => {
  const [dragOverGroupId, setDragOverGroupId] = useState<string | null>(null);
  const [dragOverLeadIndex, setDragOverLeadIndex] = useState<number | null>(null);
  const { handleLeadDrop: contextHandleLeadDrop, reorderLeadInGroup } = useLeadDrag();

  const handleDragStart = (event: React.DragEvent, lead: Lead, sourceGroup?: string, leadIndex: number = -1) => {
    // Set the drag data
    const payload: DragPayload = { lead, sourceGroup, leadIndex };
    event.dataTransfer.setData("application/json", JSON.stringify(payload));
    
    // Create a drag image for better visual feedback
    const dragPreview = document.createElement('div');
    dragPreview.className = 'bg-white p-2 border rounded shadow';
    dragPreview.innerText = lead.name || 'Lead';
    dragPreview.style.position = 'absolute';
    dragPreview.style.top = '-1000px';
    document.body.appendChild(dragPreview);
    
    event.dataTransfer.setDragImage(dragPreview, 0, 0);
    event.dataTransfer.effectAllowed = 'move';
    
    // Remove the drag preview element after a short delay
    setTimeout(() => {
      document.body.removeChild(dragPreview);
    }, 0);
    
    event.stopPropagation();
  };

  const handleDragEnd = () => {
    setDragOverGroupId(null);
    setDragOverLeadIndex(null);
  };

  const handleDragOver = (event: React.DragEvent, groupId?: string) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
    if (groupId && groupId !== dragOverGroupId) {
      setDragOverGroupId(groupId);
    }
  };

  const handleLeadDragOver = (event: React.DragEvent, index: number) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
    if (index !== dragOverLeadIndex) {
      setDragOverLeadIndex(index);
    }
  };

  const handleDrop = (event: React.DragEvent, targetGroupId: string, leadGroups: any[]) => {
    event.preventDefault();
    try {
      const data = event.dataTransfer.getData("application/json");
      if (!data) return;
      
      const { lead, sourceGroup } = JSON.parse(data) as DragPayload;
      
      if (!lead) return;
      
      // Move the lead to the target group
      contextHandleLeadDrop(lead, sourceGroup, targetGroupId);
      
      const groupName = leadGroups.find(g => g.id === targetGroupId)?.name || 'group';
      toast.success(`Lead moved to ${groupName}`);
    } catch (err) {
      console.error('Error processing drop:', err);
      toast.error('Failed to move lead');
    }
    
    setDragOverGroupId(null);
    setDragOverLeadIndex(null);
  };

  const handleLeadDropWithinGroup = (event: React.DragEvent, targetGroupId: string, targetIndex: number) => {
    event.preventDefault();
    try {
      const data = event.dataTransfer.getData("application/json");
      if (!data) return;
      
      const { lead, sourceGroup, leadIndex } = JSON.parse(data) as DragPayload;
      
      if (!lead || !sourceGroup || leadIndex === -1) return;
      
      // If same group, reorder within group
      if (sourceGroup === targetGroupId) {
        reorderLeadInGroup(sourceGroup, leadIndex, targetIndex);
        toast.success(`Lead reordered`);
      }
    } catch (err) {
      console.error('Error processing lead drop:', err);
      toast.error('Failed to reorder lead');
    }
    
    setDragOverGroupId(null);
    setDragOverLeadIndex(null);
  };

  return {
    dragOverGroupId,
    setDragOverGroupId,
    dragOverLeadIndex,
    setDragOverLeadIndex,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
    handleLeadDragOver,
    handleDrop,
    handleLeadDropWithinGroup
  };
};

export default useLeadDragDrop;
