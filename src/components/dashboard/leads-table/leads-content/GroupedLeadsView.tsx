
import React, { useState } from 'react';
import { Lead } from '@/hooks/useLeadsTableData';
import { LeadGroup } from '@/hooks/useLeadGroups';
import useLeadDragDrop from '../hooks/useLeadDragDrop';
import LeadRow from '../LeadRow';
import GroupHeader from '../GroupHeader';

type Column = {
  header: string;
  accessorKey: keyof Lead;
  cell?: (lead: Lead, index: number) => React.ReactNode;
  className?: string;
};

type GroupedLeadsViewProps = {
  leadGroups: LeadGroup[];
  columns: Column[];
  ungroupedLeads: Lead[];
  onRowClick: (lead: Lead) => void;
};

const GroupedLeadsView = ({
  leadGroups,
  columns,
  ungroupedLeads,
  onRowClick
}: GroupedLeadsViewProps) => {
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({});
  const {
    dragOverGroupId,
    setDragOverGroupId,
    dragOverLeadIndex,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
    handleLeadDragOver,
    handleDrop,
    handleLeadDropWithinGroup
  } = useLeadDragDrop();

  const toggleGroupCollapse = (groupId: string) => {
    setCollapsedGroups(prev => ({
      ...prev,
      [groupId]: !prev[groupId]
    }));
  };

  return (
    <>
      {/* Render grouped leads */}
      {leadGroups
        .filter(group => group.visible)
        .sort((a, b) => a.order - b.order)
        .map((group) => (
          <React.Fragment key={group.id}>
            <GroupHeader 
              groupId={group.id}
              name={group.name}
              count={group.leads.length}
              color={group.color}
              isCollapsed={collapsedGroups[group.id]}
              isDraggedOver={dragOverGroupId === group.id}
              toggleGroupCollapse={toggleGroupCollapse}
              handleDragOver={handleDragOver}
              handleDrop={(e) => handleDrop(e, group.id, leadGroups)}
              setDragOverGroupId={setDragOverGroupId}
            />

            {!collapsedGroups[group.id] && group.leads.map((lead, i) => (
              <LeadRow 
                key={`${group.id}-${i}`}
                lead={lead}
                columns={columns}
                index={i}
                sourceGroup={group.id}
                onRowClick={onRowClick}
                handleDragStart={handleDragStart}
                handleDragEnd={handleDragEnd}
                handleLeadDragOver={handleLeadDragOver}
                handleLeadDrop={handleLeadDropWithinGroup}
                isDraggedOver={dragOverLeadIndex === i && dragOverGroupId === group.id}
              />
            ))}
          </React.Fragment>
        ))}

      {/* Render ungrouped leads */}
      {ungroupedLeads.length > 0 && (
        <>
          <GroupHeader 
            groupId="ungrouped"
            name="Ungrouped"
            count={ungroupedLeads.length}
            isCollapsed={collapsedGroups['ungrouped']}
            isDraggedOver={dragOverGroupId === 'ungrouped'}
            toggleGroupCollapse={toggleGroupCollapse}
            handleDragOver={handleDragOver}
            handleDrop={(e) => handleDrop(e, 'ungrouped', leadGroups)}
            setDragOverGroupId={setDragOverGroupId}
          />

          {!collapsedGroups['ungrouped'] && ungroupedLeads.map((row, i) => (
            <LeadRow 
              key={`ungrouped-${i}`}
              lead={row}
              columns={columns}
              index={i}
              onRowClick={onRowClick}
              handleDragStart={handleDragStart}
              handleDragEnd={handleDragEnd}
            />
          ))}
        </>
      )}
    </>
  );
};

export default GroupedLeadsView;
