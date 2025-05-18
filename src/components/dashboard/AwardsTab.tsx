import React from 'react';
import { Trophy, Medal, Star } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Achiever } from '@/components/leaderboard/data';

type AwardsTabProps = {
  salesData: Achiever;
};

const AwardsTab: React.FC<AwardsTabProps> = ({ salesData }) => {
  return (
    <div className="p-6 focus-visible:outline-none focus-visible:ring-0">
      <h3 className="text-lg font-semibold flex items-center mb-4">
        <Trophy className="h-5 w-5 mr-2 text-primary" />
        Awards & Recognitions
      </h3>
      
      <div className="space-y-4">
        <Card className="p-4 border">
          <div className="flex items-start">
            <div className="bg-amber-500 p-2 rounded-full mr-4">
              <Trophy className="h-6 w-6 text-white" />
            </div>
            <div>
              <h4 className="font-semibold">Top Salesperson of the Quarter</h4>
              <p className="text-sm text-muted-foreground">Q1 2023</p>
              <p className="text-sm mt-1">Achieved highest sales volume among all sales executives.</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 border">
          <div className="flex items-start">
            <div className="bg-gray-400 p-2 rounded-full mr-4">
              <Medal className="h-6 w-6 text-white" />
            </div>
            <div>
              <h4 className="font-semibold">Excellence in Customer Satisfaction</h4>
              <p className="text-sm text-muted-foreground">December 2022</p>
              <p className="text-sm mt-1">Maintained a perfect 5.0 customer rating for 3 consecutive months.</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 border">
          <div className="flex items-start">
            <div className="bg-teal-600 p-2 rounded-full mr-4">
              <Star className="h-6 w-6 text-white" />
            </div>
            <div>
              <h4 className="font-semibold">Rookie of the Year</h4>
              <p className="text-sm text-muted-foreground">2022</p>
              <p className="text-sm mt-1">Outstanding performance in first year with the company.</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AwardsTab; 