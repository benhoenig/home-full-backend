import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users2, 
  Edit, 
  Save, 
  X, 
  User,
  Target,
  Award,
  TrendingUp
} from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';

// Types
interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  joinDate: string;
  mindsetScores: MindsetScore[];
  skillsetScores: SkillsetScore[];
  performance: {
    totalLeads: number;
    closedDeals: number;
    revenue: number;
    avgDealValue: number;
  };
}

interface MindsetScore {
  category: string;
  score: number;
  maxScore: number;
}

interface SkillsetScore {
  skill: string;
  score: number;
  maxScore: number;
}

const MyTeam = () => {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingScores, setEditingScores] = useState<{
    mindset: MindsetScore[];
    skillset: SkillsetScore[];
  }>({ mindset: [], skillset: [] });

  // Sample team data
  const teamMembers: TeamMember[] = [
    {
      id: 'alex',
      name: 'Alex Johnson',
      email: 'alex.johnson@company.com',
      role: 'Senior Sales Agent',
      avatar: '/avatars/alex.jpg',
      joinDate: '2023-01-15',
      mindsetScores: [
        { category: 'Professionalism', score: 88, maxScore: 100 },
        { category: 'Giver Mindset', score: 82, maxScore: 100 },
        { category: 'Responsibility', score: 95, maxScore: 100 },
        { category: 'Communicate', score: 91, maxScore: 100 },
        { category: 'Wise', score: 79, maxScore: 100 },
        { category: 'Create Possibility', score: 85, maxScore: 100 },
        { category: 'Mission Come First', score: 93, maxScore: 100 },
        { category: 'High Energy', score: 90, maxScore: 100 },
        { category: 'Integrity', score: 97, maxScore: 100 },
      ],
      skillsetScores: [
        { skill: 'Owner Script', score: 85, maxScore: 100 },
        { skill: 'Consulting Script', score: 91, maxScore: 100 },
        { skill: 'Buyer Script', score: 88, maxScore: 100 },
        { skill: 'Present Project', score: 93, maxScore: 100 },
        { skill: 'Negotiation', score: 81, maxScore: 100 },
        { skill: 'Selling', score: 89, maxScore: 100 },
        { skill: 'Area Expert', score: 78, maxScore: 100 },
        { skill: 'Flow & Process', score: 92, maxScore: 100 },
        { skill: 'Real Estate Knowledge', score: 86, maxScore: 100 },
      ],
      performance: {
        totalLeads: 145,
        closedDeals: 23,
        revenue: 850000,
        avgDealValue: 36956
      }
    },
    {
      id: 'sarah',
      name: 'Sarah Williams',
      email: 'sarah.williams@company.com',
      role: 'Sales Agent',
      avatar: '/avatars/sarah.jpg',
      joinDate: '2023-03-20',
      mindsetScores: [
        { category: 'Professionalism', score: 92, maxScore: 100 },
        { category: 'Giver Mindset', score: 85, maxScore: 100 },
        { category: 'Responsibility', score: 88, maxScore: 100 },
        { category: 'Communicate', score: 94, maxScore: 100 },
        { category: 'Wise', score: 83, maxScore: 100 },
        { category: 'Create Possibility', score: 89, maxScore: 100 },
        { category: 'Mission Come First', score: 86, maxScore: 100 },
        { category: 'High Energy', score: 91, maxScore: 100 },
        { category: 'Integrity', score: 96, maxScore: 100 },
      ],
      skillsetScores: [
        { skill: 'Owner Script', score: 89, maxScore: 100 },
        { skill: 'Consulting Script', score: 94, maxScore: 100 },
        { skill: 'Buyer Script', score: 92, maxScore: 100 },
        { skill: 'Present Project', score: 96, maxScore: 100 },
        { skill: 'Negotiation', score: 85, maxScore: 100 },
        { skill: 'Selling', score: 93, maxScore: 100 },
        { skill: 'Area Expert', score: 82, maxScore: 100 },
        { skill: 'Flow & Process', score: 95, maxScore: 100 },
        { skill: 'Real Estate Knowledge', score: 90, maxScore: 100 },
      ],
      performance: {
        totalLeads: 132,
        closedDeals: 28,
        revenue: 1020000,
        avgDealValue: 36428
      }
    },
    {
      id: 'michael',
      name: 'Michael Brown',
      email: 'michael.brown@company.com',
      role: 'Junior Sales Agent',
      avatar: '/avatars/michael.jpg',
      joinDate: '2023-08-10',
      mindsetScores: [
        { category: 'Professionalism', score: 83, maxScore: 100 },
        { category: 'Giver Mindset', score: 75, maxScore: 100 },
        { category: 'Responsibility', score: 90, maxScore: 100 },
        { category: 'Communicate', score: 85, maxScore: 100 },
        { category: 'Wise', score: 72, maxScore: 100 },
        { category: 'Create Possibility', score: 78, maxScore: 100 },
        { category: 'Mission Come First', score: 88, maxScore: 100 },
        { category: 'High Energy', score: 84, maxScore: 100 },
        { category: 'Integrity', score: 92, maxScore: 100 },
      ],
      skillsetScores: [
        { skill: 'Owner Script', score: 79, maxScore: 100 },
        { skill: 'Consulting Script', score: 84, maxScore: 100 },
        { skill: 'Buyer Script', score: 81, maxScore: 100 },
        { skill: 'Present Project', score: 87, maxScore: 100 },
        { skill: 'Negotiation', score: 74, maxScore: 100 },
        { skill: 'Selling', score: 82, maxScore: 100 },
        { skill: 'Area Expert', score: 71, maxScore: 100 },
        { skill: 'Flow & Process', score: 85, maxScore: 100 },
        { skill: 'Real Estate Knowledge', score: 79, maxScore: 100 },
      ],
      performance: {
        totalLeads: 89,
        closedDeals: 12,
        revenue: 480000,
        avgDealValue: 40000
      }
    },
    {
      id: 'emma',
      name: 'Emma Davis',
      email: 'emma.davis@company.com',
      role: 'Sales Agent',
      avatar: '/avatars/emma.jpg',
      joinDate: '2023-05-15',
      mindsetScores: [
        { category: 'Professionalism', score: 87, maxScore: 100 },
        { category: 'Giver Mindset', score: 80, maxScore: 100 },
        { category: 'Responsibility', score: 86, maxScore: 100 },
        { category: 'Communicate', score: 89, maxScore: 100 },
        { category: 'Wise', score: 77, maxScore: 100 },
        { category: 'Create Possibility', score: 84, maxScore: 100 },
        { category: 'Mission Come First', score: 85, maxScore: 100 },
        { category: 'High Energy', score: 88, maxScore: 100 },
        { category: 'Integrity', score: 93, maxScore: 100 },
      ],
      skillsetScores: [
        { skill: 'Owner Script', score: 84, maxScore: 100 },
        { skill: 'Consulting Script', score: 87, maxScore: 100 },
        { skill: 'Buyer Script', score: 86, maxScore: 100 },
        { skill: 'Present Project', score: 89, maxScore: 100 },
        { skill: 'Negotiation', score: 77, maxScore: 100 },
        { skill: 'Selling', score: 85, maxScore: 100 },
        { skill: 'Area Expert', score: 76, maxScore: 100 },
        { skill: 'Flow & Process', score: 88, maxScore: 100 },
        { skill: 'Real Estate Knowledge', score: 82, maxScore: 100 },
      ],
      performance: {
        totalLeads: 118,
        closedDeals: 19,
        revenue: 720000,
        avgDealValue: 37894
      }
    },
    {
      id: 'david',
      name: 'David Chen',
      email: 'david.chen@company.com',
      role: 'Sales Agent',
      avatar: '/avatars/david.jpg',
      joinDate: '2023-04-12',
      mindsetScores: [
        { category: 'Professionalism', score: 85, maxScore: 100 },
        { category: 'Giver Mindset', score: 78, maxScore: 100 },
        { category: 'Responsibility', score: 92, maxScore: 100 },
        { category: 'Communicate', score: 88, maxScore: 100 },
        { category: 'Wise', score: 76, maxScore: 100 },
        { category: 'Create Possibility', score: 82, maxScore: 100 },
        { category: 'Mission Come First', score: 90, maxScore: 100 },
        { category: 'High Energy', score: 87, maxScore: 100 },
        { category: 'Integrity', score: 94, maxScore: 100 },
      ],
      skillsetScores: [
        { skill: 'Owner Script', score: 82, maxScore: 100 },
        { skill: 'Consulting Script', score: 88, maxScore: 100 },
        { skill: 'Buyer Script', score: 85, maxScore: 100 },
        { skill: 'Present Project', score: 90, maxScore: 100 },
        { skill: 'Negotiation', score: 78, maxScore: 100 },
        { skill: 'Selling', score: 86, maxScore: 100 },
        { skill: 'Area Expert', score: 75, maxScore: 100 },
        { skill: 'Flow & Process', score: 89, maxScore: 100 },
        { skill: 'Real Estate Knowledge', score: 83, maxScore: 100 },
      ],
      performance: {
        totalLeads: 103,
        closedDeals: 16,
        revenue: 640000,
        avgDealValue: 40000
      }
    }
  ];

  const handleEditStart = (member: TeamMember) => {
    setSelectedMember(member);
    setEditingScores({
      mindset: [...member.mindsetScores],
      skillset: [...member.skillsetScores]
    });
    setIsEditing(true);
  };

  const handleScoreChange = (type: 'mindset' | 'skillset', index: number, newScore: number) => {
    setEditingScores(prev => ({
      ...prev,
      [type]: prev[type].map((item, i) => 
        i === index ? { ...item, score: Math.max(0, Math.min(100, newScore)) } : item
      )
    }));
  };

  const handleSaveScores = () => {
    if (!selectedMember) return;
    
    // In a real app, this would save to the backend
    console.log('Saving scores for:', selectedMember.name, editingScores);
    
    // Update the local data (in real app this would come from the server)
    const updatedMember = {
      ...selectedMember,
      mindsetScores: editingScores.mindset,
      skillsetScores: editingScores.skillset
    };
    
    setSelectedMember(updatedMember);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditingScores({ mindset: [], skillset: [] });
  };

  const calculateAverageScore = (scores: (MindsetScore | SkillsetScore)[]) => {
    const total = scores.reduce((sum, score) => sum + score.score, 0);
    return Math.round(total / scores.length);
  };

  return (
    <DashboardLayout title="My Team">
      <Card className="h-[calc(100vh-120px)] flex flex-col overflow-hidden">
        <CardHeader className="flex-shrink-0 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Users2 className="h-6 w-6 text-teal-600" />
              <div>
                <CardTitle className="text-2xl font-bold text-gray-900">Team Management</CardTitle>
                <p className="text-sm text-gray-600">Manage team member assessments and performance</p>
              </div>
            </div>
            <Badge variant="outline" className="text-sm">
              {teamMembers.length} Team Members
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex overflow-hidden p-0">
          {/* Left Sidebar - Team List */}
          <div className="w-80 border-r border-border bg-muted/30 flex flex-col overflow-hidden">
            <div className="flex-shrink-0 p-4 border-b border-border">
              <h3 className="font-semibold text-gray-900 mb-3">Team Members</h3>
            </div>

            <div className="flex-1 overflow-hidden">
              <ScrollArea className="h-full">
                <div className="p-4 space-y-3">
                  {teamMembers.map((member) => {
                    const mindsetAvg = calculateAverageScore(member.mindsetScores);
                    const skillsetAvg = calculateAverageScore(member.skillsetScores);
                    
                    return (
                      <Card
                        key={member.id}
                        className={`cursor-pointer transition-colors hover:bg-gray-50 ${
                          selectedMember?.id === member.id ? 'ring-2 ring-teal-500' : ''
                        }`}
                        onClick={() => {
                          setSelectedMember(member);
                          setIsEditing(false);
                        }}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <Avatar className="h-12 w-12 flex-shrink-0">
                              <AvatarImage src={member.avatar} />
                              <AvatarFallback>
                                {member.name.slice(0, 2).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-gray-900 truncate">{member.name}</h4>
                              <p className="text-sm text-gray-600 truncate">{member.role}</p>
                              
                              <div className="flex gap-4 mt-2">
                                <div className="text-center">
                                  <div className="text-lg font-bold text-teal-600">{mindsetAvg}%</div>
                                  <div className="text-xs text-gray-500">Mindset</div>
                                </div>
                                <div className="text-center">
                                  <div className="text-lg font-bold text-blue-600">{skillsetAvg}%</div>
                                  <div className="text-xs text-gray-500">Skills</div>
                                </div>
                              </div>
                              
                              <div className="flex items-center justify-between mt-2">
                                <Badge variant="secondary" className="text-xs">
                                  {member.performance.closedDeals} Deals
                                </Badge>
                                <span className="text-xs text-gray-500">
                                  ฿{(member.performance.revenue / 1000000).toFixed(1)}M
                                </span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </ScrollArea>
            </div>
          </div>

          {/* Right Side - Member Details */}
          <div className="flex-1 flex flex-col overflow-hidden bg-white">
            {selectedMember ? (
              <>
                {/* Member Header */}
                <div className="flex-shrink-0 p-6 border-b border-border bg-muted/30">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={selectedMember.avatar} />
                        <AvatarFallback>
                          {selectedMember.name.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900">{selectedMember.name}</h2>
                        <p className="text-gray-600">{selectedMember.role}</p>
                        <p className="text-sm text-gray-500">Joined: {new Date(selectedMember.joinDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {!isEditing ? (
                        <Button onClick={() => handleEditStart(selectedMember)} className="bg-teal-600 hover:bg-teal-700">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Scores
                        </Button>
                      ) : (
                        <>
                          <Button variant="outline" onClick={handleCancelEdit}>
                            <X className="h-4 w-4 mr-2" />
                            Cancel
                          </Button>
                          <Button onClick={handleSaveScores} className="bg-teal-600 hover:bg-teal-700">
                            <Save className="h-4 w-4 mr-2" />
                            Save
                          </Button>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Performance Summary */}
                  <div className="grid grid-cols-4 gap-4 mt-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">{selectedMember.performance.totalLeads}</div>
                      <div className="text-sm text-gray-600">Total Leads</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{selectedMember.performance.closedDeals}</div>
                      <div className="text-sm text-gray-600">Closed Deals</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        ฿{(selectedMember.performance.revenue / 1000000).toFixed(1)}M
                      </div>
                      <div className="text-sm text-gray-600">Revenue</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">
                        ฿{(selectedMember.performance.avgDealValue / 1000).toFixed(0)}K
                      </div>
                      <div className="text-sm text-gray-600">Avg Deal</div>
                    </div>
                  </div>
                </div>

                {/* Scores Content */}
                <div className="flex-1 overflow-hidden">
                  <Tabs defaultValue="mindset" className="h-full flex flex-col">
                    <div className="flex-shrink-0 px-6 pt-4">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="mindset">
                          <Target className="h-4 w-4 mr-2" />
                          Mindset Assessment
                        </TabsTrigger>
                        <TabsTrigger value="skillset">
                          <Award className="h-4 w-4 mr-2" />
                          Skills Assessment
                        </TabsTrigger>
                      </TabsList>
                    </div>

                    <div className="flex-1 overflow-hidden">
                      <TabsContent value="mindset" className="h-full mt-4">
                        <ScrollArea className="h-full">
                          <div className="px-6 pb-6 space-y-4">
                            {(isEditing ? editingScores.mindset : selectedMember.mindsetScores).map((score, index) => (
                              <div key={score.category} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <div className="flex-1">
                                  <Label className="font-medium text-gray-900">{score.category}</Label>
                                  <div className="mt-1 h-2 bg-gray-200 rounded-full">
                                    <div 
                                      className="h-full bg-teal-600 rounded-full transition-all" 
                                      style={{ width: `${score.score}%` }}
                                    />
                                  </div>
                                </div>
                                <div className="flex items-center gap-2 ml-4">
                                  {isEditing ? (
                                    <Input
                                      type="number"
                                      min="0"
                                      max="100"
                                      value={score.score}
                                      onChange={(e) => handleScoreChange('mindset', index, parseInt(e.target.value) || 0)}
                                      className="w-16 text-center"
                                    />
                                  ) : (
                                    <span className="text-lg font-bold text-teal-600 w-16 text-center">
                                      {score.score}
                                    </span>
                                  )}
                                  <span className="text-sm text-gray-500">/ {score.maxScore}</span>
                                </div>
                              </div>
                            ))}
                            
                            <div className="mt-6 p-4 bg-teal-50 rounded-lg border border-teal-200">
                              <div className="flex items-center justify-between">
                                <span className="font-medium text-teal-900">Overall Mindset Score</span>
                                <span className="text-2xl font-bold text-teal-600">
                                  {calculateAverageScore(isEditing ? editingScores.mindset : selectedMember.mindsetScores)}%
                                </span>
                              </div>
                            </div>
                          </div>
                        </ScrollArea>
                      </TabsContent>

                      <TabsContent value="skillset" className="h-full mt-4">
                        <ScrollArea className="h-full">
                          <div className="px-6 pb-6 space-y-4">
                            {(isEditing ? editingScores.skillset : selectedMember.skillsetScores).map((score, index) => (
                              <div key={score.skill} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <div className="flex-1">
                                  <Label className="font-medium text-gray-900">{score.skill}</Label>
                                  <div className="mt-1 h-2 bg-gray-200 rounded-full">
                                    <div 
                                      className="h-full bg-blue-600 rounded-full transition-all" 
                                      style={{ width: `${score.score}%` }}
                                    />
                                  </div>
                                </div>
                                <div className="flex items-center gap-2 ml-4">
                                  {isEditing ? (
                                    <Input
                                      type="number"
                                      min="0"
                                      max="100"
                                      value={score.score}
                                      onChange={(e) => handleScoreChange('skillset', index, parseInt(e.target.value) || 0)}
                                      className="w-16 text-center"
                                    />
                                  ) : (
                                    <span className="text-lg font-bold text-blue-600 w-16 text-center">
                                      {score.score}
                                    </span>
                                  )}
                                  <span className="text-sm text-gray-500">/ {score.maxScore}</span>
                                </div>
                              </div>
                            ))}
                            
                            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                              <div className="flex items-center justify-between">
                                <span className="font-medium text-blue-900">Overall Skills Score</span>
                                <span className="text-2xl font-bold text-blue-600">
                                  {calculateAverageScore(isEditing ? editingScores.skillset : selectedMember.skillsetScores)}%
                                </span>
                              </div>
                            </div>
                          </div>
                        </ScrollArea>
                      </TabsContent>
                    </div>
                  </Tabs>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <Users2 className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-lg font-medium mb-2">Select a Team Member</h3>
                  <p>Choose a team member from the sidebar to view and edit their assessment scores</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default MyTeam;
