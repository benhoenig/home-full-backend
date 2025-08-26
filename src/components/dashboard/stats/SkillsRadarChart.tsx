import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer 
} from 'recharts';

interface SkillsRadarChartProps {
  selectedMember?: string;
}

// Mock skills data - this would come from training assessments/certifications
const getSkillsData = (memberKey: string = 'all') => {
  const baseData = [
    { skill: 'Owner Script', value: 82, fullMark: 100 },
    { skill: 'Consulting Script', value: 88, fullMark: 100 },
    { skill: 'Buyer Script', value: 85, fullMark: 100 },
    { skill: 'Present Project', value: 90, fullMark: 100 },
    { skill: 'Negotiation', value: 78, fullMark: 100 },
    { skill: 'Selling', value: 86, fullMark: 100 },
    { skill: 'Area Expert', value: 75, fullMark: 100 },
    { skill: 'Flow & Process', value: 89, fullMark: 100 },
    { skill: 'Real Estate Knowledge', value: 83, fullMark: 100 },
  ];

  // Adjust values based on selected member (mock variation)
  if (memberKey === 'all') return baseData;
  
  const memberVariations: Record<string, number[]> = {
    alex: [85, 91, 88, 93, 81, 89, 78, 92, 86],
    sarah: [89, 94, 92, 96, 85, 93, 82, 95, 90],
    michael: [79, 84, 81, 87, 74, 82, 71, 85, 79],
    emma: [84, 87, 86, 89, 77, 85, 76, 88, 82],
    david: [82, 88, 85, 90, 78, 86, 75, 89, 83],
  };

  const variations = memberVariations[memberKey] || baseData.map(d => d.value);
  
  return baseData.map((item, index) => ({
    ...item,
    value: variations[index]
  }));
};

const SkillsRadarChart: React.FC<SkillsRadarChartProps> = ({ selectedMember = 'all' }) => {
  const data = getSkillsData(selectedMember);
  const averageScore = Math.round(data.reduce((sum, item) => sum + item.value, 0) / data.length);
  
  // Get member name for display
  const memberNames: Record<string, string> = {
    all: 'Team Average',
    alex: 'Alex Johnson',
    sarah: 'Sarah Williams', 
    michael: 'Michael Brown',
    emma: 'Emma Davis',
    david: 'David Chen'
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold flex items-center justify-between">
          <span>Skills Assessment</span>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600">{averageScore}%</div>
            <div className="text-xs text-muted-foreground">Overall Score</div>
          </div>
        </CardTitle>
        <div className="text-sm text-muted-foreground">
          {memberNames[selectedMember]} • 9 Core Skills
        </div>
      </CardHeader>
      <CardContent className="p-2">
        <div style={{ width: '100%', height: '300px' }}>
          <ResponsiveContainer>
            <RadarChart data={data} margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
              <PolarGrid 
                gridType="polygon" 
                radialLines={true}
                stroke="#dbeafe"
              />
              <PolarAngleAxis 
                dataKey="skill" 
                tick={{ fontSize: 10, fill: '#1d4ed8' }}
                className="text-xs"
              />
              <PolarRadiusAxis 
                angle={90} 
                domain={[0, 100]} 
                tick={{ fontSize: 8, fill: '#1e3a8a' }}
                tickCount={5}
              />
              <Radar
                name="Skill Level"
                dataKey="value"
                stroke="#2563eb"
                fill="#2563eb"
                fillOpacity={0.15}
                strokeWidth={2}
                dot={{ fill: '#2563eb', strokeWidth: 1, r: 3 }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        
        {/* Top/Bottom Performers */}
        <div className="mt-4 mx-4 mb-2 grid grid-cols-2 gap-6 text-xs">
          <div>
            <div className="font-medium text-blue-600 mb-1">Mastered Skills</div>
            {data
              .sort((a, b) => b.value - a.value)
              .slice(0, 3)
              .map((item, index) => (
                <div key={index} className="flex justify-between">
                  <span className="truncate">{item.skill}</span>
                  <span className="font-medium">{item.value}%</span>
                </div>
              ))}
          </div>
          <div>
            <div className="font-medium text-red-600 mb-1">Development Areas</div>
            {data
              .sort((a, b) => a.value - b.value)
              .slice(0, 3)
              .map((item, index) => (
                <div key={index} className="flex justify-between">
                  <span className="truncate">{item.skill}</span>
                  <span className="font-medium">{item.value}%</span>
                </div>
              ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SkillsRadarChart;
