
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PotentialBadge from '@/components/dashboard/PotentialBadge';

type LeadHeaderProps = {
  name: string;
  phone: string;
  budget?: string | number;
  potential?: string;
  onClose: () => void;
  onPotentialChange?: (potential: string) => void;
};

const getPotentialBadgeClasses = (potential: string) => {
  switch (potential) {
    case 'A':
      return 'bg-[#ffba06] text-white';
    case 'B':
      return 'bg-[#0f68a2] text-white';
    case 'C':
      return 'bg-[#b11041] text-white';
    default:
      return 'bg-[#b11041] text-white';
  }
};

const LeadHeader = ({
  name,
  phone,
  budget,
  potential = 'C',
  onClose,
  onPotentialChange
}: LeadHeaderProps) => {
  const handlePotentialChange = (newPotential: string) => {
    if (onPotentialChange) {
      onPotentialChange(newPotential);
    }
  };

  return (
    <div className="flex justify-between items-center p-6 border-b border-border bg-background relative z-10">
      <div>
        <h2 className="text-2xl font-bold text-foreground">{name}</h2>
        <p className="text-lg text-muted-foreground">{phone}</p>
      </div>
      <div className="flex items-center space-x-4">
        <div className="text-right">
          <span className="text-lg text-muted-foreground">Budget</span>
          <p className="text-xl font-semibold text-foreground">
            {typeof budget === 'number' ? `$${budget.toLocaleString()}` : budget ? `$${budget}` : '$300,000'}
          </p>
        </div>
        <div className="flex items-center justify-center">
          {onPotentialChange ? (
            <PotentialBadge 
              potential={potential} 
              onPotentialChange={handlePotentialChange}
            />
          ) : (
            <Badge className={`w-6 h-6 flex items-center justify-center text-xs font-semibold rounded-full ${getPotentialBadgeClasses(potential)}`}>
              {potential}
            </Badge>
          )}
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default LeadHeader;
