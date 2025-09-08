import { useState } from 'react';
import { useKPIMetricsData } from './useKPIMetricsData';

export interface KPIMetric {
  id: string;
  name: string;
  description: string;
  category: 'sales' | 'listings' | 'leads' | 'client' | 'performance' | 'revenue' | 'activity';
  unit: string;
  targetValue?: number;
  currentValue?: number;
  isActive: boolean;
}

export interface RoleKPIConfig {
  id: string;
  roleId: string;
  roleName: string;
  kpiMetrics: KPIMetric[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Available KPI metrics that can be assigned to roles
export const availableKPIMetrics: Omit<KPIMetric, 'targetValue' | 'currentValue' | 'isActive'>[] = [
  // Sales KPIs
  {
    id: 'total_sales',
    name: 'Total Sales',
    description: 'Total sales amount achieved',
    category: 'sales',
    unit: 'THB'
  },
  {
    id: 'sales_volume',
    name: 'Sales Volume',
    description: 'Number of sales transactions completed',
    category: 'sales',
    unit: 'count'
  },
  {
    id: 'conversion_rate',
    name: 'Conversion Rate',
    description: 'Percentage of leads converted to sales',
    category: 'sales',
    unit: '%'
  },
  {
    id: 'average_deal_size',
    name: 'Average Deal Size',
    description: 'Average value per sale transaction',
    category: 'sales',
    unit: 'THB'
  },
  {
    id: 'sales_target_achievement',
    name: 'Sales Target Achievement',
    description: 'Percentage of sales target achieved',
    category: 'sales',
    unit: '%'
  },

  // Listings KPIs
  {
    id: 'new_listings',
    name: 'New Listings',
    description: 'Number of new property listings added',
    category: 'listings',
    unit: 'count'
  },
  {
    id: 'active_listings',
    name: 'Active Listings',
    description: 'Number of currently active listings',
    category: 'listings',
    unit: 'count'
  },
  {
    id: 'listing_conversion',
    name: 'Listing Conversion Rate',
    description: 'Percentage of listings that result in sales',
    category: 'listings',
    unit: '%'
  },
  {
    id: 'listing_quality_score',
    name: 'Listing Quality Score',
    description: 'Average quality score of listings',
    category: 'listings',
    unit: 'score'
  },
  {
    id: 'days_on_market',
    name: 'Average Days on Market',
    description: 'Average time listings stay active',
    category: 'listings',
    unit: 'days'
  },

  // Leads KPIs
  {
    id: 'new_leads',
    name: 'New Leads',
    description: 'Number of new leads generated',
    category: 'leads',
    unit: 'count'
  },
  {
    id: 'qualified_leads',
    name: 'Qualified Leads',
    description: 'Number of qualified leads',
    category: 'leads',
    unit: 'count'
  },
  {
    id: 'lead_response_time',
    name: 'Lead Response Time',
    description: 'Average time to respond to new leads',
    category: 'leads',
    unit: 'hours'
  },
  {
    id: 'lead_follow_up_rate',
    name: 'Lead Follow-up Rate',
    description: 'Percentage of leads followed up within 24h',
    category: 'leads',
    unit: '%'
  },
  {
    id: 'lead_to_appointment',
    name: 'Lead to Appointment Rate',
    description: 'Percentage of leads converted to appointments',
    category: 'leads',
    unit: '%'
  },

  // Client KPIs
  {
    id: 'client_satisfaction',
    name: 'Client Satisfaction Score',
    description: 'Average client satisfaction rating',
    category: 'client',
    unit: 'score'
  },
  {
    id: 'client_retention',
    name: 'Client Retention Rate',
    description: 'Percentage of clients retained',
    category: 'client',
    unit: '%'
  },
  {
    id: 'repeat_business',
    name: 'Repeat Business Rate',
    description: 'Percentage of repeat clients',
    category: 'client',
    unit: '%'
  },
  {
    id: 'referral_rate',
    name: 'Referral Rate',
    description: 'Percentage of business from referrals',
    category: 'client',
    unit: '%'
  },
  {
    id: 'client_meetings',
    name: 'Client Meetings',
    description: 'Number of client meetings conducted',
    category: 'client',
    unit: 'count'
  },

  // Performance KPIs
  {
    id: 'call_volume',
    name: 'Call Volume',
    description: 'Number of calls made per day',
    category: 'performance',
    unit: 'count'
  },
  {
    id: 'email_response_rate',
    name: 'Email Response Rate',
    description: 'Percentage of emails that receive responses',
    category: 'performance',
    unit: '%'
  },
  {
    id: 'task_completion_rate',
    name: 'Task Completion Rate',
    description: 'Percentage of assigned tasks completed on time',
    category: 'performance',
    unit: '%'
  },
  {
    id: 'productivity_score',
    name: 'Productivity Score',
    description: 'Overall productivity rating',
    category: 'performance',
    unit: 'score'
  },
  {
    id: 'attendance_rate',
    name: 'Attendance Rate',
    description: 'Percentage of scheduled work days attended',
    category: 'performance',
    unit: '%'
  },

  // Revenue KPIs
  {
    id: 'commission_earned',
    name: 'Commission Earned',
    description: 'Total commission earned',
    category: 'revenue',
    unit: 'THB'
  },
  {
    id: 'revenue_per_client',
    name: 'Revenue per Client',
    description: 'Average revenue generated per client',
    category: 'revenue',
    unit: 'THB'
  },
  {
    id: 'monthly_recurring_revenue',
    name: 'Monthly Recurring Revenue',
    description: 'Predictable monthly revenue',
    category: 'revenue',
    unit: 'THB'
  },
  {
    id: 'profit_margin',
    name: 'Profit Margin',
    description: 'Percentage profit on sales',
    category: 'revenue',
    unit: '%'
  },

  // Activity KPIs
  {
    id: 'property_viewings',
    name: 'Property Viewings',
    description: 'Number of property viewings conducted',
    category: 'activity',
    unit: 'count'
  },
  {
    id: 'market_research_reports',
    name: 'Market Research Reports',
    description: 'Number of market research reports completed',
    category: 'activity',
    unit: 'count'
  },
  {
    id: 'networking_events',
    name: 'Networking Events',
    description: 'Number of networking events attended',
    category: 'activity',
    unit: 'count'
  },
  {
    id: 'training_hours',
    name: 'Training Hours',
    description: 'Hours spent on professional development',
    category: 'activity',
    unit: 'hours'
  }
];

// Mock data for role KPI configurations
const mockRoleKPIConfigs: RoleKPIConfig[] = [
  {
    id: 'kpi_config_role_1',
    roleId: 'role-1',
    roleName: 'Sales Representative',
    isActive: true,
    kpiMetrics: [
      {
        ...availableKPIMetrics.find(m => m.id === 'total_sales')!,
        targetValue: 500000,
        currentValue: 425000,
        isActive: true
      },
      {
        ...availableKPIMetrics.find(m => m.id === 'conversion_rate')!,
        targetValue: 15,
        currentValue: 12.5,
        isActive: true
      },
      {
        ...availableKPIMetrics.find(m => m.id === 'new_leads')!,
        targetValue: 50,
        currentValue: 45,
        isActive: true
      },
      {
        ...availableKPIMetrics.find(m => m.id === 'client_satisfaction')!,
        targetValue: 4.5,
        currentValue: 4.2,
        isActive: true
      },
      {
        ...availableKPIMetrics.find(m => m.id === 'call_volume')!,
        targetValue: 25,
        currentValue: 28,
        isActive: true
      }
    ],
    createdAt: '2024-01-10T10:00:00Z',
    updatedAt: '2024-01-15T14:30:00Z'
  },
  {
    id: 'kpi_config_role_2',
    roleId: 'role-2',
    roleName: 'Senior Sales Manager',
    isActive: true,
    kpiMetrics: [
      {
        ...availableKPIMetrics.find(m => m.id === 'total_sales')!,
        targetValue: 2000000,
        currentValue: 1850000,
        isActive: true
      },
      {
        ...availableKPIMetrics.find(m => m.id === 'sales_target_achievement')!,
        targetValue: 100,
        currentValue: 95,
        isActive: true
      },
      {
        ...availableKPIMetrics.find(m => m.id === 'new_listings')!,
        targetValue: 20,
        currentValue: 18,
        isActive: true
      },
      {
        ...availableKPIMetrics.find(m => m.id === 'productivity_score')!,
        targetValue: 85,
        currentValue: 88,
        isActive: true
      }
    ],
    createdAt: '2024-01-08T09:15:00Z',
    updatedAt: '2024-01-14T16:20:00Z'
  }
];

export function useRoleKPIData() {
  const [roleKPIConfigs, setRoleKPIConfigs] = useState<RoleKPIConfig[]>(mockRoleKPIConfigs);
  const { getActiveMetrics } = useKPIMetricsData();

  const createRoleKPIConfig = (roleId: string, roleName: string): RoleKPIConfig => {
    const newConfig: RoleKPIConfig = {
      id: `kpi_config_${roleId}_${Date.now()}`,
      roleId,
      roleName,
      kpiMetrics: [],
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setRoleKPIConfigs(prev => [...prev, newConfig]);
    return newConfig;
  };

  const updateRoleKPIConfig = (configId: string, updates: Partial<RoleKPIConfig>) => {
    setRoleKPIConfigs(prev => prev.map(config => 
      config.id === configId 
        ? { ...config, ...updates, updatedAt: new Date().toISOString() }
        : config
    ));
  };

  const deleteRoleKPIConfig = (configId: string) => {
    setRoleKPIConfigs(prev => prev.filter(config => config.id !== configId));
  };

  const addKPIToRole = (configId: string, kpiId: string, targetValue: number) => {
    const kpiMetric = availableKPIMetrics.find(m => m.id === kpiId);
    if (!kpiMetric) return;

    const newKPI: KPIMetric = {
      ...kpiMetric,
      targetValue,
      currentValue: 0,
      isActive: true
    };

    setRoleKPIConfigs(prev => prev.map(config => {
      if (config.id !== configId) return config;
      
      // Check if KPI already exists
      if (config.kpiMetrics.some(k => k.id === kpiId)) return config;
      
      return {
        ...config,
        kpiMetrics: [...config.kpiMetrics, newKPI],
        updatedAt: new Date().toISOString()
      };
    }));
  };

  const removeKPIFromRole = (configId: string, kpiId: string) => {
    setRoleKPIConfigs(prev => prev.map(config => {
      if (config.id !== configId) return config;
      
      return {
        ...config,
        kpiMetrics: config.kpiMetrics.filter(k => k.id !== kpiId),
        updatedAt: new Date().toISOString()
      };
    }));
  };

  const updateKPITarget = (configId: string, kpiId: string, targetValue: number) => {
    setRoleKPIConfigs(prev => prev.map(config => {
      if (config.id !== configId) return config;
      
      return {
        ...config,
        kpiMetrics: config.kpiMetrics.map(kpi => 
          kpi.id === kpiId ? { ...kpi, targetValue } : kpi
        ),
        updatedAt: new Date().toISOString()
      };
    }));
  };

  const toggleKPIActive = (configId: string, kpiId: string) => {
    setRoleKPIConfigs(prev => prev.map(config => {
      if (config.id !== configId) return config;
      
      return {
        ...config,
        kpiMetrics: config.kpiMetrics.map(kpi => 
          kpi.id === kpiId ? { ...kpi, isActive: !kpi.isActive } : kpi
        ),
        updatedAt: new Date().toISOString()
      };
    }));
  };

  const getConfigByRoleId = (roleId: string) => {
    return roleKPIConfigs.find(config => config.roleId === roleId);
  };

  const getAvailableKPIsForRole = (configId: string) => {
    const config = roleKPIConfigs.find(c => c.id === configId);
    const activeMetrics = getActiveMetrics();
    
    if (!config) return activeMetrics;
    
    const usedKPIIds = config.kpiMetrics.map(k => k.id);
    return activeMetrics.filter(kpi => !usedKPIIds.includes(kpi.id));
  };

  const getKPIStats = () => {
    const totalConfigs = roleKPIConfigs.length;
    const activeConfigs = roleKPIConfigs.filter(c => c.isActive).length;
    const totalKPIs = roleKPIConfigs.reduce((sum, config) => sum + config.kpiMetrics.length, 0);
    const activeKPIs = roleKPIConfigs.reduce((sum, config) => 
      sum + config.kpiMetrics.filter(k => k.isActive).length, 0
    );
    
    const activeMetrics = getActiveMetrics();
    const kpisByCategory = activeMetrics.reduce((acc, kpi) => {
      acc[kpi.category] = (acc[kpi.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalConfigs,
      activeConfigs,
      totalKPIs,
      activeKPIs,
      availableKPIs: activeMetrics.length,
      kpisByCategory
    };
  };

  return {
    roleKPIConfigs,
    availableKPIMetrics: getActiveMetrics(),
    createRoleKPIConfig,
    updateRoleKPIConfig,
    deleteRoleKPIConfig,
    addKPIToRole,
    removeKPIFromRole,
    updateKPITarget,
    toggleKPIActive,
    getConfigByRoleId,
    getAvailableKPIsForRole,
    getKPIStats
  };
}
