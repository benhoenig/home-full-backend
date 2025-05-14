
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from '@/components/ui/context-menu';
import { Plus, Tag, Trash } from 'lucide-react';
import { CustomTag } from '../types';

interface TagSelectorProps {
  customTags: CustomTag[];
  setCustomTags: (tags: CustomTag[]) => void;
  setSelectedTag: (tag: CustomTag | null) => void;
  setTagToDelete: (tag: CustomTag | null) => void;
  setShowDeleteConfirm: (show: boolean) => void;
}

const colorOptions = [
  { name: "Blue", value: "bg-blue-500" },
  { name: "Red", value: "bg-red-500" },
  { name: "Green", value: "bg-green-500" },
  { name: "Yellow", value: "bg-amber-500" },
  { name: "Purple", value: "bg-purple-500" },
  { name: "Pink", value: "bg-pink-500" },
  { name: "Indigo", value: "bg-indigo-500" },
  { name: "Teal", value: "bg-teal-500" },
];

const TagSelector: React.FC<TagSelectorProps> = ({ 
  customTags, 
  setCustomTags, 
  setSelectedTag,
  setTagToDelete,
  setShowDeleteConfirm
}) => {
  const [isAddingTag, setIsAddingTag] = useState(false);
  const [newTagName, setNewTagName] = useState("");
  const [newTagColor, setNewTagColor] = useState("bg-blue-500");

  const handleAddTag = () => {
    if (newTagName.trim()) {
      const newTag = {
        name: newTagName.trim(),
        color: newTagColor
      };
      setCustomTags([...customTags, newTag]);
      setNewTagName("");
      setNewTagColor("bg-blue-500");
      setIsAddingTag(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="rounded-full p-1">
          <Tag className="h-4 w-4 text-gray-400" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="p-1 rounded-md shadow-md">
        <div className="flex justify-between items-center">
          <div className="text-xs font-medium px-2 py-1 text-gray-500">Custom Tag</div>
          <Dialog open={isAddingTag} onOpenChange={setIsAddingTag}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <Plus className="h-4 w-4 text-gray-500" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Tag</DialogTitle>
              </DialogHeader>
              <div className="space-y-3 py-2">
                <div className="space-y-1">
                  <label className="text-sm font-medium">Tag Name</label>
                  <Input 
                    value={newTagName}
                    onChange={(e) => setNewTagName(e.target.value)}
                    placeholder="Enter tag name"
                    className="w-full"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium">Tag Color</label>
                  <Select value={newTagColor} onValueChange={setNewTagColor}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select color" />
                    </SelectTrigger>
                    <SelectContent>
                      {colorOptions.map((color) => (
                        <SelectItem key={color.value} value={color.value}>
                          <div className="flex items-center">
                            <div className={`w-4 h-4 rounded-full ${color.value} mr-2`}></div>
                            {color.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddingTag(false)}>Cancel</Button>
                <Button onClick={handleAddTag}>Create Tag</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        {customTags.map((tag) => (
          <ContextMenu key={tag.name}>
            <ContextMenuTrigger>
              <DropdownMenuItem 
                onClick={() => setSelectedTag(tag)}
                className="cursor-pointer p-0 focus:bg-transparent my-0.5"
              >
                <div className={`${tag.color} text-white w-full text-center py-1 px-2 text-xs rounded-sm`}>
                  {tag.name}
                </div>
              </DropdownMenuItem>
            </ContextMenuTrigger>
            <ContextMenuContent className="w-40">
              <ContextMenuItem 
                className="cursor-pointer flex items-center"
                onClick={() => {
                  setTagToDelete(tag);
                  setShowDeleteConfirm(true);
                }}
              >
                <Trash className="h-4 w-4 mr-2 text-red-500" />
                Delete Tag
              </ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TagSelector;
