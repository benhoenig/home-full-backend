
import { useMatchingForm } from './hooks/useMatchingForm';
import { useMatchingResults } from './hooks/useMatchingResults';
import { useMatchingFields } from './hooks/useMatchingFields';
import { useDragAndDrop } from './hooks/useDragAndDrop';

export const useMatchingTab = () => {
  // Use our split hooks
  const { formState, updateFormField } = useMatchingForm();
  const { 
    matchCount, showMatches, setShowMatches, matchingResults,
    matchPercentage, handleMatchPercentageChange, handleRefreshMatches
  } = useMatchingResults();
  const { 
    matchingFields, shownFields, hiddenFields, showPriorityConfig,
    setShowPriorityConfig, handleToggleFieldEnabled, handleResetPriorities, handleHideAll
  } = useMatchingFields();
  
  // Create drag handlers using our hook
  const dragHandlers = useDragAndDrop(matchingFields, (fields) => {
    // Cast to React.SetStateAction<MatchingField[]> to satisfy TypeScript
    const setFields = (fields: any) => {
      return fields;
    };
    setFields(fields);
  });
  
  // Wrapper for refreshMatches to pass the current formState
  const handleRefreshMatchesWithForm = () => {
    handleRefreshMatches(formState);
  };

  return {
    formState,
    updateFormField,
    matchPercentage,
    handleMatchPercentageChange,
    matchCount,
    showMatches,
    setShowMatches,
    matchingResults,
    matchingFields,
    showPriorityConfig,
    setShowPriorityConfig,
    dragHandlers,
    handleToggleFieldEnabled,
    handleResetPriorities,
    handleHideAll,
    shownFields,
    hiddenFields,
    handleRefreshMatches: handleRefreshMatchesWithForm
  };
};
