import React from 'react';

type TeamRevenueProps = {
  title: string;
  name: string;
  current: number;
  target: number;
  percentage: number;
  isTotal: boolean;
};

export function TeamRevenue({ title, name, current, target, percentage, isTotal }: TeamRevenueProps) {
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
    <div className="w-full">
      <div className="flex justify-between mb-2 items-center">
        <span className="font-medium text-sm">
          {title} 
          {name && <span className={isTotal ? "font-semibold" : ""}>{name}</span>}
        </span>
        <span className="text-right">
          <span className={`${isTotal ? "font-bold text-base" : "font-semibold"}`}>
            {formattedCurrent} / {formattedTarget}
          </span>
          <span className={`text-muted-foreground ml-2 ${isTotal ? "font-medium" : ""}`}>
            ({percentage}%)
          </span>
        </span>
      </div>
      <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
        <div 
          className={`h-full ${isTotal ? "bg-blue-500" : "progress-bar-gradient"} rounded-full`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}

export default TeamRevenue; 