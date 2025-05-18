import React from 'react';
import { Trophy, Star } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Achiever, NewSalesData } from '@/components/leaderboard/data';

type StatsTabProps = {
  salesData: Achiever | NewSalesData;
  type: 'leaderboard' | 'newSales';
};

const StatsTab: React.FC<StatsTabProps> = ({ salesData, type }) => {
  return (
    <div className="p-6 focus-visible:outline-none focus-visible:ring-0">
      <h3 className="text-lg font-semibold flex items-center mb-4">
        <Trophy className="h-5 w-5 mr-2 text-primary" />
        Performance Statistics
      </h3>
      
      {type === 'leaderboard' ? (
        <div className="space-y-5">
          <Card className="p-4 border">
            <div className="mb-2 flex justify-between">
              <span className="font-medium flex items-center">
                Total Revenue
              </span>
              <span className="font-semibold">${(salesData as Achiever).sales.toLocaleString()}</span>
            </div>
            <Progress value={Math.min(100, ((salesData as Achiever).sales / 350000) * 100)} className="h-2" />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>$0</span>
              <span>$175K</span>
              <span>$350K+</span>
            </div>
          </Card>
          
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="p-4 border">
              <div className="text-sm text-muted-foreground mb-1">Conversion Rate</div>
              <div className="flex justify-between items-center">
                <div className="font-semibold text-lg">{(salesData as Achiever).conversion}%</div>
                <Progress value={(salesData as Achiever).conversion} className="h-2 w-1/2" />
              </div>
            </Card>
            
            <Card className="p-4 border">
              <div className="text-sm text-muted-foreground mb-1">Closed Cases</div>
              <div className="flex justify-between items-center">
                <div className="font-semibold text-lg">{(salesData as Achiever).closedCases}</div>
                <Progress value={Math.min(100, ((salesData as Achiever).closedCases / 45) * 100)} className="h-2 w-1/2" />
              </div>
            </Card>
            
            <Card className="p-4 border">
              <div className="text-sm text-muted-foreground mb-1">Avg. Ticket Size</div>
              <div className="flex justify-between items-center">
                <div className="font-semibold text-lg">${(salesData as Achiever).ticketSize.toLocaleString()}</div>
                <Progress value={Math.min(100, ((salesData as Achiever).ticketSize / 25000) * 100)} className="h-2 w-1/2" />
              </div>
            </Card>
            
            <Card className="p-4 border">
              <div className="text-sm text-muted-foreground mb-1">Satisfaction Score</div>
              <div className="flex justify-between items-center">
                <div className="font-semibold text-lg flex items-center">
                  {(salesData as Achiever).buyerSatisfaction.toFixed(1)}
                  <Star className="h-4 w-4 text-amber-500 ml-1" fill="currentColor" />
                </div>
                <Progress value={Math.min(100, ((salesData as Achiever).buyerSatisfaction / 5) * 100)} className="h-2 w-1/2" />
              </div>
            </Card>
          </div>
        </div>
      ) : (
        <div className="space-y-5">
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="p-4 border">
              <div className="text-sm text-muted-foreground mb-1">New List</div>
              <div className="flex justify-between items-center">
                <div className="font-semibold text-lg">{(salesData as NewSalesData).newList}</div>
                <Progress value={Math.min(100, ((salesData as NewSalesData).newList / 15) * 100)} className="h-2 w-1/2" />
              </div>
            </Card>
            
            <Card className="p-4 border">
              <div className="text-sm text-muted-foreground mb-1">Owner Visit</div>
              <div className="flex justify-between items-center">
                <div className="font-semibold text-lg">{(salesData as NewSalesData).ownerVisit}</div>
                <Progress value={Math.min(100, ((salesData as NewSalesData).ownerVisit / 10) * 100)} className="h-2 w-1/2" />
              </div>
            </Card>
            
            <Card className="p-4 border">
              <div className="text-sm text-muted-foreground mb-1">Present Project</div>
              <div className="flex justify-between items-center">
                <div className="font-semibold text-lg">{(salesData as NewSalesData).presentProject}</div>
                <Progress value={Math.min(100, ((salesData as NewSalesData).presentProject / 10) * 100)} className="h-2 w-1/2" />
              </div>
            </Card>
            
            <Card className="p-4 border">
              <div className="text-sm text-muted-foreground mb-1">Owner Script</div>
              <div className="flex justify-between items-center">
                <div className="font-semibold text-lg">{(salesData as NewSalesData).ownerScript}%</div>
                <Progress value={(salesData as NewSalesData).ownerScript} className="h-2 w-1/2" />
              </div>
            </Card>
          </div>
          
          <Card className="p-4 border">
            <div className="flex justify-between mb-2">
              <div className="font-medium">Overall Performance Score</div>
              <div className="font-semibold">68/100</div>
            </div>
            <Progress value={68} className="h-2" />
          </Card>
        </div>
      )}
    </div>
  );
};

export default StatsTab; 