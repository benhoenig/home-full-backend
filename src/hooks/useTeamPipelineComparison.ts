import { useState, useMemo } from 'react';

export type TeamComparisonTarget = 'current' | 'my_team' | 'best_team' | 'company';
export type ComparisonType = 'average' | 'best_complete' | 'best_peak';
export type TimePeriod = 'last_month' | 'past_3_months' | 'past_6_months' | 'past_9_months' | 'past_12_months';

export type TeamPipelineStageComparison = {
  name: string;
  current: {
    count: number;
    value: number;
    percentage: number;
    conversionRate: number;
  };
  comparison?: {
    difference: number;
    trend: 'up' | 'down' | 'neutral';
  };
  color: string;
};

// Mock team historical data
const mockTeamHistoricalData = {
  monthly: {
    average: [
      { name: "Lead", conversionRate: 88, count: 320, value: 960000, percentage: 35 },
      { name: "Called", conversionRate: 84, count: 268, value: 804000, percentage: 29 },
      { name: "Follow", conversionRate: 81, count: 217, value: 651000, percentage: 24 },
      { name: "Appointment", conversionRate: 78, count: 169, value: 507000, percentage: 18 },
      { name: "Showing", conversionRate: 75, count: 127, value: 381000, percentage: 14 },
      { name: "Nego", conversionRate: 72, count: 136, value: 408000, percentage: 15 },
      { name: "Closed", conversionRate: 69, count: 136, value: 408000, percentage: 15 },
    ],
    best_complete: [
      { name: "Lead", conversionRate: 92, count: 350, value: 1050000, percentage: 38 },
      { name: "Called", conversionRate: 88, count: 308, value: 924000, percentage: 33 },
      { name: "Follow", conversionRate: 85, count: 262, value: 786000, percentage: 28 },
      { name: "Appointment", conversionRate: 82, count: 215, value: 645000, percentage: 23 },
      { name: "Showing", conversionRate: 79, count: 176, value: 528000, percentage: 19 },
      { name: "Nego", conversionRate: 76, count: 185, value: 555000, percentage: 20 },
      { name: "Closed", conversionRate: 73, count: 185, value: 555000, percentage: 20 },
    ],
    best_peak: [
      { name: "Lead", conversionRate: 95, count: 380, value: 1140000, percentage: 41 },
      { name: "Called", conversionRate: 91, count: 345, value: 1035000, percentage: 37 },
      { name: "Follow", conversionRate: 88, count: 304, value: 912000, percentage: 33 },
      { name: "Appointment", conversionRate: 85, count: 258, value: 774000, percentage: 28 },
      { name: "Showing", conversionRate: 82, count: 220, value: 660000, percentage: 24 },
      { name: "Nego", conversionRate: 79, count: 230, value: 690000, percentage: 25 },
      { name: "Closed", conversionRate: 76, count: 230, value: 690000, percentage: 25 },
    ]
  },
  quarterly: {
    average: [
      { name: "Lead", conversionRate: 86, count: 310, value: 930000, percentage: 34 },
      { name: "Called", conversionRate: 82, count: 254, value: 762000, percentage: 28 },
      { name: "Follow", conversionRate: 79, count: 201, value: 603000, percentage: 22 },
      { name: "Appointment", conversionRate: 76, count: 153, value: 459000, percentage: 17 },
      { name: "Showing", conversionRate: 73, count: 112, value: 336000, percentage: 12 },
      { name: "Nego", conversionRate: 70, count: 119, value: 357000, percentage: 13 },
      { name: "Closed", conversionRate: 67, count: 119, value: 357000, percentage: 13 },
    ],
    best_complete: [
      { name: "Lead", conversionRate: 90, count: 340, value: 1020000, percentage: 37 },
      { name: "Called", conversionRate: 86, count: 292, value: 876000, percentage: 32 },
      { name: "Follow", conversionRate: 83, count: 242, value: 726000, percentage: 26 },
      { name: "Appointment", conversionRate: 80, count: 194, value: 582000, percentage: 21 },
      { name: "Showing", conversionRate: 77, count: 149, value: 447000, percentage: 16 },
      { name: "Nego", conversionRate: 74, count: 158, value: 474000, percentage: 17 },
      { name: "Closed", conversionRate: 71, count: 158, value: 474000, percentage: 17 },
    ],
    best_peak: [
      { name: "Lead", conversionRate: 93, count: 365, value: 1095000, percentage: 40 },
      { name: "Called", conversionRate: 89, count: 325, value: 975000, percentage: 35 },
      { name: "Follow", conversionRate: 86, count: 279, value: 837000, percentage: 30 },
      { name: "Appointment", conversionRate: 83, count: 232, value: 696000, percentage: 25 },
      { name: "Showing", conversionRate: 80, count: 186, value: 558000, percentage: 20 },
      { name: "Nego", conversionRate: 77, count: 195, value: 585000, percentage: 21 },
      { name: "Closed", conversionRate: 74, count: 195, value: 585000, percentage: 21 },
    ]
  },
  annually: {
    average: [
      { name: "Lead", conversionRate: 84, count: 290, value: 870000, percentage: 32 },
      { name: "Called", conversionRate: 80, count: 232, value: 696000, percentage: 26 },
      { name: "Follow", conversionRate: 77, count: 179, value: 537000, percentage: 20 },
      { name: "Appointment", conversionRate: 74, count: 132, value: 396000, percentage: 15 },
      { name: "Showing", conversionRate: 71, count: 94, value: 282000, percentage: 10 },
      { name: "Nego", conversionRate: 68, count: 99, value: 297000, percentage: 11 },
      { name: "Closed", conversionRate: 65, count: 99, value: 297000, percentage: 11 },
    ],
    best_complete: [
      { name: "Lead", conversionRate: 88, count: 320, value: 960000, percentage: 35 },
      { name: "Called", conversionRate: 84, count: 269, value: 807000, percentage: 30 },
      { name: "Follow", conversionRate: 81, count: 218, value: 654000, percentage: 24 },
      { name: "Appointment", conversionRate: 78, count: 170, value: 510000, percentage: 19 },
      { name: "Showing", conversionRate: 75, count: 128, value: 384000, percentage: 14 },
      { name: "Nego", conversionRate: 72, count: 135, value: 405000, percentage: 15 },
      { name: "Closed", conversionRate: 69, count: 135, value: 405000, percentage: 15 },
    ],
    best_peak: [
      { name: "Lead", conversionRate: 91, count: 350, value: 1050000, percentage: 38 },
      { name: "Called", conversionRate: 87, count: 305, value: 915000, percentage: 33 },
      { name: "Follow", conversionRate: 84, count: 256, value: 768000, percentage: 28 },
      { name: "Appointment", conversionRate: 81, count: 208, value: 624000, percentage: 23 },
      { name: "Showing", conversionRate: 78, count: 162, value: 486000, percentage: 18 },
      { name: "Nego", conversionRate: 75, count: 171, value: 513000, percentage: 19 },
      { name: "Closed", conversionRate: 72, count: 171, value: 513000, percentage: 19 },
    ]
  }
};

// Mock best team data (company's top performing team)
const mockBestTeamData = {
  average: [
    { name: "Lead", conversionRate: 94, count: 400, value: 1200000, percentage: 40 },
    { name: "Called", conversionRate: 90, count: 360, value: 1080000, percentage: 36 },
    { name: "Follow", conversionRate: 87, count: 313, value: 939000, percentage: 31 },
    { name: "Appointment", conversionRate: 84, count: 263, value: 789000, percentage: 26 },
    { name: "Showing", conversionRate: 81, count: 213, value: 639000, percentage: 21 },
    { name: "Nego", conversionRate: 78, count: 234, value: 702000, percentage: 23 },
    { name: "Closed", conversionRate: 75, count: 234, value: 702000, percentage: 23 },
  ],
  best_complete: [
    { name: "Lead", conversionRate: 97, count: 450, value: 1350000, percentage: 43 },
    { name: "Called", conversionRate: 93, count: 419, value: 1257000, percentage: 40 },
    { name: "Follow", conversionRate: 90, count: 377, value: 1131000, percentage: 36 },
    { name: "Appointment", conversionRate: 87, count: 339, value: 1017000, percentage: 32 },
    { name: "Showing", conversionRate: 84, count: 295, value: 885000, percentage: 28 },
    { name: "Nego", conversionRate: 81, count: 318, value: 954000, percentage: 30 },
    { name: "Closed", conversionRate: 78, count: 318, value: 954000, percentage: 30 },
  ],
  best_peak: [
    { name: "Lead", conversionRate: 99, count: 480, value: 1440000, percentage: 45 },
    { name: "Called", conversionRate: 95, count: 456, value: 1368000, percentage: 43 },
    { name: "Follow", conversionRate: 92, count: 419, value: 1257000, percentage: 39 },
    { name: "Appointment", conversionRate: 89, count: 373, value: 1119000, percentage: 35 },
    { name: "Showing", conversionRate: 86, count: 321, value: 963000, percentage: 30 },
    { name: "Nego", conversionRate: 83, count: 342, value: 1026000, percentage: 32 },
    { name: "Closed", conversionRate: 80, count: 342, value: 1026000, percentage: 32 },
  ]
};

// Mock company-wide data
const mockCompanyData = {
  average: [
    { name: "Lead", conversionRate: 82, count: 280, value: 840000, percentage: 31 },
    { name: "Called", conversionRate: 78, count: 218, value: 654000, percentage: 24 },
    { name: "Follow", conversionRate: 75, count: 164, value: 492000, percentage: 18 },
    { name: "Appointment", conversionRate: 72, count: 118, value: 354000, percentage: 13 },
    { name: "Showing", conversionRate: 69, count: 81, value: 243000, percentage: 9 },
    { name: "Nego", conversionRate: 66, count: 90, value: 270000, percentage: 10 },
    { name: "Closed", conversionRate: 63, count: 90, value: 270000, percentage: 10 },
  ],
  best_complete: [
    { name: "Lead", conversionRate: 86, count: 310, value: 930000, percentage: 34 },
    { name: "Called", conversionRate: 82, count: 254, value: 762000, percentage: 28 },
    { name: "Follow", conversionRate: 79, count: 201, value: 603000, percentage: 22 },
    { name: "Appointment", conversionRate: 76, count: 153, value: 459000, percentage: 17 },
    { name: "Showing", conversionRate: 73, count: 112, value: 336000, percentage: 12 },
    { name: "Nego", conversionRate: 70, count: 126, value: 378000, percentage: 14 },
    { name: "Closed", conversionRate: 67, count: 126, value: 378000, percentage: 14 },
  ],
  best_peak: [
    { name: "Lead", conversionRate: 89, count: 340, value: 1020000, percentage: 37 },
    { name: "Called", conversionRate: 85, count: 289, value: 867000, percentage: 31 },
    { name: "Follow", conversionRate: 82, count: 237, value: 711000, percentage: 26 },
    { name: "Appointment", conversionRate: 79, count: 187, value: 561000, percentage: 20 },
    { name: "Showing", conversionRate: 76, count: 142, value: 426000, percentage: 15 },
    { name: "Nego", conversionRate: 73, count: 158, value: 474000, percentage: 17 },
    { name: "Closed", conversionRate: 70, count: 158, value: 474000, percentage: 17 },
  ]
};

export function useTeamPipelineComparison() {
  const [comparisonTarget, setComparisonTarget] = useState<TeamComparisonTarget>('current');
  const [comparisonType, setComparisonType] = useState<ComparisonType>('best_complete');
  const [timePeriod, setTimePeriod] = useState<TimePeriod>('last_month');

  // Current team pipeline data (this would come from props or another hook in real app)
  const currentStages = [
    { name: "Lead", count: 280, value: 840000, percentage: 32, color: "#c7d2fe" },
    { name: "Called", count: 224, value: 672000, percentage: 26, color: "#a5b4fc" },
    { name: "Follow", count: 182, value: 546000, percentage: 21, color: "#818cf8" },
    { name: "Appointment", count: 140, value: 420000, percentage: 16, color: "#6366f1" },
    { name: "Showing", count: 98, value: 294000, percentage: 11, color: "#4f46e5" },
    { name: "Nego", count: 126, value: 378000, percentage: 14, color: "#4338ca" },
    { name: "Closed", count: 126, value: 378000, percentage: 14, color: "#3730a3" },
  ];

  const comparisonData = useMemo((): TeamPipelineStageComparison[] => {
    if (comparisonTarget === 'current') {
      return currentStages.map(stage => ({
        ...stage,
        current: {
          count: stage.count,
          value: stage.value,
          percentage: stage.percentage,
          conversionRate: stage.percentage * 2.5, // Mock conversion rate calculation for teams
        }
      }));
    }

    let benchmarkData: any[] = [];

    if (comparisonTarget === 'my_team') {
      const periodData = mockTeamHistoricalData[timePeriod];
      const dataKey = comparisonType;
      
      if (periodData && periodData[dataKey]) {
        benchmarkData = periodData[dataKey];
      } else {
        benchmarkData = mockTeamHistoricalData.monthly[dataKey];
      }
    } else if (comparisonTarget === 'best_team') {
      benchmarkData = mockBestTeamData[comparisonType];
    } else if (comparisonTarget === 'company') {
      benchmarkData = mockCompanyData[comparisonType];
    }

    return currentStages.map((stage, index) => {
      const benchmark = benchmarkData && benchmarkData[index];
      const currentConversionRate = stage.percentage * 2.5; // Mock calculation
      const benchmarkConversionRate = benchmark?.conversionRate || currentConversionRate;

      const difference = currentConversionRate - benchmarkConversionRate;
      const trend = difference > 2 ? 'up' : difference < -2 ? 'down' : 'neutral';

      return {
        ...stage,
        current: {
          count: stage.count,
          value: stage.value,
          percentage: stage.percentage,
          conversionRate: currentConversionRate,
        },
        comparison: benchmark ? {
          difference,
          trend,
        } : undefined,
        color: stage.color,
      };
    });
  }, [comparisonTarget, comparisonType, timePeriod]);

  const comparisonTitle = useMemo(() => {
    if (comparisonTarget === 'current') {
      return 'Current Team Performance';
    }
    
    let targetText = '';
    switch (comparisonTarget) {
      case 'my_team':
        targetText = 'My Team';
        break;
      case 'best_team':
        targetText = 'Best Team';
        break;
      case 'company':
        targetText = 'Company Average';
        break;
    }
    
    const getTimePeriodLabel = (period: TimePeriod) => {
      switch (period) {
        case 'last_month': return 'Last Month';
        case 'past_3_months': return 'Past 3 Months';
        case 'past_6_months': return 'Past 6 Months';
        case 'past_9_months': return 'Past 9 Months';
        case 'past_12_months': return 'Past 12 Months';
        default: return period;
      }
    };

    let typeText = '';
    switch (comparisonType) {
      case 'average':
        typeText = comparisonTarget === 'my_team' ? `Average (${getTimePeriodLabel(timePeriod)})` : 'Average';
        break;
      case 'best_complete':
        typeText = comparisonTarget === 'my_team' ? `Best Complete Pipeline (${getTimePeriodLabel(timePeriod)})` : 'Best Complete Pipeline';
        break;
      case 'best_peak':
        typeText = comparisonTarget === 'my_team' ? `Best Peak Potential (${getTimePeriodLabel(timePeriod)})` : 'Best Peak Potential';
        break;
    }
    
    return `vs ${targetText} - ${typeText}`;
  }, [comparisonTarget, comparisonType, timePeriod]);

  return {
    comparisonTarget,
    setComparisonTarget,
    comparisonType,
    setComparisonType,
    timePeriod,
    setTimePeriod,
    comparisonData,
    comparisonTitle,
  };
}
