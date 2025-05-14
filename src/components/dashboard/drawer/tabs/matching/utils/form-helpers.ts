
import { MatchingField } from '../MatchingTypes';

export const createEnabledFieldsMap = (enabledFields: MatchingField[] = []): Map<string, boolean> => {
  return new Map(
    enabledFields.map(field => [field.id, true])
  );
};

export const isFieldEnabled = (
  fieldId: string, 
  enabledFieldsMap: Map<string, boolean>, 
  enabledFields: MatchingField[]
): boolean => {
  // If no fields are provided, show all fields
  if (enabledFields.length === 0) return true;
  return enabledFieldsMap.has(fieldId);
};

export const isGroupEnabled = (
  fieldIds: string[], 
  enabledFieldsMap: Map<string, boolean>, 
  enabledFields: MatchingField[]
): boolean => {
  // If no fields are provided, show all groups
  if (enabledFields.length === 0) return true;
  return fieldIds.some(id => enabledFieldsMap.has(id));
};
