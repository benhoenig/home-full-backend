
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { MatchingFormState } from '../MatchingTypes';

interface LandInformationProps {
  formState: MatchingFormState;
  onChange: (field: keyof MatchingFormState, value: any) => void;
  isFieldEnabled: (fieldId: string) => boolean;
}

const LandInformation: React.FC<LandInformationProps> = ({
  formState,
  onChange,
  isFieldEnabled
}) => {
  if (!isFieldEnabled('land')) {
    return null;
  }

  return (
    <div className="space-y-3">
      <h3 className="text-md font-semibold text-gray-800">Land Information</h3>
      <Separator className="my-2" />
      
      <div className="space-y-2">
        <Label>พื้นที่ : ไร่, งาน, วา</Label>
        <div className="grid grid-cols-3 gap-3">
          <div className="relative">
            <Input 
              type="number" 
              value={formState.landRai} 
              onChange={e => onChange('landRai', e.target.value)} 
              placeholder="0" 
              className="bg-white" 
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">ไร่</span>
          </div>
          <div className="relative">
            <Input 
              type="number" 
              value={formState.landNgan} 
              onChange={e => onChange('landNgan', e.target.value)} 
              placeholder="0" 
              className="bg-white" 
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">งาน</span>
          </div>
          <div className="relative">
            <Input 
              type="number" 
              value={formState.landWah} 
              onChange={e => onChange('landWah', e.target.value)} 
              placeholder="0" 
              className="bg-white" 
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">วา</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandInformation;
