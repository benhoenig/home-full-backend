import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { MoreHorizontal, Target, Calendar, Trophy, ChevronRight } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

// Define types for the component
export type Milestone = {
  value: number;
  label: string;
  reached: boolean;
};

export type TeamMember = {
  id: number;
  name: string;
  avatar: string;
};

export type Goal = {
  id: number;
  title: string;
  progress: number;
  target: string;
  current: string;
  deadline: string;
  reward: string;
  type: 'personal' | 'team';
  goalType?: 'target-revenue' | 'kpi' | 'custom';
  kpiType?: 'new-list' | 'consult' | 'survey' | 'buyer-review' | 'owner-review' | 'skillset' | 'action-score';
  settingType?: 'maintain' | 'boost' | 'supercharge';
  boostPercentage?: string;
  notificationFrequency?: 'none' | 'daily' | 'weekly' | 'monthly';
  timelineType?: 'monthly' | 'quarterly' | 'annually';
  timelinePeriod?: string;
  icon: string;
  iconColor?: string;
  description: string;
  milestones: Milestone[];
  createdAt: string;
  teamMembers?: TeamMember[];
};

type GoalCardProps = {
  goal: Goal;
  onViewDetails: (goal: Goal) => void;
  renderIcon: (iconName: string) => React.ReactNode;
};

const GoalCard: React.FC<GoalCardProps> = ({ goal, onViewDetails, renderIcon }) => {
  // Get color class based on icon color
  const getColorClass = (color?: string) => {
    switch(color) {
      case 'blue': return 'text-blue-500 bg-blue-100';
      case 'green': return 'text-green-500 bg-green-100';
      case 'red': return 'text-red-500 bg-red-100';
      case 'amber': return 'text-amber-500 bg-amber-100';
      case 'purple': return 'text-purple-500 bg-purple-100';
      default: return 'bg-primary/10'; // Default color
    }
  };

  return (
    <Card className="overflow-hidden border border-border hover:shadow-md transition-shadow">
      <CardHeader className="bg-muted/30 pb-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-full ${getColorClass(goal.iconColor)}`}>
              {renderIcon(goal.icon)}
            </div>
            <CardTitle className="text-lg">{goal.title}</CardTitle>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onViewDetails(goal)}>
                <ChevronRight className="mr-2 h-4 w-4" />
                <span>View Details</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Progress</span>
              <span>{goal.progress}%</span>
            </div>
            <div className="relative">
              <Progress 
                value={goal.progress} 
                className="h-2 bg-slate-100" 
                indicatorClassName="progress-bar-gradient"
              />
              {/* Milestone markers removed */}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-muted-foreground" />
              <span>{goal.target}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>{goal.deadline}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <Trophy className="h-4 w-4 text-amber-500" />
            <span>Reward: {goal.reward}</span>
          </div>

          {/* Team members avatars for team goals */}
          {goal.type === 'team' && goal.teamMembers && (
            <div className="flex -space-x-2 overflow-hidden">
              {goal.teamMembers.map((member) => (
                <Avatar key={member.id} className="h-6 w-6 border-2 border-background">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback>{member.name[0]}</AvatarFallback>
                </Avatar>
              ))}
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-0 pb-3 px-6">
        <Button 
          variant="ghost" 
          className="text-xs w-full" 
          onClick={() => onViewDetails(goal)}
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default GoalCard; 