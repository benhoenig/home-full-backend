
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Home } from 'lucide-react';

type ListingBadgeProps = {
  listing: {
    id: string;
    name: string;
  };
};

const ListingBadge = ({ listing }: ListingBadgeProps) => {
  return (
    <Badge className="bg-green-100 text-green-800 py-0.5 px-2 text-xs flex items-center gap-1">
      <Home className="h-3 w-3" />
      {listing.name}
    </Badge>
  );
};

export default ListingBadge;
