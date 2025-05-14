
import { useState, useEffect } from 'react';
import { Lead } from './useLeadsTableData';

export type LeadGroup = {
  id: string;
  name: string;
  visible: boolean;
  leads: Lead[];
  order: number;
  color?: string;
};

export const useLeadGroups = () => {
  const [leadGroups, setLeadGroups] = useState<LeadGroup[]>(() => {
    try {
      const savedGroups = localStorage.getItem("leadGroups");
      return savedGroups ? JSON.parse(savedGroups) : [];
    } catch (error) {
      console.error("Failed to parse leadGroups from localStorage", error);
      return [];
    }
  });

  // Save to localStorage whenever leadGroups changes
  useEffect(() => {
    try {
      localStorage.setItem("leadGroups", JSON.stringify(leadGroups));
    } catch (error) {
      console.error("Failed to store leadGroups in localStorage", error);
    }
  }, [leadGroups]);

  const createGroup = (name: string) => {
    const newGroup: LeadGroup = {
      id: `group-${Date.now()}`,
      name,
      visible: true,
      leads: [],
      order: leadGroups.length
    };

    setLeadGroups(prevGroups => [...prevGroups, newGroup]);
  };

  const deleteGroup = (groupId: string) => {
    setLeadGroups(prevGroups => prevGroups.filter(group => group.id !== groupId));
  };

  const updateGroupOrder = (draggedId: string, targetId: string) => {
    setLeadGroups(prevGroups => {
      const updatedGroups = [...prevGroups];
      const draggedIndex = updatedGroups.findIndex(group => group.id === draggedId);
      const targetIndex = updatedGroups.findIndex(group => group.id === targetId);
      
      if (draggedIndex !== -1 && targetIndex !== -1) {
        const [removed] = updatedGroups.splice(draggedIndex, 1);
        updatedGroups.splice(targetIndex, 0, removed);
        
        // Update order property
        return updatedGroups.map((group, index) => ({
          ...group,
          order: index
        }));
      }
      
      return prevGroups;
    });
  };

  const toggleGroupVisibility = (groupId: string) => {
    setLeadGroups(prevGroups => 
      prevGroups.map(group => 
        group.id === groupId 
          ? { ...group, visible: !group.visible } 
          : group
      )
    );
  };

  const updateGroupName = (groupId: string, name: string) => {
    setLeadGroups(prevGroups => 
      prevGroups.map(group => 
        group.id === groupId 
          ? { ...group, name } 
          : group
      )
    );
  };

  const updateGroupColor = (groupId: string, color: string) => {
    setLeadGroups(prevGroups => 
      prevGroups.map(group => 
        group.id === groupId 
          ? { ...group, color } 
          : group
      )
    );
  };

  const addLeadToGroup = (groupId: string, lead: Lead) => {
    setLeadGroups(prevGroups => 
      prevGroups.map(group => 
        group.id === groupId 
          ? { 
              ...group, 
              leads: [...group.leads.filter(l => 
                l.phone !== lead.phone && l.email !== lead.email
              ), lead] 
            } 
          : group
      )
    );
  };

  const removeLeadFromGroup = (groupId: string, leadIndex: number) => {
    setLeadGroups(prevGroups => 
      prevGroups.map(group => {
        if (group.id === groupId) {
          const updatedLeads = [...group.leads];
          updatedLeads.splice(leadIndex, 1);
          return { ...group, leads: updatedLeads };
        }
        return group;
      })
    );
  };

  const moveLeadBetweenGroups = (
    fromGroupId: string,
    toGroupId: string,
    leadIndex: number
  ) => {
    const fromGroup = leadGroups.find(g => g.id === fromGroupId);
    if (!fromGroup) return;

    const lead = fromGroup.leads[leadIndex];
    
    setLeadGroups(prevGroups => 
      prevGroups.map(group => {
        if (group.id === fromGroupId) {
          const updatedLeads = [...group.leads];
          updatedLeads.splice(leadIndex, 1);
          return { ...group, leads: updatedLeads };
        }
        if (group.id === toGroupId) {
          return { ...group, leads: [...group.leads, lead] };
        }
        return group;
      })
    );
  };

  // Add the reorderLeadWithinGroup method
  const reorderLeadWithinGroup = (
    groupId: string,
    sourceIndex: number,
    targetIndex: number
  ) => {
    if (sourceIndex === targetIndex) return;
    
    setLeadGroups(prevGroups => 
      prevGroups.map(group => {
        if (group.id === groupId) {
          const updatedLeads = [...group.leads];
          const [movedLead] = updatedLeads.splice(sourceIndex, 1);
          updatedLeads.splice(targetIndex, 0, movedLead);
          return { ...group, leads: updatedLeads };
        }
        return group;
      })
    );
  };

  return {
    leadGroups,
    createGroup,
    deleteGroup,
    updateGroupOrder,
    toggleGroupVisibility,
    updateGroupName,
    updateGroupColor,
    addLeadToGroup,
    removeLeadFromGroup,
    moveLeadBetweenGroups,
    reorderLeadWithinGroup
  };
};
