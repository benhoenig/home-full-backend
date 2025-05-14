
import React, { createContext, useContext, useState } from 'react';
import { Lead } from '@/hooks/useLeadsTableData';
import { LeadGroup } from '@/hooks/useLeadGroups';
import { useLeadGroups } from '@/hooks/useLeadGroups';

type LeadDragContextType = {
  draggedLead: Lead | null;
  draggedGroupId: string | null;
  draggedLeadIndex: number | null;
  setDraggedLead: (lead: Lead | null) => void;
  setDraggedGroupId: (groupId: string | null) => void;
  setDraggedLeadIndex: (index: number | null) => void;
  handleLeadDrop: (lead: Lead, sourceGroupId: string | undefined, targetGroupId: string) => void;
  reorderLeadInGroup: (groupId: string, sourceIndex: number, targetIndex: number) => void;
};

const LeadDragContext = createContext<LeadDragContextType>({
  draggedLead: null,
  draggedGroupId: null,
  draggedLeadIndex: null,
  setDraggedLead: () => {},
  setDraggedGroupId: () => {},
  setDraggedLeadIndex: () => {},
  handleLeadDrop: () => {},
  reorderLeadInGroup: () => {},
});

export const useLeadDrag = () => useContext(LeadDragContext);

type LeadDragProviderProps = {
  children: React.ReactNode;
};

export const LeadDragProvider: React.FC<LeadDragProviderProps> = ({ children }) => {
  const [draggedLead, setDraggedLead] = useState<Lead | null>(null);
  const [draggedGroupId, setDraggedGroupId] = useState<string | null>(null);
  const [draggedLeadIndex, setDraggedLeadIndex] = useState<number | null>(null);
  const { leadGroups, addLeadToGroup, removeLeadFromGroup, moveLeadBetweenGroups, reorderLeadWithinGroup } = useLeadGroups();

  // Handle dropping a lead into a group
  const handleLeadDrop = (
    lead: Lead, 
    sourceGroupId: string | undefined, 
    targetGroupId: string
  ) => {
    // If target is the same as source, do nothing
    if (sourceGroupId === targetGroupId) return;

    if (sourceGroupId) {
      // Find the index of the lead in the source group
      const sourceGroup = leadGroups.find(g => g.id === sourceGroupId);
      if (!sourceGroup) return;

      const leadIndex = sourceGroup.leads.findIndex(
        l => l.email === lead.email && l.phone === lead.phone
      );
      
      if (leadIndex === -1) return;
      
      // Move lead between groups
      moveLeadBetweenGroups(sourceGroupId, targetGroupId, leadIndex);
    } else {
      // Add to target group if coming from ungrouped
      addLeadToGroup(targetGroupId, lead);
    }
  };

  // Handle reordering leads within the same group
  const reorderLeadInGroup = (groupId: string, sourceIndex: number, targetIndex: number) => {
    if (sourceIndex === targetIndex) return;
    reorderLeadWithinGroup(groupId, sourceIndex, targetIndex);
  };

  return (
    <LeadDragContext.Provider
      value={{
        draggedLead,
        draggedGroupId,
        draggedLeadIndex,
        setDraggedLead,
        setDraggedGroupId,
        setDraggedLeadIndex,
        handleLeadDrop,
        reorderLeadInGroup,
      }}
    >
      {children}
    </LeadDragContext.Provider>
  );
};

export default LeadDragProvider;
