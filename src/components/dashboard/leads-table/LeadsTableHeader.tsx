
import React, { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';
import {
  Dialog,
  DialogTrigger,
} from "@/components/ui/dialog";
import GroupingButton from './GroupingButton';
import GroupSettingsDialog from './GroupSettingsDialog';

type LeadsTableHeaderProps = {
  isCustomizeDialogOpen: boolean;
  setIsCustomizeDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedPotential: string;
  setSelectedPotential: React.Dispatch<React.SetStateAction<string>>;
  isGroupingEnabled: boolean;
  toggleGrouping: () => void;
};

const LeadsTableHeader = ({ 
  isCustomizeDialogOpen, 
  setIsCustomizeDialogOpen,
  selectedPotential,
  setSelectedPotential,
  isGroupingEnabled,
  toggleGrouping
}: LeadsTableHeaderProps) => {
  const [isGroupSettingsOpen, setIsGroupSettingsOpen] = useState(false);

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
      <h3 className="text-lg font-medium">Leads :</h3>
      <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          <GroupingButton 
            isGroupingEnabled={isGroupingEnabled} 
            toggleGrouping={toggleGrouping} 
            onManageGroups={() => setIsGroupSettingsOpen(true)} 
          />
          
          <Select 
            value={selectedPotential} 
            onValueChange={setSelectedPotential}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Lead Potential" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Potential</SelectItem>
              <SelectItem value="A">A Lead</SelectItem>
              <SelectItem value="B">B Lead</SelectItem>
              <SelectItem value="C">C Lead</SelectItem>
            </SelectContent>
          </Select>
          
          <Select defaultValue="pipeline">
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Pipeline Stage" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pipeline">Pipeline Stage</SelectItem>
              <SelectItem value="lead">Lead</SelectItem>
              <SelectItem value="called">Called</SelectItem>
              <SelectItem value="follow">Follow</SelectItem>
              <SelectItem value="appointment">Appointment</SelectItem>
              <SelectItem value="showing">Showing</SelectItem>
              <SelectItem value="nego">Nego</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
              <SelectItem value="win">Win (Transfer)</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="flex gap-2">
            <Dialog open={isCustomizeDialogOpen} onOpenChange={setIsCustomizeDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="h-9">
                  Customize
                </Button>
              </DialogTrigger>
            </Dialog>
            
            <Button variant="outline" size="icon" className="h-9 w-9">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <GroupSettingsDialog 
        open={isGroupSettingsOpen} 
        onOpenChange={setIsGroupSettingsOpen} 
      />
    </div>
  );
};

export default LeadsTableHeader;
