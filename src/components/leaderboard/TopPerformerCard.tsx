import React from 'react';
import { Card } from '@/components/ui/card';
import { Trophy, Medal, Star } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Achiever, LeaderboardType } from './data';
import { getMetricValue, getMetricIcon } from './utils';

interface TopPerformerCardProps {
  achiever: Achiever;
  leaderboardType: LeaderboardType;
  onClick?: () => void;
}

export const TopPerformerCard: React.FC<TopPerformerCardProps> = ({
  achiever,
  leaderboardType,
  onClick
}) => {
  // Helper to get background color for the card header
  const getHeaderBgClass = (rank: number) => {
    switch(rank) {
      case 1:
        return 'bg-gradient-to-r from-amber-500 to-amber-400';
      case 2:
        return 'bg-gradient-to-r from-gray-400 to-gray-300';
      case 3:
        return 'bg-gradient-to-r from-amber-700 to-amber-600';
      default:
        return 'bg-gradient-to-r from-gray-600 to-gray-500';
    }
  };
  
  // Helper to get badge background color
  const getBadgeBgClass = (rank: number) => {
    switch(rank) {
      case 1:
        return 'bg-amber-400';
      case 2:
        return 'bg-gray-300';
      case 3:
        return 'bg-amber-600';
      default:
        return 'bg-gray-500';
    }
  };
  
  // Helper to get rank label
  const getRankLabel = (rank: number) => {
    switch(rank) {
      case 1:
        return 'Gold';
      case 2:
        return 'Silver';
      case 3:
        return 'Bronze';
      default:
        return `#${rank}`;
    }
  };
  
  return (
    <Card 
      className="overflow-hidden border shadow-md hover:shadow-lg transition-shadow cursor-pointer" 
      onClick={onClick}
    >
      {/* Card Header with Rank */}
      <div className={`px-3 py-2 flex justify-between items-center ${getHeaderBgClass(achiever.rank)} text-white`}>
        <div className="flex items-center">
          <span className="text-md font-bold mr-1">#{achiever.rank}</span>
          <span className="text-xs uppercase tracking-wider">{getRankLabel(achiever.rank)}</span>
        </div>
        <div className={`rounded-full p-1.5 ${getBadgeBgClass(achiever.rank)}`}>
          {achiever.rank === 1 ? 
            <Trophy className="h-4 w-4 text-white" fill="currentColor" /> : 
            <Medal className="h-4 w-4 text-white" fill="currentColor" />
          }
        </div>
      </div>
      
      {/* Card Body */}
      <div className="p-3">
        <div className="flex justify-between">
          {/* Profile Info */}
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10 border-2 border-white shadow">
              <AvatarImage src={achiever.image} alt={achiever.name} />
              <AvatarFallback>{achiever.avatar}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-bold">{achiever.name}</h3>
              <div className="text-xs text-muted-foreground">Sales Executive</div>
            </div>
          </div>
          
          {/* Primary Metric */}
          <div className="text-right">
            <div className="text-xs text-muted-foreground flex items-center justify-end">
              {leaderboardType} {getMetricIcon(leaderboardType)}
            </div>
            <div className="font-bold text-lg">{getMetricValue(achiever, leaderboardType)}</div>
          </div>
        </div>
        
        {/* Progress */}
        <Progress value={100 - ((achiever.rank - 1) * 15)} className="mt-2 mb-3 h-1" />
        
        {/* Secondary Metrics */}
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-gray-50 rounded p-1.5">
            <div className="text-xs text-muted-foreground">Conversion</div>
            <div className="font-medium text-sm">{achiever.conversion}%</div>
          </div>
          <div className="bg-gray-50 rounded p-1.5">
            <div className="text-xs text-muted-foreground">Satisfaction</div>
            <div className="font-medium text-sm flex items-center">
              {achiever.buyerSatisfaction.toFixed(1)}
              <Star className="h-3 w-3 text-amber-500 ml-1" fill="currentColor" />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TopPerformerCard; 