
import React, { useState } from 'react';
import { Trophy, Info } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import AchievementModal from './AchievementModal';

// Achievement levels with their respective colors
export type AchievementLevel = 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';

const achievementColors: Record<AchievementLevel, string> = {
  bronze: 'bg-[#FEC6A1]',
  silver: 'bg-[#F1F0FB]',
  gold: 'bg-[#FEF7CD]',
  platinum: 'bg-[#D3E4FD]',
  diamond: 'bg-[#E5DEFF]',
};

const achievementTextColors: Record<AchievementLevel, string> = {
  bronze: 'text-amber-700',
  silver: 'text-gray-600',
  gold: 'text-amber-600',
  platinum: 'text-blue-700',
  diamond: 'text-purple-700',
};

interface AchievementBadgeCardProps {
  level: AchievementLevel;
  streakCount: number;
  progressToNext: number; // 0-100 percentage
  className?: string;
}

export function AchievementBadgeCard({ 
  level = 'bronze', 
  streakCount = 1, 
  progressToNext = 25,
  className 
}: AchievementBadgeCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const badgeColor = achievementColors[level];
  const textColor = achievementTextColors[level];

  return (
    <div className="data-card flex flex-col relative">
      <div className="flex justify-between items-center">
        <span className="text-sm text-muted-foreground">Achievement Badge:</span>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button variant="ghost" size="sm" className="px-2 h-7">
              <Info className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[80vh] p-0">
            <DialogHeader className="px-6 pt-6 pb-2">
              <DialogTitle className="text-xl">Achievement System Details</DialogTitle>
              <DialogDescription className="sr-only">
                Achievement levels and requirements
              </DialogDescription>
            </DialogHeader>
            <ScrollArea className="max-h-[calc(80vh-120px)] px-6 pb-6">
              <AchievementModal currentLevel={level} />
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </div>
      
      {/* Adjusted layout to center badge vertically */}
      <div className="flex justify-between items-center h-full py-1">
        <div className="flex items-center flex-1">
          <div className="w-full mr-2">
            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full progress-bar-gradient rounded-full"
                style={{ width: `${progressToNext}%` }}
              ></div>
            </div>
            <span className="text-xs text-muted-foreground mt-1 block">
              {streakCount} week{streakCount !== 1 ? 's' : ''} streak ({progressToNext}%)
            </span>
          </div>
        </div>
        
        <div className={`p-2 rounded-full ${badgeColor} flex items-center justify-center self-center`}>
          <Trophy className={`h-5 w-5 ${textColor}`} />
        </div>
      </div>
    </div>
  );
}

export default AchievementBadgeCard;
