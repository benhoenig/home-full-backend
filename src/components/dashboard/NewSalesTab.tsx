import React, { useState } from 'react';
import {
  LineChart,
  ChevronDown,
  ChevronRight,
  ListChecks,
  Building,
  Users,
  ClipboardCheck,
  Presentation,
  Book,
  FileText,
  Video,
  Users2,
  BarChart
} from 'lucide-react';
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SalesProfileDrawer from "./SalesProfileDrawer";
import { NewSalesData } from "@/components/leaderboard/data";

// Mock data for the new sales tracking
const newSalesData = [
  { 
    id: 1, 
    name: 'Alex Johnson', 
    team: 'Alpha Team', 
    avatar: '👨‍💼', 
    image: '/avatars/alex.jpg',
    newList: 14,
    ownerVisit: 10,
    consult2: 8,
    consult5: 6,
    survey: 5,
    presentProject: 12,
    aList: 4,
    ownerScript: 92,
    consultingScript: 88,
    buyerScript: 90,
    academyVideo: 15,
    realCase: 3
  },
  { 
    id: 2, 
    name: 'Sarah Williams', 
    team: 'Beta Team', 
    avatar: '👩‍💼', 
    image: '/avatars/sarah.jpg',
    newList: 12,
    ownerVisit: 9,
    consult2: 7,
    consult5: 5,
    survey: 6,
    presentProject: 10,
    aList: 3,
    ownerScript: 88,
    consultingScript: 90,
    buyerScript: 86,
    academyVideo: 14,
    realCase: 2
  },
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
    id: 4, 
    name: 'Emma Rodriguez', 
    team: 'Alpha Team', 
    avatar: '👩‍💼', 
    image: '/avatars/emma.jpg',
    newList: 11,
    ownerVisit: 7,
    consult2: 5,
    consult5: 3,
    survey: 4,
    presentProject: 9,
    aList: 2,
    ownerScript: 80,
    consultingScript: 84,
    buyerScript: 82,
    academyVideo: 12,
    realCase: 2
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

interface NewSalesTabProps {
  timeframe: string;
  setTimeframe: (value: string) => void;
}

const NewSalesTab: React.FC<NewSalesTabProps> = ({ timeframe, setTimeframe }) => {
  const [newSalesMetric, setNewSalesMetric] = useState('Probation Progress');
  const [selectedSales, setSelectedSales] = useState<NewSalesData | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
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

  // Helper function to get the appropriate icon based on selected new sales metric
  const getNewSalesMetricIcon = (type: string) => {
    switch(type) {
      case 'Probation Progress':
        return <BarChart className="h-4 w-4" />;
      case 'New List (Count)':
        return <ListChecks className="h-4 w-4" />;
      case 'Owner Visit (Count)':
        return <Building className="h-4 w-4" />;
      case 'Consult 2% (Count)':
      case 'Consult 5% (Count)':
        return <Users className="h-4 w-4" />;
      case 'Survey (Count)':
        return <ClipboardCheck className="h-4 w-4" />;
      case 'Present Project (Count)':
        return <Presentation className="h-4 w-4" />;
      case 'A List (Count)':
        return <Book className="h-4 w-4" />;
      case 'Owner Script (Percentage)':
      case 'Consulting Script (Percentage)':
      case 'Buyer Script (Percentage)':
        return <FileText className="h-4 w-4" />;
      case 'HOME Academy Video Watched (Count)':
        return <Video className="h-4 w-4" />;
      case 'Real Case with Senior (Count)':
        return <Users2 className="h-4 w-4" />;
      default:
        return <LineChart className="h-4 w-4" />;
    }
  };
  
  return (
    <div className="pt-4 px-2">
      {/* Filters and Controls */}
      <div className="flex flex-col md:flex-row justify-between mb-6">
        <h2 className="text-xl font-bold flex items-center mb-3 md:mb-0">
          <LineChart className="h-5 w-5 mr-2 text-teal-600" />
          New Sales Tracker
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
      
      {/* New Sales Table - Single responsive table */}
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
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {newSalesData.map((person, index) => {
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
                    target = 15;
                    break;
                  case 'Owner Visit (Count)':
                    target = 10;
                    break;
                  case 'Consult 2% (Count)':
                  case 'Consult 5% (Count)':
                    target = 8;
                    break;
                  case 'Survey (Count)':
                    target = 6;
                    break;
                  case 'Present Project (Count)':
                    target = 10;
                    break;
                  case 'A List (Count)':
                    target = 5;
                    break;
                  case 'HOME Academy Video Watched (Count)':
                    target = 15;
                    break;
                  case 'Real Case with Senior (Count)':
                    target = 3;
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
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Sales Profile Drawer */}
      <SalesProfileDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        salesData={selectedSales}
        type="newSales"
      />
    </div>
  );
};

export default NewSalesTab; 