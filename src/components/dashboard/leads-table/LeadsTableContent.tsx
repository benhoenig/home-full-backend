import React from 'react';
import { Lead } from '@/hooks/useLeadsTableData';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Table, TableHeader, TableRow, TableHead, TableBody } from "@/components/ui/table";
import { LeadGroup } from '@/hooks/useLeadGroups';
import GroupedLeadsView from './leads-content/GroupedLeadsView';
import UngroupedLeadsView from './leads-content/UngroupedLeadsView';

type Column = {
  header: string;
  accessorKey: keyof Lead;
  cell?: (lead: Lead, index: number) => React.ReactNode;
  className?: string;
};

type LeadsTableContentProps = {
  data: Lead[];
  columns: Column[];
  onRowClick: (lead: Lead) => void;
  isGroupingEnabled: boolean;
  leadGroups: LeadGroup[];
};

const LeadsTableContent = ({ 
  data, 
  columns, 
  onRowClick, 
  isGroupingEnabled,
  leadGroups 
}: LeadsTableContentProps) => {
  // Get ungrouped leads (leads not assigned to any group)
  const ungroupedLeads = isGroupingEnabled 
    ? data.filter(lead => 
        !leadGroups.some(group => 
          group.leads.some(groupLead => 
            groupLead.phone === lead.phone && groupLead.email === lead.email
          )
        )
      )
    : data;

  return (
    <div className="w-full overflow-hidden border rounded-md">
      <ScrollArea className="h-[500px] w-full">
        <div className="w-full min-w-max">
          <Table>
            <TableHeader>
              <TableRow>
                {isGroupingEnabled && <TableHead className="sticky top-0 w-8"></TableHead>}
                <TableHead className="sticky top-0 w-10"></TableHead>
                {columns.map((column) => (
                  <TableHead 
                    key={String(column.accessorKey)}
                    className="sticky top-0 whitespace-nowrap"
                  >
                    {column.header}
                  </TableHead>
                ))}
                <TableHead className="sticky top-0">...</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isGroupingEnabled ? (
                <GroupedLeadsView 
                  leadGroups={leadGroups}
                  columns={columns}
                  ungroupedLeads={ungroupedLeads}
                  onRowClick={onRowClick}
                />
              ) : (
                <UngroupedLeadsView 
                  data={data}
                  columns={columns}
                  onRowClick={onRowClick}
                />
              )}
            </TableBody>
          </Table>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default LeadsTableContent;
