
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { MatchingFormState } from '../MatchingTypes';

interface PriceInformationProps {
  formState: MatchingFormState;
  onChange: (field: keyof MatchingFormState, value: any) => void;
  isFieldEnabled: (fieldId: string) => boolean;
}

const PriceInformation: React.FC<PriceInformationProps> = ({
  formState,
  onChange,
  isFieldEnabled
}) => {
  if (!isFieldEnabled('price')) {
    return null;
  }

  return (
    <div className="space-y-3">
      <h3 className="text-md font-semibold text-gray-800">Price Information</h3>
      <Separator className="my-2" />
      
      <div className="space-y-2">
        <Label>Price Range</Label>
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">฿</span>
            <Input 
              value={formState.priceMin} 
              onChange={e => onChange('priceMin', e.target.value)} 
              placeholder="Min" 
              className="pl-7 bg-white" 
              type="number" 
            />
          </div>
          <span className="text-gray-400">to</span>
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">฿</span>
            <Input 
              value={formState.priceMax} 
              onChange={e => onChange('priceMax', e.target.value)} 
              placeholder="Max" 
              className="pl-7 bg-white" 
              type="number" 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceInformation;
