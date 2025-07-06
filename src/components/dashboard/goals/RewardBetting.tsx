import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Zap, AlertTriangle } from 'lucide-react';

// Betting options
const bettingOptions = [
  { 
    id: 'no-bet', 
    name: 'Standard Reward', 
    risk: 'None', 
    multiplier: 1,
    penalty: 'No penalty if goal is not achieved'
  },
  { 
    id: 'low-bet', 
    name: 'Small Bet', 
    risk: 'Low', 
    multiplier: 1.5,
    penalty: 'No penalty if goal is not achieved'
  },
  { 
    id: 'medium-bet', 
    name: 'Medium Bet', 
    risk: 'Medium', 
    multiplier: 2,
    penalty: '1% reduction in commission rate for 1 month if goal is not achieved'
  },
  { 
    id: 'high-bet', 
    name: 'High Bet', 
    risk: 'High', 
    multiplier: 3,
    penalty: '2% reduction in commission rate for 2 months if goal is not achieved'
  },
];

type RewardBettingProps = {
  reward: string;
  onBettingChange: (bettingOption: string, adjustedReward: string) => void;
};

const RewardBetting: React.FC<RewardBettingProps> = ({ 
  reward,
  onBettingChange
}) => {
  const [selectedBetting, setSelectedBetting] = useState<string>('no-bet');
  
  // Handle betting option change
  const handleBettingChange = (value: string) => {
    setSelectedBetting(value);
    
    // Get the betting option details
    const option = bettingOptions.find(opt => opt.id === value);
    
    // Create adjusted reward text
    let adjustedReward = reward;
    
    if (option && option.id !== 'no-bet') {
      adjustedReward = `${reward} (${option.multiplier}x with ${option.risk} Risk)`;
    }
    
    // Notify parent component
    onBettingChange(value, adjustedReward);
  };
  
  // Find the currently selected betting option
  const currentOption = bettingOptions.find(opt => opt.id === selectedBetting);
  
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Zap className="h-5 w-5 text-amber-500" />
        <h3 className="text-lg font-medium">Reward Betting (Optional)</h3>
      </div>
      
      <p className="text-sm text-muted-foreground">
        Increase your potential reward by betting on your success. Higher bets mean bigger rewards, but also carry penalties if you miss your goal.
      </p>
      
      <RadioGroup 
        value={selectedBetting}
        onValueChange={handleBettingChange}
        className="grid grid-cols-1 gap-3 mt-2"
      >
        {bettingOptions.map((option) => (
          <Card 
            key={option.id} 
            className={`border cursor-pointer hover:border-primary transition-colors ${
              selectedBetting === option.id ? 'border-primary bg-primary/5' : ''
            }`}
            onClick={() => handleBettingChange(option.id)}
          >
            <CardHeader className="pb-2 pt-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <RadioGroupItem value={option.id} id={option.id} />
                  <Label htmlFor={option.id} className="font-medium cursor-pointer">
                    {option.name}
                  </Label>
                </div>
                <div className="text-sm font-medium">
                  {option.multiplier}x Reward
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0 pb-3">
              <div className="flex items-start gap-2">
                <div className="flex-1">
                  {option.id !== 'no-bet' && option.id !== 'low-bet' ? (
                    <div className="flex items-center gap-1 text-amber-600 mb-1">
                      <AlertTriangle className="h-4 w-4" />
                      <p className="text-xs font-medium">Includes penalty risk</p>
                    </div>
                  ) : null}
                  <p className="text-xs text-muted-foreground">
                    {option.penalty}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </RadioGroup>
      
      {selectedBetting !== 'no-bet' && (
        <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
          <CardContent className="py-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Your Potential Reward</p>
                <p className="text-lg font-bold">{reward}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">With {currentOption?.multiplier}x Multiplier</p>
                <p className="text-lg font-bold text-amber-600">{reward} ({currentOption?.multiplier}x)</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default RewardBetting; 