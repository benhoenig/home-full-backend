import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Achiever, LeaderboardType } from './data';
import { getMetricValue, getMetricIcon, formatValue } from './utils';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';

interface LeaderboardTableProps {
  achievers: Achiever[];
  leaderboardType: LeaderboardType;
  startIndex?: number;
  onSelectAchiever?: (achiever: Achiever) => void;
  className?: string;
}

export const LeaderboardTable: React.FC<LeaderboardTableProps> = ({
  achievers,
  leaderboardType,
  startIndex = 0,
  onSelectAchiever,
  className
}) => {
  if (achievers.length === 0) return null;

  const handleRowClick = (achiever: Achiever) => {
    if (onSelectAchiever) {
      onSelectAchiever(achiever);
    }
  };
  
  return (
    <div className={cn("bg-white rounded-lg border shadow overflow-hidden", className)}>
      {/* Table Header */}
      <div className="bg-gray-50 border-b">
        <div className="grid grid-cols-12 py-3 px-4 text-sm font-medium text-gray-500">
          <div className="col-span-1 text-center">Rank</div>
          <div className="col-span-3">Name</div>
          <div className="col-span-2">Team</div>
          <div className="col-span-2 text-right">{leaderboardType}</div>
          <div className="col-span-2 text-right">Conversion</div>
          <div className="col-span-1 text-right">Rating</div>
          <div className="col-span-1"></div> {/* For action buttons */}
        </div>
      </div>
      
      {/* Table Body */}
      <div className="divide-y">
        {achievers.slice(startIndex).map((achiever, index) => {
          const metricValue = getMetricValue(achiever, leaderboardType);
          // Calculate progress percentage based on metric type
          let progressPercentage = 0;
          let targetValue = 0;
          
          if (leaderboardType === 'Revenue') {
            targetValue = 350000;
            progressPercentage = Math.min(100, (achiever.sales / targetValue) * 100);
          } else if (leaderboardType === 'Conversion Rate') {
            targetValue = 70;
            progressPercentage = Math.min(100, (achiever.conversion / targetValue) * 100);
          } else if (leaderboardType === 'Closed Case') {
            targetValue = 45;
            progressPercentage = Math.min(100, (achiever.closedCases / targetValue) * 100);
          } else if (leaderboardType === 'Avg. Ticket Size') {
            targetValue = 25000;
            progressPercentage = Math.min(100, (achiever.ticketSize / targetValue) * 100);
          } else if (leaderboardType === 'Avg. Buyer Satisfaction') {
            targetValue = 5;
            progressPercentage = Math.min(100, (achiever.buyerSatisfaction / targetValue) * 100);
          } else if (leaderboardType === 'Avg. Owner Satisfaction') {
            targetValue = 5;
            progressPercentage = Math.min(100, (achiever.ownerSatisfaction / targetValue) * 100);
          }
          
          return (
            <div 
              key={achiever.id} 
              className="grid grid-cols-12 py-3 px-4 items-center hover:bg-gray-50 cursor-pointer" 
              onClick={() => handleRowClick(achiever)}
            >
              {/* Rank */}
              <div className="col-span-1 text-center font-medium text-gray-500">
                {startIndex + index + 1}
              </div>
              
              {/* Name with Avatar */}
              <div className="col-span-3 flex items-center">
                <Avatar className="h-8 w-8 mr-3">
                  <AvatarImage src={achiever.image} alt={achiever.name} />
                  <AvatarFallback>{achiever.avatar}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{achiever.name}</div>
                  <div className="text-xs text-muted-foreground">Sales Executive</div>
                </div>
              </div>
              
              {/* Team */}
              <div className="col-span-2 font-medium">
                {achiever.team}
              </div>
              
              {/* Primary Metric */}
              <div className="col-span-2 text-right font-medium">
                {formatValue(metricValue, leaderboardType)}
              </div>
              
              {/* Progress */}
              <div className="col-span-2 text-right">
                <div className="flex items-center">
                  <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
                    <div 
                      className={`h-3 rounded-full ${
                        progressPercentage >= 100 ? 'bg-gradient-to-r from-green-500 to-green-400' : 
                        progressPercentage >= 75 ? 'bg-gradient-to-r from-teal-600 to-teal-500' : 
                        progressPercentage >= 50 ? 'bg-gradient-to-r from-amber-500 to-amber-400' : 
                        'bg-gradient-to-r from-rose-600 to-rose-500'
                      }`} 
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>
                  <span className="ml-2 min-w-[50px] text-right text-sm">
                    {formatValue(metricValue, leaderboardType, true)}/{formatValue(targetValue, leaderboardType, true)}
                  </span>
                </div>
              </div>
              
              {/* Rating */}
              <div className="col-span-1 text-right">
                <span className="font-medium">{achiever.buyerSatisfaction.toFixed(1)}</span>
              </div>
              
              {/* Action Button */}
              <div className="col-span-1 text-right">
                <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700 p-1 h-8 w-8">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LeaderboardTable;