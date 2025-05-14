
import { useState } from 'react';

export type DragDropHandlers = {
  draggedGroupId: string | null;
  handleDragStart: (e: React.DragEvent<HTMLDivElement>, groupId: string) => void;
  handleDragEnd: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDrop: (e: React.DragEvent<HTMLDivElement>, targetGroupId: string) => void;
};

export const useGroupDragDrop = (
  updateGroupOrder: (draggedGroupId: string, targetGroupId: string) => void
): DragDropHandlers => {
  const [draggedGroupId, setDraggedGroupId] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, groupId: string) => {
    e.dataTransfer.setData("groupId", groupId);
    setDraggedGroupId(groupId);
    // Set opacity to indicate dragging
    e.currentTarget.style.opacity = '0.7';
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.style.opacity = '1';
    setDraggedGroupId(null);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetGroupId: string) => {
    e.preventDefault();
    const draggedGroupId = e.dataTransfer.getData("groupId");
    if (draggedGroupId !== targetGroupId) {
      updateGroupOrder(draggedGroupId, targetGroupId);
    }
    setDraggedGroupId(null);
  };

  return {
    draggedGroupId,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
    handleDrop
  };
};
