import React from 'react';
import { Calendar } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Achiever, NewSalesData } from '@/components/leaderboard/data';

type LogTabProps = {
  salesData: Achiever | NewSalesData;
};

const LogTab: React.FC<LogTabProps> = ({ salesData }) => {
  return (
    <div className="p-6 focus-visible:outline-none focus-visible:ring-0">
      <h3 className="text-lg font-semibold flex items-center mb-4">
        <Calendar className="h-5 w-5 mr-2 text-primary" />
        Activity Log
      </h3>
      
      <div className="relative pl-6 border-l border-border space-y-6">
        <div className="relative">
          <div className="absolute w-3 h-3 bg-primary rounded-full -left-[25px] top-1"></div>
          <div className="mb-1">
            <h4 className="font-medium">Completed Training Session</h4>
            <p className="text-sm text-muted-foreground">May 10, 2023 - 10:30 AM</p>
          </div>
          <Card className="p-3 border text-sm">
            <p>Completed advanced negotiation training with score 92%</p>
          </Card>
        </div>
        
        <div className="relative">
          <div className="absolute w-3 h-3 bg-primary rounded-full -left-[25px] top-1"></div>
          <div className="mb-1">
            <h4 className="font-medium">Closed Deal</h4>
            <p className="text-sm text-muted-foreground">May 5, 2023 - 3:15 PM</p>
          </div>
          <Card className="p-3 border text-sm">
            <p>Closed deal with client #4582 for $240,000</p>
          </Card>
        </div>
        
        <div className="relative">
          <div className="absolute w-3 h-3 bg-primary rounded-full -left-[25px] top-1"></div>
          <div className="mb-1">
            <h4 className="font-medium">New Lead Assignment</h4>
            <p className="text-sm text-muted-foreground">April 28, 2023 - 9:45 AM</p>
          </div>
          <Card className="p-3 border text-sm">
            <p>Assigned to new lead from online campaign</p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LogTab; 