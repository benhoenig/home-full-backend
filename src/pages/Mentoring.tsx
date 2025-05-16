import React, { useState, useEffect } from 'react';
import { Clipboard, ChevronDown, Users2, BarChart, Target, Plus, Minus } from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SalesProfileDrawer from "@/components/dashboard/SalesProfileDrawer";
import { NewSalesData, newSalesData } from "@/components/leaderboard/data";

// Mock data for current mentor's assigned sales (maximum 2)
const myMenteeData = [
  { 
    id: 3, 
    name: 'Michael Chen', 
    team: 'Gamma Team', 
    avatar: '👨‍💼', 
    image: '/avatars/michael.jpg',
    newList: 10,
    ownerVisit: 8,
    consult2: 6,
    consult5: 4,
    survey: 7,
    presentProject: 8,
    aList: 5,
    ownerScript: 85,
    consultingScript: 82,
    buyerScript: 88,
    academyVideo: 16,
    realCase: 4
  },
  { 
    id: 5, 
    name: 'David Kim', 
    team: 'Delta Team', 
    avatar: '👨‍💼', 
    image: '/avatars/david.jpg',
    newList: 9,
    ownerVisit: 6,
    consult2: 4,
    consult5: 2,
    survey: 3,
    presentProject: 7,
    aList: 1,
    ownerScript: 78,
    consultingScript: 80,
    buyerScript: 83,
    academyVideo: 10,
    realCase: 1
  }
];

// Target categories and their items
const targetCategories = [
  {
    name: "Actions",
    items: [
      { id: "newList", label: "New List", defaultTarget: 15 },
      { id: "ownerVisit", label: "Owner Visit", defaultTarget: 10 },
      { id: "consult2", label: "Consult 2%", defaultTarget: 8 },
      { id: "consult5", label: "Consult 5%", defaultTarget: 8 },
      { id: "survey", label: "Survey", defaultTarget: 6 },
      { id: "presentProject", label: "Present Project", defaultTarget: 10 },
      { id: "aList", label: "A List", defaultTarget: 5 }
    ]
  },
  {
    name: "Skillsets",
    items: [
      { id: "ownerScript", label: "Owner Script", defaultTarget: 100 },
      { id: "consultingScript", label: "Consulting Script", defaultTarget: 100 },
      { id: "buyerScript", label: "Buyer Script", defaultTarget: 100 }
    ]
  },
  {
    name: "Requirements",
    items: [
      { id: "academyVideo", label: "HOME Academy Video", defaultTarget: 15 },
      { id: "realCase", label: "Real Case with Senior", defaultTarget: 3 }
    ]
  }
];

const Mentoring = () => {
  const [newSalesMetric, setNewSalesMetric] = useState('Probation Progress');
  const [timeframe, setTimeframe] = useState('1st Month');
  const [selectedSales, setSelectedSales] = useState<NewSalesData | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(true); // Set to true since this is the mentoring page
  
  // Target setting states
  const [targetModalOpen, setTargetModalOpen] = useState(false);
  const [targetMentee, setTargetMentee] = useState<any | null>(null);
  const [targets, setTargets] = useState<Record<string, Record<string, number>>>({});
  
  // Initialize targets for each mentee with default values
  useEffect(() => {
    const initialTargets: Record<string, Record<string, number>> = {};
    
    myMenteeData.forEach(mentee => {
      initialTargets[mentee.id] = {};
      targetCategories.forEach(category => {
        category.items.forEach(item => {
          initialTargets[mentee.id][item.id] = item.defaultTarget;
        });
      });
    });
    
    setTargets(initialTargets);
  }, []);
  
  // Function to handle target updates
  const handleTargetChange = (itemId: string, value: string) => {
    if (!targetMentee) return;
    
    const newValue = parseInt(value) || 0;
    setTargets(prev => ({
      ...prev,
      [targetMentee.id]: {
        ...prev[targetMentee.id],
        [itemId]: newValue
      }
    }));
  };
  
  // Function to increment or decrement target value
  const adjustTarget = (itemId: string, adjustment: number) => {
    if (!targetMentee) return;
    
    setTargets(prev => {
      const currentValue = prev[targetMentee.id][itemId] || 0;
      const newValue = Math.max(0, currentValue + adjustment);
      
      return {
        ...prev,
        [targetMentee.id]: {
          ...prev[targetMentee.id],
          [itemId]: newValue
        }
      };
    });
  };
  
  // Prevent row click when clicking the target button
  const handleTargetButtonClick = (e: React.MouseEvent, person: any) => {
    e.stopPropagation();
    setTargetMentee(person);
    setTargetModalOpen(true);
  };
  
  // Helper function to get the appropriate new sales metric value
  const getNewSalesMetricValue = (data: any, type: string) => {
    switch(type) {
      case 'Probation Progress':
        // Calculate probation progress based on position in timeframe
        // For demo, we'll use a formula based on existing metrics
        const progressScore = Math.floor((
          (data.newList / 15) * 20 + 
          (data.ownerScript / 100) * 25 + 
          (data.consultingScript / 100) * 20 + 
          (data.buyerScript / 100) * 20 +
          (data.realCase / 3) * 15
        ));
        return `${Math.min(progressScore, 100)}%`;
      case 'New List (Count)':
        return data.newList;
      case 'Owner Visit (Count)':
        return data.ownerVisit;
      case 'Consult 2% (Count)':
        return data.consult2;
      case 'Consult 5% (Count)':
        return data.consult5;
      case 'Survey (Count)':
        return data.survey;
      case 'Present Project (Count)':
        return data.presentProject;
      case 'A List (Count)':
        return data.aList;
      case 'Owner Script (Percentage)':
        return `${data.ownerScript}%`;
      case 'Consulting Script (Percentage)':
        return `${data.consultingScript}%`;
      case 'Buyer Script (Percentage)':
        return `${data.buyerScript}%`;
      case 'HOME Academy Video Watched (Count)':
        return data.academyVideo;
      case 'Real Case with Senior (Count)':
        return data.realCase;
      default:
        return data.newList;
    }
  };
  
  return (
    <DashboardLayout 
      title="Mentoring"
    >
      <div className="pt-4 px-2">
        {/* Filters and Controls */}
        <div className="flex flex-col md:flex-row justify-between mb-6">
          <h2 className="text-xl font-bold flex items-center mb-3 md:mb-0">
            <Users2 className="h-5 w-5 mr-2 text-primary" />
            My Mentees
          </h2>
          
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-3">
            {/* Metric Type Dropdown */}
            <Select value={newSalesMetric} onValueChange={setNewSalesMetric}>
              <SelectTrigger className="w-full md:w-[250px]">
                <SelectValue placeholder="Select Metric" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Probation Progress">Probation Progress</SelectItem>
                <SelectItem value="New List (Count)">New List (Count)</SelectItem>
                <SelectItem value="Owner Visit (Count)">Owner Visit (Count)</SelectItem>
                <SelectItem value="Consult 2% (Count)">Consult 2% (Count)</SelectItem>
                <SelectItem value="Consult 5% (Count)">Consult 5% (Count)</SelectItem>
                <SelectItem value="Survey (Count)">Survey (Count)</SelectItem>
                <SelectItem value="Present Project (Count)">Present Project (Count)</SelectItem>
                <SelectItem value="A List (Count)">A List (Count)</SelectItem>
                <SelectItem value="Owner Script (Percentage)">Owner Script (Percentage)</SelectItem>
                <SelectItem value="Consulting Script (Percentage)">Consulting Script (Percentage)</SelectItem>
                <SelectItem value="Buyer Script (Percentage)">Buyer Script (Percentage)</SelectItem>
                <SelectItem value="HOME Academy Video Watched (Count)">HOME Academy Video Watched (Count)</SelectItem>
                <SelectItem value="Real Case with Senior (Count)">Real Case with Senior (Count)</SelectItem>
              </SelectContent>
            </Select>
            
            {/* Timeframe Selection */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center justify-between">
                  {timeframe}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTimeframe('1st Month')}>
                  1st Month
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTimeframe('2nd Month')}>
                  2nd Month
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTimeframe('3rd Month')}>
                  3rd Month
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTimeframe('Total Probation')}>
                  Total Probation
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        {/* Mentee Sales Table */}
        <div className="bg-white rounded-lg border shadow overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '50px' }}>#</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th scope="col" className="hidden md:table-cell px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Team</th>
                <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">{newSalesMetric}</th>
                <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <span className="hidden md:inline">Progress</span>
                  <span className="md:hidden">Prog.</span>
                </th>
                <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Targets
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {myMenteeData.map((person, index) => {
                // Calculate progress percentage based on metric type
                const metricValue = getNewSalesMetricValue(person, newSalesMetric);
                let progressPercentage = 0;
                let target = 0;
                
                if (newSalesMetric === 'Probation Progress' || newSalesMetric.includes('Percentage')) {
                  progressPercentage = parseInt(metricValue);
                  target = 100;
                } else {
                  // Different targets based on metric type
                  switch(newSalesMetric) {
                    case 'New List (Count)':
                      target = targets[person.id]?.newList || 15;
                      break;
                    case 'Owner Visit (Count)':
                      target = targets[person.id]?.ownerVisit || 10;
                      break;
                    case 'Consult 2% (Count)':
                      target = targets[person.id]?.consult2 || 8;
                      break;
                    case 'Consult 5% (Count)':
                      target = targets[person.id]?.consult5 || 8;
                      break;
                    case 'Survey (Count)':
                      target = targets[person.id]?.survey || 6;
                      break;
                    case 'Present Project (Count)':
                      target = targets[person.id]?.presentProject || 10;
                      break;
                    case 'A List (Count)':
                      target = targets[person.id]?.aList || 5;
                      break;
                    case 'Owner Script (Percentage)':
                      target = targets[person.id]?.ownerScript || 100;
                      break;
                    case 'Consulting Script (Percentage)':
                      target = targets[person.id]?.consultingScript || 100;
                      break;
                    case 'Buyer Script (Percentage)':
                      target = targets[person.id]?.buyerScript || 100;
                      break;
                    case 'HOME Academy Video Watched (Count)':
                      target = targets[person.id]?.academyVideo || 15;
                      break;
                    case 'Real Case with Senior (Count)':
                      target = targets[person.id]?.realCase || 3;
                      break;
                    default:
                      target = 10;
                  }
                  progressPercentage = (parseInt(metricValue) / target) * 100;
                }
                
                return (
                  <tr 
                    key={person.id} 
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => {
                      setSelectedSales(person);
                      setIsDrawerOpen(true);
                    }}
                  >
                    {/* Rank */}
                    <td className="px-4 py-3 whitespace-nowrap text-center text-sm font-medium text-gray-500">
                      {index + 1}
                    </td>
                    
                    {/* Name with Avatar */}
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center">
                        <Avatar className="h-6 w-6 md:h-8 md:w-8 mr-2 md:mr-3 flex-shrink-0">
                          <AvatarImage src={person.image} alt={person.name} />
                          <AvatarFallback>{person.avatar}</AvatarFallback>
                        </Avatar>
                        <div className="truncate">
                          <div className="font-medium text-sm md:text-base text-gray-900">{person.name}</div>
                          <div className="hidden md:block text-xs text-gray-500">Sales Executive</div>
                        </div>
                      </div>
                    </td>
                    
                    {/* Team - Hidden on mobile */}
                    <td className="hidden md:table-cell px-4 py-3 whitespace-nowrap font-medium text-sm text-gray-900">
                      {person.team}
                    </td>
                    
                    {/* Primary Metric */}
                    <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                      {metricValue}
                    </td>
                    
                    {/* Progress */}
                    <td className="px-4 py-3 whitespace-nowrap">
                      {/* Desktop Progress Bar */}
                      <div className="hidden md:block">
                        <div className="flex items-center">
                          <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
                            <div 
                              className={`h-3 rounded-full ${
                                progressPercentage >= 100 ? 'bg-gradient-to-r from-green-500 to-green-400' : 
                                progressPercentage >= 75 ? 'bg-gradient-to-r from-teal-600 to-teal-500' : 
                                progressPercentage >= 50 ? 'bg-gradient-to-r from-amber-500 to-amber-400' : 
                                'bg-gradient-to-r from-rose-600 to-rose-500'
                              }`} 
                              style={{ width: `${Math.min(100, progressPercentage)}%` }}
                            ></div>
                          </div>
                          <span className="ml-2 min-w-[50px] text-right text-sm">
                            {parseInt(metricValue)}/{target}
                          </span>
                        </div>
                        <div className="flex justify-between text-xs text-gray-400 mt-1">
                          <span>0</span>
                          <span>{target/2}</span>
                          <span>{target}</span>
                        </div>
                      </div>
                      
                      {/* Mobile Progress Indicator */}
                      <div className="md:hidden flex justify-center">
                        <div className="inline-flex items-center">
                          <div 
                            className={`h-2 w-2 rounded-full mr-1 ${
                              progressPercentage >= 100 ? 'bg-green-500' : 
                              progressPercentage >= 75 ? 'bg-teal-600' : 
                              progressPercentage >= 50 ? 'bg-amber-500' : 
                              'bg-rose-600'
                            }`}
                          ></div>
                          <span className="text-xs whitespace-nowrap">
                            {parseInt(metricValue)}/{target}
                          </span>
                        </div>
                      </div>
                    </td>
                    
                    {/* Target Setting Button */}
                    <td className="px-4 py-3 whitespace-nowrap text-center">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-teal-600 hover:text-teal-700 hover:bg-teal-50"
                        onClick={(e) => handleTargetButtonClick(e, person)}
                      >
                        <Target className="h-5 w-5" />
                        <span className="sr-only">Set Targets</span>
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Target Setting Modal */}
        <Dialog open={targetModalOpen} onOpenChange={setTargetModalOpen}>
          <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <Target className="h-5 w-5 mr-2 text-teal-600" />
                Set Targets for {targetMentee?.name} - {timeframe}
              </DialogTitle>
              <DialogDescription>
                Set monthly targets for all performance metrics. These targets will be used to calculate progress.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6 py-4">
              {targetCategories.map((category) => (
                <div key={category.name} className="space-y-4">
                  <h3 className="text-md font-medium border-b pb-2">{category.name}</h3>
                  
                  <div className="space-y-3">
                    {category.items.map((item) => (
                      <div key={item.id} className="grid grid-cols-4 items-center gap-2">
                        <label htmlFor={item.id} className="text-sm font-medium col-span-2">
                          {item.label}:
                        </label>
                        <div className="flex items-center space-x-1 col-span-2">
                          <Button 
                            type="button" 
                            variant="outline" 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={() => adjustTarget(item.id, -1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <Input 
                            id={item.id}
                            type="number" 
                            className="h-8 text-center"
                            value={targetMentee ? targets[targetMentee.id]?.[item.id] || item.defaultTarget : item.defaultTarget}
                            onChange={(e) => handleTargetChange(item.id, e.target.value)}
                            min={0}
                          />
                          <Button 
                            type="button" 
                            variant="outline" 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={() => adjustTarget(item.id, 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setTargetModalOpen(false)}
              >
                Close
              </Button>
              <Button 
                onClick={() => setTargetModalOpen(false)}
                className="bg-teal-600 hover:bg-teal-700"
              >
                Save Targets
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Mentee Profile Drawer with editing capabilities */}
        {selectedSales && (
          <SalesProfileDrawer
            isOpen={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
            salesData={selectedSales}
            type="newSales"
            canEditComments={isEditing}
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export default Mentoring; 