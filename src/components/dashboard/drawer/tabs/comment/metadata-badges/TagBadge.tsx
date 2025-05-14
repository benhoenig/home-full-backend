
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { CustomTag } from '../types';

type TagBadgeProps = {
  tag: CustomTag;
};

const TagBadge = ({ tag }: TagBadgeProps) => {
  return (
    <Badge className={`text-white py-0.5 px-2 text-xs ${tag.color}`}>
      {tag.name}
    </Badge>
  );
};

export default TagBadge;
