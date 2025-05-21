import React from 'react';
import { PipelineBadge, TagBadge, PersonBadge, ListingBadge, LeadBadge } from './';
import { CustomTag } from '../types';

type MetadataBadgesProps = {
  selectedPipeline: string | null;
  selectedTag: CustomTag | null;
  taggedPerson: { name: string; initials: string; } | null;
  taggedListing?: { id: string; name: string; } | null;
  taggedLead?: { id: string; name: string; } | null;
};

const MetadataBadges = ({
  selectedPipeline,
  selectedTag,
  taggedPerson,
  taggedListing,
  taggedLead
}: MetadataBadgesProps) => {
  if (!selectedPipeline && !selectedTag && !taggedPerson && !taggedListing && !taggedLead) {
    return null;
  }
  
  return (
    <div className="flex flex-wrap gap-1 mt-2 px-2">
      {selectedPipeline && (
        <PipelineBadge pipelineName={selectedPipeline} />
      )}
      {selectedTag && (
        <TagBadge tag={selectedTag} />
      )}
      {taggedPerson && (
        <PersonBadge person={taggedPerson} />
      )}
      {taggedListing && (
        <ListingBadge listing={taggedListing} />
      )}
      {taggedLead && (
        <LeadBadge lead={taggedLead} />
      )}
    </div>
  );
};

export default MetadataBadges;
