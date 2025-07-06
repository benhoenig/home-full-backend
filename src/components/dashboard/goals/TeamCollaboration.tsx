import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Avatar, 
  AvatarFallback, 
  AvatarImage 
} from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  UserPlus, 
  MoreHorizontal, 
  ArrowUpRight, 
  ArrowDownRight, 
  Minus
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Define types for the component
export type TeamMember = {
  id: number;
  name: string;
  avatar: string;
  role: string;
  contribution: number;
  status: 'active' | 'inactive';
  lastActive: string;
};

export type TeamGoal = {
  id: number;
  title: string;
  description: string;
  target: string;
  current: string;
  progress: number;
  teamMembers: TeamMember[];
  startDate: string;
  deadline: string;
};

type TeamCollaborationProps = {
  teamGoal: TeamGoal;
};

const TeamCollaboration: React.FC<TeamCollaborationProps> = ({ teamGoal }) => {
  const getTrendIcon = (contribution: number) => {
    if (contribution > 0) {
      return <ArrowUpRight className="h-4 w-4 text-green-500" />;
    } else if (contribution < 0) {
      return <ArrowDownRight className="h-4 w-4 text-red-500" />;
    } else {
      return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };

  const sortedMembers = [...teamGoal.teamMembers].sort((a, b) => b.contribution - a.contribution);

  return (
    <Card className="shadow-md">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-bold">Team Collaboration</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-medium text-gray-500">
              {sortedMembers.filter(m => m.status === 'active').length} Active Members
            </h3>
            <Button size="sm" variant="outline" className="h-8">
              <UserPlus className="h-4 w-4 mr-1" />
              Add Member
            </Button>
          </div>
          
          <div className="space-y-3">
            {sortedMembers.map((member) => (
              <div 
                key={member.id}
                className={cn(
                  "flex items-center justify-between p-3 rounded-lg border",
                  member.status === 'active' ? 'bg-white' : 'bg-gray-50'
                )}
              >
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback>{member.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{member.name}</h4>
                      <Badge 
                        variant={member.status === 'active' ? 'default' : 'outline'}
                        className="text-xs"
                      >
                        {member.status === 'active' ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500">{member.role}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="flex items-center gap-1">
                      <span className="font-medium">{member.contribution}%</span>
                      {getTrendIcon(member.contribution)}
                    </div>
                    <p className="text-xs text-gray-500">Contribution</p>
                  </div>
                  <p className="text-xs text-gray-500">{member.lastActive}</p>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Profile</DropdownMenuItem>
                      <DropdownMenuItem>Message</DropdownMenuItem>
                      {member.status === 'active' ? (
                        <DropdownMenuItem className="text-red-600">Set as Inactive</DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem className="text-green-600">Set as Active</DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TeamCollaboration; 