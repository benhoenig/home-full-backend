import { useState } from 'react';
import { useOwnerGroups, OwnerGroup } from '@/hooks/useOwnerGroups';

export const useListingDragDrop = () => {
  const [draggedListingIndex, setDraggedListingIndex] = useState<number | null>(null);
  const [draggedGroupId, setDraggedGroupId] = useState<string | null>(null);
  const [dragOverListingIndex, setDragOverListingIndex] = useState<number | null>(null);
  const [dragOverGroupId, setDragOverGroupId] = useState<string | null>(null);
  
  const { 
    addListingToGroup, 
    removeListingFromGroup, 
    moveListingBetweenGroups,
    reorderListingWithinGroup
  } = useOwnerGroups();

  const handleDragStart = (e: React.DragEvent, index: number, groupId: string) => {
    setDraggedListingIndex(index);
    setDraggedGroupId(groupId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnd = () => {
    setDraggedListingIndex(null);
    setDraggedGroupId(null);
    setDragOverListingIndex(null);
    setDragOverGroupId(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleListingDragOver = (e: React.DragEvent, index: number, groupId: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    
    if (draggedListingIndex === null || draggedGroupId === null) return;
    
    // Don't set drag over if we're hovering over the same item
    if (draggedListingIndex === index && draggedGroupId === groupId) {
      return;
    }
    
    setDragOverListingIndex(index);
    setDragOverGroupId(groupId);
  };

  const handleDrop = (e: React.DragEvent, groupId: string, groups: OwnerGroup[]) => {
    e.preventDefault();
    
    if (draggedListingIndex === null || draggedGroupId === null) return;
    
    // If dropping on a different group
    if (draggedGroupId !== groupId) {
      moveListingBetweenGroups(draggedGroupId, groupId, draggedListingIndex);
    }
    
    handleDragEnd();
  };

  const handleListingDropWithinGroup = (e: React.DragEvent, targetIndex: number, groupId: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (draggedListingIndex === null || draggedGroupId === null) return;
    
    // If dropping within the same group
    if (draggedGroupId === groupId && draggedListingIndex !== targetIndex) {
      reorderListingWithinGroup(groupId, draggedListingIndex, targetIndex);
    }
    // If dropping from another group
    else if (draggedGroupId !== groupId) {
      moveListingBetweenGroups(draggedGroupId, groupId, draggedListingIndex);
    }
    
    handleDragEnd();
  };

  return {
    draggedListingIndex,
    draggedGroupId,
    dragOverListingIndex,
    dragOverGroupId,
    setDragOverGroupId,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
    handleListingDragOver,
    handleDrop,
    handleListingDropWithinGroup
  };
}; 