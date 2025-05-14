import React from 'react';
import { MatchingFormState } from './MatchingTypes';

interface MatchingSummaryProps {
  formState: MatchingFormState;
  matchPercentage: number;
  enabledFieldsCount: number;
}

const MatchingSummary: React.FC<MatchingSummaryProps> = ({ 
  formState, 
  matchPercentage,
  enabledFieldsCount
}) => {
  return (
    <div className="space-y-2">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <p className="text-sm text-gray-500">Price Range</p>
          <p className="font-medium">฿{formState.priceMin || '8M'} - ฿{formState.priceMax || '12M'}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Location</p>
          <p className="font-medium">{formState.zone || 'Central Bangkok'}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Property Type</p>
          <p className="font-medium">{formState.propertyType || 'Condominium'}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Bedroom</p>
          <p className="font-medium">
            {formState.bedrooms || '2'}-{parseInt(formState.bedrooms || '0') + 1}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Match Percentage</p>
          <p className="font-medium">{matchPercentage}%+</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Fields Priority</p>
          <p className="font-medium">{enabledFieldsCount} fields enabled</p>
        </div>
      </div>
    </div>
  );
};

export default MatchingSummary;
