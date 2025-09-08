import { useState } from 'react';

export interface WelfareBenefit {
  id: string;
  name: string;
  description: string;
  type: 'monetary' | 'time_off' | 'health' | 'development' | 'recognition' | 'other';
  value: string; // Could be amount, days, percentage, etc.
  unit: string; // THB, days, %, etc.
  icon: string;
}

export interface PerformanceRange {
  id: string;
  name: string;
  minScore: number;
  maxScore: number;
  color: string;
  benefits: WelfareBenefit[];
}

export interface RoleWelfareConfig {
  id: string;
  roleId: string;
  roleName: string;
  isActive: boolean;
  performanceRanges: PerformanceRange[];
  createdAt: string;
  updatedAt: string;
}

// Available welfare benefits that can be assigned
export const availableWelfareBenefits: WelfareBenefit[] = [
  // Monetary Benefits
  {
    id: 'bonus_monthly',
    name: 'Monthly Performance Bonus',
    description: 'Additional monthly bonus based on performance',
    type: 'monetary',
    value: '5000-50000',
    unit: 'THB',
    icon: 'DollarSign'
  },
  {
    id: 'commission_boost',
    name: 'Commission Boost',
    description: 'Increased commission percentage',
    type: 'monetary',
    value: '5-15',
    unit: '%',
    icon: 'TrendingUp'
  },
  {
    id: 'quarterly_bonus',
    name: 'Quarterly Achievement Bonus',
    description: 'Quarterly bonus for sustained performance',
    type: 'monetary',
    value: '10000-100000',
    unit: 'THB',
    icon: 'Award'
  },

  // Time Off Benefits
  {
    id: 'extra_vacation',
    name: 'Extra Vacation Days',
    description: 'Additional paid vacation days',
    type: 'time_off',
    value: '2-10',
    unit: 'days',
    icon: 'Calendar'
  },
  {
    id: 'flexible_hours',
    name: 'Flexible Working Hours',
    description: 'Flexible start and end times',
    type: 'time_off',
    value: 'Yes',
    unit: '',
    icon: 'Clock'
  },
  {
    id: 'work_from_home',
    name: 'Work From Home Days',
    description: 'Additional remote work days per month',
    type: 'time_off',
    value: '2-8',
    unit: 'days/month',
    icon: 'Home'
  },

  // Health Benefits
  {
    id: 'health_insurance_upgrade',
    name: 'Premium Health Insurance',
    description: 'Upgraded health insurance coverage',
    type: 'health',
    value: 'Premium',
    unit: 'plan',
    icon: 'Heart'
  },
  {
    id: 'gym_membership',
    name: 'Gym Membership',
    description: 'Paid gym or fitness center membership',
    type: 'health',
    value: '2000',
    unit: 'THB/month',
    icon: 'Activity'
  },
  {
    id: 'wellness_allowance',
    name: 'Wellness Allowance',
    description: 'Monthly allowance for wellness activities',
    type: 'health',
    value: '3000',
    unit: 'THB/month',
    icon: 'Leaf'
  },

  // Development Benefits
  {
    id: 'training_budget',
    name: 'Training & Development Budget',
    description: 'Annual budget for courses and training',
    type: 'development',
    value: '20000-100000',
    unit: 'THB/year',
    icon: 'BookOpen'
  },
  {
    id: 'conference_attendance',
    name: 'Conference Attendance',
    description: 'Paid attendance to industry conferences',
    type: 'development',
    value: '1-3',
    unit: 'events/year',
    icon: 'Users'
  },
  {
    id: 'mentorship_program',
    name: 'Executive Mentorship',
    description: 'Access to senior leadership mentorship',
    type: 'development',
    value: 'Yes',
    unit: '',
    icon: 'UserCheck'
  },

  // Recognition Benefits
  {
    id: 'employee_of_month',
    name: 'Employee of the Month',
    description: 'Recognition program with rewards',
    type: 'recognition',
    value: '5000',
    unit: 'THB + Recognition',
    icon: 'Star'
  },
  {
    id: 'public_recognition',
    name: 'Public Recognition',
    description: 'Company-wide recognition and announcement',
    type: 'recognition',
    value: 'Yes',
    unit: '',
    icon: 'Megaphone'
  },
  {
    id: 'achievement_certificate',
    name: 'Achievement Certificate',
    description: 'Official performance achievement certificate',
    type: 'recognition',
    value: 'Yes',
    unit: '',
    icon: 'Award'
  },

  // Other Benefits
  {
    id: 'parking_spot',
    name: 'Reserved Parking Spot',
    description: 'Reserved parking space at office',
    type: 'other',
    value: 'Yes',
    unit: '',
    icon: 'Car'
  },
  {
    id: 'meal_allowance',
    name: 'Meal Allowance',
    description: 'Daily meal allowance increase',
    type: 'other',
    value: '200-500',
    unit: 'THB/day',
    icon: 'Coffee'
  },
  {
    id: 'transport_allowance',
    name: 'Transport Allowance',
    description: 'Monthly transportation allowance',
    type: 'other',
    value: '3000-8000',
    unit: 'THB/month',
    icon: 'Car'
  }
];

// Default performance ranges
const defaultPerformanceRanges: PerformanceRange[] = [
  {
    id: 'excellent',
    name: 'Excellent',
    minScore: 90,
    maxScore: 100,
    color: 'bg-green-500',
    benefits: []
  },
  {
    id: 'good',
    name: 'Good',
    minScore: 75,
    maxScore: 89,
    color: 'bg-blue-500',
    benefits: []
  },
  {
    id: 'satisfactory',
    name: 'Satisfactory',
    minScore: 60,
    maxScore: 74,
    color: 'bg-yellow-500',
    benefits: []
  },
  {
    id: 'needs_improvement',
    name: 'Needs Improvement',
    minScore: 0,
    maxScore: 59,
    color: 'bg-red-500',
    benefits: []
  }
];

// Mock data for role welfare configurations
const mockRoleWelfareConfigs: RoleWelfareConfig[] = [
  {
    id: 'welfare_role_1',
    roleId: 'role_1',
    roleName: 'Sales Representative',
    isActive: true,
    performanceRanges: [
      {
        ...defaultPerformanceRanges[0],
        benefits: [
          availableWelfareBenefits.find(b => b.id === 'bonus_monthly')!,
          availableWelfareBenefits.find(b => b.id === 'extra_vacation')!,
          availableWelfareBenefits.find(b => b.id === 'employee_of_month')!
        ]
      },
      {
        ...defaultPerformanceRanges[1],
        benefits: [
          availableWelfareBenefits.find(b => b.id === 'commission_boost')!,
          availableWelfareBenefits.find(b => b.id === 'meal_allowance')!
        ]
      },
      {
        ...defaultPerformanceRanges[2],
        benefits: [
          availableWelfareBenefits.find(b => b.id === 'flexible_hours')!
        ]
      },
      {
        ...defaultPerformanceRanges[3],
        benefits: []
      }
    ],
    createdAt: '2024-01-10T10:00:00Z',
    updatedAt: '2024-01-15T14:30:00Z'
  },
  {
    id: 'welfare_role_2',
    roleId: 'role_2',
    roleName: 'Senior Sales Manager',
    isActive: true,
    performanceRanges: [
      {
        ...defaultPerformanceRanges[0],
        benefits: [
          availableWelfareBenefits.find(b => b.id === 'quarterly_bonus')!,
          availableWelfareBenefits.find(b => b.id === 'health_insurance_upgrade')!,
          availableWelfareBenefits.find(b => b.id === 'training_budget')!,
          availableWelfareBenefits.find(b => b.id === 'parking_spot')!
        ]
      },
      {
        ...defaultPerformanceRanges[1],
        benefits: [
          availableWelfareBenefits.find(b => b.id === 'bonus_monthly')!,
          availableWelfareBenefits.find(b => b.id === 'work_from_home')!,
          availableWelfareBenefits.find(b => b.id === 'gym_membership')!
        ]
      },
      {
        ...defaultPerformanceRanges[2],
        benefits: [
          availableWelfareBenefits.find(b => b.id === 'transport_allowance')!,
          availableWelfareBenefits.find(b => b.id === 'flexible_hours')!
        ]
      },
      {
        ...defaultPerformanceRanges[3],
        benefits: []
      }
    ],
    createdAt: '2024-01-08T09:15:00Z',
    updatedAt: '2024-01-14T16:20:00Z'
  }
];

export function useWelfareBenefitData() {
  const [roleWelfareConfigs, setRoleWelfareConfigs] = useState<RoleWelfareConfig[]>(mockRoleWelfareConfigs);
  const [customWelfareBenefits, setCustomWelfareBenefits] = useState<WelfareBenefit[]>([]);

  const createRoleWelfareConfig = (roleId: string, roleName: string): RoleWelfareConfig => {
    const newConfig: RoleWelfareConfig = {
      id: `welfare_${roleId}_${Date.now()}`,
      roleId,
      roleName,
      isActive: true,
      performanceRanges: defaultPerformanceRanges.map(range => ({ ...range, benefits: [] })),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setRoleWelfareConfigs(prev => [...prev, newConfig]);
    return newConfig;
  };

  const updateRoleWelfareConfig = (configId: string, updates: Partial<RoleWelfareConfig>) => {
    setRoleWelfareConfigs(prev => prev.map(config => 
      config.id === configId 
        ? { ...config, ...updates, updatedAt: new Date().toISOString() }
        : config
    ));
  };

  const deleteRoleWelfareConfig = (configId: string) => {
    setRoleWelfareConfigs(prev => prev.filter(config => config.id !== configId));
  };

  const toggleConfigActive = (configId: string) => {
    setRoleWelfareConfigs(prev => prev.map(config => 
      config.id === configId 
        ? { ...config, isActive: !config.isActive, updatedAt: new Date().toISOString() }
        : config
    ));
  };

  const addBenefitToRange = (configId: string, rangeId: string, benefitId: string) => {
    const benefit = availableWelfareBenefits.find(b => b.id === benefitId);
    if (!benefit) return;

    setRoleWelfareConfigs(prev => prev.map(config => {
      if (config.id !== configId) return config;
      
      return {
        ...config,
        performanceRanges: config.performanceRanges.map(range => {
          if (range.id !== rangeId) return range;
          
          // Check if benefit already exists
          if (range.benefits.some(b => b.id === benefitId)) return range;
          
          return {
            ...range,
            benefits: [...range.benefits, benefit]
          };
        }),
        updatedAt: new Date().toISOString()
      };
    }));
  };

  const removeBenefitFromRange = (configId: string, rangeId: string, benefitId: string) => {
    setRoleWelfareConfigs(prev => prev.map(config => {
      if (config.id !== configId) return config;
      
      return {
        ...config,
        performanceRanges: config.performanceRanges.map(range => {
          if (range.id !== rangeId) return range;
          
          return {
            ...range,
            benefits: range.benefits.filter(b => b.id !== benefitId)
          };
        }),
        updatedAt: new Date().toISOString()
      };
    }));
  };

  const getConfigByRoleId = (roleId: string) => {
    return roleWelfareConfigs.find(config => config.roleId === roleId);
  };

  // Create custom welfare benefit
  const createWelfareBenefit = (benefitData: Omit<WelfareBenefit, 'id'>): WelfareBenefit => {
    const newBenefit: WelfareBenefit = {
      ...benefitData,
      id: `custom_benefit_${Date.now()}`
    };
    
    setCustomWelfareBenefits(prev => [...prev, newBenefit]);
    return newBenefit;
  };

  // Update custom welfare benefit
  const updateWelfareBenefit = (benefitId: string, updates: Partial<WelfareBenefit>) => {
    setCustomWelfareBenefits(prev => prev.map(benefit => 
      benefit.id === benefitId ? { ...benefit, ...updates } : benefit
    ));
  };

  // Delete custom welfare benefit
  const deleteWelfareBenefit = (benefitId: string) => {
    setCustomWelfareBenefits(prev => prev.filter(benefit => benefit.id !== benefitId));
  };

  // Update performance ranges for a role config
  const updatePerformanceRanges = (configId: string, ranges: PerformanceRange[]) => {
    setRoleWelfareConfigs(prev => prev.map(config => 
      config.id === configId 
        ? { ...config, performanceRanges: ranges, updatedAt: new Date().toISOString() }
        : config
    ));
  };

  // Get all available benefits (default + custom)
  const getAllAvailableBenefits = (): WelfareBenefit[] => {
    return [...availableWelfareBenefits, ...customWelfareBenefits];
  };

  const getWelfareStats = () => {
    const totalConfigs = roleWelfareConfigs.length;
    const activeConfigs = roleWelfareConfigs.filter(c => c.isActive).length;
    const totalBenefits = roleWelfareConfigs.reduce((sum, config) => 
      sum + config.performanceRanges.reduce((rangeSum, range) => rangeSum + range.benefits.length, 0), 0
    );
    
    const allBenefits = getAllAvailableBenefits();
    const benefitsByType = allBenefits.reduce((acc, benefit) => {
      acc[benefit.type] = (acc[benefit.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalConfigs,
      activeConfigs,
      totalBenefits,
      availableBenefits: allBenefits.length,
      customBenefits: customWelfareBenefits.length,
      benefitsByType
    };
  };

  return {
    roleWelfareConfigs,
    availableWelfareBenefits,
    customWelfareBenefits,
    defaultPerformanceRanges,
    createRoleWelfareConfig,
    updateRoleWelfareConfig,
    deleteRoleWelfareConfig,
    toggleConfigActive,
    addBenefitToRange,
    removeBenefitFromRange,
    getConfigByRoleId,
    createWelfareBenefit,
    updateWelfareBenefit,
    deleteWelfareBenefit,
    updatePerformanceRanges,
    getAllAvailableBenefits,
    getWelfareStats
  };
}
