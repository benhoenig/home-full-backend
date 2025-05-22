import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, Plus, Building2 } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { Project } from '../types';
import { Badge } from "@/components/ui/badge";

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
  const selectedProject = selectedProjectId 
    ? filteredProjects.find(p => p.id === selectedProjectId) 
    : null;

  return (
    <div className="space-y-3">
      <Label htmlFor="project-search" className="font-medium">Project Name</Label>
      <div className="relative flex flex-col space-y-3">
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
                className="pl-10 h-10"
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
                className="ml-2"
              >
                Clear
              </Button>
            )}
          </div>
          
          {showProjectDropdown && (
            <div className="absolute z-10 w-full mt-1 project-dropdown">
              <Command className="rounded-lg border shadow-md w-full">
                <CommandList>
                  <CommandEmpty>
                    <div className="flex flex-col items-center justify-center py-6 text-center">
                      <Building2 className="h-10 w-10 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground mb-1">No projects found</p>
                      <p className="text-xs text-muted-foreground">Try a different search term or create a new project</p>
                    </div>
                  </CommandEmpty>
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
                        className="cursor-pointer"
                      >
                        <div className="flex flex-col py-1">
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
        
        {selectedProject && (
          <div className="flex flex-col space-y-2">
            <div className="flex items-center justify-between rounded-md border bg-muted/20 p-4 text-sm">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                  <Building2 className="h-5 w-5 text-primary" />
                </div>
                <div className="flex flex-col">
                  <span className="font-medium text-base">{selectedProject.name}</span>
                  <span className="text-xs text-gray-500">{selectedProject.thaiName}</span>
                </div>
              </div>
              <Badge variant="outline" className="ml-auto">Project</Badge>
            </div>
          </div>
        )}
        
        <Button 
          type="button" 
          variant="outline" 
          className="flex items-center mt-2"
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