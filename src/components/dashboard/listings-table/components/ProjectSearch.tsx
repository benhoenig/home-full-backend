import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, Plus } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { Project } from '../types';

interface ProjectSearchProps {
  projectSearchTerm: string;
  selectedProjectId: string | null;
  showProjectDropdown: boolean;
  filteredProjects: Project[];
  setProjectSearchTerm: (term: string) => void;
  setSelectedProjectId: (id: string | null) => void;
  setShowProjectDropdown: (show: boolean) => void;
  setShowAddProjectModal: (show: boolean) => void;
  updateListingNameFromProject: (project: Project) => void;
}

const ProjectSearch: React.FC<ProjectSearchProps> = ({
  projectSearchTerm,
  selectedProjectId,
  showProjectDropdown,
  filteredProjects,
  setProjectSearchTerm,
  setSelectedProjectId,
  setShowProjectDropdown,
  setShowAddProjectModal,
  updateListingNameFromProject
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="project-search">Project Name</Label>
      <div className="relative flex flex-col space-y-2">
        <div className="relative">
          <div className="flex items-center space-x-2">
            <div className="relative flex-grow">
              <Input
                id="project-search"
                placeholder="Search projects..."
                value={projectSearchTerm}
                onChange={(e) => {
                  setProjectSearchTerm(e.target.value);
                  setShowProjectDropdown(true);
                }}
                onFocus={() => setShowProjectDropdown(true)}
                className="pl-10"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            </div>
            {selectedProjectId && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSelectedProjectId(null);
                  setProjectSearchTerm("");
                }}
              >
                Clear
              </Button>
            )}
          </div>
          
          {showProjectDropdown && (
            <div className="absolute z-10 w-full mt-1 project-dropdown">
              <Command className="rounded-lg border shadow-md w-full">
                <CommandList>
                  <CommandEmpty>No projects found.</CommandEmpty>
                  <CommandGroup heading="Projects">
                    {filteredProjects.map((project) => (
                      <CommandItem
                        key={project.id}
                        value={project.id}
                        onSelect={() => {
                          setSelectedProjectId(project.id);
                          setProjectSearchTerm("");
                          setShowProjectDropdown(false);
                          updateListingNameFromProject(project);
                        }}
                      >
                        <div className="flex flex-col">
                          <span className="font-medium">{project.name}</span>
                          <span className="text-xs text-gray-500">{project.thaiName}</span>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </div>
          )}
        </div>
        
        {selectedProjectId && filteredProjects.length > 0 && (
          <div className="flex items-center justify-between rounded-md border p-3 text-sm">
            <div className="flex flex-col">
              <span className="font-medium">
                {filteredProjects.find(p => p.id === selectedProjectId)?.name}
              </span>
              <span className="text-xs text-gray-500">
                {filteredProjects.find(p => p.id === selectedProjectId)?.thaiName}
              </span>
            </div>
          </div>
        )}
        
        <Button 
          type="button" 
          variant="outline" 
          className="flex items-center"
          onClick={() => setShowAddProjectModal(true)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New Project
        </Button>
      </div>
    </div>
  );
};

export default ProjectSearch; 