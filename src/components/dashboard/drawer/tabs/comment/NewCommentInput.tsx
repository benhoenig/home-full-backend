import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send } from 'lucide-react';
import { MetadataSelectors } from './metadata-selectors';
import { MetadataBadges } from './metadata-badges';
import { TagDeleteDialog } from './TagDeleteDialog';
import { CustomTag } from './types';

// Default custom tags - moved from the main component
const defaultCustomTags = [
  { name: "Follow Up", color: "bg-blue-500" },
  { name: "Important", color: "bg-red-500" },
  { name: "Waiting", color: "bg-amber-500" },
  { name: "Complete", color: "bg-green-500" },
  { name: "Question", color: "bg-purple-500" },
];

type NewCommentInputProps = {
  newComment: string;
  onNewCommentChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSendComment: (metadata?: any) => void;
  showLeadSelector?: boolean; // Flag to determine which selector to show
};

const NewCommentInput = ({
  newComment,
  onNewCommentChange,
  onSendComment,
  showLeadSelector = false // Default to false (show listing selector)
}: NewCommentInputProps) => {
  const [selectedPipeline, setSelectedPipeline] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<CustomTag | null>(null);
  const [taggedPerson, setTaggedPerson] = useState<{name: string, initials: string} | null>(null);
  const [taggedListing, setTaggedListing] = useState<{id: string, name: string} | null>(null);
  const [taggedLead, setTaggedLead] = useState<{id: string, name: string} | null>(null);
  
  // State for managing custom tags
  const [customTags, setCustomTags] = useState<CustomTag[]>(defaultCustomTags);
  const [tagToDelete, setTagToDelete] = useState<CustomTag | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleSendComment = () => {
    // Collect all metadata to send with the comment
    const metadata = {
      ...(selectedPipeline && { pipelineStage: selectedPipeline }),
      ...(selectedTag && { customTag: selectedTag }),
      ...(taggedPerson && { taggedPerson }),
      ...(showLeadSelector 
          ? (taggedLead && { taggedLead }) 
          : (taggedListing && { taggedListing })),
    };

    // Send comment with metadata
    onSendComment(Object.keys(metadata).length > 0 ? metadata : undefined);
    
    // Reset selections after sending
    setSelectedPipeline(null);
    setSelectedTag(null);
    setTaggedPerson(null);
    setTaggedListing(null);
    setTaggedLead(null);
  };

  return (
    <div className="mt-3 border rounded-lg p-3 bg-white">
      <Textarea 
        placeholder="Write a comment..." 
        value={newComment} 
        onChange={onNewCommentChange} 
        className="border-0 focus:ring-0 resize-none min-h-[60px] p-2 text-sm" 
      />
      
      {/* Selected metadata display */}
      <MetadataBadges
        selectedPipeline={selectedPipeline}
        selectedTag={selectedTag}
        taggedPerson={taggedPerson}
        taggedListing={!showLeadSelector ? taggedListing : undefined}
        taggedLead={showLeadSelector ? taggedLead : undefined}
      />
      
      <div className="flex justify-between items-center mt-2 px-2">
        <MetadataSelectors
          setSelectedPipeline={setSelectedPipeline}
          customTags={customTags}
          setCustomTags={setCustomTags}
          setSelectedTag={setSelectedTag}
          setTaggedPerson={setTaggedPerson}
          setTaggedListing={setTaggedListing}
          setTaggedLead={setTaggedLead}
          setTagToDelete={setTagToDelete}
          setShowDeleteConfirm={setShowDeleteConfirm}
          showLeadSelector={showLeadSelector}
        />
        
        <Button 
          onClick={handleSendComment} 
          disabled={!newComment.trim()} 
          className="text-white bg-teal-600 hover:bg-teal-700" 
          size="sm"
        >
          <Send className="h-4 w-4 mr-1" />
          Send
        </Button>
      </div>
      
      {/* Confirmation Dialog for Deleting Tags */}
      <TagDeleteDialog 
        showDeleteConfirm={showDeleteConfirm}
        setShowDeleteConfirm={setShowDeleteConfirm}
        tagToDelete={tagToDelete}
        onDeleteTag={() => {
          if (tagToDelete) {
            setCustomTags(customTags.filter(tag => tag.name !== tagToDelete.name));
            
            // If the deleted tag is currently selected, deselect it
            if (selectedTag && selectedTag.name === tagToDelete.name) {
              setSelectedTag(null);
            }
            
            setTagToDelete(null);
            setShowDeleteConfirm(false);
          }
        }}
      />
    </div>
  );
};

export default NewCommentInput;
