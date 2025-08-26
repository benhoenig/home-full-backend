import { useState, useMemo } from 'react';

export type ComparisonTarget = 'current' | 'myself' | 'top_1' | 'top_2' | 'top_3' | 'top_3_average';
export type ComparisonType = 'average' | 'best_complete' | 'best_peak';
export type TimePeriod = 'monthly' | 'quarterly' | 'annually';

export type PipelineStageComparison = {
  name: string;
  current: {
    count: number;
    value: number;
    percentage: number;
    conversionRate: number;
  };
  comparison?: {
    count: number;
    value: number;
    percentage: number;
    conversionRate: number;
    difference: number; // percentage difference
    trend: 'up' | 'down' | 'equal';
  };
  color: string;
};

export type TopPerformer = {
  id: string;
  name: string;
  initials: string;
  isAnonymous: boolean;
  overallConversionRate: number;
};

// Mock historical data for demonstration
const mockHistoricalData = {
  monthly: {
    // Best individual stages (mixed from different months)
    personal_best: [
      { name: "Lead", conversionRate: 85, count: 48, value: 144000, percentage: 32 },
      { name: "Called", conversionRate: 78, count: 32, value: 96000, percentage: 22 },
      { name: "Follow", conversionRate: 72, count: 26, value: 78000, percentage: 18 },
      { name: "Appointment", conversionRate: 68, count: 18, value: 54000, percentage: 12 },
      { name: "Showing", conversionRate: 65, count: 12, value: 36000, percentage: 8 },
      { name: "Nego", conversionRate: 62, count: 16, value: 48000, percentage: 11 },
      { name: "Closed", conversionRate: 58, count: 16, value: 48000, percentage: 11 },
    ],
    // Best complete pipeline (from February - the month with best closed rate 72%)
    personal_best_complete: [
      { name: "Lead", conversionRate: 70, count: 42, value: 126000, percentage: 30 },
      { name: "Called", conversionRate: 70, count: 29, value: 87000, percentage: 21 },
      { name: "Follow", conversionRate: 75, count: 22, value: 66000, percentage: 16 },
      { name: "Appointment", conversionRate: 56, count: 12, value: 36000, percentage: 9 },
      { name: "Showing", conversionRate: 71, count: 9, value: 27000, percentage: 6 },
      { name: "Nego", conversionRate: 72, count: 12, value: 36000, percentage: 9 },
      { name: "Closed", conversionRate: 72, count: 12, value: 36000, percentage: 9 },
    ],
    personal_average: [
      { name: "Lead", conversionRate: 72, count: 42, value: 126000, percentage: 30 },
      { name: "Called", conversionRate: 65, count: 26, value: 78000, percentage: 18 },
      { name: "Follow", conversionRate: 58, count: 20, value: 60000, percentage: 14 },
      { name: "Appointment", conversionRate: 52, count: 13, value: 39000, percentage: 9 },
      { name: "Showing", conversionRate: 48, count: 8, value: 24000, percentage: 6 },
      { name: "Nego", conversionRate: 45, count: 12, value: 36000, percentage: 8 },
      { name: "Closed", conversionRate: 42, count: 12, value: 36000, percentage: 8 },
    ]
  },
  quarterly: {
    personal_best: [
      { name: "Lead", conversionRate: 88, count: 52, value: 156000, percentage: 34 },
      { name: "Called", conversionRate: 82, count: 35, value: 105000, percentage: 24 },
      { name: "Follow", conversionRate: 76, count: 28, value: 84000, percentage: 19 },
      { name: "Appointment", conversionRate: 71, count: 20, value: 60000, percentage: 14 },
      { name: "Showing", conversionRate: 68, count: 14, value: 42000, percentage: 10 },
      { name: "Nego", conversionRate: 65, count: 18, value: 54000, percentage: 12 },
      { name: "Closed", conversionRate: 62, count: 18, value: 54000, percentage: 12 },
    ],
    // Best complete pipeline (Q2 2024 - quarter with best overall performance)
    personal_best_complete: [
      { name: "Lead", conversionRate: 82, count: 48, value: 144000, percentage: 32 },
      { name: "Called", conversionRate: 79, count: 32, value: 96000, percentage: 21 },
      { name: "Follow", conversionRate: 73, count: 25, value: 75000, percentage: 17 },
      { name: "Appointment", conversionRate: 68, count: 18, value: 54000, percentage: 12 },
      { name: "Showing", conversionRate: 65, count: 13, value: 39000, percentage: 9 },
      { name: "Nego", conversionRate: 62, count: 16, value: 48000, percentage: 11 },
      { name: "Closed", conversionRate: 60, count: 16, value: 48000, percentage: 11 },
    ],
    personal_average: [
      { name: "Lead", conversionRate: 75, count: 44, value: 132000, percentage: 31 },
      { name: "Called", conversionRate: 68, count: 28, value: 84000, percentage: 19 },
      { name: "Follow", conversionRate: 61, count: 22, value: 66000, percentage: 15 },
      { name: "Appointment", conversionRate: 55, count: 15, value: 45000, percentage: 10 },
      { name: "Showing", conversionRate: 51, count: 10, value: 30000, percentage: 7 },
      { name: "Nego", conversionRate: 48, count: 14, value: 42000, percentage: 9 },
      { name: "Closed", conversionRate: 45, count: 14, value: 42000, percentage: 9 },
    ]
  },
  annually: {
    personal_best: [
      { name: "Lead", conversionRate: 90, count: 58, value: 174000, percentage: 36 },
      { name: "Called", conversionRate: 85, count: 42, value: 126000, percentage: 26 },
      { name: "Follow", conversionRate: 80, count: 35, value: 105000, percentage: 22 },
      { name: "Appointment", conversionRate: 75, count: 28, value: 84000, percentage: 17 },
      { name: "Showing", conversionRate: 72, count: 22, value: 66000, percentage: 14 },
      { name: "Nego", conversionRate: 68, count: 25, value: 75000, percentage: 16 },
      { name: "Closed", conversionRate: 65, count: 25, value: 75000, percentage: 16 },
    ],
    // Best complete pipeline (2023 - year with best overall performance)
    personal_best_complete: [
      { name: "Lead", conversionRate: 85, count: 52, value: 156000, percentage: 34 },
      { name: "Called", conversionRate: 80, count: 38, value: 114000, percentage: 25 },
      { name: "Follow", conversionRate: 75, count: 30, value: 90000, percentage: 20 },
      { name: "Appointment", conversionRate: 70, count: 22, value: 66000, percentage: 14 },
      { name: "Showing", conversionRate: 68, count: 18, value: 54000, percentage: 12 },
      { name: "Nego", conversionRate: 65, count: 20, value: 60000, percentage: 13 },
      { name: "Closed", conversionRate: 62, count: 20, value: 60000, percentage: 13 },
    ],
    personal_average: [
      { name: "Lead", conversionRate: 78, count: 48, value: 144000, percentage: 33 },
      { name: "Called", conversionRate: 72, count: 32, value: 96000, percentage: 22 },
      { name: "Follow", conversionRate: 66, count: 26, value: 78000, percentage: 18 },
      { name: "Appointment", conversionRate: 60, count: 18, value: 54000, percentage: 12 },
      { name: "Showing", conversionRate: 55, count: 14, value: 42000, percentage: 10 },
      { name: "Nego", conversionRate: 52, count: 16, value: 48000, percentage: 11 },
      { name: "Closed", conversionRate: 48, count: 16, value: 48000, percentage: 11 },
    ]
  }
};

// Mock top performers data
const mockTopPerformers: TopPerformer[] = [
  { id: "1", name: "Sarah Chen", initials: "S.C.", isAnonymous: false, overallConversionRate: 92 },
  { id: "2", name: "Michael Rodriguez", initials: "M.R.", isAnonymous: false, overallConversionRate: 89 },
  { id: "3", name: "Jessica Wang", initials: "J.W.", isAnonymous: false, overallConversionRate: 86 },
];

const mockTopPerformersData = {
  top_1: {
    average: [
      { name: "Lead", conversionRate: 90, count: 50, value: 150000, percentage: 33 },
      { name: "Called", conversionRate: 86, count: 35, value: 105000, percentage: 24 },
      { name: "Follow", conversionRate: 83, count: 29, value: 87000, percentage: 20 },
      { name: "Appointment", conversionRate: 80, count: 23, value: 69000, percentage: 16 },
      { name: "Showing", conversionRate: 77, count: 18, value: 54000, percentage: 12 },
      { name: "Nego", conversionRate: 74, count: 20, value: 60000, percentage: 14 },
      { name: "Closed", conversionRate: 71, count: 20, value: 60000, percentage: 14 },
    ],
    best_complete: [
      { name: "Lead", conversionRate: 92, count: 55, value: 165000, percentage: 36 },
      { name: "Called", conversionRate: 88, count: 38, value: 114000, percentage: 26 },
      { name: "Follow", conversionRate: 85, count: 32, value: 96000, percentage: 22 },
      { name: "Appointment", conversionRate: 82, count: 26, value: 78000, percentage: 18 },
      { name: "Showing", conversionRate: 79, count: 20, value: 60000, percentage: 14 },
      { name: "Nego", conversionRate: 76, count: 22, value: 66000, percentage: 15 },
      { name: "Closed", conversionRate: 73, count: 22, value: 66000, percentage: 15 },
    ],
    best_peak: [
      { name: "Lead", conversionRate: 95, count: 58, value: 174000, percentage: 38 },
      { name: "Called", conversionRate: 91, count: 42, value: 126000, percentage: 28 },
      { name: "Follow", conversionRate: 88, count: 37, value: 111000, percentage: 25 },
      { name: "Appointment", conversionRate: 85, count: 31, value: 93000, percentage: 21 },
      { name: "Showing", conversionRate: 82, count: 25, value: 75000, percentage: 17 },
      { name: "Nego", conversionRate: 79, count: 28, value: 84000, percentage: 19 },
      { name: "Closed", conversionRate: 76, count: 28, value: 84000, percentage: 19 },
    ]
  },
  top_2: {
    average: [
      { name: "Lead", conversionRate: 87, count: 47, value: 141000, percentage: 31 },
      { name: "Called", conversionRate: 83, count: 33, value: 99000, percentage: 22 },
      { name: "Follow", conversionRate: 80, count: 26, value: 78000, percentage: 17 },
      { name: "Appointment", conversionRate: 77, count: 20, value: 60000, percentage: 13 },
      { name: "Showing", conversionRate: 74, count: 15, value: 45000, percentage: 10 },
      { name: "Nego", conversionRate: 71, count: 17, value: 51000, percentage: 11 },
      { name: "Closed", conversionRate: 68, count: 17, value: 51000, percentage: 11 },
    ],
    best_complete: [
      { name: "Lead", conversionRate: 89, count: 52, value: 156000, percentage: 34 },
      { name: "Called", conversionRate: 85, count: 36, value: 108000, percentage: 24 },
      { name: "Follow", conversionRate: 82, count: 30, value: 90000, percentage: 20 },
      { name: "Appointment", conversionRate: 79, count: 24, value: 72000, percentage: 16 },
      { name: "Showing", conversionRate: 76, count: 18, value: 54000, percentage: 12 },
      { name: "Nego", conversionRate: 73, count: 20, value: 60000, percentage: 13 },
      { name: "Closed", conversionRate: 70, count: 20, value: 60000, percentage: 13 },
    ],
    best_peak: [
      { name: "Lead", conversionRate: 92, count: 55, value: 165000, percentage: 36 },
      { name: "Called", conversionRate: 88, count: 40, value: 120000, percentage: 26 },
      { name: "Follow", conversionRate: 85, count: 34, value: 102000, percentage: 22 },
      { name: "Appointment", conversionRate: 82, count: 28, value: 84000, percentage: 18 },
      { name: "Showing", conversionRate: 79, count: 22, value: 66000, percentage: 15 },
      { name: "Nego", conversionRate: 76, count: 24, value: 72000, percentage: 16 },
      { name: "Closed", conversionRate: 73, count: 24, value: 72000, percentage: 16 },
    ]
  },
  top_3: {
    average: [
      { name: "Lead", conversionRate: 84, count: 43, value: 129000, percentage: 29 },
      { name: "Called", conversionRate: 80, count: 30, value: 90000, percentage: 20 },
      { name: "Follow", conversionRate: 77, count: 24, value: 72000, percentage: 16 },
      { name: "Appointment", conversionRate: 74, count: 18, value: 54000, percentage: 12 },
      { name: "Showing", conversionRate: 71, count: 13, value: 39000, percentage: 9 },
      { name: "Nego", conversionRate: 68, count: 15, value: 45000, percentage: 10 },
      { name: "Closed", conversionRate: 65, count: 15, value: 45000, percentage: 10 },
    ],
    best_complete: [
      { name: "Lead", conversionRate: 86, count: 48, value: 144000, percentage: 32 },
      { name: "Called", conversionRate: 82, count: 34, value: 102000, percentage: 23 },
      { name: "Follow", conversionRate: 79, count: 28, value: 84000, percentage: 19 },
      { name: "Appointment", conversionRate: 76, count: 22, value: 66000, percentage: 15 },
      { name: "Showing", conversionRate: 73, count: 16, value: 48000, percentage: 11 },
      { name: "Nego", conversionRate: 70, count: 18, value: 54000, percentage: 12 },
      { name: "Closed", conversionRate: 67, count: 18, value: 54000, percentage: 12 },
    ],
    best_peak: [
      { name: "Lead", conversionRate: 89, count: 52, value: 156000, percentage: 34 },
      { name: "Called", conversionRate: 85, count: 38, value: 114000, percentage: 25 },
      { name: "Follow", conversionRate: 82, count: 32, value: 96000, percentage: 21 },
      { name: "Appointment", conversionRate: 79, count: 26, value: 78000, percentage: 17 },
      { name: "Showing", conversionRate: 76, count: 20, value: 60000, percentage: 13 },
      { name: "Nego", conversionRate: 73, count: 22, value: 66000, percentage: 15 },
      { name: "Closed", conversionRate: 70, count: 22, value: 66000, percentage: 15 },
    ]
  }
};

export function usePipelineComparison() {
  const [comparisonTarget, setComparisonTarget] = useState<ComparisonTarget>('current');
  const [comparisonType, setComparisonType] = useState<ComparisonType>('best_complete');
  const [timePeriod, setTimePeriod] = useState<TimePeriod>('monthly');
  const [showAnonymous, setShowAnonymous] = useState(true);

  // Current pipeline data (this would come from props or another hook in real app)
  const currentStages = [
    { name: "Lead", count: 42, value: 126000, percentage: 30, color: "#c7d2fe" },
    { name: "Called", count: 28, value: 84000, percentage: 20, color: "#a5b4fc" },
    { name: "Follow", count: 21, value: 63000, percentage: 15, color: "#818cf8" },
    { name: "Appointment", count: 14, value: 42000, percentage: 10, color: "#6366f1" },
    { name: "Showing", count: 7, value: 21000, percentage: 5, color: "#4f46e5" },
    { name: "Nego", count: 14, value: 42000, percentage: 10, color: "#4338ca" },
    { name: "Closed", count: 14, value: 42000, percentage: 10, color: "#3730a3" },
  ];

  const comparisonData = useMemo((): PipelineStageComparison[] => {
    if (comparisonTarget === 'current') {
      return currentStages.map(stage => ({
        ...stage,
        current: {
          count: stage.count,
          value: stage.value,
          percentage: stage.percentage,
          conversionRate: stage.percentage * 2.3, // Mock conversion rate calculation
        }
      }));
    }

    let benchmarkData: any[] = [];

    if (comparisonTarget === 'myself') {
      const periodData = mockHistoricalData[timePeriod];
      
      // Choose data based on comparison type
      let dataKey: string;
      switch (comparisonType) {
        case 'average':
          dataKey = 'personal_average';
          break;
        case 'best_complete':
          dataKey = 'personal_best_complete';
          break;
        case 'best_peak':
          dataKey = 'personal_best';
          break;
        default:
          dataKey = 'personal_best_complete';
      }
      
      if (periodData && periodData[dataKey]) {
        benchmarkData = periodData[dataKey];
      } else {
        // Fallback to monthly data if the selected period doesn't exist
        benchmarkData = mockHistoricalData.monthly[dataKey];
      }
    } else if (comparisonTarget.startsWith('top_')) {
      if (comparisonTarget === 'top_3_average') {
        // Calculate average of top 3 performers for the selected comparison type
        const dataKey = comparisonType;
        benchmarkData = mockTopPerformersData.top_1[dataKey].map((_, index) => {
          const top1 = mockTopPerformersData.top_1[dataKey][index];
          const top2 = mockTopPerformersData.top_2[dataKey][index];
          const top3 = mockTopPerformersData.top_3[dataKey][index];
          
          return {
            name: top1.name,
            conversionRate: (top1.conversionRate + top2.conversionRate + top3.conversionRate) / 3,
            count: Math.round((top1.count + top2.count + top3.count) / 3),
            value: Math.round((top1.value + top2.value + top3.value) / 3),
            percentage: Math.round((top1.percentage + top2.percentage + top3.percentage) / 3),
          };
        });
      } else {
        // Get specific top performer data based on comparison type
        const performerData = mockTopPerformersData[comparisonTarget as keyof typeof mockTopPerformersData];
        benchmarkData = performerData[comparisonType];
      }
    }

    return currentStages.map((stage, index) => {
      const benchmark = benchmarkData && benchmarkData[index];
      const currentConversionRate = stage.percentage * 2.3; // Mock calculation
      const benchmarkConversionRate = benchmark?.conversionRate || currentConversionRate;
      
      const difference = benchmarkConversionRate > 0 
        ? ((currentConversionRate - benchmarkConversionRate) / benchmarkConversionRate) * 100
        : 0;
      const trend = difference > 2 ? 'up' : difference < -2 ? 'down' : 'equal';

      return {
        name: stage.name,
        current: {
          count: stage.count,
          value: stage.value,
          percentage: stage.percentage,
          conversionRate: currentConversionRate,
        },
        comparison: benchmark ? {
          count: benchmark.count || 0,
          value: benchmark.value || 0,
          percentage: benchmark.percentage || 0,
          conversionRate: benchmarkConversionRate,
          difference: Math.round(difference * 100) / 100,
          trend,
        } : undefined,
        color: stage.color,
      };
    });
  }, [comparisonTarget, comparisonType, timePeriod]);

  const topPerformers = useMemo(() => {
    return showAnonymous 
      ? mockTopPerformers.map(p => ({ ...p, name: `Top Performer #${mockTopPerformers.indexOf(p) + 1}` }))
      : mockTopPerformers;
  }, [showAnonymous]);

  const comparisonTitle = useMemo(() => {
    if (comparisonTarget === 'current') {
      return 'Current Performance';
    }
    
    let targetText = '';
    switch (comparisonTarget) {
      case 'myself':
        targetText = 'Myself';
        break;
      case 'top_1':
        targetText = topPerformers[0]?.name || 'Top Performer #1';
        break;
      case 'top_2':
        targetText = topPerformers[1]?.name || 'Top Performer #2';
        break;
      case 'top_3':
        targetText = topPerformers[2]?.name || 'Top Performer #3';
        break;
      case 'top_3_average':
        targetText = 'Top 3 Average';
        break;
    }
    
    let typeText = '';
    if (comparisonTarget === 'myself') {
      switch (comparisonType) {
        case 'average':
          typeText = `Average (${timePeriod})`;
          break;
        case 'best_complete':
          typeText = `Best Complete Pipeline (${timePeriod})`;
          break;
        case 'best_peak':
          typeText = `Best Peak Potential (${timePeriod})`;
          break;
      }
    } else if (comparisonTarget.startsWith('top_')) {
      switch (comparisonType) {
        case 'average':
          typeText = 'Average';
          break;
        case 'best_complete':
          typeText = 'Best Complete Pipeline';
          break;
        case 'best_peak':
          typeText = 'Best Peak Potential';
          break;
      }
    }
    
    return (comparisonTarget === 'myself' || comparisonTarget.startsWith('top_'))
      ? `vs ${targetText} - ${typeText}`
      : `vs ${targetText}`;
  }, [comparisonTarget, comparisonType, timePeriod, topPerformers]);

  return {
    comparisonTarget,
    setComparisonTarget,
    comparisonType,
    setComparisonType,
    timePeriod,
    setTimePeriod,
    showAnonymous,
    setShowAnonymous,
    comparisonData,
    topPerformers,
    comparisonTitle,
  };
}
