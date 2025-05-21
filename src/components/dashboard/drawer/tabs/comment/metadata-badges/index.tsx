import React from 'react';
import PipelineStageBadge from './PipelineStageBadge';
import CustomTagBadge from './CustomTagBadge';
import TaggedPersonBadge from './TaggedPersonBadge';
import TaggedListingBadge from './TaggedListingBadge';
import LeadBadge from './LeadBadge';

type MetadataBadgesProps = {
  selectedPipeline: string | null;
  selectedTag: { name: string; color: string } | null;
  taggedPerson: { name: string; initials: string } | null;
  taggedListing?: { id: string; name: string } | null;
  taggedLead?: { id: string; name: string } | null;
};

export const MetadataBadges: React.FC<MetadataBadgesProps> = ({
  selectedPipeline,
  selectedTag,
  taggedPerson,
  taggedListing,
  taggedLead
}) => {
  if (!selectedPipeline && !selectedTag && !taggedPerson && !taggedListing && !taggedLead) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2 px-2 pb-2 border-b">
      {selectedPipeline && (
        <PipelineStageBadge stage={selectedPipeline} size="sm" />
      )}
      {selectedTag && (
        <CustomTagBadge tag={selectedTag} />
      )}
      {taggedPerson && (
        <TaggedPersonBadge person={taggedPerson} />
      )}
      {taggedListing && (
        <TaggedListingBadge listing={taggedListing} />
      )}
      {taggedLead && (
        <LeadBadge lead={taggedLead} />
      )}
    </div>
  );
};

export default MetadataBadges; 