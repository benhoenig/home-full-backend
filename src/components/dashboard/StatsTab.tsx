import React, { useState } from 'react';
import { Trophy, Star, ListChecks, Gauge, BookOpen, BarChart2, ChevronDown, DollarSign, Target, Users, ShoppingBag } from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import { Achiever, NewSalesData } from '@/components/leaderboard/data';
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type StatsTabProps = {
  salesData: Achiever | NewSalesData;
  type: 'leaderboard' | 'newSales';
};

const StatsTab: React.FC<StatsTabProps> = ({ salesData, type }) => {
  const [timeframe, setTimeframe] = useState('all-time');
  
  return (
    <div className="p-6 focus-visible:outline-none focus-visible:ring-0">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold flex items-center">
        <Trophy className="h-5 w-5 mr-2 text-primary" />
        Performance Statistics
      </h3>
        
        <Select value={timeframe} onValueChange={setTimeframe}>
          <SelectTrigger className="w-[130px] h-8 text-xs">
            <SelectValue placeholder="Timeline" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-time">All Time</SelectItem>
            <SelectItem value="this-month">This Month</SelectItem>
            <SelectItem value="last-month">Last Month</SelectItem>
            <SelectItem value="last-3-months">Last 3 Months</SelectItem>
            <SelectItem value="last-6-months">Last 6 Months</SelectItem>
            <SelectItem value="this-year">This Year</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {type === 'leaderboard' ? (
        <div className="space-y-6">
          {/* Revenue Section */}
          <div>
            <h4 className="text-sm font-medium mb-3 flex items-center text-muted-foreground">
              <DollarSign className="h-4 w-4 mr-1.5" />
              Revenue
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Total Sales</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">${(salesData as Achiever).sales.toLocaleString()}</span>
                  <div className="h-2 w-16 bg-slate-100 rounded-full">
                    <div 
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${Math.min(100, ((salesData as Achiever).sales / 350000) * 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm">Avg. Ticket Size</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">${(salesData as Achiever).ticketSize.toLocaleString()}</span>
                  <div className="h-2 w-16 bg-slate-100 rounded-full">
                    <div 
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${Math.min(100, ((salesData as Achiever).ticketSize / 25000) * 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <Separator />
          
          {/* Performance Section */}
          <div>
            <h4 className="text-sm font-medium mb-3 flex items-center text-muted-foreground">
              <Target className="h-4 w-4 mr-1.5" />
              Performance
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Conversion Rate</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{(salesData as Achiever).conversion}%</span>
                  <div className="h-2 w-16 bg-slate-100 rounded-full">
                    <div 
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${(salesData as Achiever).conversion}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm">Closed Cases</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{(salesData as Achiever).closedCases}</span>
                  <div className="h-2 w-16 bg-slate-100 rounded-full">
                    <div 
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${Math.min(100, ((salesData as Achiever).closedCases / 45) * 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <Separator />
          
          {/* Customer Satisfaction Section */}
          <div>
            <h4 className="text-sm font-medium mb-3 flex items-center text-muted-foreground">
              <Users className="h-4 w-4 mr-1.5" />
              Customer Satisfaction
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Buyer Satisfaction</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium flex items-center">
                    {(salesData as Achiever).buyerSatisfaction.toFixed(1)}
                    <Star className="h-3 w-3 text-amber-500 ml-1" fill="currentColor" />
                  </span>
                  <div className="h-2 w-16 bg-slate-100 rounded-full">
                    <div 
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${Math.min(100, ((salesData as Achiever).buyerSatisfaction / 5) * 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm">Owner Satisfaction</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium flex items-center">
                    {(salesData as Achiever).ownerSatisfaction.toFixed(1)}
                    <Star className="h-3 w-3 text-amber-500 ml-1" fill="currentColor" />
              </span>
                  <div className="h-2 w-16 bg-slate-100 rounded-full">
                    <div 
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${Math.min(100, ((salesData as Achiever).ownerSatisfaction / 5) * 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <Separator />
          
          {/* Actions Section - Added from new sales */}
          <div>
            <h4 className="text-sm font-medium mb-3 flex items-center text-muted-foreground">
              <ListChecks className="h-4 w-4 mr-1.5" />
              Actions
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">New Listings</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">12</span>
                  <div className="h-2 w-16 bg-slate-100 rounded-full">
                    <div 
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${Math.min(100, (12 / 15) * 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm">Owner Visits</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">8</span>
                  <div className="h-2 w-16 bg-slate-100 rounded-full">
                    <div 
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${Math.min(100, (8 / 10) * 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm">Project Presentations</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">9</span>
                  <div className="h-2 w-16 bg-slate-100 rounded-full">
                    <div 
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${Math.min(100, (9 / 12) * 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <Separator />
          
          {/* Skillset Section - Added from new sales */}
          <div>
            <h4 className="text-sm font-medium mb-3 flex items-center text-muted-foreground">
              <Gauge className="h-4 w-4 mr-1.5" />
              Skillset
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Owner Script</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">87%</span>
                  <div className="h-2 w-16 bg-slate-100 rounded-full">
                    <div 
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `87%` }}
                    ></div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm">Consulting Script</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">92%</span>
                  <div className="h-2 w-16 bg-slate-100 rounded-full">
                    <div 
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `92%` }}
                    ></div>
                  </div>
                </div>
              </div>
            
              <div className="flex justify-between items-center">
                <span className="text-sm">Buyer Script</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">85%</span>
                  <div className="h-2 w-16 bg-slate-100 rounded-full">
                    <div 
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `85%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <Separator />
          
          {/* Others Section - Added from new sales */}
          <div>
            <h4 className="text-sm font-medium mb-3 flex items-center text-muted-foreground">
              <BookOpen className="h-4 w-4 mr-1.5" />
              Others
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">HOME Academy Videos</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">18</span>
                  <div className="h-2 w-16 bg-slate-100 rounded-full">
                    <div 
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${Math.min(100, (18 / 20) * 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            
              <div className="flex justify-between items-center">
                <span className="text-sm">Real Cases with Senior</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">5</span>
                  <div className="h-2 w-16 bg-slate-100 rounded-full">
                    <div 
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${Math.min(100, (5 / 5) * 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <Separator />
          
          {/* Overall Performance */}
          <div>
            <h4 className="text-sm font-medium mb-3 flex items-center text-muted-foreground">
              <BarChart2 className="h-4 w-4 mr-1.5" />
              Overall Performance
            </h4>
            <div className="flex justify-between mb-2">
              <span className="text-sm">Performance Score</span>
              <span className="text-sm font-medium">
                {Math.round(
                  ((salesData as Achiever).conversion / 100) * 30 +
                  ((salesData as Achiever).sales / 350000) * 40 +
                  ((salesData as Achiever).buyerSatisfaction / 5) * 15 +
                  ((salesData as Achiever).ownerSatisfaction / 5) * 15
                )}/100
              </span>
            </div>
            <div className="bg-slate-100 rounded-full w-full h-2">
              <div 
                className="bg-primary h-2 rounded-full"
                style={{ 
                  width: `${Math.round(
                    ((salesData as Achiever).conversion / 100) * 30 +
                    ((salesData as Achiever).sales / 350000) * 40 +
                    ((salesData as Achiever).buyerSatisfaction / 5) * 15 +
                    ((salesData as Achiever).ownerSatisfaction / 5) * 15
                  )}%` 
                }}
              ></div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Actions Section */}
          <div>
            <h4 className="text-sm font-medium mb-3 flex items-center text-muted-foreground">
              <ListChecks className="h-4 w-4 mr-1.5" />
              Actions
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">New List</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{(salesData as NewSalesData).newList}</span>
                  <div className="h-2 w-16 bg-slate-100 rounded-full">
                    <div 
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${Math.min(100, ((salesData as NewSalesData).newList / 15) * 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm">Owner Visit</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{(salesData as NewSalesData).ownerVisit}</span>
                  <div className="h-2 w-16 bg-slate-100 rounded-full">
                    <div 
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${Math.min(100, ((salesData as NewSalesData).ownerVisit / 10) * 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm">Consult 2%</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{(salesData as NewSalesData).consult2}</span>
                  <div className="h-2 w-16 bg-slate-100 rounded-full">
                    <div 
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${Math.min(100, ((salesData as NewSalesData).consult2 / 8) * 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm">Consult 5%</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{(salesData as NewSalesData).consult5}</span>
                  <div className="h-2 w-16 bg-slate-100 rounded-full">
                    <div 
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${Math.min(100, ((salesData as NewSalesData).consult5 / 6) * 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm">Survey</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{(salesData as NewSalesData).survey}</span>
                  <div className="h-2 w-16 bg-slate-100 rounded-full">
                    <div 
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${Math.min(100, ((salesData as NewSalesData).survey / 7) * 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm">Present Project</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{(salesData as NewSalesData).presentProject}</span>
                  <div className="h-2 w-16 bg-slate-100 rounded-full">
                    <div 
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${Math.min(100, ((salesData as NewSalesData).presentProject / 12) * 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm">A List</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{(salesData as NewSalesData).aList}</span>
                  <div className="h-2 w-16 bg-slate-100 rounded-full">
                    <div 
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${Math.min(100, ((salesData as NewSalesData).aList / 5) * 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <Separator />
          
          {/* Skillset Section */}
          <div>
            <h4 className="text-sm font-medium mb-3 flex items-center text-muted-foreground">
              <Gauge className="h-4 w-4 mr-1.5" />
              Skillset
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Owner Script</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{(salesData as NewSalesData).ownerScript}%</span>
                  <div className="h-2 w-16 bg-slate-100 rounded-full">
                    <div 
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${(salesData as NewSalesData).ownerScript}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm">Consulting Script</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{(salesData as NewSalesData).consultingScript}%</span>
                  <div className="h-2 w-16 bg-slate-100 rounded-full">
                    <div 
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${(salesData as NewSalesData).consultingScript}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            
              <div className="flex justify-between items-center">
                <span className="text-sm">Buyer Script</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{(salesData as NewSalesData).buyerScript}%</span>
                  <div className="h-2 w-16 bg-slate-100 rounded-full">
                    <div 
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${(salesData as NewSalesData).buyerScript}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <Separator />
          
          {/* Others Section */}
          <div>
            <h4 className="text-sm font-medium mb-3 flex items-center text-muted-foreground">
              <BookOpen className="h-4 w-4 mr-1.5" />
              Others
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">HOME Academy Videos</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{(salesData as NewSalesData).academyVideo}</span>
                  <div className="h-2 w-16 bg-slate-100 rounded-full">
                    <div 
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${Math.min(100, ((salesData as NewSalesData).academyVideo / 20) * 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            
              <div className="flex justify-between items-center">
                <span className="text-sm">Real Cases with Senior</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{(salesData as NewSalesData).realCase}</span>
                  <div className="h-2 w-16 bg-slate-100 rounded-full">
                    <div 
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${Math.min(100, ((salesData as NewSalesData).realCase / 5) * 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <Separator />
          
          {/* Overall Performance */}
          <div>
            <h4 className="text-sm font-medium mb-3 flex items-center text-muted-foreground">
              <BarChart2 className="h-4 w-4 mr-1.5" />
              Overall Performance
            </h4>
            <div className="flex justify-between mb-2">
              <span className="text-sm">Total Performance Score</span>
              <span className="text-sm font-medium">
                {Math.round(
                  ((salesData as NewSalesData).newList / 15) * 10 +
                  ((salesData as NewSalesData).ownerScript / 100) * 25 +
                  ((salesData as NewSalesData).consultingScript / 100) * 15 +
                  ((salesData as NewSalesData).buyerScript / 100) * 15 +
                  ((salesData as NewSalesData).realCase / 5) * 10 +
                  ((salesData as NewSalesData).academyVideo / 20) * 10 +
                  ((salesData as NewSalesData).presentProject / 12) * 15
                )}/100
              </span>
            </div>
            <div className="bg-slate-100 rounded-full w-full h-2">
              <div 
                className="bg-primary h-2 rounded-full"
                style={{ 
                  width: `${Math.round(
                    ((salesData as NewSalesData).newList / 15) * 10 +
                    ((salesData as NewSalesData).ownerScript / 100) * 25 +
                    ((salesData as NewSalesData).consultingScript / 100) * 15 +
                    ((salesData as NewSalesData).buyerScript / 100) * 15 +
                    ((salesData as NewSalesData).realCase / 5) * 10 +
                    ((salesData as NewSalesData).academyVideo / 20) * 10 +
                    ((salesData as NewSalesData).presentProject / 12) * 15
                  )}%` 
                }}
              ></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatsTab; 