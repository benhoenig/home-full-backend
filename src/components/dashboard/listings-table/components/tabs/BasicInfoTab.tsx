import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ProjectSearch from '../ProjectSearch';
import OwnerSearch from '../OwnerSearch';
import { Project, Owner } from '../../types';
import { Separator } from "@/components/ui/separator";

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
    <Card className="shadow-sm">
      <CardContent className="pt-6">
        {/* Main Form Layout */}
        <div className="grid grid-cols-1 gap-8">
          
          {/* Section 1: Property Details */}
          <div className="space-y-4">
            <div className="pb-2">
              <h3 className="text-lg font-medium mb-2">Property Information</h3>
              <Separator className="w-full" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-4">
                {/* Listing Name */}
                <div className="space-y-2">
                  <Label htmlFor="listing-name" className="font-medium">Listing Name*</Label>
                  <Input 
                    id="listing-name" 
                    placeholder="Enter a name for the listing" 
                    className="h-10"
                  />
                </div>
                
                {/* Property Location Type */}
                <div className="space-y-2">
                  <Label htmlFor="in-project-status" className="font-medium">Property Location</Label>
                  <Select 
                    value={projectStatus || undefined}
                    onValueChange={(value) => {
                      setProjectStatus(value);
                      
                      // Auto-update listing name based on project status
                      if (value === "in-project") {
                        // When "ในโครงการ" is selected
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
                    <SelectTrigger id="in-project-status" className="h-10">
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
                    <Label htmlFor="street-soi" className="font-medium">Street/Soi</Label>
                    <Input 
                      id="street-soi" 
                      placeholder="Enter street or soi" 
                      className="h-10"
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
              </div>
              
              {/* Right Column */}
              <div className="space-y-4">
                {/* Property Type */}
                <div className="space-y-2">
                  <Label htmlFor="property-type" className="font-medium">Property Type*</Label>
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
                    <SelectTrigger id="property-type" className="h-10">
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
                
                {/* Listing Status */}
                <div className="space-y-2">
                  <Label htmlFor="listing-status" className="font-medium">Listing Status*</Label>
                  <Select>
                    <SelectTrigger id="listing-status" className="h-10">
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
                
                {/* Marketing Status */}
                <div className="space-y-2">
                  <Label htmlFor="marketing-status" className="font-medium">Marketing Status*</Label>
                  <Select>
                    <SelectTrigger id="marketing-status" className="h-10">
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
          
          {/* Section 2: Owner Information */}
          <div className="space-y-4">
            <div className="pb-2">
              <h3 className="text-lg font-medium mb-2">Owner Information</h3>
              <Separator className="w-full" />
            </div>
            
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