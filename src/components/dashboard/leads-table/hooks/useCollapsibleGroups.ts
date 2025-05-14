
import { useState } from 'react';

export function useCollapsibleGroups() {
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({});
  
  const toggleGroupCollapse = (groupId: string) => {
    setCollapsedGroups(prev => ({
      ...prev,
      [groupId]: !prev[groupId]
    }));
  };
  
  const isGroupCollapsed = (groupId: string) => {
    return !!collapsedGroups[groupId];
  };
  
  const collapseGroup = (groupId: string) => {
    setCollapsedGroups(prev => ({
      ...prev,
      [groupId]: true
    }));
  };
  
  const expandGroup = (groupId: string) => {
    setCollapsedGroups(prev => ({
      ...prev,
      [groupId]: false
    }));
  };
  
  return {
    collapsedGroups,
    toggleGroupCollapse,
    isGroupCollapsed,
    collapseGroup,
    expandGroup
  };
}

export default useCollapsibleGroups;
