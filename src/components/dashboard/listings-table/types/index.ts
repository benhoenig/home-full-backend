// Type definition for Project
export type Project = {
  id: string;
  name: string;
  thaiName: string;
};

// Type definition for Owner
export type Owner = {
  id: string;
  name: string;
  contact: string;
};

// Define a type for the listing data
export interface ListingData {
  id?: string;
  listingName?: string;
  propertyType?: string;
  listingStatus?: string;
  marketingStatus?: string;
  owner?: Owner;
  projectId?: string;
  projectStatus?: string;
  streetSoi?: string;
  bedrooms?: number;
  bathrooms?: number;
  building?: string;
  floor?: number;
  unit?: string;
  view?: string;
  direction?: string;
  usableArea?: number;
  condoArea?: number;
  rai?: number;
  ngan?: number;
  wa?: number;
  parking?: number;
  remark?: string;
  zoneArea?: string;
  locationGrade?: string;
  btsStation?: string;
  mrtStation?: string;
  arlStation?: string;
  googleMapsLink?: string;
  askingPrice?: number;
  netPrice?: number;
  rentalPrice?: number;
  priceRemark?: string;
  listingType?: string;
  propertyHook?: string;
  giveaways?: string[];
  commonAreas?: string[];
  targetBuyer?: string[];
  targetBuyerRemark?: string;
  hashtags?: string;
}

// Modal Props
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface AddListingModalProps extends ModalProps {
  onSubmit: (data: ListingData) => void;
  initialTab?: string; // Optional initial tab to show
}

export interface AddProjectModalProps extends ModalProps {
  onSave: (data: { name: string; thaiName: string }) => void;
}

export interface AddOwnerModalProps extends ModalProps {
  onSave: (owner: Omit<Owner, "id">) => void;
}

// Tab content props
export interface TabContentProps {
  projectStatus: string | null;
  selectedProjectId: string | null;
  selectedOwnerId: string | null;
  projects: Project[];
  owners: Owner[];
  projectSearchTerm: string;
  ownerSearchTerm: string;
  showProjectDropdown: boolean;
  showOwnerDropdown: boolean;
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