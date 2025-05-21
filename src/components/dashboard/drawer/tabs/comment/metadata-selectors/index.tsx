import React from 'react';
import PipelineStageSelector from './PipelineStageSelector';
import CustomTagSelector from './CustomTagSelector';
import TagPersonSelector from './TagPersonSelector';
import TagListingSelector from './TagListingSelector';
import LeadSelector from './LeadSelector';
import { CustomTag } from '../types';

type MetadataSelectorsProps = {
  setSelectedPipeline: (stage: string | null) => void;
  customTags: CustomTag[];
  setCustomTags: (tags: CustomTag[]) => void;
  setSelectedTag: (tag: CustomTag | null) => void;
  setTaggedPerson: (person: { name: string; initials: string } | null) => void;
  setTaggedListing: (listing: { id: string; name: string } | null) => void;
  setTaggedLead: (lead: { id: string; name: string } | null) => void;
  setTagToDelete: (tag: CustomTag | null) => void;
  setShowDeleteConfirm: (show: boolean) => void;
  showLeadSelector?: boolean;
};

export const MetadataSelectors: React.FC<MetadataSelectorsProps> = ({
  setSelectedPipeline,
  customTags,
  setCustomTags,
  setSelectedTag,
  setTaggedPerson,
  setTaggedListing,
  setTaggedLead,
  setTagToDelete,
  setShowDeleteConfirm,
  showLeadSelector = false
}) => {
  return (
    <div className="flex items-center space-x-1 text-gray-400">
      <PipelineStageSelector setSelectedPipeline={setSelectedPipeline} />
      <CustomTagSelector
        customTags={customTags}
        setCustomTags={setCustomTags}
        setSelectedTag={setSelectedTag}
        setTagToDelete={setTagToDelete}
        setShowDeleteConfirm={setShowDeleteConfirm}
      />
      <TagPersonSelector setTaggedPerson={setTaggedPerson} />
      
      {showLeadSelector ? (
        <LeadSelector setTaggedLead={setTaggedLead} />
      ) : (
        <TagListingSelector setTaggedListing={setTaggedListing} />
      )}
    </div>
  );
};

export default MetadataSelectors; 