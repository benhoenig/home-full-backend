import React from 'react';

type ProgressBarProps = {
  value: number;
  height?: 'sm' | 'md';
  color?: 'teal' | 'amber' | 'rose';
  showLabels?: boolean;
  startLabel?: string;
  endLabel?: string;
};

const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  height = 'sm',
  color = 'teal',
  showLabels = false,
  startLabel = 'Start',
  endLabel = 'Goal'
}) => {
  const getColorClass = () => {
    switch(color) {
      case 'teal': return 'bg-teal-600';
      case 'amber': return 'bg-amber-500';
      case 'rose': return 'bg-rose-600';
      default: return 'bg-teal-600';
    }
  };
  
  const getHeightClass = () => {
    return height === 'md' ? 'h-3' : 'h-2';
  };
  
  return (
    <div>
      <div className="bg-slate-100 rounded-full w-full">
        <div 
          className={`${getColorClass()} ${getHeightClass()} rounded-full`} 
          style={{ width: `${Math.min(100, value)}%` }}
        ></div>
      </div>
      
      {showLabels && (
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>{startLabel}</span>
          <span>{endLabel}</span>
        </div>
      )}
    </div>
  );
};

export default ProgressBar; 