import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building, Home, MapPin, DollarSign, Image as ImageIcon, Crown, Save } from "lucide-react";

// Import types
import { Project, Owner, ListingData, AddListingModalProps } from './types';

// Import modular components
import BasicInfoTab from './components/tabs/BasicInfoTab';
import PropertyDetailsTab from './components/tabs/PropertyDetailsTab';
import LocationTab from './components/tabs/LocationTab';
import MediaTab from './components/tabs/MediaTab';
import PriceTab from './components/tabs/PriceTab';
import AExclusiveTab from './components/tabs/AExclusiveTab';
import AddProjectModal from './components/modals/AddProjectModal';
import { AddOwnerModal } from './components/modals/AddOwnerModal';

const AddListingModal = ({ isOpen, onClose, onSubmit }: AddListingModalProps) => {
  const [activeTab, setActiveTab] = useState('basic-info');
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);
  const [showAddOwnerModal, setShowAddOwnerModal] = useState(false);
  
  // Owner search state
  const [selectedOwnerId, setSelectedOwnerId] = useState<string | null>(null);
  const [showOwnerDropdown, setShowOwnerDropdown] = useState(false);
  const [ownerSearchTerm, setOwnerSearchTerm] = useState("");
  
  // Project search state
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [showProjectDropdown, setShowProjectDropdown] = useState(false);
  const [projectSearchTerm, setProjectSearchTerm] = useState("");
  
  // Project status state (in-project or outside-project)
  const [projectStatus, setProjectStatus] = useState<string | null>(null);
  
  // Handle clicks outside dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showOwnerDropdown || showProjectDropdown) {
        const target = event.target as Element;
        // Check if clicking outside the dropdowns
        if (!(target as HTMLElement).closest('#owner-search') && 
            !(target as HTMLElement).closest('.owner-dropdown') &&
            !(target as HTMLElement).closest('#project-search') && 
            !(target as HTMLElement).closest('.project-dropdown')) {
          setShowOwnerDropdown(false);
          setShowProjectDropdown(false);
        }
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showOwnerDropdown, showProjectDropdown]);
  
  // Sample data
  const [projects, setProjects] = useState<Project[]>([
    { id: "project1", name: "The Reserve", thaiName: "เดอะ รีเซิร์ฟ" },
    { id: "project2", name: "Siamese Exclusive", thaiName: "สยามเอ็กซ์คลูซีฟ" },
    { id: "project3", name: "Ashton Asoke", thaiName: "แอชตัน อโศก" },
    { id: "project4", name: "Noble Around", thaiName: "โนเบิล อราวน์" },
    { id: "project5", name: "Life One Wireless", thaiName: "ไลฟ์ วัน ไวร์เลส" }
  ]);
  
  const [owners, setOwners] = useState<Owner[]>([
    { id: "owner1", name: "John Smith", contact: "092-123-4567" },
    { id: "owner2", name: "Sarah Johnson", contact: "083-456-7890" },
    { id: "owner3", name: "Michael Brown", contact: "063-789-0123" },
    { id: "owner4", name: "Emily Davis", contact: "095-234-5678" },
    { id: "owner5", name: "Robert Wilson", contact: "088-345-6789" }
  ]);
  
  // Filtering functions
  const filteredOwners = ownerSearchTerm.trim() === "" 
    ? owners 
    : owners.filter(owner => 
        owner.name.toLowerCase().includes(ownerSearchTerm.toLowerCase()) || 
        owner.contact.includes(ownerSearchTerm)
      );
      
  const filteredProjects = projectSearchTerm.trim() === ""
    ? projects
    : projects.filter(project =>
        project.name.toLowerCase().includes(projectSearchTerm.toLowerCase()) ||
        project.thaiName.includes(projectSearchTerm)
      );
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Collect form data here and call onSubmit
    const listingData: ListingData = {
      projectStatus,
      projectId: selectedProjectId,
      owner: selectedOwnerId ? owners.find(o => o.id === selectedOwnerId) : undefined,
      // Additional fields would be collected from the form
    };
    onSubmit(listingData);
  };
  
  const handleAddProject = (data: { name: string; thaiName: string }) => {
    const newProject = {
      id: `project${projects.length + 1}`,
      name: data.name,
      thaiName: data.thaiName
    };
    setProjects([...projects, newProject]);
    setSelectedProjectId(newProject.id);
    setShowProjectDropdown(false);
    setShowAddProjectModal(false);
  };
  
  const handleAddOwner = (owner: Omit<Owner, "id">) => {
    const newOwner = {
      id: `owner${owners.length + 1}`,
      ...owner
    };
    setOwners([...owners, newOwner]);
    setSelectedOwnerId(newOwner.id);
    setShowOwnerDropdown(false);
    setShowAddOwnerModal(false);
  };
  
  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold flex items-center">
              <Building className="mr-2 h-5 w-5" />
              Add New Listing
            </DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSubmit}>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
              <TabsList className="grid grid-cols-6 w-full">
                <TabsTrigger value="basic-info" className="flex items-center">
                  <Building className="mr-2 h-4 w-4 md:mr-2" />
                  <span className="hidden md:inline">Basic Info</span>
                </TabsTrigger>
                <TabsTrigger value="property-details" className="flex items-center">
                  <Home className="mr-2 h-4 w-4 md:mr-2" />
                  <span className="hidden md:inline">Property Details</span>
                </TabsTrigger>
                <TabsTrigger value="location" className="flex items-center">
                  <MapPin className="mr-2 h-4 w-4 md:mr-2" />
                  <span className="hidden md:inline">Location</span>
                </TabsTrigger>
                <TabsTrigger value="media" className="flex items-center">
                  <ImageIcon className="mr-2 h-4 w-4 md:mr-2" />
                  <span className="hidden md:inline">Media</span>
                </TabsTrigger>
                <TabsTrigger value="price" className="flex items-center">
                  <DollarSign className="mr-2 h-4 w-4 md:mr-2" />
                  <span className="hidden md:inline">Price</span>
                </TabsTrigger>
                <TabsTrigger value="a-exclusive" className="flex items-center">
                  <Crown className="mr-2 h-4 w-4 md:mr-2" />
                  <span className="hidden md:inline">A & Exclusive</span>
                </TabsTrigger>
              </TabsList>
              
              {/* Basic Info Tab */}
              <TabsContent value="basic-info" className="py-4">
                <BasicInfoTab 
                  projectStatus={projectStatus}
                  selectedProjectId={selectedProjectId}
                  selectedOwnerId={selectedOwnerId}
                  projects={projects}
                  owners={owners}
                  projectSearchTerm={projectSearchTerm}
                  ownerSearchTerm={ownerSearchTerm}
                  showProjectDropdown={showProjectDropdown}
                  showOwnerDropdown={showOwnerDropdown}
                  filteredProjects={filteredProjects}
                  filteredOwners={filteredOwners}
                  setProjectStatus={setProjectStatus}
                  setSelectedProjectId={setSelectedProjectId}
                  setSelectedOwnerId={setSelectedOwnerId}
                  setProjectSearchTerm={setProjectSearchTerm}
                  setOwnerSearchTerm={setOwnerSearchTerm}
                  setShowProjectDropdown={setShowProjectDropdown}
                  setShowOwnerDropdown={setShowOwnerDropdown}
                  setShowAddProjectModal={setShowAddProjectModal}
                  setShowAddOwnerModal={setShowAddOwnerModal}
                />
              </TabsContent>
              
              {/* Property Details Tab */}
              <TabsContent value="property-details" className="py-4">
                <PropertyDetailsTab />
              </TabsContent>
              
              {/* Location Tab */}
              <TabsContent value="location" className="py-4">
                <LocationTab />
              </TabsContent>
              
              {/* Media Tab */}
              <TabsContent value="media" className="py-4">
                <MediaTab />
              </TabsContent>
              
              {/* Price Tab */}
              <TabsContent value="price" className="py-4">
                <PriceTab />
              </TabsContent>
              
              {/* A & Exclusive Tab */}
              <TabsContent value="a-exclusive" className="py-4">
                <AExclusiveTab />
              </TabsContent>
            </Tabs>
            
            <DialogFooter className="mt-6 gap-2 flex-col sm:flex-row">
              <Button variant="outline" type="button" onClick={onClose}>Cancel</Button>
              
              {activeTab !== 'basic-info' && (
                <Button 
                  variant="outline" 
                  type="button"
                  onClick={() => {
                    const tabs = ['basic-info', 'property-details', 'location', 'media', 'price', 'a-exclusive'];
                    const currentIndex = tabs.indexOf(activeTab);
                    if (currentIndex > 0) {
                      setActiveTab(tabs[currentIndex - 1]);
                    }
                  }}
                >
                  Previous
                </Button>
              )}
              
              {activeTab !== 'a-exclusive' ? (
                <Button 
                  type="button"
                  onClick={() => {
                    const tabs = ['basic-info', 'property-details', 'location', 'media', 'price', 'a-exclusive'];
                    const currentIndex = tabs.indexOf(activeTab);
                    if (currentIndex < tabs.length - 1) {
                      setActiveTab(tabs[currentIndex + 1]);
                    }
                  }}
                >
                  Next
                </Button>
              ) : (
                <Button type="submit" className="flex items-center">
                  <Save className="mr-2 h-4 w-4" />
                  Save Listing
                </Button>
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      {/* Add Project Modal */}
      <AddProjectModal 
        isOpen={showAddProjectModal} 
        onClose={() => setShowAddProjectModal(false)} 
        onSave={handleAddProject} 
      />

      {/* Add Owner Modal */}
      <AddOwnerModal 
        isOpen={showAddOwnerModal} 
        onClose={() => setShowAddOwnerModal(false)} 
        onSave={handleAddOwner} 
      />
    </>
  );
};

export default AddListingModal; 