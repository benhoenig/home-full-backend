import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, Plus, X, Tag } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";

export interface SelectItem {
  id: string;
  name: string;
}

interface MultiSelectSearchProps {
  label: string;
  searchPlaceholder: string;
  emptyMessage: string;
  items: SelectItem[];
  selectedItems: string[];
  onSelect: (id: string) => void;
  onRemove: (id: string) => void;
  onAddNew: (name: string) => void;
  icon?: React.ReactNode;
  badgeLabel: string;
}

const MultiSelectSearch: React.FC<MultiSelectSearchProps> = ({
  label,
  searchPlaceholder,
  emptyMessage,
  items,
  selectedItems,
  onSelect,
  onRemove,
  onAddNew,
  icon = <Tag className="h-5 w-5 text-primary" />,
  badgeLabel
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [showAddNew, setShowAddNew] = useState(false);
  const [newItemName, setNewItemName] = useState('');

  const filteredItems = items.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    !selectedItems.includes(item.id)
  );

  const selectedItemsData = items.filter(item => selectedItems.includes(item.id));

  const handleAddNew = () => {
    if (newItemName.trim()) {
      onAddNew(newItemName);
      setNewItemName('');
      setShowAddNew(false);
    }
  };

  return (
    <div className="space-y-3">
      <Label className="font-medium">{label}</Label>
      <div className="relative flex flex-col space-y-3">
        <div className="relative">
          <div className="flex items-center space-x-2">
            <div className="relative flex-grow">
              <Input
                placeholder={searchPlaceholder}
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setShowDropdown(true);
                }}
                onFocus={() => setShowDropdown(true)}
                className="pl-10 h-10"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            </div>
          </div>
          
          {showDropdown && (
            <div className="absolute z-10 w-full mt-1">
              <Command className="rounded-lg border shadow-md w-full">
                <CommandList>
                  <CommandEmpty>
                    <div className="flex flex-col items-center justify-center py-6 text-center">
                      {icon}
                      <p className="text-sm text-muted-foreground mb-1">{emptyMessage}</p>
                      <p className="text-xs text-muted-foreground">Add a new item instead</p>
                    </div>
                  </CommandEmpty>
                  <CommandGroup heading={label}>
                    {filteredItems.map((item) => (
                      <CommandItem
                        key={item.id}
                        value={item.id}
                        onSelect={() => {
                          onSelect(item.id);
                          setSearchTerm('');
                          setShowDropdown(false);
                        }}
                        className="cursor-pointer"
                      >
                        <div className="flex flex-col py-1">
                          <span className="font-medium">{item.name}</span>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </div>
          )}
        </div>
        
        {selectedItemsData.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {selectedItemsData.map(item => (
              <Badge 
                key={item.id} 
                variant="secondary"
                className="flex items-center gap-1 py-1.5 px-3"
              >
                {item.name}
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0 ml-1 hover:bg-transparent"
                  onClick={() => onRemove(item.id)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
          </div>
        )}
        
        {showAddNew ? (
          <div className="flex items-center gap-2 mt-2">
            <Input
              placeholder="Enter new item name..."
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              className="h-10"
            />
            <Button 
              size="sm" 
              onClick={handleAddNew}
              disabled={!newItemName.trim()}
            >
              Add
            </Button>
            <Button 
              size="sm" 
              variant="ghost" 
              onClick={() => {
                setShowAddNew(false);
                setNewItemName('');
              }}
            >
              Cancel
            </Button>
          </div>
        ) : (
          <Button 
            type="button" 
            variant="outline" 
            className="flex items-center mt-2"
            onClick={() => setShowAddNew(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add New {badgeLabel}
          </Button>
        )}
      </div>
    </div>
  );
};

export default MultiSelectSearch; 