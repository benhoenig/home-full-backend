import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import ActionTrackerFAB, { ActionType } from '@/components/dashboard/ActionTrackerFAB';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

const ActionTrackerDemo = () => {
  const [currentMonthPoints, setCurrentMonthPoints] = useState(1250);
  const [targetMonthPoints] = useState(3000);
  const [recentActions, setRecentActions] = useState<{ actionName: string, points: number, date: string }[]>([]);
  
  // Handle action logging
  const handleActionLogged = (actionType: ActionType) => {
    // Update points
    setCurrentMonthPoints(prev => prev + actionType.points);
    
    // Add to recent actions
    setRecentActions(prev => [
      {
        actionName: actionType.name,
        points: actionType.points,
        date: new Date().toLocaleDateString()
      },
      ...prev
    ]);
  };
  
  // Calculate progress
  const progressPercentage = Math.min(100, (currentMonthPoints / targetMonthPoints) * 100);
  
  return (
    <DashboardLayout 
      title="Action Tracker Demo"
      // We're disabling the global FAB since we're manually adding it with custom props
      hideActionTracker
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Action Tracker Overview</CardTitle>
            <CardDescription>
              Demonstrating the floating action button for tracking sales actions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">Monthly Progress</h3>
                  <span className="text-sm font-semibold">
                    {currentMonthPoints} / {targetMonthPoints} points
                  </span>
                </div>
                <Progress value={progressPercentage} className="h-2" />
                <p className="text-sm text-gray-500 mt-2">
                  {targetMonthPoints - currentMonthPoints > 0 
                    ? `${targetMonthPoints - currentMonthPoints} more points needed this month`
                    : "Monthly target achieved! 🎉"}
                </p>
              </div>
              
              <div>
                <h3 className="font-medium mb-3">About This Demo</h3>
                <p className="text-sm text-gray-700 mb-2">
                  This page demonstrates the Action Tracker floating action button (FAB) which allows sales team members to:
                </p>
                <ul className="text-sm text-gray-700 space-y-1 list-disc pl-5">
                  <li>Log manual actions like marketing activities</li>
                  <li>View their action history</li>
                  <li>Track progress toward monthly point goals</li>
                </ul>
                <p className="text-sm text-gray-700 mt-2">
                  Try clicking the + button in the bottom right corner!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Actions you've logged appear here
            </CardDescription>
          </CardHeader>
          <CardContent>
            {recentActions.length > 0 ? (
              <div className="space-y-3">
                {recentActions.map((action, index) => (
                  <div key={index} className="p-3 border rounded-md flex justify-between items-center">
                    <div>
                      <div className="font-medium">{action.actionName}</div>
                      <div className="text-sm text-gray-500">{action.date}</div>
                    </div>
                    <Badge className="bg-teal-100 text-teal-800">
                      +{action.points} pts
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>No actions logged yet</p>
                <p className="text-sm mt-1">Try using the + button to log an action</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      {/* Action Tracker FAB with custom props */}
      <ActionTrackerFAB 
        onActionLogged={handleActionLogged}
        currentMonthPoints={currentMonthPoints}
        targetMonthPoints={targetMonthPoints}
      />
    </DashboardLayout>
  );
};

export default ActionTrackerDemo; 