import React from 'react';
import { Trophy, Medal, Award } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Achiever } from './data';
import { formatCurrency } from './utils';

interface AchieversModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  achievers: Achiever[];
}

export const AchieversModal: React.FC<AchieversModalProps> = ({
  open,
  onOpenChange,
  achievers
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center text-xl font-bold">
            <Trophy className="h-5 w-5 mr-2 text-amber-500" />
            Reward Achievers Leaderboard
          </DialogTitle>
        </DialogHeader>
        
        <div className="overflow-hidden rounded-lg border">
          <div className="bg-gradient-to-r from-teal-800 to-cyan-700 text-white py-3 px-4">
            <div className="grid grid-cols-12 text-sm font-medium">
              <div className="col-span-1 text-center">#</div>
              <div className="col-span-7">Salesperson</div>
              <div className="col-span-4 text-right">Sales</div>
            </div>
          </div>

          <div className="divide-y">
            {achievers.map((achiever) => (
              <div 
                key={achiever.id} 
                className={`grid grid-cols-12 py-3 px-4 items-center hover:bg-gray-50 transition-colors ${
                  achiever.rank <= 3 ? 'bg-amber-50' : ''
                }`}
              >
                <div className="col-span-1 text-center font-bold">
                  {achiever.rank === 1 && <Medal className="h-5 w-5 mx-auto text-amber-500" fill="currentColor" />}
                  {achiever.rank === 2 && <Medal className="h-5 w-5 mx-auto text-gray-400" fill="currentColor" />}
                  {achiever.rank === 3 && <Medal className="h-5 w-5 mx-auto text-amber-700" fill="currentColor" />}
                  {achiever.rank > 3 && achiever.rank}
                </div>
                <div className="col-span-7 flex items-center">
                  <div className="mr-3 text-lg">{achiever.avatar}</div>
                  <div>{achiever.name}</div>
                  {achiever.rank === 1 && (
                    <Award className="h-4 w-4 ml-2 text-amber-500" />
                  )}
                </div>
                <div className="col-span-4 text-right font-medium">
                  {formatCurrency(achiever.sales)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AchieversModal; 