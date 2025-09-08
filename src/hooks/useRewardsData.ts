import { useState } from 'react';

export type RewardCategory = 'commission' | 'recognition' | 'training' | 'marketing' | 'time-off' | 'equipment' | 'experience' | 'leadership' | 'custom';
export type RewardTier = 'normal' | 'premium' | 'exceptional';
export type SettingType = 'maintain' | 'boost' | 'supercharge';

export interface RewardDefinition {
  id: string;
  name: string;
  description: string;
  category: RewardCategory;
  tier: RewardTier;
  settingTypes: SettingType[]; // Which setting types can use this reward
  isActive: boolean;
  estimatedValue?: string; // Optional monetary value
  createdAt: string;
  updatedAt: string;
}

export interface CreateRewardData {
  name: string;
  description: string;
  category: RewardCategory;
  tier: RewardTier;
  settingTypes: SettingType[];
  estimatedValue?: string;
}

// Default rewards that come with the system
const defaultRewards: RewardDefinition[] = [
  // Normal Tier - Maintain Level
  {
    id: 'basic_bonus_commission',
    name: 'Basic Bonus Commission',
    description: '2% bonus commission on next deal',
    category: 'commission',
    tier: 'normal',
    settingTypes: ['maintain'],
    isActive: true,
    estimatedValue: '2% of next deal',
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: 'team_recognition',
    name: 'Team Recognition',
    description: 'Recognition in team meeting',
    category: 'recognition',
    tier: 'normal',
    settingTypes: ['maintain'],
    isActive: true,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: 'online_course_access',
    name: 'Online Course Access',
    description: 'Access to one online training course',
    category: 'training',
    tier: 'normal',
    settingTypes: ['maintain'],
    isActive: true,
    estimatedValue: '$50-100',
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },

  // Premium Tier - Boost Level
  {
    id: 'enhanced_bonus_commission',
    name: 'Enhanced Bonus Commission',
    description: '5% bonus commission on next deal',
    category: 'commission',
    tier: 'premium',
    settingTypes: ['boost'],
    isActive: true,
    estimatedValue: '5% of next deal',
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: 'marketing_budget',
    name: 'Marketing Budget',
    description: '$500 additional marketing budget',
    category: 'marketing',
    tier: 'premium',
    settingTypes: ['boost'],
    isActive: true,
    estimatedValue: '$500',
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: 'extra_day_off',
    name: 'Extra Day Off',
    description: 'One additional paid day off',
    category: 'time-off',
    tier: 'premium',
    settingTypes: ['boost'],
    isActive: true,
    estimatedValue: '1 day salary',
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: 'company_recognition',
    name: 'Company Recognition',
    description: 'Recognition in company newsletter',
    category: 'recognition',
    tier: 'premium',
    settingTypes: ['boost'],
    isActive: true,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },

  // Exceptional Tier - Supercharge Level
  {
    id: 'premium_bonus_commission',
    name: 'Premium Bonus Commission',
    description: '10% bonus commission on next deal',
    category: 'commission',
    tier: 'exceptional',
    settingTypes: ['supercharge'],
    isActive: true,
    estimatedValue: '10% of next deal',
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: 'team_retreat',
    name: 'Team Retreat',
    description: 'Invitation to exclusive team retreat',
    category: 'experience',
    tier: 'exceptional',
    settingTypes: ['supercharge'],
    isActive: true,
    estimatedValue: '$1,000-2,000',
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: 'equipment_upgrade',
    name: 'Equipment Upgrade',
    description: 'New equipment or tech upgrade of your choice',
    category: 'equipment',
    tier: 'exceptional',
    settingTypes: ['supercharge'],
    isActive: true,
    estimatedValue: '$500-1,500',
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: 'leadership_opportunity',
    name: 'Leadership Opportunity',
    description: 'Opportunity to lead a special project',
    category: 'leadership',
    tier: 'exceptional',
    settingTypes: ['supercharge'],
    isActive: true,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: 'premium_marketing_package',
    name: 'Premium Marketing Package',
    description: '$2,000 additional marketing budget with professional support',
    category: 'marketing',
    tier: 'exceptional',
    settingTypes: ['supercharge'],
    isActive: true,
    estimatedValue: '$2,000+',
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },

  // Multi-tier rewards
  {
    id: 'flexible_work_arrangement',
    name: 'Flexible Work Arrangement',
    description: 'Flexible working hours or remote work options',
    category: 'time-off',
    tier: 'premium',
    settingTypes: ['boost', 'supercharge'],
    isActive: true,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: 'professional_development',
    name: 'Professional Development',
    description: 'Conference attendance or professional certification',
    category: 'training',
    tier: 'exceptional',
    settingTypes: ['boost', 'supercharge'],
    isActive: true,
    estimatedValue: '$500-2,000',
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  }
];

export function useRewardsData() {
  const [rewards, setRewards] = useState<RewardDefinition[]>(defaultRewards);

  const createReward = (data: CreateRewardData): RewardDefinition => {
    const newReward: RewardDefinition = {
      id: `reward_${Date.now()}`,
      name: data.name,
      description: data.description,
      category: data.category,
      tier: data.tier,
      settingTypes: data.settingTypes,
      estimatedValue: data.estimatedValue,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setRewards(prev => [...prev, newReward]);
    return newReward;
  };

  const updateReward = (id: string, updates: Partial<RewardDefinition>) => {
    setRewards(prev => prev.map(reward => 
      reward.id === id 
        ? { ...reward, ...updates, updatedAt: new Date().toISOString() }
        : reward
    ));
  };

  const toggleRewardActive = (id: string) => {
    setRewards(prev => prev.map(reward => 
      reward.id === id 
        ? { ...reward, isActive: !reward.isActive, updatedAt: new Date().toISOString() }
        : reward
    ));
  };

  const deleteReward = (id: string) => {
    setRewards(prev => prev.filter(reward => reward.id !== id));
  };

  const getActiveRewards = () => {
    return rewards.filter(reward => reward.isActive);
  };

  const getRewardsByTier = (tier: RewardTier) => {
    return rewards.filter(reward => reward.tier === tier && reward.isActive);
  };

  const getRewardsBySettingType = (settingType: SettingType) => {
    return rewards.filter(reward => 
      reward.settingTypes.includes(settingType) && reward.isActive
    );
  };

  const getRewardsByCategory = (category: RewardCategory) => {
    return rewards.filter(reward => reward.category === category);
  };

  const getRewardsStats = () => {
    const totalRewards = rewards.length;
    const activeRewards = rewards.filter(r => r.isActive).length;
    const inactiveRewards = totalRewards - activeRewards;
    
    const rewardsByTier = rewards.reduce((acc, reward) => {
      acc[reward.tier] = (acc[reward.tier] || 0) + 1;
      return acc;
    }, {} as Record<RewardTier, number>);

    const rewardsByCategory = rewards.reduce((acc, reward) => {
      acc[reward.category] = (acc[reward.category] || 0) + 1;
      return acc;
    }, {} as Record<RewardCategory, number>);

    const rewardsBySettingType = rewards.reduce((acc, reward) => {
      reward.settingTypes.forEach(settingType => {
        acc[settingType] = (acc[settingType] || 0) + 1;
      });
      return acc;
    }, {} as Record<SettingType, number>);

    return {
      totalRewards,
      activeRewards,
      inactiveRewards,
      rewardsByTier,
      rewardsByCategory,
      rewardsBySettingType
    };
  };

  return {
    rewards,
    createReward,
    updateReward,
    toggleRewardActive,
    deleteReward,
    getActiveRewards,
    getRewardsByTier,
    getRewardsBySettingType,
    getRewardsByCategory,
    getRewardsStats
  };
}

