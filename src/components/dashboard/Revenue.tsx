
import React from 'react';

type RevenueProps = {
  title: string;
  current: number;
  target: number;
  percentage: number;
};

export function Revenue({ title, current, target, percentage }: RevenueProps) {
  const formattedCurrent = new Intl.NumberFormat('en-US', { 
    style: 'currency', 
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(current);

  const formattedTarget = new Intl.NumberFormat('en-US', { 
    style: 'currency', 
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(target);

  return (
    <div className="w-full mb-4">
      <div className="flex justify-between mb-2 items-center">
        <span className="font-medium text-sm">{title}</span>
        <span className="text-right">
          <span className="font-semibold">{formattedCurrent} / {formattedTarget}</span>
          <span className="text-muted-foreground ml-2">({percentage}%)</span>
        </span>
      </div>
      <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
        <div 
          className="h-full progress-bar-gradient rounded-full"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}

export default Revenue;
