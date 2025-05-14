
import React from 'react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Home } from 'lucide-react';
import { sampleListings } from '../data';

interface ListingSelectorProps {
  setTaggedListing: (listing: { id: string; name: string; } | null) => void;
}

const ListingSelector: React.FC<ListingSelectorProps> = ({ setTaggedListing }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="rounded-full p-1">
          <Home className="h-4 w-4 text-gray-400" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="p-1 rounded-md shadow-md">
        <div className="text-xs font-medium px-2 py-1 text-gray-500">Tag Listing</div>
        {sampleListings.map((listing) => (
          <DropdownMenuItem 
            key={listing.id}
            onClick={() => setTaggedListing({id: listing.id, name: listing.name})}
            className="cursor-pointer py-1 px-2 hover:bg-gray-100 text-sm"
          >
            <div className="flex items-center">
              <div className="w-5 h-5 rounded-full bg-green-100 text-green-800 flex items-center justify-center text-xs mr-2">
                <Home className="h-3 w-3" />
              </div>
              <div>
                <div className="font-medium">{listing.name}</div>
                <div className="text-xs text-gray-500">{listing.type} • {listing.id}</div>
              </div>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ListingSelector;
