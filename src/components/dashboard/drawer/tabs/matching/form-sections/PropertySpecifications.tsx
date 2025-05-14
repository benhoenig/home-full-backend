import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { MatchingFormState } from '../MatchingTypes';

interface PropertySpecificationsProps {
  formState: MatchingFormState;
  onChange: (field: keyof MatchingFormState, value: any) => void;
  isGroupEnabled: (fieldIds: string[]) => boolean;
  isFieldEnabled: (fieldId: string) => boolean;
}

const PropertySpecifications: React.FC<PropertySpecificationsProps> = ({
  formState,
  onChange,
  isGroupEnabled,
  isFieldEnabled
}) => {
  if (!isGroupEnabled(['bedrooms', 'bathrooms', 'usableArea'])) {
    return null;
  }

  return (
    <div className="space-y-3">
      <h3 className="text-md font-semibold text-gray-800">Property Specifications</h3>
      <Separator className="my-2" />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {isFieldEnabled('bedrooms') && (
          <div className="space-y-2">
            <Label htmlFor="bedrooms">Bedrooms</Label>
            <Input 
              id="bedrooms" 
              type="number" 
              value={formState.bedrooms} 
              onChange={e => onChange('bedrooms', e.target.value)} 
              placeholder="No. of bedrooms" 
            />
          </div>
        )}
        
        {isFieldEnabled('bathrooms') && (
          <div className="space-y-2">
            <Label htmlFor="bathrooms">Bathrooms</Label>
            <Input 
              id="bathrooms" 
              type="number" 
              value={formState.bathrooms} 
              onChange={e => onChange('bathrooms', e.target.value)} 
              placeholder="No. of bathrooms" 
            />
          </div>
        )}
        
        {isFieldEnabled('usableArea') && (
          <div className="space-y-2">
            <Label htmlFor="usableArea">Usable Area (sqm)</Label>
            <Input 
              id="usableArea" 
              type="number" 
              value={formState.usableArea} 
              onChange={e => onChange('usableArea', e.target.value)} 
              placeholder="Area in square meters" 
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertySpecifications;
