import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ClipboardList } from 'lucide-react';

// Import the tab components
import ProfileTab from '@/components/dashboard/ProfileTab';
import StatsTab from '@/components/dashboard/StatsTab';
import ReviewsTab from '@/components/dashboard/ReviewsTab';
import LogTab from '@/components/dashboard/LogTab';

// Import mock data
import { achieversList, Achiever } from '@/components/leaderboard/data';

const EmployeeStatusContent = () => {
  // Use the first achiever as the current user for demonstration
  const currentUser = achieversList[0];
  const [showLog, setShowLog] = useState(false);
  
  return (
    <div className="space-y-6">
      {/* User Header Card */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20 border-4 border-background shadow-md">
                <AvatarImage src={currentUser.image} alt={currentUser.name} />
                <AvatarFallback className="text-3xl">{currentUser.avatar}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-3xl">{currentUser.name}</CardTitle>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="default" className="font-normal">
                    {currentUser.team}
                  </Badge>
                  <Badge variant="secondary" className="font-semibold">
                    Rank #{currentUser.rank}
                  </Badge>
                </div>
              </div>
            </div>
            <Button 
              variant="outline" 
              className="mt-4 md:mt-0"
              onClick={() => setShowLog(!showLog)}
            >
              <ClipboardList className="h-4 w-4 mr-2" />
              {showLog ? 'Back to Profile' : 'Activity Log'}
            </Button>
          </div>
        </CardHeader>
      </Card>

      {showLog ? (
        <Card>
          <CardHeader>
            <CardTitle>Activity Log</CardTitle>
          </CardHeader>
          <CardContent>
            <LogTab salesData={currentUser} />
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Profile Section */}
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <ProfileTab salesData={currentUser} />
            </CardContent>
          </Card>
          
          {/* Stats Section */}
          <Card>
            <CardHeader>
              <CardTitle>Performance Stats</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <StatsTab salesData={currentUser} type="leaderboard" />
            </CardContent>
          </Card>
          
          {/* Reviews Section */}
          <Card>
            <CardHeader>
              <CardTitle>Reviews & Feedback</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <ReviewsTab salesData={currentUser} />
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default EmployeeStatusContent; 