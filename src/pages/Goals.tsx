import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { toast } from '@/components/ui/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Trophy, Award, Target, Calendar, Star, Users, PieChart, MessageSquare, Filter, ChevronDown, Search } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from '@/components/ui/dropdown-menu';

// Import our modular components using the index file
import {
  GoalCard,
  ChallengeCard,
  GoalDetailsModal,
  ChallengeDetailsModal,
  GoalForm,
  GoalFormData,
  renderIcon,
  mockPersonalGoals,
  mockTeamGoals,
  mockChallenges,
  mockTeamGoalData,
  mockGoalAnalyticsData,
  mockComments,
  mockCurrentUser,
  mockTeamPerformanceData,
  Goal,
  Challenge,
  GoalAnalytics,
  TeamPerformance,
  ProgressCelebration
} from '@/components/dashboard/goals';

// Import employee components and data
import EmployeeGoalsTable, { Employee } from '@/components/dashboard/goals/EmployeeGoalsTable';
import EmployeeGoalsView from '@/components/dashboard/goals/EmployeeGoalsView';
import { mockEmployees } from '@/components/dashboard/goals/mockEmployees';
import { mockEmployeeGoals } from '@/components/dashboard/goals/mockEmployeeGoals';

const Goals = () => {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [timelineFilter, setTimelineFilter] = useState<string>("all");
  const [activeTab, setActiveTab] = useState<string>("myGoals"); // Default to myGoals
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [isGoalDetailsOpen, setIsGoalDetailsOpen] = useState(false);
  const [isChallengeDetailsOpen, setIsChallengeDetailsOpen] = useState(false);
  const [goals, setGoals] = useState<Goal[]>([...mockPersonalGoals, ...mockTeamGoals]);
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationData, setCelebrationData] = useState<{
    goal: Goal;
    previousProgress: number;
  } | null>(null);
  
  // Friend's Goals tab state
  const [divisionFilter, setDivisionFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [employeeGoals, setEmployeeGoals] = useState<Goal[]>([]);
  
  // Filter goals based on active filter and timeline filter
  const filteredGoals = goals
    .filter(goal => {
      // Filter by type (personal/team)
      if (activeFilter === "all") return true;
      return goal.type === activeFilter;
    })
    .filter(goal => {
      // Filter by timeline type
      if (timelineFilter === "all") return true;
      return goal.timelineType === timelineFilter;
    });
    
  // Filter employees based on division filter and search query
  const filteredEmployees = mockEmployees
    .filter(employee => {
      // Filter by division
      if (divisionFilter === "all") return true;
      return employee.division === divisionFilter;
    })
    .filter(employee => {
      // Filter by search query
      if (!searchQuery.trim()) return true;
      return (
        employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.division.toLowerCase().includes(searchQuery.toLowerCase())
      );
    })
    // Sort by goals completed (descending)
    .sort((a, b) => b.goalsCompleted - a.goalsCompleted);

  // Function to handle opening goal details
  const handleGoalDetails = (goal: Goal) => {
    setSelectedGoal(goal);
    setIsGoalDetailsOpen(true);
  };

  // Function to handle opening challenge details
  const handleChallengeDetails = (challenge: Challenge) => {
    setSelectedChallenge(challenge);
    setIsChallengeDetailsOpen(true);
  };

  // Function to handle editing a goal
  const handleEditGoal = (goal: Goal) => {
    setSelectedGoal(goal);
    setIsEditModalOpen(true);
    setIsGoalDetailsOpen(false);
  };

  // Function to handle creating a new goal
  const handleCreateGoal = (formData: any) => {
    // Generate a new goal with the form data
    const newGoal: Goal = {
      id: goals.length + 1,
      title: formData.title,
      type: formData.type,
      goalType: formData.goalType,
      kpiType: formData.kpiType,
      settingType: formData.settingType,
      timelineType: formData.timelineType,
      timelinePeriod: formData.timelinePeriod,
      description: formData.description || '',
      target: formData.target,
      current: formData.current || '0',
      deadline: getFormattedDeadline(formData.timelineType, formData.timelinePeriod),
      reward: formData.reward,
      icon: formData.icon,
      iconColor: formData.iconColor,
      progress: 0, // Start with 0 progress
      milestones: [
        { value: 25, label: "25%", reached: false },
        { value: 50, label: "50%", reached: false },
        { value: 75, label: "75%", reached: false },
        { value: 100, label: "100%", reached: false },
      ],
      createdAt: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    };

    // Add team members if it's a team goal
    if (formData.type === 'team') {
      newGoal.teamMembers = [
        { id: 1, name: "Alex", avatar: "/avatars/alex.jpg" },
        { id: 2, name: "Sarah", avatar: "/avatars/sarah.jpg" },
      ];
    }

    // Add the new goal to the list
    setGoals(prevGoals => [...prevGoals, newGoal]);
    setIsCreateModalOpen(false);
    
    // Show success toast
    toast({
      title: "Goal Created",
      description: "Your new goal has been created successfully.",
    });
  };

  // Function to handle updating a goal
  const handleUpdateGoal = (formData: any) => {
    if (!selectedGoal) return;

    // Store the previous progress for celebration
    const previousProgress = selectedGoal.progress;

    // Update only the notification settings
    const updatedGoal: Goal = {
      ...selectedGoal,
      notificationFrequency: formData.notificationFrequency
    };

    // Update the goal in the list
    setGoals(prevGoals => prevGoals.map(goal => 
      goal.id === updatedGoal.id ? updatedGoal : goal
    ));
    
    setIsEditModalOpen(false);
    
    // Show success toast
      toast({
      title: "Notification Settings Updated",
      description: "Your goal notification settings have been updated successfully.",
      });
  };

  // Helper function to format deadline based on timeline type and period
  const getFormattedDeadline = (timelineType: string, timelinePeriod: string): string => {
    let deadline = '';
    
    switch(timelineType) {
      case 'monthly':
        // Format: "2023-05" -> "May 31, 2023"
        const [year, month] = timelinePeriod.split('-');
        const lastDay = new Date(parseInt(year), parseInt(month), 0).getDate();
        deadline = new Date(parseInt(year), parseInt(month) - 1, lastDay).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        });
        break;
      case 'quarterly':
        // Format: "2023-Q2" -> "Jun 30, 2023"
        const [qYear, quarter] = timelinePeriod.split('-Q');
        const qMonth = (parseInt(quarter) * 3) - 1; // Q1->2, Q2->5, Q3->8, Q4->11
        const qLastDay = new Date(parseInt(qYear), qMonth + 1, 0).getDate();
        deadline = new Date(parseInt(qYear), qMonth, qLastDay).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        });
        break;
      case 'annually':
        // Format: "2023" -> "Dec 31, 2023"
        deadline = new Date(parseInt(timelinePeriod), 11, 31).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        });
        break;
      default:
        deadline = new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        });
    }
    
    return deadline;
  };

  // Function to handle deleting a goal
  const handleDeleteGoal = (goalId: number) => {
    setGoals(prevGoals => prevGoals.filter(goal => goal.id !== goalId));
    setIsGoalDetailsOpen(false);
    
    // Show success toast
    toast({
      title: "Goal Deleted",
      description: "The goal has been deleted successfully.",
    });
  };

  // Get the label for the active filter
  const getActiveFilterLabel = () => {
    switch (activeFilter) {
      case "personal": return "Personal Goals";
      case "team": return "Team Goals";
      default: return "All Goals";
    }
  };

  // Get the label for the timeline filter
  const getTimelineFilterLabel = () => {
    switch (timelineFilter) {
      case "monthly": return "Monthly";
      case "quarterly": return "Quarterly";
      case "annually": return "Annually";
      default: return "All Timelines";
    }
  };
  
  // Get the label for the division filter
  const getDivisionFilterLabel = () => {
    switch (divisionFilter) {
      case "Sales": return "Sales Division";
      case "Marketing": return "Marketing Division";
      case "Listing Support": return "Listing Support";
      case "Admin": return "Admin Division";
      case "IT": return "IT Division";
      case "HR": return "HR Division";
      case "Finance": return "Finance Division";
      case "Operations": return "Operations Division";
      case "Customer Support": return "Customer Support";
      default: return "All Divisions";
    }
  };
  
  // Function to handle selecting an employee
  const handleSelectEmployee = (employee: Employee) => {
    setSelectedEmployee(employee);
    // Get the employee's goals from the mock data
    const employeeGoalsData = mockEmployeeGoals[employee.id] || [];
    setEmployeeGoals(employeeGoalsData);
  };
  
  // Function to handle adding a comment to an employee's goal
  const handleAddComment = (goalId: number, comment: string) => {
    toast({
      title: "Comment Added",
      description: "Your comment has been added to the goal.",
    });
  };

  return (
    <DashboardLayout title="Goals & Targets">
      <div className="p-4">
        {/* Tabs for main sections */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div className="flex items-center">
              <TabsList className="w-full sm:w-auto">
                <TabsTrigger value="myGoals">My Goals</TabsTrigger>
                <TabsTrigger value="friendsGoals">Friend's Goals</TabsTrigger>
                {/* Analytics tab hidden temporarily */}
                {/* <TabsTrigger value="analytics">Analytics</TabsTrigger> */}
              </TabsList>
            </div>
            
            {/* Create Goal Button and Filters - Only show on myGoals tab */}
            {activeTab === 'myGoals' && (
              <div className="flex flex-wrap items-center gap-2">
                {/* Goal Type Filter Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-1">
                      <span>{getActiveFilterLabel()}</span>
                      <ChevronDown className="h-4 w-4 opacity-50" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Goal Type</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => setActiveFilter("all")}>
                      All Goals
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setActiveFilter("personal")}>
                      Personal Goals
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setActiveFilter("team")}>
                      Team Goals
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                {/* Timeline Filter Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-1">
                      <span>{getTimelineFilterLabel()}</span>
                      <ChevronDown className="h-4 w-4 opacity-50" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Timeline</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => setTimelineFilter("all")}>
                      All Timelines
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTimelineFilter("monthly")}>
                      Monthly
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTimelineFilter("quarterly")}>
                      Quarterly
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTimelineFilter("annually")}>
                      Annually
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
                  <DialogTrigger asChild>
                    <Button>Create Goal</Button>
                  </DialogTrigger>
                  <DialogContent className="max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Create New Goal</DialogTitle>
                    </DialogHeader>
                    <GoalForm onSubmit={handleCreateGoal} onCancel={() => setIsCreateModalOpen(false)} />
                  </DialogContent>
                </Dialog>
              </div>
            )}
            
            {/* Search and Filter Controls for Friend's Goals tab */}
            {activeTab === 'friendsGoals' && !selectedEmployee && (
              <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                {/* Search Input */}
                <div className="relative w-full sm:w-[200px]">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search employees..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                {/* Division Filter Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-1 w-full sm:w-auto">
                      <span>{getDivisionFilterLabel()}</span>
                      <ChevronDown className="h-4 w-4 opacity-50" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Division</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => setDivisionFilter("all")}>
                      All Divisions
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setDivisionFilter("Sales")}>
                      Sales
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setDivisionFilter("Marketing")}>
                      Marketing
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setDivisionFilter("Listing Support")}>
                      Listing Support
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setDivisionFilter("Admin")}>
                      Admin
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setDivisionFilter("IT")}>
                      IT
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setDivisionFilter("HR")}>
                      HR
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setDivisionFilter("Finance")}>
                      Finance
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setDivisionFilter("Operations")}>
                      Operations
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setDivisionFilter("Customer Support")}>
                      Customer Support
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
            
            {/* Empty div to maintain layout when no controls are shown */}
            {(activeTab !== 'myGoals' && (activeTab !== 'friendsGoals' || selectedEmployee)) && (
              <div></div>
            )}
          </div>
          
          {/* My Goals Tab Content */}
          <TabsContent value="myGoals" className="space-y-4">
            {/* Goals Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredGoals.map(goal => (
                <GoalCard 
                  key={goal.id} 
                  goal={goal} 
                  onViewDetails={handleGoalDetails}
                  renderIcon={renderIcon}
                />
              ))}
            </div>
            
            {/* Divider between Goals and Challenges */}
            <Separator className="my-12" />
            
            {/* Challenges Section */}
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4">Challenges</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockChallenges.map(challenge => (
                  <ChallengeCard 
                    key={challenge.id} 
                    challenge={challenge} 
                    onViewDetails={handleChallengeDetails}
                    renderIcon={renderIcon}
                  />
                ))}
              </div>
            </div>
          </TabsContent>
          
          {/* Friend's Goals Tab Content */}
          <TabsContent value="friendsGoals" className="space-y-4">
            {selectedEmployee ? (
              <EmployeeGoalsView 
                employee={selectedEmployee}
                goals={employeeGoals}
                onBack={() => setSelectedEmployee(null)}
                onAddComment={handleAddComment}
              />
            ) : (
              <div className="space-y-6">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 flex-wrap">
                      <Trophy className="h-5 w-5 text-amber-500" />
                      <span>Top Goal Achievers</span>
                    </CardTitle>
                    <CardDescription>
                      View and engage with goals from colleagues across the company
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="px-2 sm:px-6">
                    <div className="overflow-x-auto -mx-2 sm:mx-0">
                      <EmployeeGoalsTable 
                        employees={filteredEmployees}
                        onSelectEmployee={handleSelectEmployee}
                        className="min-w-full"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>
          
          {/* Analytics Tab Content - Temporarily hidden */}
          {/* 
          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5 text-emerald-500" />
                  Goal Analytics
                </CardTitle>
                <CardDescription>
                  Visualize your progress and performance metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <GoalAnalytics 
                  data={mockGoalAnalyticsData}
                  goalTitle={mockTeamGoalData.title}
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-amber-500" />
                  Team Performance
                </CardTitle>
                <CardDescription>
                  Compare team performance and goal achievements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TeamPerformance data={mockTeamPerformanceData} />
              </CardContent>
            </Card>
          </TabsContent>
          */}
        </Tabs>
        
        {/* Goal Details Modal */}
        <GoalDetailsModal 
          isOpen={isGoalDetailsOpen}
          onOpenChange={setIsGoalDetailsOpen}
          goal={selectedGoal}
          renderIcon={renderIcon}
          onEdit={handleEditGoal}
          onDelete={handleDeleteGoal}
        />
        
        {/* Challenge Details Modal */}
        <ChallengeDetailsModal 
          isOpen={isChallengeDetailsOpen}
          onOpenChange={setIsChallengeDetailsOpen}
          challenge={selectedChallenge}
          renderIcon={renderIcon}
        />
        
        {/* Edit Goal Modal */}
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent className="max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Notification Settings</DialogTitle>
            </DialogHeader>
            {selectedGoal && (
              <GoalForm 
                onSubmit={handleUpdateGoal} 
                onCancel={() => setIsEditModalOpen(false)}
                initialData={{
                  id: selectedGoal.id,
                  title: selectedGoal.title,
                  type: selectedGoal.type,
                  goalType: selectedGoal.goalType,
                  kpiType: selectedGoal.kpiType,
                  settingType: selectedGoal.settingType,
                  timelineType: selectedGoal.timelineType,
                  timelinePeriod: selectedGoal.timelinePeriod,
                  description: selectedGoal.description,
                  target: selectedGoal.target,
                  current: selectedGoal.current,
                  deadline: new Date(selectedGoal.deadline),
                  reward: selectedGoal.reward,
                  icon: selectedGoal.icon,
                  iconColor: selectedGoal.iconColor,
                  progress: selectedGoal.progress,
                  milestones: selectedGoal.milestones,
                  createdAt: selectedGoal.createdAt,
                  teamMembers: selectedGoal.teamMembers,
                  notificationFrequency: selectedGoal.notificationFrequency || 'weekly'
                }}
              />
            )}
          </DialogContent>
        </Dialog>
        
        {/* Progress Celebration Modal */}
        {showCelebration && celebrationData && (
          <ProgressCelebration
            title={celebrationData.goal.title}
            description={celebrationData.goal.description}
            progress={celebrationData.goal.progress}
            previousProgress={celebrationData.previousProgress}
            milestones={celebrationData.goal.milestones}
            onClose={() => setShowCelebration(false)}
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export default Goals; 