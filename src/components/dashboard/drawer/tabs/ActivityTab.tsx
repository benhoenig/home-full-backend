import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Search, Clock, MessageCircle } from 'lucide-react';
import TimelineItem from './TimelineItem';
import { NewCommentInput } from './comment';
import { TimelineItem as TimelineItemType } from '@/hooks/useTimelineItems';
import CommentFilter, { FilterOption } from './comment/CommentFilter';
import { CustomTag } from './comment/types';

// Default custom tags
const defaultCustomTags: CustomTag[] = [
  { name: "Follow Up", color: "bg-blue-500" },
  { name: "Important", color: "bg-red-500" },
  { name: "Waiting", color: "bg-amber-500" },
  { name: "Complete", color: "bg-green-500" },
  { name: "Question", color: "bg-purple-500" },
];

type ActivityTabProps = {
  timelineItems: TimelineItemType[];
  selectedItem: string | null;
  editingItem: string | null;
  editContent: string;
  newComment: string;
  activeFilter: FilterOption | null;
  activeFilters?: FilterOption[]; // Add support for multiple filters
  setSelectedItem: (id: string | null) => void;
  handleNewCommentChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSendComment: (metadata?: any) => void;
  handleEditItem: (id: string) => void;
  handleDeleteItem: (id: string) => void;
  handleEditCancel: () => void;
  handleSaveEdit: (id: string) => void;
  handleEditContentChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleFilterChange: (filter: FilterOption | null) => void;
};

const ActivityTab = ({
  timelineItems,
  selectedItem,
  editingItem,
  editContent,
  newComment,
  activeFilter,
  activeFilters = [], // Default to empty array
  setSelectedItem,
  handleNewCommentChange,
  handleSendComment,
  handleEditItem,
  handleDeleteItem,
  handleEditCancel,
  handleSaveEdit,
  handleEditContentChange,
  handleFilterChange
}: ActivityTabProps) => {
  // Custom tags state for the component
  const [customTags, setCustomTags] = useState<CustomTag[]>(defaultCustomTags);
  
  // Sort by timestamp (oldest first) - changed from newest first
  let sortedTimelineItems = [...timelineItems].sort((a, b) => a.timestamp - b.timestamp);
  
  // Search functionality
  const [searchQuery, setSearchQuery] = useState('');
  const filteredItems = searchQuery 
    ? sortedTimelineItems.filter(item => 
        item.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.user?.name && item.user.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.customTag?.name && item.customTag.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.taggedPerson?.name && item.taggedPerson.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.taggedListing?.name && item.taggedListing.name.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : sortedTimelineItems;
  
  return (
    <div className="space-y-6">
      {/* Timeline Activity Card */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center text-base font-medium">
              <Clock className="mr-2 h-4 w-4" />
              Timeline Activity
            </CardTitle>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-500" />
                <Input 
                  placeholder="Search..." 
                  className="pl-7 h-9 w-30 md:w-32 text-xs py-0" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <CommentFilter 
                customTags={customTags}
                activeFilter={activeFilter}
                onFilterChange={handleFilterChange}
                timelineItems={timelineItems} // Pass timeline items to filter available options
              />
            </div>
          </div>
          <CardDescription>View and manage lead activity timeline</CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <ScrollArea className="h-[350px] pr-3">
            <div className="space-y-4">
              {filteredItems.length > 0 ? (
                filteredItems.map(item => (
                  <TimelineItem 
                    key={item.id} 
                    item={item} 
                    selectedItem={selectedItem} 
                    editingItem={editingItem} 
                    editContent={editContent} 
                    onMouseEnter={() => setSelectedItem(item.id)} 
                    onMouseLeave={() => setSelectedItem(null)} 
                    onEditItem={handleEditItem} 
                    onDeleteItem={handleDeleteItem} 
                    onEditCancel={handleEditCancel} 
                    onSaveEdit={handleSaveEdit} 
                    onEditContentChange={handleEditContentChange} 
                  />
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  {searchQuery || activeFilters?.length ? 
                    "No matching items found" : 
                    "No timeline items yet"}
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
      
      {/* Add Comment Card */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center text-base font-medium">
            <MessageCircle className="mr-2 h-4 w-4" />
            Add Comment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <NewCommentInput 
            newComment={newComment} 
            onNewCommentChange={handleNewCommentChange} 
            onSendComment={handleSendComment} 
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ActivityTab;
