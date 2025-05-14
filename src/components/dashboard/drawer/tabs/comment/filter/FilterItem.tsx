
import React from 'react';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Checkbox } from '@/components/ui/checkbox';

interface FilterItemProps {
  checked: boolean;
  label: string;
  color?: string;
  initials?: string;
  secondaryLabel?: string;
  onClick: (e: React.MouseEvent) => void;
  onCheckboxClick: (e: React.MouseEvent) => void;
}

const FilterItem = ({
  checked,
  label,
  color,
  initials,
  secondaryLabel,
  onClick,
  onCheckboxClick
}: FilterItemProps) => {
  return (
    <DropdownMenuItem 
      onClick={onClick}
      className="flex items-center justify-between px-2"
    >
      <div className="flex items-center gap-2">
        <Checkbox 
          checked={checked}
          className="data-[state=checked]:bg-primary"
          onClick={onCheckboxClick}
        />
        
        {color ? (
          <div className={`${color} text-white px-2 py-0.5 text-xs rounded-sm`}>
            {label}
          </div>
        ) : initials ? (
          <div className="flex items-center">
            <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-xs mr-2">
              {initials}
            </div>
            <span className="text-sm">{label}</span>
          </div>
        ) : (
          <div className="flex flex-col">
            <span className="text-sm">{label}</span>
            {secondaryLabel && <span className="text-xs text-muted-foreground">{secondaryLabel}</span>}
          </div>
        )}
      </div>
    </DropdownMenuItem>
  );
};

export default FilterItem;
