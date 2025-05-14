
import React from 'react';
import StatsCard from '@/components/dashboard/StatsCard';
import AchievementBadgeCard from './AchievementBadgeCard';

export function StatsSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-0">
      {/* Achievement Badge Card - now in first position */}
      <AchievementBadgeCard 
        level="bronze"
        streakCount={2}
        progressToNext={60}
      />
      <StatsCard
        title="Lead B+ Overdue Follow :"
        stat="68/98"
      />
      <StatsCard
        title="Total Commission :"
        stat="$14,500,385"
      />
    </div>
  );
}

export default StatsSection;
