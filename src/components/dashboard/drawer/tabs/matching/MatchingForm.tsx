
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { MatchingFormState, MatchingField } from './MatchingTypes';
import { createEnabledFieldsMap, isFieldEnabled, isGroupEnabled } from './utils/form-helpers';
import { 
  BasicInformation, 
  PriceInformation, 
  PropertySpecifications,
  LandInformation,
  AdditionalDetails 
} from './form-sections';

interface MatchingFormProps {
  formState: MatchingFormState;
  onChange: (field: keyof MatchingFormState, value: any) => void;
  enabledFields?: MatchingField[];
}

const MatchingForm: React.FC<MatchingFormProps> = ({
  formState,
  onChange,
  enabledFields = []
}) => {
  // Create a map of enabled fields for easier checking
  const enabledFieldsMap = createEnabledFieldsMap(enabledFields);
  
  // Helper function to check if a field should be displayed
  const checkFieldEnabled = (fieldId: string) => {
    return isFieldEnabled(fieldId, enabledFieldsMap, enabledFields);
  };

  // Helper function to check if any field in a group should be shown
  const checkGroupEnabled = (fieldIds: string[]) => {
    return isGroupEnabled(fieldIds, enabledFieldsMap, enabledFields);
  };

  return (
    <Card className="rounded-lg border shadow-sm overflow-hidden">
      <CardContent className="p-6 pt-6 bg-slate-50">
        <div className="space-y-6">
          <BasicInformation 
            formState={formState}
            onChange={onChange}
            isFieldEnabled={checkFieldEnabled}
          />
          
          <PriceInformation 
            formState={formState}
            onChange={onChange}
            isFieldEnabled={checkFieldEnabled}
          />
          
          <PropertySpecifications 
            formState={formState}
            onChange={onChange}
            isGroupEnabled={checkGroupEnabled}
            isFieldEnabled={checkFieldEnabled}
          />
          
          <LandInformation 
            formState={formState}
            onChange={onChange}
            isFieldEnabled={checkFieldEnabled}
          />
          
          <AdditionalDetails 
            formState={formState}
            onChange={onChange}
            isGroupEnabled={checkGroupEnabled}
            isFieldEnabled={checkFieldEnabled}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default MatchingForm;
