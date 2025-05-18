import React from 'react';
import { Card } from '@/components/ui/card';
import { Clock, Gift } from 'lucide-react';
import { formatTime } from './utils';
import { cn } from '@/lib/utils';

interface CountdownTimerCardProps {
  timeRemaining: number;
  variant?: 'orange' | 'ruby';
  className?: string;
}

export const CountdownTimerCard: React.FC<CountdownTimerCardProps> = ({ 
  timeRemaining,
  variant = 'orange',
  className
}) => {
  const time = formatTime(timeRemaining);
  
  // Determine gradient based on variant
  const bgGradient = variant === 'orange' 
    ? 'bg-gradient-to-r from-orange-600 via-orange-500 to-orange-400' 
    : 'bg-gradient-to-r from-rose-700 via-rose-600 to-rose-500';
  
  const cardBgClass = `${bgGradient} text-white rounded-xl overflow-hidden border-none shadow-lg`;
  const pillBgClass = variant === 'orange' ? 'bg-orange-500/30' : 'bg-rose-600/30';
  const pillBorderClass = variant === 'orange' ? 'border-orange-400/30' : 'border-rose-500/30';
  
  return (
    <Card className={cn(cardBgClass, className)}>
      <div className="p-4 flex flex-col md:flex-row items-center">
        {/* Timer Display */}
        <div className="flex-1">
          <div className="flex items-center mb-2">
            <Clock className="h-5 w-5 mr-2" />
            <h3 className="text-lg font-bold">REWARD COUNTDOWN</h3>
          </div>
          
          <div className="flex justify-center md:justify-start space-x-4 mb-3">
            <div className={`${pillBgClass} rounded-lg p-2 w-16 text-center backdrop-blur-sm shadow-inner`}>
              <div className="text-2xl font-bold">{time.days}</div>
              <div className="text-xs uppercase tracking-wider">Days</div>
            </div>
            
            <div className={`${pillBgClass} rounded-lg p-2 w-16 text-center backdrop-blur-sm shadow-inner`}>
              <div className="text-2xl font-bold">{time.hours}</div>
              <div className="text-xs uppercase tracking-wider">Hours</div>
            </div>
            
            <div className={`${pillBgClass} rounded-lg p-2 w-16 text-center backdrop-blur-sm shadow-inner`}>
              <div className="text-2xl font-bold">{time.minutes}</div>
              <div className="text-xs uppercase tracking-wider">Mins</div>
            </div>
            
            <div className={`${pillBgClass} rounded-lg p-2 w-16 text-center backdrop-blur-sm shadow-inner`}>
              <div className="text-2xl font-bold">{time.seconds}</div>
              <div className="text-xs uppercase tracking-wider">Secs</div>
            </div>
          </div>
          
          <p className="text-sm text-white/80">Race against time to win amazing rewards!</p>
        </div>
        
        {/* Reward Image/Icon */}
        <div className="mt-4 md:mt-0 md:ml-4">
          <div className={`${pillBgClass} p-3 rounded-full backdrop-blur-sm h-24 w-24 flex items-center justify-center border ${pillBorderClass}`}>
            <Gift className="h-12 w-12 text-white" />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CountdownTimerCard; 