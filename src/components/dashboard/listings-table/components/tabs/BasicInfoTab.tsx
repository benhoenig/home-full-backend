import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ProjectSearch from '../ProjectSearch';
import OwnerSearch from '../OwnerSearch';
import { Project, Owner } from '../../types';

interface BasicInfoTabProps {
  projectStatus: string | null;
  selectedProjectId: string | null;
  selectedOwnerId: string | null;
  projects: Project[];
  owners: Owner[];
  projectSearchTerm: string;
  ownerSearchTerm: string;
  showProjectDropdown: boolean;
  showOwnerDropdown: boolean;
  filteredProjects: Project[];
  filteredOwners: Owner[];
  setProjectStatus: (status: string) => void;
  setSelectedProjectId: (id: string | null) => void;
  setSelectedOwnerId: (id: string | null) => void;
  setProjectSearchTerm: (term: string) => void;
  setOwnerSearchTerm: (term: string) => void;
  setShowProjectDropdown: (show: boolean) => void;
  setShowOwnerDropdown: (show: boolean) => void;
  setShowAddProjectModal: (show: boolean) => void;
  setShowAddOwnerModal: (show: boolean) => void;
}

const BasicInfoTab: React.FC<BasicInfoTabProps> = ({
  projectStatus,
  selectedProjectId,
  selectedOwnerId,
  projects,
  owners,
  projectSearchTerm,
  ownerSearchTerm,
  showProjectDropdown,
  showOwnerDropdown,
  filteredProjects,
  filteredOwners,
  setProjectStatus,
  setSelectedProjectId,
  setSelectedOwnerId,
  setProjectSearchTerm,
  setOwnerSearchTerm,
  setShowProjectDropdown,
  setShowOwnerDropdown,
  setShowAddProjectModal,
  setShowAddOwnerModal
}) => {
  const updateListingNameFromProject = (project: Project) => {
    const listingNameInput = document.getElementById("listing-name") as HTMLInputElement;
    if (listingNameInput) {
      listingNameInput.value = project.name;
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            {/* Essential Info Group */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Essential Information</h3>
              
              <div className="space-y-4">
                {/* Project Type Selection */}
                <div className="space-y-2">
                  <Label htmlFor="in-project-status">Property Location</Label>
                  <Select 
                    value={projectStatus || undefined}
                    onValueChange={(value) => {
                      setProjectStatus(value);
                      
                      // Auto-update listing name based on project status
                      if (value === "in-project") {
                        // When "ในโครงการ" is selected
                        // Auto-fill listing name if a project is selected
                        if (selectedProjectId) {
                          const selectedProject = projects.find(p => p.id === selectedProjectId);
                          if (selectedProject) {
                            const listingNameInput = document.getElementById("listing-name") as HTMLInputElement;
                            if (listingNameInput) {
                              listingNameInput.value = selectedProject.name;
                            }
                          }
                        }
                      } else if (value === "outside-project") {
                        // When "นอกโครงการ" is selected
                        // Auto-fill listing name based on property type and street/soi will happen 
                        // when the user enters values in those fields
                        const listingNameInput = document.getElementById("listing-name") as HTMLInputElement;
                        if (listingNameInput && listingNameInput.value) {
                          // Clear the listing name if it was set by a project
                          if (selectedProjectId) {
                            listingNameInput.value = "";
                          }
                        }
                      }
                    }}
                  >
                    <SelectTrigger id="in-project-status">
                      <SelectValue placeholder="Select location type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="in-project">ในโครงการ (In Project)</SelectItem>
                      <SelectItem value="outside-project">นอกโครงการ (Outside Project)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Conditionally show Project Name field only when ในโครงการ is selected */}
                {projectStatus === "in-project" && (
                  <ProjectSearch
                    projectSearchTerm={projectSearchTerm}
                    selectedProjectId={selectedProjectId}
                    showProjectDropdown={showProjectDropdown}
                    filteredProjects={filteredProjects}
                    setProjectSearchTerm={setProjectSearchTerm}
                    setSelectedProjectId={setSelectedProjectId}
                    setShowProjectDropdown={setShowProjectDropdown}
                    setShowAddProjectModal={setShowAddProjectModal}
                    updateListingNameFromProject={updateListingNameFromProject}
                  />
                )}
                
                {/* Conditionally show Street/Soi field in Basic Info tab when นอกโครงการ is selected */}
                {projectStatus === "outside-project" && (
                  <div className="space-y-2">
                    <Label htmlFor="street-soi">Street/Soi</Label>
                    <Input 
                      id="street-soi" 
                      placeholder="Enter street or soi" 
                      onChange={(e) => {
                        // Auto-update listing name
                        const propertyTypeSelect = document.getElementById("property-type") as HTMLSelectElement;
                        const listingNameInput = document.getElementById("listing-name") as HTMLInputElement;
                        
                        if (propertyTypeSelect && listingNameInput) {
                          const propertyType = propertyTypeSelect.value ? 
                            propertyTypeSelect.options[propertyTypeSelect.selectedIndex].text : "";
                          
                          if (propertyType && e.target.value) {
                            listingNameInput.value = `${propertyType} ${e.target.value}`;
                          }
                        }
                      }}
                    />
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="listing-name">Listing Name*</Label>
                  <Input id="listing-name" placeholder="Enter a name for the listing" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="property-type">Property Type*</Label>
                  <Select onValueChange={(value) => {
                    // If นอกโครงการ is selected, auto-update listing name based on property type and street/soi
                    if (projectStatus === "outside-project") {
                      const streetInput = document.getElementById("street-soi") as HTMLInputElement;
                      const listingNameInput = document.getElementById("listing-name") as HTMLInputElement;
                      
                      if (streetInput && listingNameInput && streetInput.value) {
                        // Get the text value of the selected property type option
                        const propertyTypeSelect = document.getElementById("property-type") as HTMLSelectElement;
                        const propertyType = propertyTypeSelect ? 
                          propertyTypeSelect.options[propertyTypeSelect.selectedIndex].text : "";
                        
                        if (propertyType) {
                          listingNameInput.value = `${propertyType} ${streetInput.value}`;
                        }
                      }
                    }
                  }}>
                    <SelectTrigger id="property-type">
                      <SelectValue placeholder="Select property type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="condo">Condo</SelectItem>
                      <SelectItem value="house">House</SelectItem>
                      <SelectItem value="townhouse">Townhouse</SelectItem>
                      <SelectItem value="land">Land</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="listing-status">Listing Status*</Label>
                  <Select>
                    <SelectTrigger id="listing-status">
                      <SelectValue placeholder="Select listing status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="for-sale">For Sale</SelectItem>
                      <SelectItem value="for-rent">For Rent</SelectItem>
                      <SelectItem value="for-sale-rent">For Sale & Rent</SelectItem>
                      <SelectItem value="with-tenant">ขายพร้อมผู้เช่า</SelectItem>
                      <SelectItem value="sell-down">ขายดาวน์</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="marketing-status">Marketing Status*</Label>
                  <Select>
                    <SelectTrigger id="marketing-status">
                      <SelectValue placeholder="Select marketing status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="sold">Sold</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <OwnerSearch
              ownerSearchTerm={ownerSearchTerm}
              selectedOwnerId={selectedOwnerId}
              showOwnerDropdown={showOwnerDropdown}
              filteredOwners={filteredOwners}
              setOwnerSearchTerm={setOwnerSearchTerm}
              setSelectedOwnerId={setSelectedOwnerId}
              setShowOwnerDropdown={setShowOwnerDropdown}
              setShowAddOwnerModal={setShowAddOwnerModal}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BasicInfoTab; 