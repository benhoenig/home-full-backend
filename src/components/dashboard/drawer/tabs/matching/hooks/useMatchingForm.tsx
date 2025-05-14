
import { useState } from 'react';
import { MatchingFormState } from '../MatchingTypes';

export const useMatchingForm = () => {
  // State for form fields
  const [formState, setFormState] = useState<MatchingFormState>({
    projectName: '',
    propertyType: '',
    zone: '',
    priceMin: '',
    priceMax: '',
    isInProject: undefined,
    bedrooms: '',
    bathrooms: '',
    usableArea: '',
    landRai: '',
    landNgan: '',
    landWah: '',
    floors: '',
    floorNumber: '',
    building: '',
    view: '',
    direction: '',
    parkingSpots: '',
  });

  // Function to update form state
  const updateFormField = (field: keyof MatchingFormState, value: any) => {
    setFormState(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return {
    formState,
    updateFormField
  };
};
