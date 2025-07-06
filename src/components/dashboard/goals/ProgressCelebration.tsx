import React, { useState, useEffect } from 'react';
import { Trophy, Star, Award, Check, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

// Define milestone types
export type Milestone = {
  value: number;
  label: string;
  reached: boolean;
  message?: string;
};

type ProgressCelebrationProps = {
  title: string;
  description?: string;
  progress: number;
  previousProgress?: number;
  milestones: Milestone[];
  onClose?: () => void;
};

const ProgressCelebration: React.FC<ProgressCelebrationProps> = ({
  title,
  description,
  progress,
  previousProgress = 0,
  milestones,
  onClose,
}) => {
  const [animatedProgress, setAnimatedProgress] = useState(previousProgress);
  const [celebratingMilestone, setCelebratingMilestone] = useState<Milestone | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  
  // Find the latest milestone that was reached
  useEffect(() => {
    const reachedMilestones = milestones
      .filter(m => m.value <= progress && m.value > previousProgress)
      .sort((a, b) => b.value - a.value);
    
    if (reachedMilestones.length > 0) {
      setCelebratingMilestone(reachedMilestones[0]);
      setShowCelebration(true);
    }
  }, [progress, previousProgress, milestones]);
  
  // Animate progress bar
  useEffect(() => {
    if (animatedProgress < progress) {
      const interval = setInterval(() => {
        setAnimatedProgress(prev => {
          const increment = Math.max(1, Math.floor((progress - prev) / 10));
          return Math.min(prev + increment, progress);
        });
      }, 50);
      
      return () => clearInterval(interval);
    }
  }, [animatedProgress, progress]);
  
  // Handle close button click
  const handleClose = () => {
    setShowCelebration(false);
    if (onClose) {
      onClose();
    }
  };
  
  // If no celebration to show, return null
  if (!showCelebration) {
    return null;
  }
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-in fade-in duration-300">
      <Card className="max-w-md w-full mx-4 animate-in zoom-in-90 duration-500">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-2">
            <div className="relative">
              <div className="absolute inset-0 animate-ping rounded-full bg-primary/20"></div>
              <Badge className="h-12 w-12 rounded-full p-2 bg-primary text-primary-foreground">
                {celebratingMilestone?.value === 100 ? (
                  <Trophy className="h-8 w-8" />
                ) : celebratingMilestone?.value >= 75 ? (
                  <Award className="h-8 w-8" />
                ) : celebratingMilestone?.value >= 50 ? (
                  <Star className="h-8 w-8" />
                ) : (
                  <Check className="h-8 w-8" />
                )}
              </Badge>
            </div>
          </div>
          <CardTitle className="text-xl flex items-center justify-center gap-2">
            <span className="animate-pulse">
              {celebratingMilestone?.value === 100 ? '🎉 ' : 
               celebratingMilestone?.value >= 75 ? '🔥 ' : 
               celebratingMilestone?.value >= 50 ? '⭐ ' : '✓ '}
            </span>
            {celebratingMilestone?.value === 100 ? 'Goal Completed!' : 'Milestone Reached!'}
          </CardTitle>
          <CardDescription className="text-base font-medium">
            {title}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <p className="text-lg font-semibold">
              {celebratingMilestone?.message || 
                `You've reached the ${celebratingMilestone?.label} milestone!`}
            </p>
            <p className="text-muted-foreground mt-1">
              {description}
            </p>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <div className="flex items-center gap-1">
                <span className="font-medium">{animatedProgress}%</span>
                <Zap className={cn(
                  "h-4 w-4 transition-opacity",
                  animatedProgress < progress ? "opacity-100 text-amber-500" : "opacity-0"
                )} />
              </div>
            </div>
            <div className="relative">
              <Progress 
                value={animatedProgress} 
                className="h-3 transition-all duration-500" 
              />
              
              {/* Milestone markers */}
              {milestones.map((milestone, index) => (
                <div 
                  key={index} 
                  className={cn(
                    "absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full transform -translate-x-1/2",
                    milestone.value <= animatedProgress ? "bg-green-500" : "bg-gray-300",
                    milestone.value === celebratingMilestone?.value && "ring-2 ring-primary ring-offset-1 animate-pulse"
                  )}
                  style={{ left: `${milestone.value}%` }}
                >
                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs whitespace-nowrap">
                    {milestone.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={handleClose}>
            Continue
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProgressCelebration; 