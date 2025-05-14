
import { useState } from 'react';
import { Lead } from '@/hooks/useLeadsTableData';
import { toast } from "sonner";

export function useLeadsTableState(initialData: Lead[]) {
  const [data, setData] = useState<Lead[]>(initialData);
  const [selectedStage, setSelectedStage] = useState<string>("all");
  const [selectedPotential, setSelectedPotential] = useState<string>("all");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isCustomizeDialogOpen, setIsCustomizeDialogOpen] = useState(false);
  const [isGroupingEnabled, setIsGroupingEnabled] = useState(false);
  
  const handlePipelineStageChange = (index: number, stage: string) => {
    const updatedData = [...data];
    updatedData[index] = { ...updatedData[index], pipelineStage: stage };
    setData(updatedData);
    toast.success(`Pipeline stage updated to ${stage}`);
  };

  const handlePotentialChange = (index: number, potential: string) => {
    const updatedData = [...data];
    updatedData[index] = { ...updatedData[index], potential };
    setData(updatedData);
    toast.success(`Lead potential updated to ${potential}`);
  };

  const handleRowClick = (lead: Lead) => {
    setSelectedLead(lead);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  const toggleGrouping = () => {
    setIsGroupingEnabled(!isGroupingEnabled);
    toast.success(isGroupingEnabled ? "Grouping disabled" : "Grouping enabled");
  };

  return {
    data,
    setData,
    selectedStage,
    setSelectedStage,
    selectedPotential,
    setSelectedPotential,
    isDrawerOpen,
    setIsDrawerOpen,
    selectedLead,
    setSelectedLead,
    isCustomizeDialogOpen,
    setIsCustomizeDialogOpen,
    isGroupingEnabled,
    toggleGrouping,
    handlePipelineStageChange,
    handlePotentialChange,
    handleRowClick,
    handleCloseDrawer
  };
}
