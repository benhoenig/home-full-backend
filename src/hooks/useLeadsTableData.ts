
import { useState } from 'react';

export type Lead = {
  dateReceived?: string;
  agent?: string;
  agentRemark?: string;
  adminRemark?: string;
  source?: string;
  contactBy?: string;
  orderType?: string;
  listingCodeInterest?: string;
  listingTypeInterest?: string;
  listingNameInterest?: string;
  propertyTypeInterest?: string;
  projectInterest: string;
  propertyType?: string;
  zoneArea?: string;
  name: string;
  phone: string;
  additionalPhone?: string;
  leadLineId?: string;
  email: string;
  gender?: string;
  nationality?: string;
  birthday?: string;
  age?: number;
  occupation?: string;
  hobbyInterest?: string;
  estimateIncome?: string;
  painPoint?: string;
  rapport?: string;
  potential?: string;
  budget: number;
  schedule?: string;
  timeLeft?: string;
  preferDirection?: string;
  unitSent?: string;
  unitTypeCondo?: string;
  remark?: string;
  matchingTag?: string;
  pipelineStage: string;
  pipelineProgress?: string; // Added this new property
  status: string;
  closingDate?: string;
  transferDate?: string;
  commission?: number;
  listingCode: string;
};

// Creating a default column order based on common importance
export const defaultColumnOrder: (keyof Lead)[] = [
  "projectInterest", 
  "name", 
  "phone", 
  "email",
  "listingCode",
  "budget",
  "status",
  "agent",
  "potential",
  "pipelineStage",
  "pipelineProgress", // Added pipelineProgress column to defaultColumnOrder
  "dateReceived",
  "propertyType",
  "zoneArea",
  "source",
];

// Default columns to display
export const defaultVisibleColumns: (keyof Lead)[] = [
  "projectInterest", 
  "name", 
  "phone",
  "potential",
  "listingCode"
];

export function useLeadsTableData() {
  // Enhanced leads data with more details
  const [data] = useState<Lead[]>([
    { 
      dateReceived: "2023-04-15",
      agent: "John Doe",
      projectInterest: "Downtown Lofts", 
      name: "Robert Smith", 
      phone: "555-222-3333", 
      listingCode: "DL-1234",
      email: "robert.smith@example.com",
      budget: 320000,
      status: "Active",
      pipelineStage: "Following",
      propertyType: "Condominium",
      zoneArea: "Downtown",
      source: "Website",
      potential: "A"
    },
    { 
      dateReceived: "2023-04-20",
      agent: "Jane Smith",
      projectInterest: "Riverside Condos", 
      name: "Emma Brown", 
      phone: "555-444-5555", 
      listingCode: "RC-5678",
      email: "emma.brown@example.com",
      budget: 450000,
      status: "Active",
      pipelineStage: "Called",
      propertyType: "Apartment",
      zoneArea: "Riverside",
      source: "Referral",
      potential: "B"
    },
    { 
      dateReceived: "2023-05-03",
      agent: "Mike Johnson",
      projectInterest: "Parkview Heights", 
      name: "James Wilson", 
      phone: "555-666-7777", 
      listingCode: "PH-9012",
      email: "james.wilson@example.com",
      budget: 380000,
      status: "Inactive",
      pipelineStage: "Appointment",
      propertyType: "Townhouse",
      zoneArea: "Suburban",
      source: "Online Ad",
      potential: "C"
    },
    { 
      dateReceived: "2023-05-10",
      agent: "Sarah Lee",
      projectInterest: "Mountain View", 
      name: "Sophia Lee", 
      phone: "555-888-9999", 
      listingCode: "MV-3456",
      email: "sophia.lee@example.com",
      budget: 520000,
      status: "Active",
      pipelineStage: "Showing",
      propertyType: "Villa",
      zoneArea: "Mountain",
      source: "Property Portal",
      potential: "A"
    },
  ]);

  return data;
}
