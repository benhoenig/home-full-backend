
import React from 'react';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type PotentialBadgeProps = {
  potential: string;
  onPotentialChange: (potential: string) => void;
};

const potentialOptions = [
  { value: 'A', color: 'bg-[#ffba06] text-white' },
  { value: 'B', color: 'bg-[#0f68a2] text-white' },
  { value: 'C', color: 'bg-[#b11041] text-white' },
];

const PotentialBadge = ({ potential, onPotentialChange }: PotentialBadgeProps) => {
  // Find the color based on the potential value
  const currentOption = potentialOptions.find(
    option => option.value === potential
  ) || { value: potential || 'C', color: 'bg-[#b11041] text-white' };

  const handleChange = (newPotential: string) => {
    onPotentialChange(newPotential);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        <Badge 
          className={`cursor-pointer w-6 h-6 flex items-center justify-center text-xs font-semibold rounded-full hover:opacity-90 ${currentOption.color}`}
        >
          {currentOption.value}
        </Badge>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-popover z-50">
        {potentialOptions.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => handleChange(option.value)}
            className="cursor-pointer focus:bg-accent focus:text-accent-foreground"
          >
            <Badge className={`mr-2 w-5 h-5 flex items-center justify-center text-xs rounded-full ${option.color}`}>
              {option.value}
            </Badge>
            {option.value === 'A' ? 'A Lead' : option.value === 'B' ? 'B Lead' : 'C Lead'}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PotentialBadge;
