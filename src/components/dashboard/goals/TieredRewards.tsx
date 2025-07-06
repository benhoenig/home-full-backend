import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Gift, DollarSign, Briefcase, Star, Award, Zap, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock data for tiered rewards
const mockRewards = {
  maintain: [
    { 
      id: 'bonus-1', 
      name: 'Basic Bonus Commission', 
      icon: <DollarSign className="h-5 w-5 text-green-500" />,
      description: '2% bonus commission on next deal',
      tier: 'normal'
    },
    { 
      id: 'recognition-1', 
      name: 'Team Recognition', 
      icon: <Trophy className="h-5 w-5 text-amber-500" />,
      description: 'Recognition in team meeting',
      tier: 'normal'
    },
    { 
      id: 'training-1', 
      name: 'Online Course Access', 
      icon: <Star className="h-5 w-5 text-blue-500" />,
      description: 'Access to one online training course',
      tier: 'normal'
    },
  ],
  boost: [
    { 
      id: 'bonus-2', 
      name: 'Enhanced Bonus Commission', 
      icon: <DollarSign className="h-5 w-5 text-green-500" />,
      description: '5% bonus commission on next deal',
      tier: 'premium'
    },
    { 
      id: 'marketing-1', 
      name: 'Marketing Budget', 
      icon: <Briefcase className="h-5 w-5 text-blue-500" />,
      description: '$500 additional marketing budget',
      tier: 'premium'
    },
    { 
      id: 'day-off', 
      name: 'Extra Day Off', 
      icon: <Gift className="h-5 w-5 text-purple-500" />,
      description: 'One additional paid day off',
      tier: 'premium'
    },
    { 
      id: 'recognition-2', 
      name: 'Company Recognition', 
      icon: <Award className="h-5 w-5 text-amber-500" />,
      description: 'Recognition in company newsletter',
      tier: 'premium'
    },
  ],
  supercharge: [
    { 
      id: 'bonus-3', 
      name: 'Premium Bonus Commission', 
      icon: <DollarSign className="h-5 w-5 text-green-500" />,
      description: '10% bonus commission on next deal',
      tier: 'exceptional'
    },
    { 
      id: 'retreat', 
      name: 'Team Retreat', 
      icon: <Gift className="h-5 w-5 text-purple-500" />,
      description: 'Invitation to exclusive team retreat',
      tier: 'exceptional'
    },
    { 
      id: 'equipment', 
      name: 'Equipment Upgrade', 
      icon: <Zap className="h-5 w-5 text-red-500" />,
      description: 'New equipment or tech upgrade of your choice',
      tier: 'exceptional'
    },
    { 
      id: 'leadership', 
      name: 'Leadership Opportunity', 
      icon: <Shield className="h-5 w-5 text-indigo-500" />,
      description: 'Opportunity to lead a special project',
      tier: 'exceptional'
    },
    { 
      id: 'marketing-2', 
      name: 'Premium Marketing Package', 
      icon: <Briefcase className="h-5 w-5 text-blue-500" />,
      description: '$2,000 additional marketing budget with professional support',
      tier: 'exceptional'
    },
  ]
};

// Helper function to get badge color based on tier
const getBadgeVariant = (tier: string) => {
  switch (tier) {
    case 'normal': return 'outline';
    case 'premium': return 'secondary';
    case 'exceptional': return 'default';
    default: return 'outline';
  }
};

// Helper function to get tier label
const getTierLabel = (tier: string) => {
  switch (tier) {
    case 'normal': return 'Normal';
    case 'premium': return 'Premium';
    case 'exceptional': return 'Exceptional';
    default: return '';
  }
};

type TieredRewardsProps = {
  settingType: string;
  onRewardSelect: (reward: string) => void;
};

const TieredRewards: React.FC<TieredRewardsProps> = ({ 
  settingType,
  onRewardSelect
}) => {
  const [selectedRewardId, setSelectedRewardId] = useState<string | null>(null);
  
  // Get rewards based on setting type
  const rewards = mockRewards[settingType as keyof typeof mockRewards] || mockRewards.maintain;
  
  // Handle reward selection
  const handleRewardSelect = (rewardId: string, rewardName: string) => {
    setSelectedRewardId(rewardId);
    onRewardSelect(rewardName);
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Available Rewards</h3>
        <Badge 
          variant={settingType === 'maintain' ? 'outline' : settingType === 'boost' ? 'secondary' : 'default'}
          className="capitalize"
        >
          {settingType} Level
        </Badge>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {rewards.map((reward) => (
          <Card 
            key={reward.id} 
            className={cn(
              "cursor-pointer hover:border-primary transition-colors",
              selectedRewardId === reward.id ? "border-primary bg-primary/5" : ""
            )}
            onClick={() => handleRewardSelect(reward.id, reward.name)}
          >
            <CardHeader className="pb-2 pt-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {reward.icon}
                  <CardTitle className="text-base">{reward.name}</CardTitle>
                </div>
                <Badge variant={getBadgeVariant(reward.tier)}>
                  {getTierLabel(reward.tier)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pb-3 pt-0">
              <CardDescription>{reward.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {settingType === 'supercharge' && (
        <Card className="bg-amber-50 border-amber-200">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-amber-500" />
              <CardTitle className="text-base">Reward Betting Available</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-amber-800">
              With Supercharge goals, you can bet on your success! Double your reward if you achieve the goal, 
              but face a penalty if you miss. This option will be available after selecting a reward.
            </CardDescription>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TieredRewards; 