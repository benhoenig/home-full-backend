
export interface MatchingField {
  id: string;
  name: string;
  priority: number;
  enabled: boolean;
}

export interface MatchingResult {
  id: string;
  name: string;
  type: string;
  location: string;
  price: string;
  bedrooms: number;
  matchPercentage: number;
}

export interface MatchingFormState {
  projectName: string;
  propertyType: string;
  zone: string;
  priceMin: string;
  priceMax: string;
  isInProject: boolean | undefined;
  bedrooms: string;
  bathrooms: string;
  usableArea: string;
  landRai: string;
  landNgan: string;
  landWah: string;
  floors: string;
  floorNumber: string;
  building: string;
  view: string;
  direction: string;
  parkingSpots: string;
}

export interface MatchingDragHandlers {
  draggedItem: string | null;
  isDragging: boolean;
  dragOverItem: string | null;
  handleDragStart: (e: React.DragEvent, fieldId: string) => void;
  handleDragOver: (e: React.DragEvent, fieldId: string) => void;
  handleDragLeave: () => void;
  handleDrop: (e: React.DragEvent, targetFieldId: string) => void;
  handleDragEnd: () => void;
}
