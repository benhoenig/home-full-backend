import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal } from 'lucide-react';
import { Achiever, NewSalesData } from '@/components/leaderboard/data';

type SalesProfileHeaderProps = {
  salesData: Achiever | NewSalesData;
  type: 'leaderboard' | 'newSales';
};

// Helper to get badge color based on rank
const getRankBadgeColor = (rank: number | null) => {
  if (!rank) return 'bg-gray-500';
  
  switch(rank) {
    case 1: return 'bg-amber-500';
    case 2: return 'bg-gray-400';
    case 3: return 'bg-amber-700';
    default: return 'bg-teal-600';
  }
};

const SalesProfileHeader: React.FC<SalesProfileHeaderProps> = ({
  salesData,
  type
}) => {
  const rank = type === 'leaderboard' 
    ? (salesData as Achiever).rank 
    : null;

  return (
    <div className="p-6 flex flex-col items-center border-b bg-gradient-to-b from-muted/50 to-background">
      {/* Profile Image - takes 2/3 of modal width */}
      <div className="w-2/3 flex justify-center mb-4">
        <div className="relative">
          <Avatar className="h-32 w-32 border-4 border-background shadow-lg">
            <AvatarImage src={salesData.image} alt={salesData.name} />
            <AvatarFallback className="text-4xl">{salesData.avatar}</AvatarFallback>
          </Avatar>
          {rank && rank <= 3 && (
            <div className="absolute -bottom-2 -right-2 rounded-full p-2 bg-background">
              <div className={`rounded-full p-1.5 ${getRankBadgeColor(rank)}`}>
                {rank === 1 ? 
                  <Trophy className="h-4 w-4 text-white" fill="currentColor" /> : 
                  <Medal className="h-4 w-4 text-white" fill="currentColor" />
                }
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Name and Rank */}
      <h2 className="text-2xl font-bold mt-2">{salesData.name}</h2>
      <div className="flex items-center gap-2 mt-1">
        <Badge variant={type === 'leaderboard' ? "default" : "outline"} className="font-normal">
          {salesData.team}
        </Badge>
        {rank && (
          <Badge variant="secondary" className="font-semibold">
            Rank #{rank}
          </Badge>
        )}
      </div>
    </div>
  );
};

export default SalesProfileHeader; 