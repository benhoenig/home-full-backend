import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { MatchingField, MatchingDragHandlers } from '../MatchingTypes';
import { DEFAULT_FIELD_ORDER } from '../MatchingConstants';

export const useMatchingFields = () => {
  const { toast } = useToast();
  
  // State for field priorities
  const [matchingFields, setMatchingFields] = useState<MatchingField[]>([
    { id: 'projectName', name: 'Project Name', priority: 1, enabled: true },
    { id: 'propertyType', name: 'Property Type', priority: 2, enabled: true },
    { id: 'zone', name: 'Zone / Area', priority: 3, enabled: true },
    { id: 'price', name: 'Budget / Price', priority: 4, enabled: true },
    { id: 'isInProject', name: 'ใน / นอกโครงการ', priority: 5, enabled: true },
    { id: 'bedrooms', name: 'Bedrooms', priority: 6, enabled: true },
    { id: 'bathrooms', name: 'Bathrooms', priority: 7, enabled: true },
    { id: 'usableArea', name: 'Usable Area', priority: 8, enabled: true },
    { id: 'land', name: 'พื้นที่ : ไร่, งาน, วา', priority: 9, enabled: true },
    { id: 'floors', name: 'No. of Floors', priority: 10, enabled: true },
    { id: 'floorNumber', name: 'Floor', priority: 11, enabled: true },
    { id: 'building', name: 'Building', priority: 12, enabled: true },
    { id: 'view', name: 'View', priority: 13, enabled: true },
    { id: 'direction', name: 'Direction', priority: 14, enabled: true },
    { id: 'parkingSpots', name: 'Parking Spots', priority: 15, enabled: true },
  ]);
  
  // Show priority configuration dialog
  const [showPriorityConfig, setShowPriorityConfig] = useState(false);
  
  const handleToggleFieldEnabled = (fieldId: string) => {
    setMatchingFields(fields => 
      fields.map(field => 
        field.id === fieldId 
          ? { ...field, enabled: !field.enabled } 
          : field
      )
    );
  };
  
  const handleResetPriorities = () => {
    setMatchingFields(prev => 
      [...prev].sort((a, b) => {
        return DEFAULT_FIELD_ORDER.indexOf(a.id) - DEFAULT_FIELD_ORDER.indexOf(b.id);
      }).map((field, index) => ({
        ...field,
        priority: index + 1
      }))
    );
    
    toast({
      title: "Priority Reset",
      description: "Field priorities have been reset to default order.",
    });
  };
  
  const handleHideAll = () => {
    // Keep the first field enabled
    const firstField = [...matchingFields].sort((a, b) => a.priority - b.priority)[0];
    
    setMatchingFields(prev => 
      prev.map(field => ({
        ...field,
        enabled: field.id === firstField.id
      }))
    );
    
    toast({
      title: "Fields Hidden",
      description: "All fields except one have been hidden.",
    });
  };
  
  // Convert matching fields to the format expected by ColumnGroup
  const shownFields = matchingFields
    .filter(field => field.enabled)
    .sort((a, b) => a.priority - b.priority)
    .map(field => ({
      header: field.name,
      accessorKey: field.id
    }));
  
  const hiddenFields = matchingFields
    .filter(field => !field.enabled)
    .map(field => ({
      header: field.name,
      accessorKey: field.id
    }));
    
  return {
    matchingFields,
    shownFields,
    hiddenFields,
    showPriorityConfig, 
    setShowPriorityConfig,
    handleToggleFieldEnabled,
    handleResetPriorities,
    handleHideAll
  };
};
