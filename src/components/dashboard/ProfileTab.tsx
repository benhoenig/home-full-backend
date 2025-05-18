import React from 'react';
import { User, Briefcase, Calendar, Badge as BadgeIcon } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Achiever, NewSalesData } from '@/components/leaderboard/data';

type ProfileTabProps = {
  salesData: Achiever | NewSalesData;
};

const ProfileTab: React.FC<ProfileTabProps> = ({ salesData }) => {
  return (
    <div className="p-6 focus-visible:outline-none focus-visible:ring-0">
      <h3 className="text-lg font-semibold flex items-center mb-4">
        <User className="h-5 w-5 mr-2 text-primary" />
        Personal Information
      </h3>
      
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="p-4 border">
          <div className="flex items-start">
            <User className="h-5 w-5 mr-3 text-muted-foreground mt-0.5" />
            <div>
              <div className="text-sm text-muted-foreground">Full Name</div>
              <div className="font-medium">{salesData.name}</div>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 border">
          <div className="flex items-start">
            <Briefcase className="h-5 w-5 mr-3 text-muted-foreground mt-0.5" />
            <div>
              <div className="text-sm text-muted-foreground">Team</div>
              <div className="font-medium">{salesData.team}</div>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 border">
          <div className="flex items-start">
            <Calendar className="h-5 w-5 mr-3 text-muted-foreground mt-0.5" />
            <div>
              <div className="text-sm text-muted-foreground">Join Date</div>
              <div className="font-medium">Jan 15, 2023</div>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 border">
          <div className="flex items-start">
            <Badge className="mr-3 mt-0.5" variant="outline">ID</Badge>
            <div>
              <div className="text-sm text-muted-foreground">Employee ID</div>
              <div className="font-medium">EMP-{salesData.id.toString().padStart(5, '0')}</div>
            </div>
          </div>
        </Card>
      </div>
      
      <div className="mt-6">
        <h4 className="font-medium mb-2">Areas of Expertise</h4>
        <div className="flex flex-wrap gap-2 mt-3">
          <Badge variant="secondary">Residential</Badge>
          <Badge variant="secondary">Luxury</Badge>
          <Badge variant="secondary">Condominiums</Badge>
          <Badge variant="secondary">First-time Buyers</Badge>
        </div>
      </div>
    </div>
  );
};

export default ProfileTab; 