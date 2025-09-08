import { useState } from 'react';

export interface KPIMetricDefinition {
  id: string;
  name: string;
  description: string;
  category: 'sales' | 'listings' | 'leads' | 'client' | 'performance' | 'revenue' | 'activity';
  unit: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateKPIMetricData {
  name: string;
  description: string;
  category: 'sales' | 'listings' | 'leads' | 'client' | 'performance' | 'revenue' | 'activity';
  unit: string;
}

// This is the master list of all available KPI metrics that can be assigned to roles
const defaultKPIMetrics: KPIMetricDefinition[] = [
  // Sales KPIs
  {
    id: 'total_sales',
    name: 'Total Sales',
    description: 'Total sales amount achieved',
    category: 'sales',
    unit: 'THB',
    isActive: true,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: 'sales_volume',
    name: 'Sales Volume',
    description: 'Number of sales transactions completed',
    category: 'sales',
    unit: 'count',
    isActive: true,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: 'conversion_rate',
    name: 'Conversion Rate',
    description: 'Percentage of leads converted to sales',
    category: 'sales',
    unit: '%',
    isActive: true,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: 'average_deal_size',
    name: 'Average Deal Size',
    description: 'Average value per sale transaction',
    category: 'sales',
    unit: 'THB',
    isActive: true,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },

  // Listings KPIs
  {
    id: 'new_listings',
    name: 'New Listings',
    description: 'Number of new property listings added',
    category: 'listings',
    unit: 'count',
    isActive: true,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: 'active_listings',
    name: 'Active Listings',
    description: 'Number of currently active listings',
    category: 'listings',
    unit: 'count',
    isActive: true,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: 'listing_conversion',
    name: 'Listing Conversion Rate',
    description: 'Percentage of listings that result in sales',
    category: 'listings',
    unit: '%',
    isActive: true,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },

  // Leads KPIs
  {
    id: 'new_leads',
    name: 'New Leads',
    description: 'Number of new leads generated',
    category: 'leads',
    unit: 'count',
    isActive: true,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: 'qualified_leads',
    name: 'Qualified Leads',
    description: 'Number of qualified leads',
    category: 'leads',
    unit: 'count',
    isActive: true,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: 'lead_response_time',
    name: 'Lead Response Time',
    description: 'Average time to respond to new leads',
    category: 'leads',
    unit: 'hours',
    isActive: true,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },

  // Client KPIs
  {
    id: 'client_satisfaction',
    name: 'Client Satisfaction Score',
    description: 'Average client satisfaction rating',
    category: 'client',
    unit: 'score',
    isActive: true,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: 'client_retention',
    name: 'Client Retention Rate',
    description: 'Percentage of clients retained',
    category: 'client',
    unit: '%',
    isActive: true,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },

  // Performance KPIs
  {
    id: 'call_volume',
    name: 'Call Volume',
    description: 'Number of calls made per day',
    category: 'performance',
    unit: 'count',
    isActive: true,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: 'productivity_score',
    name: 'Productivity Score',
    description: 'Overall productivity rating',
    category: 'performance',
    unit: 'score',
    isActive: true,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },

  // Revenue KPIs
  {
    id: 'commission_earned',
    name: 'Commission Earned',
    description: 'Total commission earned',
    category: 'revenue',
    unit: 'THB',
    isActive: true,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },

  // Activity KPIs
  {
    id: 'property_viewings',
    name: 'Property Viewings',
    description: 'Number of property viewings conducted',
    category: 'activity',
    unit: 'count',
    isActive: true,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  }
];

export function useKPIMetricsData() {
  const [kpiMetrics, setKPIMetrics] = useState<KPIMetricDefinition[]>(defaultKPIMetrics);

  const createKPIMetric = (data: CreateKPIMetricData): KPIMetricDefinition => {
    const newMetric: KPIMetricDefinition = {
      id: `kpi_${Date.now()}`,
      name: data.name,
      description: data.description,
      category: data.category,
      unit: data.unit,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setKPIMetrics(prev => [...prev, newMetric]);
    return newMetric;
  };

  const updateKPIMetric = (id: string, updates: Partial<KPIMetricDefinition>) => {
    setKPIMetrics(prev => prev.map(metric => 
      metric.id === id 
        ? { ...metric, ...updates, updatedAt: new Date().toISOString() }
        : metric
    ));
  };

  const toggleKPIMetricActive = (id: string) => {
    setKPIMetrics(prev => prev.map(metric => 
      metric.id === id 
        ? { ...metric, isActive: !metric.isActive, updatedAt: new Date().toISOString() }
        : metric
    ));
  };

  const deleteKPIMetric = (id: string) => {
    setKPIMetrics(prev => prev.filter(metric => metric.id !== id));
  };

  const getActiveMetrics = () => {
    return kpiMetrics.filter(metric => metric.isActive);
  };

  const getMetricsByCategory = (category: string) => {
    return kpiMetrics.filter(metric => metric.category === category);
  };

  const getKPIMetricsStats = () => {
    const totalMetrics = kpiMetrics.length;
    const activeMetrics = kpiMetrics.filter(m => m.isActive).length;
    const inactiveMetrics = totalMetrics - activeMetrics;
    
    const metricsByCategory = kpiMetrics.reduce((acc, metric) => {
      acc[metric.category] = (acc[metric.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalMetrics,
      activeMetrics,
      inactiveMetrics,
      metricsByCategory
    };
  };

  return {
    kpiMetrics,
    createKPIMetric,
    updateKPIMetric,
    toggleKPIMetricActive,
    deleteKPIMetric,
    getActiveMetrics,
    getMetricsByCategory,
    getKPIMetricsStats
  };
}

