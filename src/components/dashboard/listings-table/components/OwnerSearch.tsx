import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, Plus } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { Owner } from '../types';

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
  return (
    <div className="space-y-2">
      <Label htmlFor="owner-search">Owner*</Label>
      <div className="relative flex flex-col space-y-2">
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
                className="pl-10"
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
              >
                Clear
              </Button>
            )}
          </div>
          
          {showOwnerDropdown && (
            <div className="absolute z-10 w-full mt-1 owner-dropdown">
              <Command className="rounded-lg border shadow-md w-full">
                <CommandList>
                  <CommandEmpty>No owners found.</CommandEmpty>
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
                      >
                        <div className="flex flex-col">
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
        
        {selectedOwnerId && filteredOwners.length > 0 && (
          <div className="flex items-center justify-between rounded-md border p-3 text-sm">
            <div className="flex flex-col">
              <span className="font-medium">
                {filteredOwners.find(o => o.id === selectedOwnerId)?.name}
              </span>
              <span className="text-xs text-gray-500">
                {filteredOwners.find(o => o.id === selectedOwnerId)?.contact}
              </span>
            </div>
          </div>
        )}
        
        <Button 
          type="button" 
          variant="outline" 
          className="flex items-center"
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