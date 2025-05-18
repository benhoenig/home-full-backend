import React from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ClipboardList } from 'lucide-react';
import ProgressBar from '../SalesProgressBar';

const ProbationTab: React.FC = () => {
  return (
    <div className="p-6 focus-visible:outline-none focus-visible:ring-0">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center">
          <ClipboardList className="h-5 w-5 mr-2 text-primary" />
          Probation Status
        </h3>
        <Badge className="bg-amber-500">In Progress</Badge>
      </div>
      
      <div className="space-y-5">
        {/* Probation Progress Card */}
        <Card className="p-4 border">
          <div className="mb-2 flex justify-between">
            <span className="font-medium">Probation Progress</span>
            <span className="font-semibold text-teal-600">67%</span>
          </div>
          <ProgressBar 
            value={67} 
            color="teal" 
            showLabels={true} 
            endLabel="Goal: 80%" 
          />
        </Card>

        {/* Probation Period Card */}
        <Card className="p-4 border">
          <div className="mb-2 flex justify-between">
            <span className="font-medium">Probation Period (3 months)</span>
            <span className="font-semibold text-amber-500">Month 2</span>
          </div>
          <div className="relative">
            <div className="bg-slate-100 rounded-full w-full h-3">
              <div 
                className="bg-amber-500 h-3 rounded-full"
                style={{ width: '50%' }}
              ></div>
            </div>
            
            {/* Month Indicators */}
            <div className="absolute top-0 left-0 right-0 h-full flex">
              {/* Month 1 divider */}
              <div className="w-1/3 h-full relative">
                <div className="absolute right-0 top-0 bottom-0 w-[2px] bg-white z-10"></div>
                <div className="absolute top-full mt-1 left-1/2 -translate-x-1/2 text-xs text-muted-foreground">Month 1</div>
              </div>
              
              {/* Month 2 divider */}
              <div className="w-1/3 h-full relative">
                <div className="absolute right-0 top-0 bottom-0 w-[2px] bg-white z-10"></div>
                <div className="absolute top-full mt-1 left-1/2 -translate-x-1/2 text-xs text-muted-foreground">Month 2</div>
              </div>
              
              {/* Month 3 */}
              <div className="w-1/3 h-full relative">
                <div className="absolute top-full mt-1 left-1/2 -translate-x-1/2 text-xs text-muted-foreground">Month 3</div>
              </div>
            </div>
            
            {/* Current position indicator */}
            <div className="absolute top-0 left-[50%] h-3 w-3 rounded-full bg-white border-2 border-amber-500 -translate-x-1/2 z-20"></div>
          </div>
          <div className="flex justify-between text-xs text-muted-foreground mt-6">
            <span>Jan 15, 2023</span>
            <span>Apr 15, 2023</span>
          </div>
        </Card>
        
        {/* Monthly Progress Cards */}
        <Card className="p-4 border">
          <div className="mb-2 flex justify-between">
            <span className="font-medium">1st Month Progress:</span>
            <span className="font-semibold text-teal-600">75%</span>
          </div>
          <ProgressBar value={75} color="teal" />
        </Card>
        
        <Card className="p-4 border">
          <div className="mb-2 flex justify-between">
            <span className="font-medium">2nd Month Progress:</span>
            <span className="font-semibold text-amber-500">50%</span>
          </div>
          <ProgressBar value={50} color="amber" />
        </Card>
        
        <Card className="p-4 border">
          <div className="mb-2 flex justify-between">
            <span className="font-medium">3rd Month Progress:</span>
            <span className="font-semibold text-rose-600">25%</span>
          </div>
          <ProgressBar value={25} color="rose" />
        </Card>
        
        <div className="mt-6">
          <h4 className="font-medium mb-2">Probation Requirements</h4>
          <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
            <li>Complete all training modules</li>
            <li>Achieve minimum 10 new listings</li>
            <li>Maintain 80% script performance</li>
            <li>Complete 3 real cases with senior agent</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProbationTab; 