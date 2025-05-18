import React from 'react';
import { Achiever, LeaderboardType } from './data';
import { getMetricValue, formatValue } from './utils';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface MobileLeaderboardTableProps {
  achievers: Achiever[];
  leaderboardType: LeaderboardType;
  onSelectAchiever?: (achiever: Achiever) => void;
}

export const MobileLeaderboardTable: React.FC<MobileLeaderboardTableProps> = ({
  achievers,
  leaderboardType,
  onSelectAchiever
}) => {
  const handleRowClick = (achiever: Achiever) => {
    if (onSelectAchiever) {
      onSelectAchiever(achiever);
    }
  };

  return (
    <div className="bg-white rounded-lg border shadow overflow-hidden md:hidden">
      {/* Table Header */}
      <div className="bg-gray-50 border-b">
        <div className="grid grid-cols-10 py-3 px-4 text-xs font-medium text-gray-500">
          <div className="col-span-1 text-center">#</div>
          <div className="col-span-5">Name</div>
          <div className="col-span-4 text-right">{leaderboardType}</div>
        </div>
      </div>
      
      {/* Table Body */}
      <div className="divide-y">
        {achievers.map((achiever) => (
          <div 
            key={achiever.id} 
            className="grid grid-cols-10 py-3 px-4 items-center hover:bg-gray-50 cursor-pointer" 
            onClick={() => handleRowClick(achiever)}
          >
            {/* Rank */}
            <div className="col-span-1 text-center font-medium text-gray-500">
              {achiever.rank}
            </div>
            
            {/* Name with Avatar */}
            <div className="col-span-5 flex items-center">
              <Avatar className="h-7 w-7 mr-2">
                <AvatarImage src={achiever.image} alt={achiever.name} />
                <AvatarFallback>{achiever.avatar}</AvatarFallback>
              </Avatar>
              <div className="truncate">
                <div className="font-medium text-sm">{achiever.name}</div>
                <div className="text-xs text-muted-foreground">{achiever.team}</div>
              </div>
            </div>
            
            {/* Primary Metric */}
            <div className="col-span-4 text-right font-medium text-sm">
              {getMetricValue(achiever, leaderboardType)}
              <div className="text-xs text-muted-foreground">
                Conv: {achiever.conversion}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileLeaderboardTable; 