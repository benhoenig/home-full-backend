import React from 'react';
import MindsetRadarChart from './MindsetRadarChart';
import SkillsRadarChart from './SkillsRadarChart';
import CompletePipelineFunnel from './CompletePipelineFunnel';
import TeamPipelineOverview from './TeamPipelineOverview';
import ClientFeedback from './ClientFeedback';

interface StatsDashboardProps {
  selectedMember?: string;
}

const StatsDashboard: React.FC<StatsDashboardProps> = ({ selectedMember = 'all' }) => {
  return (
    <div className="space-y-6">
      {/* Top Row - Radar Charts and Client Feedback */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Mindset Radar Chart */}
        <div className="lg:col-span-1">
          <MindsetRadarChart selectedMember={selectedMember} />
        </div>
        
        {/* Skills Radar Chart */}
        <div className="lg:col-span-1">
          <SkillsRadarChart selectedMember={selectedMember} />
        </div>
        
        {/* Client Feedback */}
        <div className="lg:col-span-1">
          <ClientFeedback selectedMember={selectedMember} />
        </div>
      </div>
      
      {/* Bottom Row - Pipeline Visualization */}
      <div className="w-full">
        {selectedMember === 'all' ? (
          <TeamPipelineOverview />
        ) : (
          <CompletePipelineFunnel selectedMember={selectedMember} />
        )}
      </div>
    </div>
  );
};

export default StatsDashboard;
