import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Trophy, Award, Target, Calendar, Star, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

// Mock achievement badges data
const mockAchievementBadges = [
  {
    id: 'first-goal',
    name: 'Goal Setter',
    description: 'Create your first goal',
    icon: <Target className="h-6 w-6" />,
    color: 'bronze',
    progress: 100,
    unlocked: true,
    date: 'Oct 15, 2023'
  },
  {
    id: 'first-milestone',
    name: 'Milestone Achiever',
    description: 'Reach your first milestone',
    icon: <Award className="h-6 w-6" />,
    color: 'silver',
    progress: 100,
    unlocked: true,
    date: 'Oct 20, 2023'
  },
  {
    id: 'first-completion',
    name: 'Goal Crusher',
    description: 'Complete your first goal',
    icon: <Trophy className="h-6 w-6" />,
    color: 'gold',
    progress: 75,
    unlocked: false
  },
  {
    id: 'team-player',
    name: 'Team Player',
    description: 'Contribute to a team goal',
    icon: <Users className="h-6 w-6" />,
    color: 'emerald',
    progress: 50,
    unlocked: false
  },
  {
    id: 'streak-master',
    name: 'Streak Master',
    description: 'Complete 3 goals in a row',
    icon: <Star className="h-6 w-6" />,
    color: 'sapphire',
    progress: 33,
    unlocked: false
  }
];

// Sales-specific achievement badges
const salesAchievementBadges = [
  {
    id: 'first-sale',
    name: 'First Sale',
    description: 'Complete your first sale',
    icon: <Trophy className="h-6 w-6" />,
    color: 'bronze',
    progress: 100,
    unlocked: true,
    date: 'Nov 5, 2023'
  },
  {
    id: 'million-club',
    name: 'Million Club',
    description: 'Reach 1M in sales',
    icon: <Award className="h-6 w-6" />,
    color: 'gold',
    progress: 85,
    unlocked: false
  },
  {
    id: 'perfect-month',
    name: 'Perfect Month',
    description: 'Meet all KPIs for a full month',
    icon: <Calendar className="h-6 w-6" />,
    color: 'emerald',
    progress: 60,
    unlocked: false
  }
];

// Badge colors for styling
const badgeColors: Record<string, string> = {
  bronze: 'bg-amber-700 text-white',
  silver: 'bg-slate-400 text-white',
  gold: 'bg-amber-400 text-black',
  platinum: 'bg-slate-300 text-black',
  diamond: 'bg-cyan-300 text-black',
  emerald: 'bg-emerald-600 text-white',
  ruby: 'bg-red-600 text-white',
  sapphire: 'bg-blue-600 text-white',
  obsidian: 'bg-black text-white',
};

// Custom Achievement Badge component to avoid dependency on the goals module
const AchievementBadgeCard = ({ badge, onClick }: { badge: any, onClick: (badge: any) => void }) => {
  const colorClass = badge.color in badgeColors ? badgeColors[badge.color] : 'bg-gray-500 text-white';
  
  return (
    <Card 
      className={`cursor-pointer hover:shadow-md transition-all ${badge.unlocked ? "border-primary/30" : "border-muted opacity-70"}`}
      onClick={() => onClick(badge)}
    >
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-base flex items-center gap-2">
          <Badge className={`h-8 w-8 rounded-full p-1.5 flex items-center justify-center ${colorClass}`}>
            {badge.icon}
          </Badge>
          <span className={badge.unlocked ? "" : "text-muted-foreground"}>
            {badge.name}
          </span>
        </CardTitle>
        {badge.unlocked && (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Unlocked
          </Badge>
        )}
      </CardHeader>
      
      <CardContent className="pb-3 pt-1">
        <CardDescription>
          {badge.description}
        </CardDescription>
        
        <div className="mt-3">
          <div className="flex justify-between text-xs mb-1">
            <span>Progress</span>
            <span>{badge.progress}%</span>
          </div>
          <Progress 
            value={badge.progress} 
            className={`h-1.5 transition-all duration-1000 ${badge.unlocked ? "bg-primary/50" : "bg-muted"}`} 
          />
        </div>
        
        {badge.date && badge.unlocked && (
          <div className="mt-2 text-xs text-muted-foreground">
            Achieved on {badge.date}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// Render a grid of achievement badges
const AchievementBadgesGrid = ({ badges, onBadgeClick }: { badges: any[], onBadgeClick: (badge: any) => void }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {badges.map(badge => (
        <AchievementBadgeCard key={badge.id} badge={badge} onClick={onBadgeClick} />
      ))}
    </div>
  );
};

const AchievementTab: React.FC = () => {
  const [selectedBadge, setSelectedBadge] = useState<any | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);

  // Function to handle badge click
  const handleBadgeClick = (badge: any) => {
    setSelectedBadge(badge);
    if (badge.unlocked) {
      setShowCelebration(true);
    }
  };

  return (
    <div className="pt-4 px-2">
      <h1 className="text-2xl font-bold mb-4">Achievement Board</h1>
      
      <Tabs defaultValue="personal" className="w-full mb-6">
        <TabsList className="mb-4">
          <TabsTrigger value="personal">Personal Achievements</TabsTrigger>
          <TabsTrigger value="sales">Sales Achievements</TabsTrigger>
          <TabsTrigger value="team">Team Achievements</TabsTrigger>
        </TabsList>
        
        <TabsContent value="personal" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-amber-500" />
                Personal Achievement Badges
              </CardTitle>
              <CardDescription>
                Track your personal growth and milestones with these achievement badges
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AchievementBadgesGrid 
                badges={mockAchievementBadges} 
                onBadgeClick={handleBadgeClick}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="sales" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-teal-500" />
                Sales Achievement Badges
              </CardTitle>
              <CardDescription>
                Recognition for your sales performance and milestones
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AchievementBadgesGrid 
                badges={salesAchievementBadges} 
                onBadgeClick={handleBadgeClick}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="team" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-500" />
                Team Achievement Badges
              </CardTitle>
              <CardDescription>
                Collaborative achievements earned with your team
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                Team achievements will be available soon
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Simple celebration modal */}
      {showCelebration && selectedBadge && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4 animate-in zoom-in-95">
            <CardHeader className="text-center">
              <CardTitle className="text-xl flex flex-col items-center gap-4">
                <div className={`h-16 w-16 rounded-full flex items-center justify-center ${badgeColors[selectedBadge.color] || 'bg-primary text-white'}`}>
                  {selectedBadge.icon}
                </div>
                <div>
                  <div className="text-2xl font-bold">{selectedBadge.name}</div>
                  <div className="text-lg font-normal text-muted-foreground">Achievement Unlocked!</div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="mb-6">{selectedBadge.description}</p>
              <div className="flex flex-col gap-2 mb-6">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>100%</span>
                </div>
                <Progress value={100} className="h-2" />
                <div className="flex justify-between mt-1">
                  <span className="text-xs">0%</span>
                  <span className="text-xs">25%</span>
                  <span className="text-xs">50%</span>
                  <span className="text-xs">75%</span>
                  <span className="text-xs">100%</span>
                </div>
              </div>
              <button 
                className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
                onClick={() => setShowCelebration(false)}
              >
                Close
              </button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AchievementTab; 