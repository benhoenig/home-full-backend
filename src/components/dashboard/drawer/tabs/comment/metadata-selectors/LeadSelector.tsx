import React from 'react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { User } from 'lucide-react';

interface LeadSelectorProps {
  setTaggedLead: (lead: { id: string; name: string; } | null) => void;
}

// Sample leads data - in a real app this would come from an API or database
const sampleLeads = [
  { id: "L001", name: "John Smith", type: "Buyer" },
  { id: "L002", name: "Emma Watson", type: "Seller" },
  { id: "L003", name: "Robert Brown", type: "Buyer" },
  { id: "L004", name: "Lisa Chen", type: "Investor" },
  { id: "L005", name: "Michael Wong", type: "Buyer" },
];

const LeadSelector: React.FC<LeadSelectorProps> = ({ setTaggedLead }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="rounded-full p-1">
          <User className="h-4 w-4 text-gray-400" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="p-1 rounded-md shadow-md">
        <div className="text-xs font-medium px-2 py-1 text-gray-500">Tag Lead</div>
        {sampleLeads.map((lead) => (
          <DropdownMenuItem 
            key={lead.id}
            onClick={() => setTaggedLead({id: lead.id, name: lead.name})}
            className="cursor-pointer py-1 px-2 hover:bg-gray-100 text-sm"
          >
            <div className="flex items-center">
              <div className="w-5 h-5 rounded-full bg-purple-100 text-purple-800 flex items-center justify-center text-xs mr-2">
                <User className="h-3 w-3" />
              </div>
              <div>
                <div className="font-medium">{lead.name}</div>
                <div className="text-xs text-gray-500">{lead.type} • {lead.id}</div>
              </div>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LeadSelector; 