import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { MatchingFormState } from '../MatchingTypes';
import { propertyTypes, zones } from '../MatchingConstants';

interface BasicInformationProps {
  formState: MatchingFormState;
  onChange: (field: keyof MatchingFormState, value: any) => void;
  isFieldEnabled: (fieldId: string) => boolean;
}

const BasicInformation: React.FC<BasicInformationProps> = ({
  formState,
  onChange,
  isFieldEnabled
}) => {
  if (!isFieldEnabled('projectName') && !isFieldEnabled('propertyType') && 
      !isFieldEnabled('zone') && !isFieldEnabled('isInProject')) {
    return null;
  }

  return (
    <div className="space-y-3">
      <h3 className="text-md font-semibold text-gray-800">Basic Information</h3>
      <Separator className="my-2" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {isFieldEnabled('projectName') && (
          <div className="space-y-2">
            <Label htmlFor="projectName">Project Name</Label>
            <Input id="projectName" value={formState.projectName} onChange={e => onChange('projectName', e.target.value)} placeholder="Enter project name" />
          </div>
        )}
        
        {isFieldEnabled('propertyType') && (
          <div className="space-y-2">
            <Label htmlFor="propertyType">Property Type</Label>
            <Select value={formState.propertyType} onValueChange={value => onChange('propertyType', value)}>
              <SelectTrigger id="propertyType">
                <SelectValue placeholder="Select property type" />
              </SelectTrigger>
              <SelectContent>
                {propertyTypes.map(type => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
        
        {isFieldEnabled('zone') && (
          <div className="space-y-2">
            <Label htmlFor="zone">Zone / Area</Label>
            <Select value={formState.zone} onValueChange={value => onChange('zone', value)}>
              <SelectTrigger id="zone">
                <SelectValue placeholder="Select zone" />
              </SelectTrigger>
              <SelectContent>
                {zones.map(z => (
                  <SelectItem key={z} value={z}>
                    {z}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
        
        {isFieldEnabled('isInProject') && (
          <div className="space-y-2">
            <Label>ใน / นอกโครงการ</Label>
            <div className="flex gap-2">
              <Button 
                type="button" 
                variant={formState.isInProject === true ? "default" : "outline"} 
                onClick={() => onChange('isInProject', true)} 
                className="flex-1" 
                size="sm"
              >
                ในโครงการ
              </Button>
              <Button 
                type="button" 
                variant={formState.isInProject === false ? "default" : "outline"} 
                onClick={() => onChange('isInProject', false)} 
                className="flex-1" 
                size="sm"
              >
                นอกโครงการ
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BasicInformation;
