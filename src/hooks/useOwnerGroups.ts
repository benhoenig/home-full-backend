import { useState, useEffect } from 'react';
import { Listing } from './useListingsTableData';

export type OwnerGroup = {
  id: string;
  name: string;
  visible: boolean;
  listings: Listing[];
  order: number;
  color?: string;
};

export const useOwnerGroups = () => {
  const [ownerGroups, setOwnerGroups] = useState<OwnerGroup[]>(() => {
    try {
      const savedGroups = localStorage.getItem("ownerGroups");
      return savedGroups ? JSON.parse(savedGroups) : [];
    } catch (error) {
      console.error("Failed to parse ownerGroups from localStorage", error);
      return [];
    }
  });

  // Save to localStorage whenever ownerGroups changes
  useEffect(() => {
    try {
      localStorage.setItem("ownerGroups", JSON.stringify(ownerGroups));
    } catch (error) {
      console.error("Failed to store ownerGroups in localStorage", error);
    }
  }, [ownerGroups]);

  const createGroup = (name: string) => {
    const newGroup: OwnerGroup = {
      id: `group-${Date.now()}`,
      name,
      visible: true,
      listings: [],
      order: ownerGroups.length
    };

    setOwnerGroups(prevGroups => [...prevGroups, newGroup]);
  };

  const deleteGroup = (groupId: string) => {
    setOwnerGroups(prevGroups => prevGroups.filter(group => group.id !== groupId));
  };

  const updateGroupOrder = (draggedId: string, targetId: string) => {
    setOwnerGroups(prevGroups => {
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
    setOwnerGroups(prevGroups => 
      prevGroups.map(group => 
        group.id === groupId 
          ? { ...group, visible: !group.visible } 
          : group
      )
    );
  };

  const updateGroupName = (groupId: string, name: string) => {
    setOwnerGroups(prevGroups => 
      prevGroups.map(group => 
        group.id === groupId 
          ? { ...group, name } 
          : group
      )
    );
  };

  const updateGroupColor = (groupId: string, color: string) => {
    setOwnerGroups(prevGroups => 
      prevGroups.map(group => 
        group.id === groupId 
          ? { ...group, color } 
          : group
      )
    );
  };

  const addListingToGroup = (groupId: string, listing: Listing) => {
    setOwnerGroups(prevGroups => 
      prevGroups.map(group => 
        group.id === groupId 
          ? { 
              ...group, 
              listings: [...group.listings.filter(l => 
                l.listingCode !== listing.listingCode
              ), listing] 
            } 
          : group
      )
    );
  };

  const removeListingFromGroup = (groupId: string, listingIndex: number) => {
    setOwnerGroups(prevGroups => 
      prevGroups.map(group => {
        if (group.id === groupId) {
          const updatedListings = [...group.listings];
          updatedListings.splice(listingIndex, 1);
          return { ...group, listings: updatedListings };
        }
        return group;
      })
    );
  };

  const moveListingBetweenGroups = (
    fromGroupId: string,
    toGroupId: string,
    listingIndex: number
  ) => {
    const fromGroup = ownerGroups.find(g => g.id === fromGroupId);
    if (!fromGroup) return;

    const listing = fromGroup.listings[listingIndex];
    
    setOwnerGroups(prevGroups => 
      prevGroups.map(group => {
        if (group.id === fromGroupId) {
          const updatedListings = [...group.listings];
          updatedListings.splice(listingIndex, 1);
          return { ...group, listings: updatedListings };
        }
        if (group.id === toGroupId) {
          return { ...group, listings: [...group.listings, listing] };
        }
        return group;
      })
    );
  };

  // Add the reorderListingWithinGroup method
  const reorderListingWithinGroup = (
    groupId: string,
    sourceIndex: number,
    targetIndex: number
  ) => {
    if (sourceIndex === targetIndex) return;
    
    setOwnerGroups(prevGroups => 
      prevGroups.map(group => {
        if (group.id === groupId) {
          const updatedListings = [...group.listings];
          const [movedListing] = updatedListings.splice(sourceIndex, 1);
          updatedListings.splice(targetIndex, 0, movedListing);
          return { ...group, listings: updatedListings };
        }
        return group;
      })
    );
  };

  return {
    ownerGroups,
    createGroup,
    deleteGroup,
    updateGroupOrder,
    toggleGroupVisibility,
    updateGroupName,
    updateGroupColor,
    addListingToGroup,
    removeListingFromGroup,
    moveListingBetweenGroups,
    reorderListingWithinGroup
  };
}; 