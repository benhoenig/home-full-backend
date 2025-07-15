import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, MessageSquare, Trophy, Target, Star } from 'lucide-react';
import { Employee } from './EmployeeGoalsTable';
import { Goal } from './GoalCard';
import GoalCard from './GoalCard';
import { renderIcon } from './utils.tsx';
import EmployeeGoalDetailsModal from './EmployeeGoalDetailsModal';

interface EmployeeGoalsViewProps {
  employee: Employee;
  goals: Goal[];
  onBack: () => void;
  onAddComment: (goalId: number, comment: string) => void;
}

const EmployeeGoalsView: React.FC<EmployeeGoalsViewProps> = ({
  employee,
  goals,
  onBack,
  onAddComment
}) => {
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [isGoalDetailsOpen, setIsGoalDetailsOpen] = useState(false);
  
  const handleGoalDetails = (goal: Goal) => {
    setSelectedGoal(goal);
    setIsGoalDetailsOpen(true);
  };
  
  return (
    <div className="space-y-6">
      {/* Back button and employee info header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} className="flex items-center gap-1">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to All Employees</span>
        </Button>
        
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="font-normal">
            {employee.division}
          </Badge>
          <Badge variant="secondary" className="font-normal">
            {employee.position}
          </Badge>
        </div>
      </div>
      
      {/* Employee Profile Card */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={employee.image} alt={employee.name} />
              <AvatarFallback>{employee.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-xl">{employee.name}'s Goals</CardTitle>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-1">
                  <Trophy className="h-4 w-4 text-amber-500" />
                  <span className="text-sm font-medium">{employee.goalsCompleted} completed</span>
                </div>
                <div className="flex items-center gap-1">
                  <Target className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-medium">{employee.goalsInProgress} in progress</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm font-medium">{employee.totalPoints} points</span>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>
      
      {/* Goals Grid */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Current Goals</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {goals.filter(goal => goal.progress < 100).map(goal => (
            <GoalCard 
              key={goal.id} 
              goal={goal} 
              onViewDetails={() => handleGoalDetails(goal)}
              renderIcon={renderIcon}
            />
          ))}
        </div>
      </div>
      
      <Separator />
      
      {/* Completed Goals */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Completed Goals</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {goals.filter(goal => goal.progress === 100).map(goal => (
            <GoalCard 
              key={goal.id} 
              goal={goal} 
              onViewDetails={() => handleGoalDetails(goal)}
              renderIcon={renderIcon}
            />
          ))}
        </div>
      </div>
      
      {/* Employee Goal Details Modal */}
      <EmployeeGoalDetailsModal 
        isOpen={isGoalDetailsOpen}
        onOpenChange={setIsGoalDetailsOpen}
        goal={selectedGoal}
        employee={employee}
        renderIcon={renderIcon}
        onAddComment={onAddComment}
      />
    </div>
  );
};

export default EmployeeGoalsView; 