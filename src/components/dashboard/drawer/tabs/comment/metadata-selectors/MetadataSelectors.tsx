
import React from 'react';
import { CustomTag } from '../types';
import { PipelineSelector } from './';
import { TagSelector } from './';
import { PersonSelector } from './';
import { ListingSelector } from './';

type MetadataSelectorsProps = {
  setSelectedPipeline: (pipeline: string | null) => void;
  customTags: CustomTag[];
  setCustomTags: (tags: CustomTag[]) => void;
  setSelectedTag: (tag: CustomTag | null) => void;
  setTaggedPerson: (person: { name: string; initials: string; } | null) => void;
  setTaggedListing: (listing: { id: string; name: string; } | null) => void;
  setTagToDelete: (tag: CustomTag | null) => void;
  setShowDeleteConfirm: (show: boolean) => void;
};

const MetadataSelectors = ({
  setSelectedPipeline,
  customTags,
  setCustomTags,
  setSelectedTag,
  setTaggedPerson,
  setTaggedListing,
  setTagToDelete,
  setShowDeleteConfirm
}: MetadataSelectorsProps) => {
  return (
    <div className="flex space-x-1">
      <PipelineSelector setSelectedPipeline={setSelectedPipeline} />
      
      <TagSelector 
        customTags={customTags}
        setCustomTags={setCustomTags}
        setSelectedTag={setSelectedTag}
        setTagToDelete={setTagToDelete}
        setShowDeleteConfirm={setShowDeleteConfirm}
      />
      
      <PersonSelector setTaggedPerson={setTaggedPerson} />
      
      <ListingSelector setTaggedListing={setTaggedListing} />
    </div>
  );
};

export default MetadataSelectors;
