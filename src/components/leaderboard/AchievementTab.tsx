import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Trophy, Award, Target, Calendar, Star, Users } from 'lucide-react';
import { AchievementBadges } from '@/components/dashboard/goals';
import { ProgressCelebration } from '@/components/dashboard/goals';

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
              <AchievementBadges 
                badges={mockAchievementBadges} 
                onBadgeClick={handleBadgeClick}
                showAnimation={true}
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
              <AchievementBadges 
                badges={salesAchievementBadges} 
                onBadgeClick={handleBadgeClick}
                showAnimation={true}
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
      
      {/* Progress Celebration Modal */}
      {showCelebration && selectedBadge && (
        <ProgressCelebration
          title={selectedBadge.name}
          description={selectedBadge.description}
          progress={100}
          previousProgress={0}
          milestones={[
            { value: 25, label: "25%", reached: true },
            { value: 50, label: "50%", reached: true },
            { value: 75, label: "75%", reached: true },
            { value: 100, label: "100%", reached: true },
          ]}
          onClose={() => setShowCelebration(false)}
        />
      )}
    </div>
  );
};

export default AchievementTab; 