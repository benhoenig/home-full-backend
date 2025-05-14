
import React from 'react';
import { Medal } from 'lucide-react';
import { type AchievementLevel } from './AchievementBadgeCard';
import { Separator } from '@/components/ui/separator';

interface AchievementModalProps {
  currentLevel: AchievementLevel;
}

// Achievement criteria details
const achievementLevels = [
  {
    level: 'bronze',
    title: 'Bronze',
    streakRequired: '1-2 weeks',
    criteria: [
      'Lead A: Taking actions at least 1 time per week',
      'Lead B: Taking actions at least once per 2 weeks'
    ],
    colorClass: 'bg-[#FEC6A1]',
    textClass: 'text-amber-700'
  },
  {
    level: 'silver',
    title: 'Silver',
    streakRequired: '3-4 weeks',
    criteria: [
      'Lead A: Taking actions at least 1 time per week',
      'Lead B: Taking actions at least once per 2 weeks'
    ],
    colorClass: 'bg-[#F1F0FB]',
    textClass: 'text-gray-600'
  },
  {
    level: 'gold',
    title: 'Gold',
    streakRequired: '5-8 weeks',
    criteria: [
      'Lead A: Taking actions at least 2 times per week',
      'Lead B: Taking actions at least once per week'
    ],
    colorClass: 'bg-[#FEF7CD]',
    textClass: 'text-amber-600'
  },
  {
    level: 'platinum',
    title: 'Platinum',
    streakRequired: '9-12 weeks',
    criteria: [
      'Lead A: Taking actions at least 2 times per week',
      'Lead B: Taking actions at least once per week'
    ],
    colorClass: 'bg-[#D3E4FD]',
    textClass: 'text-blue-700'
  },
  {
    level: 'diamond',
    title: 'Diamond',
    streakRequired: '13+ weeks',
    criteria: [
      'Lead A: Taking actions at least 2 times per week',
      'Lead B: Taking actions at least once per week',
      'Maintain perfect follow-up consistency'
    ],
    colorClass: 'bg-[#E5DEFF]',
    textClass: 'text-purple-700'
  }
];

export function AchievementModal({ currentLevel }: AchievementModalProps) {
  return (
    <div className="py-2">
      <p className="text-sm text-muted-foreground mb-4">
        The achievement system rewards consistent engagement with your leads. 
        Your badge level is determined by how consistently you follow up with leads 
        according to their priority level.
      </p>

      <div className="space-y-4">
        <h3 className="text-md font-semibold">Achievement Levels</h3>
        
        {achievementLevels.map((achievement, index) => (
          <div 
            key={achievement.level}
            className={`rounded-lg p-3 ${
              achievement.level === currentLevel ? `${achievement.colorClass} bg-opacity-40 border-l-4 border-${achievement.level}` : ''
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-full ${achievement.colorClass} ${achievement.level === currentLevel ? '' : 'bg-opacity-40'}`}>
                <Medal className={`h-5 w-5 ${achievement.textClass}`} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <h4 className={`font-medium ${achievement.textClass}`}>{achievement.title}</h4>
                  <span className="text-sm text-muted-foreground">{achievement.streakRequired} streak</span>
                </div>
                <ul className="text-sm mt-2 space-y-1">
                  {achievement.criteria.map((criterion, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>{criterion}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            {index < achievementLevels.length - 1 && (
              <Separator className="mt-3" />
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-muted rounded-lg">
        <h3 className="text-md font-semibold mb-2">How Streaks Work</h3>
        <p className="text-sm">
          Your streak increases each week you meet the criteria for your current level.
          If you fail to meet the weekly criteria, your streak will reset. To advance to the next level, 
          you need to maintain your streak for the required number of weeks.
        </p>
      </div>
    </div>
  );
}

export default AchievementModal;
