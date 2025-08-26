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

interface MindsetRadarChartProps {
  selectedMember?: string;
}

// Mock mindset data - this would come from performance evaluations/assessments
const getMindsetData = (memberKey: string = 'all') => {
  const baseData = [
    { mindset: 'Professionalism', value: 85, fullMark: 100 },
    { mindset: 'Giver Mindset', value: 78, fullMark: 100 },
    { mindset: 'Responsibility', value: 92, fullMark: 100 },
    { mindset: 'Communicate', value: 88, fullMark: 100 },
    { mindset: 'Wise', value: 76, fullMark: 100 },
    { mindset: 'Create Possibility', value: 82, fullMark: 100 },
    { mindset: 'Mission Come First', value: 90, fullMark: 100 },
    { mindset: 'High Energy', value: 87, fullMark: 100 },
    { mindset: 'Integrity', value: 94, fullMark: 100 },
  ];

  // Adjust values based on selected member (mock variation)
  if (memberKey === 'all') return baseData;
  
  const memberVariations: Record<string, number[]> = {
    alex: [88, 82, 95, 91, 79, 85, 93, 90, 97],
    sarah: [92, 85, 88, 94, 83, 89, 86, 91, 96],
    michael: [83, 75, 90, 85, 72, 78, 88, 84, 92],
    emma: [87, 80, 86, 89, 77, 84, 85, 88, 93],
    david: [85, 78, 92, 88, 76, 82, 90, 87, 94],
  };

  const variations = memberVariations[memberKey] || baseData.map(d => d.value);
  
  return baseData.map((item, index) => ({
    ...item,
    value: variations[index]
  }));
};

const MindsetRadarChart: React.FC<MindsetRadarChartProps> = ({ selectedMember = 'all' }) => {
  const data = getMindsetData(selectedMember);
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
          <span>Mindset Assessment</span>
          <div className="text-right">
            <div className="text-2xl font-bold text-teal-600">{averageScore}%</div>
            <div className="text-xs text-muted-foreground">Overall Score</div>
          </div>
        </CardTitle>
        <div className="text-sm text-muted-foreground">
          {memberNames[selectedMember]} • 9 Core Mindsets
        </div>
      </CardHeader>
      <CardContent className="p-2">
        <div style={{ width: '100%', height: '300px' }}>
          <ResponsiveContainer>
            <RadarChart data={data} margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
              <PolarGrid 
                gridType="polygon" 
                radialLines={true}
                stroke="#d1fae5"
              />
              <PolarAngleAxis 
                dataKey="mindset" 
                tick={{ fontSize: 10, fill: '#047857' }}
                className="text-xs"
              />
              <PolarRadiusAxis 
                angle={90} 
                domain={[0, 100]} 
                tick={{ fontSize: 8, fill: '#065f46' }}
                tickCount={5}
              />
              <Radar
                name="Mindset Score"
                dataKey="value"
                stroke="#0d9488"
                fill="#0d9488"
                fillOpacity={0.15}
                strokeWidth={2}
                dot={{ fill: '#0d9488', strokeWidth: 1, r: 3 }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        
        {/* Top/Bottom Performers */}
        <div className="mt-4 mx-4 mb-2 grid grid-cols-2 gap-6 text-xs">
          <div>
            <div className="font-medium text-teal-600 mb-1">Strongest Areas</div>
            {data
              .sort((a, b) => b.value - a.value)
              .slice(0, 3)
              .map((item, index) => (
                <div key={index} className="flex justify-between">
                  <span className="truncate">{item.mindset}</span>
                  <span className="font-medium">{item.value}%</span>
                </div>
              ))}
          </div>
          <div>
            <div className="font-medium text-red-600 mb-1">Growth Areas</div>
            {data
              .sort((a, b) => a.value - b.value)
              .slice(0, 3)
              .map((item, index) => (
                <div key={index} className="flex justify-between">
                  <span className="truncate">{item.mindset}</span>
                  <span className="font-medium">{item.value}%</span>
                </div>
              ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MindsetRadarChart;
