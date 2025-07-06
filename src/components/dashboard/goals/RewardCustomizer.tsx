import React, { useState } from 'react';
import { 
  Card, 
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from '@/components/ui/card';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Trophy, Gift, DollarSign, Briefcase, Star, Award } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';

// Predefined reward options
const predefinedRewards = [
  { 
    id: 'bonus-commission', 
    name: 'Bonus Commission', 
    icon: <DollarSign className="h-5 w-5 text-green-500" />,
    description: 'Earn additional commission percentage upon completion'
  },
  { 
    id: 'marketing-budget', 
    name: 'Marketing Budget', 
    icon: <Briefcase className="h-5 w-5 text-blue-500" />,
    description: 'Get additional marketing budget for your listings'
  },
  { 
    id: 'team-retreat', 
    name: 'Team Retreat', 
    icon: <Gift className="h-5 w-5 text-purple-500" />,
    description: 'Earn a team retreat or outing'
  },
  { 
    id: 'recognition', 
    name: 'Recognition Award', 
    icon: <Trophy className="h-5 w-5 text-amber-500" />,
    description: 'Receive recognition and an award at company meetings'
  },
  { 
    id: 'custom', 
    name: 'Custom Reward', 
    icon: <Star className="h-5 w-5 text-pink-500" />,
    description: 'Define your own custom reward'
  },
];

// Betting options for higher risk/reward
const bettingOptions = [
  { id: 'no-bet', name: 'Standard Reward', risk: 'None', multiplier: 1 },
  { id: 'low-bet', name: 'Small Bet', risk: 'Low', multiplier: 1.5 },
  { id: 'medium-bet', name: 'Medium Bet', risk: 'Medium', multiplier: 2 },
  { id: 'high-bet', name: 'High Bet', risk: 'High', multiplier: 3 },
];

type RewardCustomizerProps = {
  initialReward?: string;
  onRewardChange: (reward: string) => void;
};

const RewardCustomizer: React.FC<RewardCustomizerProps> = ({ 
  initialReward = '',
  onRewardChange
}) => {
  const [selectedRewardType, setSelectedRewardType] = useState<string>('bonus-commission');
  const [customReward, setCustomReward] = useState<string>('');
  const [bettingOption, setBettingOption] = useState<string>('no-bet');
  const [bonusPercentage, setBonusPercentage] = useState<number>(3);
  
  // Find the selected predefined reward
  const selectedReward = predefinedRewards.find(r => r.id === selectedRewardType);
  
  // Find the selected betting option
  const selectedBetting = bettingOptions.find(b => b.id === bettingOption);
  
  // Handle reward type change
  const handleRewardTypeChange = (value: string) => {
    setSelectedRewardType(value);
    
    if (value === 'custom') {
      // For custom rewards, use the custom input
      onRewardChange(customReward || 'Custom Reward');
    } else if (value === 'bonus-commission') {
      // For bonus commission, include the percentage
      const rewardText = `${bonusPercentage}% Bonus Commission`;
      onRewardChange(rewardText);
    } else {
      // For other predefined rewards, use the name
      const reward = predefinedRewards.find(r => r.id === value);
      if (reward) {
        onRewardChange(reward.name);
      }
    }
  };
  
  // Handle custom reward change
  const handleCustomRewardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomReward(value);
    if (selectedRewardType === 'custom') {
      onRewardChange(value || 'Custom Reward');
    }
  };
  
  // Handle bonus percentage change
  const handleBonusPercentageChange = (value: number[]) => {
    const percentage = value[0];
    setBonusPercentage(percentage);
    if (selectedRewardType === 'bonus-commission') {
      const rewardText = `${percentage}% Bonus Commission`;
      onRewardChange(rewardText);
    }
  };
  
  // Handle betting option change
  const handleBettingOptionChange = (value: string) => {
    setBettingOption(value);
    
    // Update the reward text based on the betting option
    let rewardText = '';
    
    if (selectedRewardType === 'custom') {
      rewardText = customReward || 'Custom Reward';
    } else if (selectedRewardType === 'bonus-commission') {
      // For bonus commission with betting, adjust the percentage
      const option = bettingOptions.find(b => b.id === value);
      const adjustedPercentage = option ? Math.round(bonusPercentage * option.multiplier) : bonusPercentage;
      rewardText = `${adjustedPercentage}% Bonus Commission`;
    } else {
      // For other predefined rewards, use the name
      const reward = predefinedRewards.find(r => r.id === selectedRewardType);
      rewardText = reward ? reward.name : '';
    }
    
    // If it's a bet, add the risk level
    if (value !== 'no-bet') {
      const option = bettingOptions.find(b => b.id === value);
      if (option) {
        rewardText += ` (${option.risk} Risk)`;
      }
    }
    
    onRewardChange(rewardText);
  };
  
  return (
    <div className="space-y-6">
      <div>
        <Label className="text-base">Select Reward Type</Label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
          {predefinedRewards.map((reward) => (
            <Card 
              key={reward.id} 
              className={`cursor-pointer hover:border-primary transition-colors ${
                selectedRewardType === reward.id ? 'border-primary bg-primary/5' : ''
              }`}
              onClick={() => handleRewardTypeChange(reward.id)}
            >
              <CardHeader className="pb-1 pt-3">
                <div className="flex items-center gap-2">
                  {reward.icon}
                  <CardTitle className="text-base">{reward.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pb-3 pt-0">
                <CardDescription className="text-xs">{reward.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      {selectedRewardType === 'custom' && (
        <div className="space-y-2">
          <Label htmlFor="custom-reward">Custom Reward</Label>
          <Input 
            id="custom-reward"
            placeholder="Enter your custom reward"
            value={customReward}
            onChange={handleCustomRewardChange}
          />
        </div>
      )}
      
      {selectedRewardType === 'bonus-commission' && (
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Bonus Commission Percentage</Label>
              <span className="text-sm font-medium">{bonusPercentage}%</span>
            </div>
            <Slider
              defaultValue={[3]}
              max={10}
              min={1}
              step={0.5}
              value={[bonusPercentage]}
              onValueChange={handleBonusPercentageChange}
              className="w-full"
            />
          </div>
        </div>
      )}
      
      <div className="space-y-2">
        <Label className="text-base">Risk/Reward Level</Label>
        <RadioGroup 
          defaultValue="no-bet"
          value={bettingOption}
          onValueChange={handleBettingOptionChange}
          className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2"
        >
          {bettingOptions.map((option) => (
            <div key={option.id} className="flex items-start space-x-2">
              <RadioGroupItem value={option.id} id={option.id} />
              <div className="grid gap-0.5">
                <Label htmlFor={option.id} className="font-medium text-sm">
                  {option.name}
                </Label>
                <p className="text-xs text-muted-foreground">
                  {option.id === 'no-bet' ? (
                    'Standard reward with no additional risk'
                  ) : (
                    <>
                      <span className="font-medium">{option.risk} Risk</span>: {option.multiplier}x reward multiplier
                      {option.id !== 'low-bet' && (
                        <span className="text-red-500"> with penalty if goal is not achieved</span>
                      )}
                    </>
                  )}
                </p>
              </div>
            </div>
          ))}
        </RadioGroup>
      </div>
      
      <Card className="bg-muted/30">
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <Award className="h-5 w-5 text-amber-500" />
            Final Reward
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="font-medium">
            {selectedRewardType === 'custom' ? (
              customReward || 'Custom Reward'
            ) : selectedRewardType === 'bonus-commission' ? (
              `${bonusPercentage}% Bonus Commission`
            ) : (
              selectedReward?.name || ''
            )}
            {bettingOption !== 'no-bet' && ` (${selectedBetting?.risk} Risk)`}
          </p>
          
          {bettingOption !== 'no-bet' && (
            <p className="text-sm text-muted-foreground mt-2">
              {bettingOption === 'low-bet' ? (
                'You will receive 1.5x the standard reward if you achieve this goal.'
              ) : bettingOption === 'medium-bet' ? (
                'You will receive 2x the standard reward if you achieve this goal, but may face reduced commission if you fail.'
              ) : (
                'You will receive 3x the standard reward if you achieve this goal, but will face significantly reduced commission if you fail.'
              )}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RewardCustomizer; 