import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Calendar, Users, Trophy } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Challenge } from './ChallengeCard';
import { getGradientByTheme } from './ChallengeCard';

type ChallengeDetailsModalProps = {
  challenge: Challenge | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  renderIcon: (iconName: string) => React.ReactNode;
};

const ChallengeDetailsModal: React.FC<ChallengeDetailsModalProps> = ({ 
  challenge, 
  isOpen, 
  onOpenChange,
  renderIcon 
}) => {
  if (!challenge) return null;

  const gradientClass = getGradientByTheme(challenge.themeColor);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden">
        <div className={`${gradientClass} h-32 w-full flex items-center justify-center relative`}>
          {challenge.image ? (
            <img 
              src={challenge.image} 
              alt={challenge.title} 
              className="w-full h-full object-cover" 
            />
          ) : (
            <div className="p-4 bg-white/20 rounded-full">
              {renderIcon(challenge.icon)}
            </div>
          )}
        </div>

        <div className="p-6">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-full">
                {renderIcon(challenge.icon)}
              </div>
              {challenge.title}
            </DialogTitle>
          </DialogHeader>
          
          <div className="py-4 space-y-6">
            <p>{challenge.description}</p>
            
            {challenge.progress !== undefined && (
              <div>
                <h4 className="text-sm font-medium mb-2">Your Progress</h4>
                <div className="flex justify-between text-sm mb-1">
                  <span>Progress</span>
                  <span>{challenge.progress}%</span>
                </div>
                <div className="relative">
                  <Progress 
                    value={challenge.progress} 
                    className="h-3 bg-slate-100" 
                    indicatorClassName="progress-bar-gradient"
                  />
                </div>
              </div>
            )}
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium mb-1">Deadline</h4>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{challenge.deadline}</span>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-1">Participants</h4>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>{challenge.participants}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-1">Reward</h4>
              <div className="flex items-center gap-2">
                <Trophy className="h-4 w-4 text-amber-500" />
                <span>{challenge.reward}</span>
              </div>
            </div>
            
            {challenge.leaderboard && (
              <div>
                <h4 className="text-sm font-medium mb-2">Leaderboard</h4>
                <div className="space-y-2">
                  {challenge.leaderboard.map((leader, index) => (
                    <div 
                      key={index} 
                      className={`flex items-center justify-between p-2 rounded-md ${
                        leader.name === 'You' ? 'bg-primary/10' : ''
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-medium">#{index + 1}</span>
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={leader.avatar} alt={leader.name} />
                          <AvatarFallback>{leader.name[0]}</AvatarFallback>
                        </Avatar>
                        <span>{leader.name}</span>
                      </div>
                      <span>{leader.score}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button 
              variant={challenge.isJoined ? "secondary" : "default"} 
              className="w-full"
            >
              {challenge.isJoined ? "Update Progress" : "Join Challenge"}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChallengeDetailsModal; 