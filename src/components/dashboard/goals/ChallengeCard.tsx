import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Calendar, Users, Trophy, Award, ChevronRight } from 'lucide-react';

// Define types for the component
export type Milestone = {
  value: number;
  label: string;
  reached: boolean;
};

export type Leaderboard = {
  name: string;
  score: string;
  avatar: string;
};

export type Challenge = {
  id: number;
  title: string;
  description: string;
  deadline: string;
  reward: string;
  participants: number;
  icon: string;
  image?: string;
  progress?: number;
  isJoined?: boolean;
  ranking?: number;
  milestones?: Milestone[];
  leaderboard?: Leaderboard[];
  themeColor?: string;
};

type ChallengeCardProps = {
  challenge: Challenge;
  onViewDetails: (challenge: Challenge) => void;
  renderIcon: (iconName: string) => React.ReactNode;
};

// Function to get gradient based on theme color
export const getGradientByTheme = (themeColor?: string): string => {
  switch(themeColor) {
    case 'red':
      return 'bg-gradient-to-r from-red-500 to-orange-500';
    case 'blue':
      return 'bg-gradient-to-r from-blue-500 to-cyan-500';
    case 'green':
      return 'bg-gradient-to-r from-green-500 to-emerald-500';
    case 'purple':
      return 'bg-gradient-to-r from-purple-500 to-pink-500';
    case 'amber':
      return 'bg-gradient-to-r from-amber-500 to-yellow-500';
    default:
      // Default gradient based on icon
      return 'bg-gradient-to-r from-slate-700 to-slate-800';
  }
};

const ChallengeCard: React.FC<ChallengeCardProps> = ({ 
  challenge, 
  onViewDetails,
  renderIcon 
}) => {
  // Get gradient class based on theme color
  const gradientClass = getGradientByTheme(challenge.themeColor);

  return (
    <Card className="overflow-hidden border border-border hover:shadow-md transition-shadow">
      <CardHeader className={`${gradientClass} pb-2 text-white`}>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-full">
              {renderIcon(challenge.icon)}
            </div>
            <CardTitle className="text-lg">{challenge.title}</CardTitle>
          </div>
          <Button 
            variant="ghost" 
            className="h-8 w-8 p-0 text-white hover:bg-white/20"
            onClick={() => onViewDetails(challenge)}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-4">
          {challenge.image && (
            <div className="w-full h-24 bg-muted/20 rounded-md overflow-hidden flex items-center justify-center">
              <img 
                src={challenge.image} 
                alt={challenge.title} 
                className="w-full h-full object-cover" 
              />
            </div>
          )}
          
          <p className="text-sm">{challenge.description}</p>
          
          {challenge.progress !== undefined && (
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Your Progress</span>
                <span>{challenge.progress}%</span>
              </div>
              <div className="relative">
                <Progress 
                  value={challenge.progress} 
                  className="h-2 bg-slate-100" 
                  indicatorClassName="progress-bar-gradient"
                />
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>{challenge.deadline}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span>{challenge.participants} participants</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <Trophy className="h-4 w-4 text-amber-500" />
            <span>Reward: {challenge.reward}</span>
          </div>
          
          {challenge.ranking && (
            <div className="flex items-center gap-2 text-sm">
              <Award className="h-4 w-4 text-blue-500" />
              <span>Your Rank: #{challenge.ranking}</span>
            </div>
          )}
          
          <Button 
            variant={challenge.isJoined ? "secondary" : "outline"} 
            className="w-full"
          >
            {challenge.isJoined ? "View Progress" : "Join Challenge"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChallengeCard; 