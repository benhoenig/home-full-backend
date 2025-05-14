
import React from 'react';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Switch } from '@/components/ui/switch';

interface CardVisibilityState {
  newLeads: boolean;
  warning: boolean;
  transfer: boolean;
}

interface CardVisibilityControlsProps {
  cardsVisibility: CardVisibilityState;
  toggleCardVisibility: (cardKey: keyof CardVisibilityState) => void;
}

const CardVisibilityControls = ({ 
  cardsVisibility, 
  toggleCardVisibility 
}: CardVisibilityControlsProps) => {
  // Count how many cards are hidden
  const hiddenCardCount = Object.values(cardsVisibility).filter(value => !value).length;
  
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Eye className="h-5 w-5" />
          {hiddenCardCount > 0 && (
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-bold flex items-center justify-center text-primary-foreground">
              {hiddenCardCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72" align="end">
        <div className="space-y-4">
          <h4 className="text-sm font-medium">Customize Dashboard</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="new-leads-visibility" className="text-sm font-medium">
                New Leads
              </label>
              <Switch 
                id="new-leads-visibility" 
                checked={cardsVisibility.newLeads}
                onCheckedChange={() => toggleCardVisibility('newLeads')}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <label htmlFor="warning-visibility" className="text-sm font-medium">
                Warning / Complain
              </label>
              <Switch 
                id="warning-visibility" 
                checked={cardsVisibility.warning}
                onCheckedChange={() => toggleCardVisibility('warning')}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <label htmlFor="transfer-visibility" className="text-sm font-medium">
                รอโอนกรรมสิทธิ์
              </label>
              <Switch 
                id="transfer-visibility" 
                checked={cardsVisibility.transfer}
                onCheckedChange={() => toggleCardVisibility('transfer')}
              />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default CardVisibilityControls;
