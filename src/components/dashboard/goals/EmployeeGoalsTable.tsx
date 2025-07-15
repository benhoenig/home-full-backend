import React from 'react';
import { ChevronRight, Trophy, Target } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

// Define types for the component
export interface Employee {
  id: number;
  name: string;
  division: string;
  position: string;
  avatar: string;
  image: string;
  goalsCompleted: number;
  goalsInProgress: number;
  totalPoints: number;
  lastGoalAchieved: string;
}

interface EmployeeGoalsTableProps {
  employees: Employee[];
  onSelectEmployee?: (employee: Employee) => void;
  className?: string;
}

export const EmployeeGoalsTable: React.FC<EmployeeGoalsTableProps> = ({
  employees,
  onSelectEmployee,
  className
}) => {
  if (employees.length === 0) return null;

  const handleRowClick = (employee: Employee) => {
    if (onSelectEmployee) {
      onSelectEmployee(employee);
    }
  };
  
  return (
    <div className={cn("bg-white rounded-lg border shadow overflow-hidden", className)}>
      {/* Table Header */}
      <div className="bg-gray-50 border-b">
        <div className="grid grid-cols-12 py-3 px-4 text-sm font-medium text-gray-500">
          <div className="col-span-1 text-center">Rank</div>
          <div className="col-span-3">Name</div>
          <div className="col-span-2">Division</div>
          <div className="col-span-2">Position</div>
          <div className="col-span-1 text-center">
            <Trophy className="h-4 w-4 inline-block" />
          </div>
          <div className="col-span-2 text-center">
            <Target className="h-4 w-4 inline-block" />
          </div>
          <div className="col-span-1"></div> {/* For action buttons */}
        </div>
      </div>
      
      {/* Table Body */}
      <div className="divide-y">
        {employees.map((employee, index) => (
          <div 
            key={employee.id} 
            className="grid grid-cols-12 py-3 px-4 items-center hover:bg-gray-50 cursor-pointer" 
            onClick={() => handleRowClick(employee)}
          >
            {/* Rank */}
            <div className="col-span-1 text-center font-medium text-gray-500">
              {index + 1}
            </div>
            
            {/* Name with Avatar */}
            <div className="col-span-3 flex items-center">
              <Avatar className="h-8 w-8 mr-3">
                <AvatarImage src={employee.image} alt={employee.name} />
                <AvatarFallback>{employee.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{employee.name}</div>
                <div className="text-xs text-muted-foreground">Last achievement: {employee.lastGoalAchieved}</div>
              </div>
            </div>
            
            {/* Division */}
            <div className="col-span-2">
              <Badge variant="outline" className="font-normal">
                {employee.division}
              </Badge>
            </div>
            
            {/* Position */}
            <div className="col-span-2 font-medium">
              {employee.position}
            </div>
            
            {/* Goals Completed */}
            <div className="col-span-1 text-center">
              <span className="font-medium">{employee.goalsCompleted}</span>
            </div>
            
            {/* Goals In Progress */}
            <div className="col-span-2 text-center">
              <div className="flex items-center justify-center">
                <span className="font-medium">{employee.goalsInProgress}</span>
                <span className="text-xs text-muted-foreground ml-1">in progress</span>
              </div>
            </div>
            
            {/* Action Button */}
            <div className="col-span-1 text-right">
              <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700 p-1 h-8 w-8">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeGoalsTable; 