import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { MatchingFormState } from '../MatchingTypes';
import { buildings, views, directions } from '../MatchingConstants';

interface AdditionalDetailsProps {
  formState: MatchingFormState;
  onChange: (field: keyof MatchingFormState, value: any) => void;
  isGroupEnabled: (fieldIds: string[]) => boolean;
  isFieldEnabled: (fieldId: string) => boolean;
}

const AdditionalDetails: React.FC<AdditionalDetailsProps> = ({
  formState,
  onChange,
  isGroupEnabled,
  isFieldEnabled
}) => {
  const additionalFields = ['floors', 'floorNumber', 'building', 'view', 'direction', 'parkingSpots'];
  
  if (!isGroupEnabled(additionalFields)) {
    return null;
  }

  return (
    <div className="space-y-3">
      <h3 className="text-md font-semibold text-gray-800">Additional Details</h3>
      <Separator className="my-2" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {isFieldEnabled('floors') && (
          <div className="space-y-2">
            <Label htmlFor="floors">No. of Floors</Label>
            <Input 
              id="floors" 
              type="number" 
              value={formState.floors} 
              onChange={e => onChange('floors', e.target.value)} 
              placeholder="Total floors in building" 
            />
          </div>
        )}
        
        {isFieldEnabled('floorNumber') && (
          <div className="space-y-2">
            <Label htmlFor="floorNumber">Floor</Label>
            <Input 
              id="floorNumber" 
              type="number" 
              value={formState.floorNumber} 
              onChange={e => onChange('floorNumber', e.target.value)} 
              placeholder="Unit floor number" 
            />
          </div>
        )}
        
        {isFieldEnabled('building') && (
          <div className="space-y-2">
            <Label htmlFor="building">Building</Label>
            <Select value={formState.building} onValueChange={value => onChange('building', value)}>
              <SelectTrigger id="building">
                <SelectValue placeholder="Select building" />
              </SelectTrigger>
              <SelectContent>
                {buildings.map(b => (
                  <SelectItem key={b} value={b}>
                    {b}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
        
        {isFieldEnabled('view') && (
          <div className="space-y-2">
            <Label htmlFor="view">View</Label>
            <Select value={formState.view} onValueChange={value => onChange('view', value)}>
              <SelectTrigger id="view">
                <SelectValue placeholder="Select view" />
              </SelectTrigger>
              <SelectContent>
                {views.map(v => (
                  <SelectItem key={v} value={v}>
                    {v}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
        
        {isFieldEnabled('direction') && (
          <div className="space-y-2">
            <Label htmlFor="direction">Direction</Label>
            <Select value={formState.direction} onValueChange={value => onChange('direction', value)}>
              <SelectTrigger id="direction">
                <SelectValue placeholder="Select direction" />
              </SelectTrigger>
              <SelectContent>
                {directions.map(d => (
                  <SelectItem key={d} value={d}>
                    {d}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
        
        {isFieldEnabled('parkingSpots') && (
          <div className="space-y-2">
            <Label htmlFor="parkingSpots">Parking Spots</Label>
            <Input 
              id="parkingSpots" 
              type="number" 
              value={formState.parkingSpots} 
              onChange={e => onChange('parkingSpots', e.target.value)} 
              placeholder="No. of parking spots" 
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdditionalDetails;
