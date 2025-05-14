
import { Lead } from '@/hooks/useLeadsTableData';

export type LeadColumn = {
  header: string;
  accessorKey: keyof Lead | string;
  className?: string;
  cell?: (lead: any, index: number) => React.ReactNode;
};
