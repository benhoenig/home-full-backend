import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { FilterOption } from '@/components/dashboard/drawer/tabs/comment/CommentFilter';

export type TimelineItem = {
  id: string;
  type: 'system_log' | 'user_comment';
  content: string;
  date: string;
  timestamp: number; // For sorting purposes
  tag?: string;
  pipelineStage?: string;
  customTag?: {
    name: string;
    color: string;
  };
  taggedPerson?: {
    name: string;
    initials: string;
  };
  taggedListing?: {
    id: string;
    name: string;
  };
  user?: {
    name: string;
    avatarUrl?: string;
    initials: string;
  };
};

export const useTimelineItems = (initialItems: TimelineItem[] = []) => {
  const { toast } = useToast();
  const [timelineItems, setTimelineItems] = useState<TimelineItem[]>(initialItems);
  const [newComment, setNewComment] = useState('');
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterOption | null>(null);
  const [activeFilters, setActiveFilters] = useState<FilterOption[]>([]);
  
  const handleNewCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment(e.target.value);
  };
  
  const handleSendComment = (metadata?: {
    pipelineStage?: string;
    customTag?: { name: string; color: string };
    taggedPerson?: { name: string; initials: string };
    taggedListing?: { id: string; name: string };
  }) => {
    if (!newComment.trim()) return;
    const now = new Date();
    const formattedTime = now.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
    const formattedDate = `Today at ${formattedTime}`;

    // Add as a new comment
    const newItem: TimelineItem = {
      id: Date.now().toString(),
      type: 'user_comment',
      content: newComment,
      date: formattedDate,
      timestamp: Date.now(),
      user: {
        name: 'Current User',
        initials: 'CU'
      },
      ...(metadata?.pipelineStage && { pipelineStage: metadata.pipelineStage }),
      ...(metadata?.customTag && { customTag: metadata.customTag }),
      ...(metadata?.taggedPerson && { taggedPerson: metadata.taggedPerson }),
      ...(metadata?.taggedListing && { taggedListing: metadata.taggedListing }),
    };
    // Add to the end of the array for chronological order
    setTimelineItems([...timelineItems, newItem]);
    setNewComment('');
    toast({
      title: "Comment added",
      description: "Your comment has been added to the timeline."
    });
  };
  
  const handleEditItem = (id: string) => {
    const item = timelineItems.find(item => item.id === id && item.type === 'user_comment');
    if (item) {
      setEditingItem(id);
      setEditContent(item.content);
    }
  };
  
  const handleSaveEdit = (id: string) => {
    setTimelineItems(timelineItems.map(item => item.id === id ? {
      ...item,
      content: editContent
    } : item));
    setEditingItem(null);
    setEditContent('');
    toast({
      title: "Comment updated",
      description: "Your comment has been updated successfully."
    });
  };
  
  const handleDeleteItem = (id: string) => {
    setTimelineItems(timelineItems.filter(item => item.id !== id));
    if (editingItem === id) {
      setEditingItem(null);
      setEditContent('');
    }
    toast({
      title: "Comment deleted",
      description: "Your comment has been removed from the timeline."
    });
  };
  
  const handleEditContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditContent(e.target.value);
  };
  
  const handleEditCancel = () => {
    setEditingItem(null);
    setEditContent('');
  };

  // Update to handle multiple filters
  const handleFilterChange = (filter: FilterOption | null) => {
    setActiveFilter(filter);
    
    // If we get null, clear all filters
    if (filter === null) {
      setActiveFilters([]);
      return;
    }
    
    // Otherwise, update the active filters array
    const isFilterActive = activeFilters.some(
      f => f.type === filter.type && f.value === filter.value
    );
    
    if (isFilterActive) {
      // Remove the filter if it's already active
      setActiveFilters(activeFilters.filter(
        f => !(f.type === filter.type && f.value === filter.value)
      ));
    } else {
      // Add the new filter
      setActiveFilters([...activeFilters, filter]);
    }
  };
  
  // Apply filters - tag/person/listing filters
  let filteredTimelineItems = timelineItems;
  
  // Apply tag/person/listing filters
  if (activeFilters.length > 0) {
    filteredTimelineItems = filteredTimelineItems.filter(item => {
      // An item passes if it matches ANY of the active filters
      return activeFilters.some(filter => {
        switch (filter.type) {
          case 'pipeline':
            return item.pipelineStage === filter.value;
          case 'tag':
            return item.customTag?.name === filter.value;
          case 'person':
            return item.taggedPerson?.name === filter.value;
          case 'listing':
            return item.taggedListing?.id === filter.value;
          default:
            return true;
        }
      });
    });
  }
  
  return {
    timelineItems: filteredTimelineItems,
    newComment,
    selectedItem,
    editingItem,
    editContent,
    activeFilter,
    activeFilters,
    setSelectedItem,
    handleNewCommentChange,
    handleSendComment,
    handleEditItem,
    handleSaveEdit,
    handleDeleteItem,
    handleEditContentChange,
    handleEditCancel,
    handleFilterChange
  };
};
