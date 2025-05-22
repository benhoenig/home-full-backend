import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, Plus, User } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { Owner } from '../types';
import { Badge } from "@/components/ui/badge";

interface OwnerSearchProps {
  ownerSearchTerm: string;
  selectedOwnerId: string | null;
  showOwnerDropdown: boolean;
  filteredOwners: Owner[];
  setOwnerSearchTerm: (term: string) => void;
  setSelectedOwnerId: (id: string | null) => void;
  setShowOwnerDropdown: (show: boolean) => void;
  setShowAddOwnerModal: (show: boolean) => void;
}

const OwnerSearch: React.FC<OwnerSearchProps> = ({
  ownerSearchTerm,
  selectedOwnerId,
  showOwnerDropdown,
  filteredOwners,
  setOwnerSearchTerm,
  setSelectedOwnerId,
  setShowOwnerDropdown,
  setShowAddOwnerModal,
}) => {
  const selectedOwner = selectedOwnerId 
    ? filteredOwners.find(o => o.id === selectedOwnerId) 
    : null;

  return (
    <div className="space-y-3">
      <div className="relative flex flex-col space-y-3">
        <div className="relative">
          <div className="flex items-center space-x-2">
            <div className="relative flex-grow">
              <Input
                id="owner-search"
                placeholder="Search owners..."
                value={ownerSearchTerm}
                onChange={(e) => {
                  setOwnerSearchTerm(e.target.value);
                  setShowOwnerDropdown(true);
                }}
                onFocus={() => setShowOwnerDropdown(true)}
                className="pl-10 h-10"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            </div>
            {selectedOwnerId && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSelectedOwnerId(null);
                  setOwnerSearchTerm("");
                }}
                className="ml-2"
              >
                Clear
              </Button>
            )}
          </div>
          
          {showOwnerDropdown && (
            <div className="absolute z-10 w-full mt-1 owner-dropdown">
              <Command className="rounded-lg border shadow-md w-full">
                <CommandList>
                  <CommandEmpty>
                    <div className="flex flex-col items-center justify-center py-6 text-center">
                      <User className="h-10 w-10 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground mb-1">No owners found</p>
                      <p className="text-xs text-muted-foreground">Try a different search term or create a new owner</p>
                    </div>
                  </CommandEmpty>
                  <CommandGroup heading="Owners">
                    {filteredOwners.map((owner) => (
                      <CommandItem
                        key={owner.id}
                        value={owner.id}
                        onSelect={() => {
                          setSelectedOwnerId(owner.id);
                          setOwnerSearchTerm("");
                          setShowOwnerDropdown(false);
                        }}
                        className="cursor-pointer"
                      >
                        <div className="flex flex-col py-1">
                          <span className="font-medium">{owner.name}</span>
                          <span className="text-xs text-gray-500">{owner.contact}</span>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </div>
          )}
        </div>
        
        {selectedOwner && (
          <div className="flex flex-col space-y-2">
            <div className="flex items-center justify-between rounded-md border bg-muted/20 p-4 text-sm">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div className="flex flex-col">
                  <span className="font-medium text-base">{selectedOwner.name}</span>
                  <span className="text-xs text-gray-500">{selectedOwner.contact}</span>
                </div>
              </div>
              <Badge variant="outline" className="ml-auto">Owner</Badge>
            </div>
          </div>
        )}
        
        <Button 
          type="button" 
          variant="outline" 
          className="flex items-center mt-2"
          onClick={() => setShowAddOwnerModal(true)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New Owner
        </Button>
      </div>
    </div>
  );
};

export default OwnerSearch; 