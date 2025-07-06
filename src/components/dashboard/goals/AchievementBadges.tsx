import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Trophy, 
  Award, 
  Target, 
  Calendar, 
  TrendingUp, 
  Star, 
  Flame,
  Zap,
  Crown
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Define badge types
export type AchievementBadge = {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  progress: number;
  unlocked: boolean;
  date?: string;
};

const badgeIcons = {
  trophy: <Trophy className="h-6 w-6" />,
  award: <Award className="h-6 w-6" />,
  target: <Target className="h-6 w-6" />,
  calendar: <Calendar className="h-6 w-6" />,
  trending: <TrendingUp className="h-6 w-6" />,
  star: <Star className="h-6 w-6" />,
  flame: <Flame className="h-6 w-6" />,
  zap: <Zap className="h-6 w-6" />,
  crown: <Crown className="h-6 w-6" />,
};

const badgeColors = {
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

type AchievementBadgesProps = {
  badges: AchievementBadge[];
  onBadgeClick?: (badge: AchievementBadge) => void;
  showProgress?: boolean;
  showAnimation?: boolean;
  compact?: boolean;
};

const AchievementBadges: React.FC<AchievementBadgesProps> = ({
  badges,
  onBadgeClick,
  showProgress = true,
  showAnimation = true,
  compact = false,
}) => {
  const [animatingBadgeId, setAnimatingBadgeId] = useState<string | null>(null);
  const [progressValues, setProgressValues] = useState<Record<string, number>>({});
  
  // Initialize progress values
  useEffect(() => {
    const initialValues: Record<string, number> = {};
    badges.forEach(badge => {
      initialValues[badge.id] = 0;
    });
    setProgressValues(initialValues);
    
    // Animate progress bars
    if (showAnimation) {
      const timer = setTimeout(() => {
        const newValues: Record<string, number> = {};
        badges.forEach(badge => {
          newValues[badge.id] = badge.progress;
        });
        setProgressValues(newValues);
      }, 500);
      
      return () => clearTimeout(timer);
    } else {
      // Set to final values immediately if no animation
      const finalValues: Record<string, number> = {};
      badges.forEach(badge => {
        finalValues[badge.id] = badge.progress;
      });
      setProgressValues(finalValues);
    }
  }, [badges, showAnimation]);
  
  // Handle badge click
  const handleBadgeClick = (badge: AchievementBadge) => {
    if (onBadgeClick) {
      onBadgeClick(badge);
    }
    
    if (showAnimation && badge.unlocked) {
      setAnimatingBadgeId(badge.id);
      setTimeout(() => setAnimatingBadgeId(null), 2000);
    }
  };
  
  // Render a single badge
  const renderBadge = (badge: AchievementBadge) => {
    const isAnimating = animatingBadgeId === badge.id;
    const colorClass = badge.color in badgeColors 
      ? (badgeColors as any)[badge.color] 
      : 'bg-gray-500 text-white';
    
    return (
      <Card 
        key={badge.id}
        className={cn(
          "cursor-pointer hover:shadow-md transition-all",
          badge.unlocked ? "border-primary/30" : "border-muted opacity-70",
          isAnimating && "animate-pulse shadow-lg shadow-primary/20"
        )}
        onClick={() => handleBadgeClick(badge)}
      >
        <CardHeader className={cn(
          "pb-2 flex flex-row items-center justify-between",
          compact && "p-3"
        )}>
          <CardTitle className={cn(
            "text-base flex items-center gap-2",
            compact && "text-sm"
          )}>
            <Badge className={cn(
              "h-8 w-8 rounded-full p-1.5 flex items-center justify-center",
              colorClass,
              isAnimating && "animate-spin-slow"
            )}>
              {badge.icon || badgeIcons.trophy}
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
        
        {!compact && (
          <CardContent className="pb-3 pt-1">
            <CardDescription>
              {badge.description}
            </CardDescription>
            
            {showProgress && (
              <div className="mt-3">
                <div className="flex justify-between text-xs mb-1">
                  <span>Progress</span>
                  <span>{badge.progress}%</span>
                </div>
                <Progress 
                  value={progressValues[badge.id] || 0} 
                  className={cn(
                    "h-1.5 transition-all duration-1000",
                    badge.unlocked ? "bg-primary/50" : "bg-muted"
                  )} 
                />
              </div>
            )}
            
            {badge.date && badge.unlocked && (
              <div className="mt-2 text-xs text-muted-foreground">
                Achieved on {badge.date}
              </div>
            )}
          </CardContent>
        )}
      </Card>
    );
  };
  
  return (
    <div className={cn(
      "grid gap-4",
      compact ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6" : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
    )}>
      {badges.map(renderBadge)}
    </div>
  );
};

export default AchievementBadges; 