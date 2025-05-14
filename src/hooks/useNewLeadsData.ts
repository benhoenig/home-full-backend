
import { useState } from 'react';

export type NewLead = {
  name: string;
  projectInterest: string;
  phone: string;
  orderType: 'Buy' | 'Rent';
  budget: string;
  pipelineStage: string;
  adminRemark: string;
  lineId?: string;
  details?: string;
};

export function useNewLeadsData() {
  // Sample data for the new leads table with additional fields
  const [data] = useState<NewLead[]>([
    { 
      name: "John Doe", 
      projectInterest: "Downtown Lofts", 
      phone: "555-123-4567", 
      orderType: "Buy", 
      budget: "$500K-750K",
      pipelineStage: "Following",
      adminRemark: "Urgent, call back today",
      lineId: "johnd", 
      details: "..." 
    },
    { 
      name: "Jane Smith", 
      projectInterest: "Riverside Condos", 
      phone: "555-987-6543",
      orderType: "Rent",
      budget: "$2K-3K/month",
      pipelineStage: "Called",
      adminRemark: "Looking for 2BR unit",
      lineId: "janes", 
      details: "..." 
    },
    { 
      name: "Mike Johnson", 
      projectInterest: "Parkview Heights", 
      phone: "555-456-7890",
      orderType: "Buy",
      budget: "$1M+",
      pipelineStage: "Appointment",
      adminRemark: "Ready to move in 3 months",
      lineId: "mikej", 
      details: "..." 
    },
  ]);

  return data;
}
