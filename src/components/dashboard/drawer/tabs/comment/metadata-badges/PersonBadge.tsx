
import React from 'react';
import { Badge } from '@/components/ui/badge';

type PersonBadgeProps = {
  person: {
    name: string;
    initials: string;
  };
};

const PersonBadge = ({ person }: PersonBadgeProps) => {
  return (
    <Badge className="bg-blue-100 text-blue-800 py-0.5 px-2 text-xs">
      @{person.name}
    </Badge>
  );
};

export default PersonBadge;
