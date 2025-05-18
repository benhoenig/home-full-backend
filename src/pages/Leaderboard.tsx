import React, { useState, useEffect } from 'react';
import { BarChart, ChevronDown, Trophy } from 'lucide-react';
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

// Import our refactored components
import { 
  CountdownTimerCard,
  TopAchieversCard,
  TopPerformerCard,
  LeaderboardTable,
  MobileLeaderboardTable,
  AchieversModal,
  LeaderboardTabs,
  achieversList,
  newSalesData,
  ActiveTabType,
  LeaderboardType,
  TimeframeType,
  NewSalesMetricType,
  Achiever
} from '@/components/leaderboard';

// Import the NewSalesTab component
import NewSalesTab from '@/components/dashboard/NewSalesTab';
import SalesProfileDrawer from '@/components/dashboard/SalesProfileDrawer';

const Leaderboard = () => {
  // State
  const initialTimeRemaining = 5 * 24 * 60 * 60; // 5 days in seconds
  const [timeRemaining, setTimeRemaining] = useState(initialTimeRemaining);
  const achievers = 7;
  const totalEligible = 20;
  const [showModal, setShowModal] = useState(false);
  const [leaderboardType, setLeaderboardType] = useState<LeaderboardType>('Revenue');
  const [timeframe, setTimeframe] = useState<TimeframeType>('Monthly');
  const [newSalesTimeframe, setNewSalesTimeframe] = useState<string>('1st Month');
  const [activeTab, setActiveTab] = useState<ActiveTabType>('leaderboard');
  
  // Profile drawer state
  const [selectedAchiever, setSelectedAchiever] = useState<Achiever | null>(null);
  const [isProfileDrawerOpen, setIsProfileDrawerOpen] = useState(false);
  
  // Handler for selecting an achiever
  const handleSelectAchiever = (achiever: Achiever) => {
    setSelectedAchiever(achiever);
    setIsProfileDrawerOpen(true);
  };
  
  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => Math.max(0, prev - 1));
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  // Header tabs component
  const headerTabs = (
    <LeaderboardTabs activeTab={activeTab} setActiveTab={setActiveTab} />
  );
  
  return (
    <DashboardLayout 
      title="Leaderboard" 
      headerControls={headerTabs}
    >
      {activeTab === 'leaderboard' && (
        <div className="pt-4 px-2">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Gamified Countdown Timer Card */}
            <div className="md:col-span-3">
              <CountdownTimerCard 
                timeRemaining={timeRemaining} 
                variant="orange" 
              />
            </div>
            
            {/* Gamified Achievers Card */}
            <TopAchieversCard 
              achievers={achievers} 
              totalEligible={totalEligible} 
              onViewLeaderboard={() => setShowModal(true)} 
            />
          </div>

          {/* Top 3 Ranks Section - Hidden on Mobile */}
          <div className="mt-8 hidden md:block">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold flex items-center">
                <Trophy className="h-5 w-5 mr-2 text-amber-500" />
                Top 3 Ranks
              </h2>
              
              <div className="flex space-x-3">
                {/* Leaderboard Type Dropdown */}
                <Select value={leaderboardType} onValueChange={(value) => setLeaderboardType(value as LeaderboardType)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Revenue" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Revenue">Revenue</SelectItem>
                    <SelectItem value="Conversion Rate">Conversion Rate</SelectItem>
                    <SelectItem value="Closed Case">Closed Case</SelectItem>
                    <SelectItem value="Avg. Ticket Size">Avg. Ticket Size</SelectItem>
                    <SelectItem value="Avg. Buyer Satisfaction">Avg. Buyer Satisfaction</SelectItem>
                    <SelectItem value="Avg. Owner Satisfaction">Avg. Owner Satisfaction</SelectItem>
                  </SelectContent>
                </Select>
                
                {/* Timeframe Selection */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center">
                      {timeframe}
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setTimeframe('Annually')}>
                      Annually
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTimeframe('Quarterly')}>
                      Quarterly
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTimeframe('Monthly')}>
                      Monthly
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            
            {/* Top 3 Performers Cards - Only on Tablet and up */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {achieversList.slice(0, 3).map((achiever) => (
                <TopPerformerCard 
                  key={achiever.id} 
                  achiever={achiever} 
                  leaderboardType={leaderboardType}
                  onClick={() => handleSelectAchiever(achiever)}
                />
              ))}
            </div>
          </div>

          {/* Full Leaderboard Ranking Table */}
          <div className="mt-8">
            {/* Mobile filter controls - only visible on mobile */}
            <div className="md:hidden mb-4">
              <h2 className="text-xl font-bold flex items-center mb-3">
                <Trophy className="h-5 w-5 mr-2 text-amber-500" />
                Leaderboard
              </h2>
              
              <div className="flex flex-col space-y-2">
                {/* Leaderboard Type Dropdown - Mobile */}
                <Select value={leaderboardType} onValueChange={(value) => setLeaderboardType(value as LeaderboardType)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Revenue" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Revenue">Revenue</SelectItem>
                    <SelectItem value="Conversion Rate">Conversion Rate</SelectItem>
                    <SelectItem value="Closed Case">Closed Case</SelectItem>
                    <SelectItem value="Avg. Ticket Size">Avg. Ticket Size</SelectItem>
                    <SelectItem value="Avg. Buyer Satisfaction">Avg. Buyer Satisfaction</SelectItem>
                    <SelectItem value="Avg. Owner Satisfaction">Avg. Owner Satisfaction</SelectItem>
                  </SelectContent>
                </Select>
                
                {/* Timeframe Selection - Mobile */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center justify-between w-full">
                      {timeframe}
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setTimeframe('Annually')}>
                      Annually
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTimeframe('Quarterly')}>
                      Quarterly
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTimeframe('Monthly')}>
                      Monthly
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            
            {/* Desktop header - only visible on md screens and up */}
            <h2 className="text-xl font-bold mb-4 hidden md:flex items-center">
              <BarChart className="h-5 w-5 mr-2 text-teal-600" />
              Full Ranking
            </h2>
            
            {/* Desktop table - shows ranks 4+ only, hidden on mobile */}
            <div className="hidden md:block">
              <LeaderboardTable 
                achievers={achieversList.slice(3)} 
                leaderboardType={leaderboardType} 
                startIndex={3}
                onSelectAchiever={handleSelectAchiever}
              />
            </div>
            
            {/* Mobile Leaderboard */}
            <MobileLeaderboardTable 
              achievers={achieversList} 
              leaderboardType={leaderboardType} 
              onSelectAchiever={handleSelectAchiever}
            />
          </div>
        </div>
      )}
      
      {activeTab === 'achievement' && (
        <div className="pt-4 px-2">
          <h1 className="text-2xl font-bold mb-4">Achievement Board</h1>
          <p className="text-gray-500">This section is under development.</p>
        </div>
      )}
      
      {activeTab === 'newSales' && (
        <NewSalesTab 
          timeframe={newSalesTimeframe} 
          setTimeframe={(value: string) => setNewSalesTimeframe(value)} 
        />
      )}

      {/* Achievers Leaderboard Modal */}
      <AchieversModal 
        open={showModal} 
        onOpenChange={setShowModal} 
        achievers={achieversList} 
      />

      {/* Sales Profile Drawer */}
      <SalesProfileDrawer
        isOpen={isProfileDrawerOpen}
        onClose={() => setIsProfileDrawerOpen(false)}
        salesData={selectedAchiever}
        type="leaderboard"
      />
    </DashboardLayout>
  );
};

export default Leaderboard;