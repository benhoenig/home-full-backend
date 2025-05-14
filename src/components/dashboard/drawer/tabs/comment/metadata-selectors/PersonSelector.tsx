
import React from 'react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { User } from 'lucide-react';
import { teamMembers } from '../data';

interface PersonSelectorProps {
  setTaggedPerson: (person: { name: string; initials: string; } | null) => void;
}

const PersonSelector: React.FC<PersonSelectorProps> = ({ setTaggedPerson }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="rounded-full p-1">
          <User className="h-4 w-4 text-gray-400" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="p-1 rounded-md shadow-md">
        <div className="text-xs font-medium px-2 py-1 text-gray-500">Tag Person</div>
        {teamMembers.map((person) => (
          <DropdownMenuItem 
            key={person.name}
            onClick={() => setTaggedPerson(person)}
            className="cursor-pointer py-1 px-2 hover:bg-gray-100 text-sm"
          >
            <div className="flex items-center">
              <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-xs mr-2">
                {person.initials}
              </div>
              {person.name}
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PersonSelector;
