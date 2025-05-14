
import React from 'react';
import { Toggle } from '@/components/ui/toggle';
import { Eye, EyeOff, MoveVertical, Trash2 } from 'lucide-react';
import { LeadGroup } from '@/hooks/useLeadGroups';
import { DragDropHandlers } from '../hooks/useGroupDragDrop';
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction, AlertDialogCancel } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

const colorOptions = [
  { name: 'Default', value: '' },
  { name: 'Red', value: 'red' },
  { name: 'Blue', value: 'blue' },
  { name: 'Green', value: 'green' },
  { name: 'Yellow', value: 'yellow' },
  { name: 'Purple', value: 'purple' },
  { name: 'Pink', value: 'pink' },
  { name: 'Orange', value: 'orange' },
];

type GroupItemProps = {
  group: LeadGroup;
  dragHandlers: DragDropHandlers;
  isDragged: boolean;
  onNameChange: (id: string, name: string) => void;
  onToggleVisibility: (id: string) => void;
  onColorChange: (id: string, color: string) => void;
  onDeleteGroup: (id: string) => void;
};

const GroupItem = ({ 
  group, 
  dragHandlers, 
  isDragged, 
  onNameChange,
  onToggleVisibility,
  onColorChange,
  onDeleteGroup
}: GroupItemProps) => {
  const { 
    handleDragStart, 
    handleDragEnd, 
    handleDragOver, 
    handleDrop 
  } = dragHandlers;

  return (
    <div
      key={group.id}
      className={`flex flex-col gap-2 p-2 border rounded-lg bg-white hover:bg-muted/30 ${isDragged ? 'border-primary' : ''}`}
      draggable
      onDragStart={(e) => handleDragStart(e, group.id)}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDrop={(e) => handleDrop(e, group.id)}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <MoveVertical className="h-4 w-4 text-muted-foreground cursor-move" />
          <input
            type="text"
            className="h-8 px-2 border rounded-md"
            value={group.name}
            onChange={(e) => {
              onNameChange(group.id, e.target.value);
            }}
          />
        </div>
        <div className="flex items-center gap-2">
          <Toggle
            size="sm"
            pressed={group.visible}
            onPressedChange={() => {
              onToggleVisibility(group.id);
            }}
            aria-label={group.visible ? "Hide group" : "Show group"}
          >
            {group.visible ? (
              <Eye className="h-4 w-4" />
            ) : (
              <EyeOff className="h-4 w-4" />
            )}
          </Toggle>
          
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive/90">
                <Trash2 className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete "{group.name}" group?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete the group and remove all leads from it. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction 
                  onClick={() => onDeleteGroup(group.id)}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground">Color:</span>
        <div className="flex items-center gap-1">
          {colorOptions.map((color) => (
            <div
              key={color.value || 'default'}
              className={`w-5 h-5 rounded-full cursor-pointer border ${
                color.value 
                  ? `bg-${color.value}-500` 
                  : 'bg-gray-200'
              } ${group.color === color.value ? 'ring-2 ring-offset-1 ring-black' : ''}`}
              title={color.name}
              onClick={() => onColorChange(group.id, color.value)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GroupItem;
