import React from 'react';
import { Badge } from '@/components/ui/badge';
import { User } from 'lucide-react';

type LeadBadgeProps = {
  lead: {
    id: string;
    name: string;
  };
};

const LeadBadge = ({ lead }: LeadBadgeProps) => {
  return (
    <Badge variant="outline" className="flex items-center gap-1 text-xs bg-purple-50 text-purple-800 border-purple-200 hover:bg-purple-100">
      <User className="h-3 w-3" />
      {lead.name}
    </Badge>
  );
};

export default LeadBadge; 