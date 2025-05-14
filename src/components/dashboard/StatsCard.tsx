
import React from 'react';
import { cn } from '@/lib/utils';

type StatsCardProps = {
  title: string;
  stat: string;
  subStat?: string;
  colorClass?: string;
  className?: string;
};

export function StatsCard({ title, stat, subStat, colorClass, className }: StatsCardProps) {
  return (
    <div className={cn("data-card flex flex-col", className)}>
      <span className="text-sm text-muted-foreground">{title}</span>
      <span className={cn("text-2xl font-bold mt-1", colorClass)}>{stat}</span>
      {subStat && (
        <span className="text-sm mt-1 text-muted-foreground">{subStat}</span>
      )}
    </div>
  );
}

export default StatsCard;
