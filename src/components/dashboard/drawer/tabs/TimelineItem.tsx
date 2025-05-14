import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';
import ActivityLogItem from './ActivityLogItem';
import CommentEditor from './CommentEditor';
import { MetadataBadges } from './comment/metadata-badges';
import { CustomTag } from './comment/types';

type TimelineItemProps = {
  item: {
    id: string;
    type: 'system_log' | 'user_comment';
    content: string;
    date: string;
    timestamp: number;
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
  selectedItem: string | null;
  editingItem: string | null;
  editContent: string;
  onMouseEnter: (id: string) => void;
  onMouseLeave: () => void;
  onEditItem: (id: string) => void;
  onDeleteItem: (id: string) => void;
  onEditCancel: () => void;
  onSaveEdit: (id: string) => void;
  onEditContentChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

const TimelineItem = ({ 
  item,
  selectedItem,
  editingItem,
  editContent,
  onMouseEnter,
  onMouseLeave,
  onEditItem,
  onDeleteItem,
  onEditCancel,
  onSaveEdit,
  onEditContentChange
}: TimelineItemProps) => {
  const [isHovering, setIsHovering] = useState(false);
  
  // Handle hover events
  const handleMouseEnter = () => {
    onMouseEnter(item.id);
    setIsHovering(true);
  };
  
  const handleMouseLeave = () => {
    onMouseLeave();
    setIsHovering(false);
  };
  
  // Render system log item - now passing the whole item which is type-compatible
  if (item.type === 'system_log') {
    return <ActivityLogItem logItem={item} />;
  }
  
  // Render user comment item
  if (item.type === 'user_comment' && item.user) {
    return (
      <div 
        className="relative rounded-lg border p-3 bg-white hover:bg-gray-50"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="flex items-start space-x-3">
          <Avatar className="h-8 w-8">
            {item.user.avatarUrl && (
              <AvatarImage src={item.user.avatarUrl} alt={item.user.name} />
            )}
            <AvatarFallback className="bg-teal-100 text-teal-800">
              {item.user.initials}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <div className="flex justify-between items-center">
              <p className="font-medium text-sm">{item.user.name}</p>
              {/* Hide timestamp when hovering to make room for buttons */}
              {!isHovering && (
                <span className="text-xs text-gray-500">{item.date}</span>
              )}
            </div>
            
            {editingItem === item.id ? (
              <CommentEditor
                editContent={editContent}
                onEditContentChange={onEditContentChange}
                onSaveEdit={onSaveEdit}
                onEditCancel={onEditCancel}
                itemId={item.id}
              />
            ) : (
              <>
                <p className="text-sm mt-1">{item.content}</p>
                
                {/* Display metadata badges */}
                {(item.pipelineStage || item.customTag || item.taggedPerson || item.taggedListing) && (
                  <MetadataBadges
                    selectedPipeline={item.pipelineStage || null}
                    selectedTag={item.customTag || null}
                    taggedPerson={item.taggedPerson || null}
                    taggedListing={item.taggedListing || null}
                  />
                )}
              </>
            )}
          </div>
          
          {isHovering && !editingItem && (
            <div className="absolute top-3 right-3 flex space-x-1">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-7 w-7" 
                onClick={() => onEditItem(item.id)}
              >
                <Edit className="h-4 w-4 text-gray-500" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-7 w-7" 
                onClick={() => onDeleteItem(item.id)}
              >
                <Trash2 className="h-4 w-4 text-gray-500" />
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  }
  
  return null;
};

export default TimelineItem;
