
import { useState } from 'react';

export type Transfer = {
  name: string;
  project: string;
  commission: string;
  stage: string;
  details: string;
};

export function useTransferData() {
  // Sample transfer data
  const [data] = useState<Transfer[]>([
    { name: "Lisa Johnson", project: "Riverside Condos", commission: "$45,000", stage: "Contract", details: "..." },
    { name: "David Miller", project: "Downtown Lofts", commission: "$32,500", stage: "Closing", details: "..." },
  ]);

  return data;
}
