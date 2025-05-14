
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { MatchingField, MatchingDragHandlers } from '../MatchingTypes';

export const useDragAndDrop = (
  matchingFields: MatchingField[],
  setMatchingFields: React.Dispatch<React.SetStateAction<MatchingField[]>>
) => {
  const { toast } = useToast();
  
  // Drag and drop functionality for priority reordering
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOverItem, setDragOverItem] = useState<string | null>(null);
  
  const handleDragStart = (e: React.DragEvent, fieldId: string) => {
    setDraggedItem(fieldId);
    setIsDragging(true);
    
    // Set data to ensure dragging works across browsers
    e.dataTransfer.setData("text/plain", fieldId);
    e.dataTransfer.effectAllowed = 'move';
    
    // Set the drag image to be the element itself
    const element = e.currentTarget as HTMLElement;
    if (element) {
      const rect = element.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const offsetY = e.clientY - rect.top;
      e.dataTransfer.setDragImage(element, offsetX, offsetY);
    }
  };

  const handleDragOver = (e: React.DragEvent, fieldId: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    
    if (draggedItem !== fieldId) {
      setDragOverItem(fieldId);
    }
  };
  
  const handleDragLeave = () => {
    setDragOverItem(null);
  };
  
  const handleDrop = (e: React.DragEvent, targetFieldId: string) => {
    e.preventDefault();
    
    if (!draggedItem || draggedItem === targetFieldId) {
      setDragOverItem(null);
      return;
    }
    
    // Reorder the fields based on drag & drop
    const updatedFields = [...matchingFields];
    const draggedIndex = updatedFields.findIndex(field => field.id === draggedItem);
    const targetIndex = updatedFields.findIndex(field => field.id === targetFieldId);
    
    const draggedItemField = updatedFields[draggedIndex];
    
    // Remove dragged item
    updatedFields.splice(draggedIndex, 1);
    // Insert at target position
    updatedFields.splice(targetIndex, 0, draggedItemField);
    
    // Update priorities
    updatedFields.forEach((field, index) => {
      field.priority = index + 1;
    });
    
    setMatchingFields(updatedFields);
    setDraggedItem(null);
    
    toast({
      title: "Priority Updated",
      description: "Field priority has been updated successfully.",
    });
  };
  
  const handleDragEnd = () => {
    setIsDragging(false);
    setDraggedItem(null);
    setDragOverItem(null);
  };
  
  // Create drag handlers for ColumnGroup
  const dragHandlers: MatchingDragHandlers = {
    draggedItem,
    isDragging,
    dragOverItem,
    handleDragStart,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleDragEnd,
  };
  
  return dragHandlers;
};
