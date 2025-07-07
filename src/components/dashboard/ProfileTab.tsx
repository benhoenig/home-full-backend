import React from 'react';
import { User, Briefcase, Calendar, Badge as BadgeIcon, Award, Star, Trophy, TrendingUp, Shield } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Achiever, NewSalesData } from '@/components/leaderboard/data';
import { Separator } from "@/components/ui/separator";

type ProfileTabProps = {
  salesData: Achiever | NewSalesData;
};

// Sample achievements data
const sampleAchievements = [
  {
    id: 1,
    name: "Top Performer",
    description: "Ranked in the top 5% of sales agents for 3 consecutive months",
    icon: <Trophy className="h-5 w-5 text-amber-500" />,
    date: "Apr 2023",
    level: "gold"
  },
  {
    id: 2,
    name: "Script Master",
    description: "Achieved 90%+ score on all script evaluations",
    icon: <Star className="h-5 w-5 text-blue-500" />,
    date: "Mar 2023",
    level: "silver"
  },
  {
    id: 3,
    name: "Fast Starter",
    description: "Closed first deal within 30 days of joining",
    icon: <TrendingUp className="h-5 w-5 text-green-500" />,
    date: "Feb 2023",
    level: "bronze"
  }
];

// Sample expertise data
const expertiseAreas = [
  { name: "Condominium", level: "Expert" },
  { name: "Land & House", level: "Intermediate" },
  { name: "Commercial", level: "Beginner" }
];

// Helper function to determine agent rank based on data
const determineAgentRank = (salesData: Achiever | NewSalesData) => {
  // In a real app, this would use actual criteria
  // For now, use a simple algorithm based on id or other properties
  if ('sales' in salesData) {
    // For regular sales agents (Achiever type)
    if (salesData.sales > 300000) return "Master Agent";
    if (salesData.sales > 250000) return "Expert Agent";
    if (salesData.sales > 200000) return "Senior Agent";
    if (salesData.sales > 150000) return "Executive Agent";
    return "Junior Agent";
  } else {
    // For new sales agents (NewSalesData type)
    return "Trainee";
  }
};

// Helper function to get rank color
const getRankColor = (rank: string) => {
  switch(rank) {
    case "Master Agent": return "bg-purple-700 hover:bg-purple-800";
    case "Expert Agent": return "bg-indigo-600 hover:bg-indigo-700";
    case "Senior Agent": return "bg-blue-600 hover:bg-blue-700";
    case "Executive Agent": return "bg-teal-600 hover:bg-teal-700";
    case "Junior Agent": return "bg-green-600 hover:bg-green-700";
    case "Trainee": return "bg-amber-500 hover:bg-amber-600";
    default: return "bg-primary hover:bg-primary/90";
  }
};

const ProfileTab: React.FC<ProfileTabProps> = ({ salesData }) => {
  // Get badge color based on level
  const getBadgeColor = (level: string) => {
    switch(level) {
      case "gold": return "bg-amber-500 hover:bg-amber-600";
      case "silver": return "bg-slate-400 hover:bg-slate-500";
      case "bronze": return "bg-amber-700 hover:bg-amber-800";
      case "Expert": return "bg-green-600 hover:bg-green-700";
      case "Intermediate": return "bg-blue-500 hover:bg-blue-600";
      case "Beginner": return "bg-purple-500 hover:bg-purple-600";
      default: return "bg-primary hover:bg-primary/90";
    }
  };

  // Determine agent's current rank
  const currentRank = determineAgentRank(salesData);

  return (
    <div className="p-6 focus-visible:outline-none focus-visible:ring-0">
      <h3 className="text-lg font-semibold flex items-center mb-4">
        <User className="h-5 w-5 mr-2 text-primary" />
        Personal Information
      </h3>
      
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="p-4 border">
          <div className="flex items-start">
            <User className="h-5 w-5 mr-3 text-muted-foreground mt-0.5" />
            <div>
              <div className="text-sm text-muted-foreground">Full Name</div>
              <div className="font-medium">{salesData.name}</div>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 border">
          <div className="flex items-start">
            <Briefcase className="h-5 w-5 mr-3 text-muted-foreground mt-0.5" />
            <div>
              <div className="text-sm text-muted-foreground">Team</div>
              <div className="font-medium">{salesData.team}</div>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 border">
          <div className="flex items-start">
            <Calendar className="h-5 w-5 mr-3 text-muted-foreground mt-0.5" />
            <div>
              <div className="text-sm text-muted-foreground">Join Date</div>
              <div className="font-medium">Jan 15, 2023</div>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 border">
          <div className="flex items-start">
            <Badge className="mr-3 mt-0.5" variant="outline">ID</Badge>
            <div>
              <div className="text-sm text-muted-foreground">Employee ID</div>
              <div className="font-medium">EMP-{salesData.id.toString().padStart(5, '0')}</div>
            </div>
          </div>
        </Card>

        {/* Sales Rank Card */}
        <Card className="p-4 border">
          <div className="flex items-start">
            <Trophy className="h-5 w-5 mr-3 text-amber-500 mt-0.5" />
            <div>
              <div className="text-sm text-muted-foreground">Sales Rank</div>
              <div className="font-medium">
                #{('rank' in salesData) ? salesData.rank : Math.floor(Math.random() * 20) + 1} 
                <span className="text-xs text-muted-foreground ml-1">of 50</span>
              </div>
            </div>
          </div>
        </Card>

        {/* New: Current Rank Card */}
        <Card className="p-4 border">
          <div className="flex items-start">
            <Shield className="h-5 w-5 mr-3 text-primary mt-0.5" />
            <div>
              <div className="text-sm text-muted-foreground">Current Rank</div>
              <div className="flex items-center">
                <Badge className={`${getRankColor(currentRank)}`}>{currentRank}</Badge>
              </div>
            </div>
          </div>
        </Card>
      </div>
      
      <div className="mt-6">
        <h4 className="font-medium mb-3">Areas of Expertise</h4>
        <div className="space-y-3">
          {expertiseAreas.map((area, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-sm">{area.name}</span>
              <Badge className={`${getBadgeColor(area.level)}`}>{area.level}</Badge>
            </div>
          ))}
        </div>
      </div>

      <Separator className="my-6" />
      
      {/* Achievements Section */}
      <div>
        <h4 className="font-medium mb-4 flex items-center">
          <Award className="h-5 w-5 mr-2 text-primary" />
          Achievements & Badges
        </h4>
        
        <div className="space-y-4">
          {sampleAchievements.map(achievement => (
            <Card key={achievement.id} className="p-4 border">
              <div className="flex items-start">
                <div className={`rounded-full p-2 mr-3 ${getBadgeColor(achievement.level)} bg-opacity-20`}>
                  {achievement.icon}
                </div>
                <div>
                  <div className="flex items-center">
                    <h5 className="font-medium">{achievement.name}</h5>
                    <Badge className={`ml-2 ${getBadgeColor(achievement.level)}`}>
                      {achievement.level.charAt(0).toUpperCase() + achievement.level.slice(1)}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{achievement.description}</p>
                  <div className="text-xs text-muted-foreground mt-2">Earned: {achievement.date}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileTab; 