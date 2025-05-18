import React from 'react';
import { Card } from '@/components/ui/card';
import { Trophy, Star, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TopAchieversCardProps {
  achievers: number;
  totalEligible: number;
  onViewLeaderboard: () => void;
}

export const TopAchieversCard: React.FC<TopAchieversCardProps> = ({
  achievers,
  totalEligible,
  onViewLeaderboard
}) => {
  // Calculate progress percentage
  const progressPercentage = (achievers / totalEligible) * 100;
  
  return (
    <Card className="bg-gradient-to-br from-cyan-500 to-teal-700 text-white rounded-xl overflow-hidden border-none shadow-lg relative">
      <div className="absolute top-2 right-2">
        <Button 
          size="sm" 
          variant="ghost" 
          className="text-white bg-white/10 hover:bg-white/20 rounded-full p-1 h-8 w-8"
          onClick={onViewLeaderboard}
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
      <div className="p-4">
        <div className="flex items-center mb-2">
          <Trophy className="h-5 w-5 mr-2" />
          <h3 className="text-lg font-bold">TOP ACHIEVERS</h3>
        </div>
        
        <div className="flex items-baseline mb-3">
          <span className="text-4xl font-bold">{achievers}</span>
          <span className="text-xl ml-1">/ {totalEligible}</span>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-white/20 rounded-full h-2.5 mb-2">
          <div 
            className="bg-gradient-to-r from-emerald-300 to-white h-2.5 rounded-full" 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        
        <div className="flex items-center justify-between mt-3">
          <p className="text-sm text-white/80">Race to the top!</p>
          <div className="flex">
            {[...Array(3)].map((_, i) => (
              <Star key={i} className="h-4 w-4 text-emerald-200" fill={i < Math.ceil(achievers/totalEligible * 3) ? "currentColor" : "none"} />
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TopAchieversCard; 