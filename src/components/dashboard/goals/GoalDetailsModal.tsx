import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Calendar, 
  Clock, 
  Trophy, 
  Share2, 
  Clock as ClockIcon, 
  MessageSquare,
  ThumbsUp,
  Send,
  MoreVertical,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  Filter,
  UserPlus,
  ArrowUpRight,
  ArrowDownRight,
  Minus
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Goal } from './GoalCard';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { format, formatDistanceToNow } from 'date-fns';

// Import mock comments data and team members
import { mockComments, mockCurrentUser, mockTeamMembers } from './mockData';
import { TeamMember } from './TeamCollaboration';

// Comment types
type CommentType = 'comment' | 'update' | 'issue' | 'resolution';

type CommentUser = {
  id: number;
  name: string;
  avatar: string;
  role?: string;
};

type Comment = {
  id: number;
  user: CommentUser;
  content: string;
  type: CommentType;
  createdAt: Date;
  likes: number;
  liked?: boolean;
  replies?: Comment[];
  isEditing?: boolean;
};

type GoalDetailsModalProps = {
  goal: Goal | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  renderIcon: (iconName: string) => React.ReactNode;
};

const GoalDetailsModal: React.FC<GoalDetailsModalProps> = ({ 
  goal, 
  isOpen, 
  onOpenChange,
  renderIcon
}) => {
  const [activeTab, setActiveTab] = useState<string>("details");
  const [comments, setComments] = useState<Comment[]>(mockComments);
  const [newComment, setNewComment] = useState<string>('');
  const [commentType, setCommentType] = useState<CommentType>('comment');
  const [filter, setFilter] = useState<CommentType | 'all'>('all');
  const currentUser = mockCurrentUser;

  if (!goal) return null;

  // Get color class based on icon color
  const getColorClass = (color?: string) => {
    switch(color) {
      case 'blue': return 'text-blue-500 bg-blue-100';
      case 'green': return 'text-green-500 bg-green-100';
      case 'red': return 'text-red-500 bg-red-100';
      case 'amber': return 'text-amber-500 bg-amber-100';
      case 'purple': return 'text-purple-500 bg-purple-100';
      default: return 'bg-primary/10'; // Default color
    }
  };

  // Get timeline type label
  const getTimelineTypeLabel = (timelineType?: string) => {
    switch(timelineType) {
      case 'monthly': return 'Monthly';
      case 'quarterly': return 'Quarterly';
      case 'annually': return 'Annually';
      default: return '';
    }
  };

  // Get goal type badge variant
  const getGoalTypeBadgeVariant = (goalType?: string) => {
    switch(goalType) {
      case 'target-revenue': return 'default';
      case 'kpi': return 'secondary';
      case 'custom': return 'outline';
      default: return 'default';
    }
  };

  // Helper function to get KPI type label
  const getKpiTypeLabel = (kpiType?: string) => {
    switch (kpiType) {
      case 'new-list': return 'New List';
      case 'consult': return 'Consult';
      case 'survey': return 'Survey';
      case 'buyer-review': return 'Buyer Review';
      case 'owner-review': return 'Owner Review';
      case 'skillset': return 'Skillset';
      case 'action-score': return 'Action Score';
      default: return 'KPI';
    }
  };

  // Helper function to get setting type badge variant
  const getSettingTypeBadgeVariant = (settingType?: string) => {
    switch (settingType) {
      case 'maintain': return 'outline';
      case 'boost': return 'secondary';
      case 'supercharge': return 'default';
      default: return 'outline';
    }
  };

  // Handle adding a new comment
  const handleAddComment = () => {
    if (newComment.trim()) {
      const newCommentObj: Comment = {
        id: comments.length + 1,
        user: currentUser,
        content: newComment.trim(),
        type: commentType,
        createdAt: new Date(),
        likes: 0,
        liked: false,
      };
      setComments([...comments, newCommentObj]);
      setNewComment('');
      setCommentType('comment');
    }
  };

  // Handle liking a comment
  const handleLikeComment = (commentId: number) => {
    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        const newLiked = !comment.liked;
        return {
          ...comment,
          liked: newLiked,
          likes: newLiked ? comment.likes + 1 : comment.likes - 1
        };
      }
      return comment;
    }));
  };

  // Render comment type badge
  const renderCommentTypeBadge = (type: CommentType) => {
    switch (type) {
      case 'update':
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Update
          </Badge>
        );
      case 'issue':
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            Issue
          </Badge>
        );
      case 'resolution':
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Resolution
          </Badge>
        );
      default:
        return null;
    }
  };
  
  // Render comment type icon
  const renderCommentTypeIcon = (type: CommentType) => {
    switch (type) {
      case 'update':
        return <RefreshCw className="h-4 w-4 text-blue-500" />;
      case 'issue':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'resolution':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      default:
        return <MessageSquare className="h-4 w-4 text-gray-500" />;
    }
  };

  // Helper function for team collaboration
  const getTrendIcon = (contribution: number) => {
    if (contribution > 0) {
      return <ArrowUpRight className="h-4 w-4 text-green-500" />;
    } else if (contribution < 0) {
      return <ArrowDownRight className="h-4 w-4 text-red-500" />;
    } else {
      return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };

  const filteredComments = filter === 'all' 
    ? comments 
    : comments.filter(comment => comment.type === filter);

  // Use mock team members for demonstration
  const teamMembers = goal.teamMembers || [];
  const sortedMembers = [...teamMembers].sort((a, b) => {
    // Since we don't have contribution in the Goal's TeamMember type,
    // we'll try to find it in mockTeamMembers or default to 0
    const aContrib = mockTeamMembers.find(m => m.name === a.name)?.contribution || 0;
    const bContrib = mockTeamMembers.find(m => m.name === b.name)?.contribution || 0;
    return bContrib - aContrib;
  });

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className={`p-2 rounded-full ${getColorClass(goal.iconColor)}`}>
              {renderIcon(goal.icon)}
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-xl font-semibold">{goal.title}</h2>
                <Badge variant={goal.type === 'personal' ? 'default' : 'secondary'}>
                  {goal.type === 'personal' ? 'Personal' : 'Team'}
                </Badge>
                {goal.goalType && (
                  <Badge variant="outline">
                    {goal.goalType === 'target-revenue' ? 'Revenue' : 
                     goal.goalType === 'kpi' ? 'KPI' : 'Custom'}
                  </Badge>
                )}
                {goal.timelineType && (
                  <Badge variant="outline" className="capitalize">
                    {goal.timelineType}
                  </Badge>
                )}
                {goal.goalType === 'kpi' && goal.kpiType && (
                  <Badge variant="secondary">
                    {getKpiTypeLabel(goal.kpiType)}
                  </Badge>
                )}
                {goal.settingType && (
                  <Badge variant={getSettingTypeBadgeVariant(goal.settingType)} className="capitalize">
                    {goal.settingType}
                  </Badge>
                )}
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="details" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="details">Goal Details</TabsTrigger>
            <TabsTrigger value="comments">Comments</TabsTrigger>
          </TabsList>
          
          <TabsContent value="details" className="space-y-6 pt-4">
            <p>{goal.description}</p>
            
            <div>
              <h4 className="text-sm font-medium mb-2">Progress</h4>
              <div className="flex justify-between text-sm mb-1">
                <span>Current: {goal.current}</span>
                <span>Target: {goal.target}</span>
              </div>
              <div className="relative">
                <Progress 
                  value={goal.progress} 
                  className="h-3 bg-slate-100" 
                  indicatorClassName="progress-bar-gradient"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium mb-1">Deadline</h4>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{goal.deadline}</span>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-1">Created On</h4>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{goal.createdAt}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-1">Reward</h4>
              <div className="flex items-center gap-2">
                <Trophy className="h-4 w-4 text-amber-500" />
                <span>{goal.reward}</span>
              </div>
            </div>
            
            {goal.type === 'team' && goal.teamMembers && (
              <>
                <Separator className="my-4" />
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="text-sm font-medium">Team Collaboration</h4>
                    <Button size="sm" variant="outline" className="h-8">
                      <UserPlus className="h-4 w-4 mr-1" />
                      Add Member
                    </Button>
                  </div>
                  
                  <div className="space-y-3">
                    {sortedMembers.map((member) => {
                      // Find additional member info from mockTeamMembers
                      const memberInfo = mockTeamMembers.find(m => m.name === member.name);
                      const contribution = memberInfo?.contribution || 0;
                      const status = memberInfo?.status || 'active';
                      const role = memberInfo?.role || 'Team Member';
                      const lastActive = memberInfo?.lastActive || 'Recently';
                      
                      return (
                        <div 
                          key={member.id}
                          className={cn(
                            "flex items-center justify-between p-3 rounded-lg border",
                            status === 'active' ? 'bg-white' : 'bg-gray-50'
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
                                  variant={status === 'active' ? 'default' : 'outline'}
                                  className="text-xs"
                                >
                                  {status === 'active' ? 'Active' : 'Inactive'}
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-500">{role}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <div className="flex items-center gap-1">
                                <span className="font-medium">{contribution}%</span>
                                {getTrendIcon(contribution)}
                              </div>
                              <p className="text-xs text-gray-500">Contribution</p>
                            </div>
                            <p className="text-xs text-gray-500">{lastActive}</p>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>View Profile</DropdownMenuItem>
                                <DropdownMenuItem>Message</DropdownMenuItem>
                                {status === 'active' ? (
                                  <DropdownMenuItem className="text-red-600">Set as Inactive</DropdownMenuItem>
                                ) : (
                                  <DropdownMenuItem className="text-green-600">Set as Active</DropdownMenuItem>
                                )}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </TabsContent>
          
          <TabsContent value="comments" className="space-y-4 pt-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Goal Discussion</h3>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-8">
                    <Filter className="h-4 w-4 mr-1" />
                    {filter === 'all' ? 'All' : filter.charAt(0).toUpperCase() + filter.slice(1)}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setFilter('all')}>
                    All
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilter('comment')}>
                    Comments
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilter('update')}>
                    Updates
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilter('issue')}>
                    Issues
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilter('resolution')}>
                    Resolutions
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            {/* New Comment Input */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                  <AvatarFallback>{currentUser.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Textarea
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="min-h-[80px] resize-none"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="h-8 gap-1">
                        {renderCommentTypeIcon(commentType)}
                        <span>
                          {commentType.charAt(0).toUpperCase() + commentType.slice(1)}
                        </span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      <DropdownMenuItem onClick={() => setCommentType('comment')} className="gap-2">
                        <MessageSquare className="h-4 w-4 text-gray-500" />
                        Comment
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setCommentType('update')} className="gap-2">
                        <RefreshCw className="h-4 w-4 text-blue-500" />
                        Update
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setCommentType('issue')} className="gap-2">
                        <AlertCircle className="h-4 w-4 text-red-500" />
                        Issue
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setCommentType('resolution')} className="gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        Resolution
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <Button 
                  onClick={handleAddComment} 
                  disabled={!newComment.trim()}
                  size="sm"
                  className="h-8"
                >
                  <Send className="h-4 w-4 mr-1" />
                  Post
                </Button>
              </div>
            </div>
            
            <Separator />
            
            {/* Comments List */}
            <div className="space-y-4">
              {filteredComments.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No comments yet. Be the first to start the discussion!
                </div>
              ) : (
                filteredComments.map((comment) => (
                  <div key={comment.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={comment.user.avatar} alt={comment.user.name} />
                          <AvatarFallback>{comment.user.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium">{comment.user.name}</h4>
                            <span className="text-xs text-gray-500">{comment.user.role}</span>
                            {renderCommentTypeBadge(comment.type)}
                          </div>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {format(comment.createdAt, 'MMM d, yyyy h:mm a')}
                          </p>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleLikeComment(comment.id)}>
                            <ThumbsUp className="mr-2 h-4 w-4" />
                            {comment.liked ? 'Unlike' : 'Like'}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <MessageSquare className="mr-2 h-4 w-4" />
                            Reply
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm">{comment.content}</p>
                    </div>
                    <div className="mt-3">
                      <Button 
                        variant={comment.liked ? "default" : "ghost"} 
                        size="sm"
                        className={cn(
                          "h-8 text-xs gap-1",
                          comment.liked ? "bg-blue-50 text-blue-700 hover:bg-blue-100" : ""
                        )}
                        onClick={() => handleLikeComment(comment.id)}
                      >
                        <ThumbsUp className="h-3.5 w-3.5" />
                        <span>{comment.likes > 0 ? comment.likes : ''}</span>
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
        
        <DialogFooter className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
          >
            Close
          </Button>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="icon" 
              className="text-blue-500 hover:text-blue-600 hover:bg-blue-50"
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GoalDetailsModal; 