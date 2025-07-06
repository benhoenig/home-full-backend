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
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { 
  MessageSquare, 
  MoreVertical, 
  ThumbsUp, 
  Reply, 
  Edit, 
  Trash2, 
  AlertCircle, 
  CheckCircle2, 
  Send,
  RefreshCw,
  MoreHorizontal,
  Filter
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { format, formatDistanceToNow } from 'date-fns';

// Define types for the component
export type CommentType = 'comment' | 'update' | 'issue' | 'resolution';

export type CommentUser = {
  id: number;
  name: string;
  avatar: string;
  role?: string;
};

export type Comment = {
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

type GoalCommentsProps = {
  comments: Comment[];
  currentUser: CommentUser;
  onAddComment: (comment: Omit<Comment, 'id' | 'createdAt'>) => void;
  onUpdateComment: (id: number, content: string) => void;
  onDeleteComment: (id: number) => void;
  onLikeComment: (id: number) => void;
  onReplyToComment?: (id: number, reply: Omit<Comment, 'id' | 'createdAt'>) => void;
  goalTitle: string;
};

const GoalComments: React.FC<GoalCommentsProps> = ({
  comments,
  currentUser,
  onAddComment,
  onUpdateComment,
  onDeleteComment,
  onLikeComment,
  onReplyToComment,
  goalTitle
}) => {
  const [newComment, setNewComment] = useState<string>('');
  const [commentType, setCommentType] = useState<CommentType>('comment');
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyContent, setReplyContent] = useState<string>('');
  const [filter, setFilter] = useState<CommentType | 'all'>('all');
  
  // Handle new comment submission
  const handleSubmitComment = () => {
    if (newComment.trim()) {
      onAddComment({
        user: currentUser,
        content: newComment.trim(),
        type: commentType,
        likes: 0,
        liked: false,
      });
      setNewComment('');
      setCommentType('comment');
    }
  };
  
  // Handle reply submission
  const handleSubmitReply = (parentId: number) => {
    if (replyContent.trim() && onReplyToComment) {
      onReplyToComment(parentId, {
        user: currentUser,
        content: replyContent.trim(),
        type: 'comment',
        likes: 0,
        liked: false,
      });
      setReplyingTo(null);
      setReplyContent('');
    }
  };
  
  // Handle comment edit
  const handleEditComment = (comment: Comment, newContent: string) => {
    if (newContent.trim() !== comment.content) {
      onUpdateComment(comment.id, newContent.trim());
    }
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
  
  // Render a single comment
  const renderComment = (comment: Comment, isReply = false) => {
    return (
      <div key={comment.id} className={cn("flex gap-3", isReply && "ml-12 mt-3")}>
        <Avatar className="h-8 w-8">
          <AvatarImage src={comment.user.avatar} alt={comment.user.name} />
          <AvatarFallback>{comment.user.name.substring(0, 2)}</AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-1">
          <div className="bg-muted/50 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-medium">{comment.user.name}</span>
                {comment.user.role && (
                  <span className="text-xs text-muted-foreground">{comment.user.role}</span>
                )}
                {renderCommentTypeBadge(comment.type)}
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onLikeComment(comment.id)}>
                    <ThumbsUp className="h-4 w-4 mr-2" />
                    {comment.liked ? 'Unlike' : 'Like'}
                  </DropdownMenuItem>
                  {!isReply && onReplyToComment && (
                    <DropdownMenuItem onClick={() => setReplyingTo(comment.id)}>
                      <Reply className="h-4 w-4 mr-2" />
                      Reply
                    </DropdownMenuItem>
                  )}
                  {comment.user.id === currentUser.id && (
                    <>
                      <DropdownMenuItem onClick={() => comment.isEditing = true}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="text-red-600" 
                        onClick={() => onDeleteComment(comment.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            {comment.isEditing ? (
              <div className="mt-2">
                <Textarea 
                  defaultValue={comment.content}
                  className="min-h-[80px]"
                  onBlur={(e) => {
                    handleEditComment(comment, e.target.value);
                    comment.isEditing = false;
                  }}
                />
                <div className="flex justify-end mt-2">
                  <Button 
                    size="sm"
                    onClick={() => comment.isEditing = false}
                  >
                    Save
                  </Button>
                </div>
              </div>
            ) : (
              <p className="mt-1 text-sm">{comment.content}</p>
            )}
          </div>
          
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span>{formatDistanceToNow(comment.createdAt, { addSuffix: true })}</span>
            <button 
              className={cn(
                "flex items-center gap-1 hover:text-foreground",
                comment.liked && "text-primary"
              )}
              onClick={() => onLikeComment(comment.id)}
            >
              <ThumbsUp className="h-3 w-3" />
              <span>{comment.likes} {comment.likes === 1 ? 'like' : 'likes'}</span>
            </button>
            {!isReply && onReplyToComment && (
              <button 
                className="flex items-center gap-1 hover:text-foreground"
                onClick={() => setReplyingTo(comment.id)}
              >
                <Reply className="h-3 w-3" />
                <span>Reply</span>
              </button>
            )}
          </div>
          
          {/* Reply input */}
          {replyingTo === comment.id && (
            <div className="mt-3 flex gap-3">
              <Avatar className="h-6 w-6">
                <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                <AvatarFallback>{currentUser.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <Textarea 
                  placeholder="Write a reply..."
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  className="min-h-[80px]"
                />
                <div className="flex justify-end gap-2 mt-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setReplyingTo(null)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    size="sm"
                    onClick={() => handleSubmitReply(comment.id)}
                  >
                    Reply
                  </Button>
                </div>
              </div>
            </div>
          )}
          
          {/* Replies */}
          {comment.replies && comment.replies.length > 0 && (
            <div className="mt-3 space-y-3">
              {comment.replies.map((reply) => renderComment(reply, true))}
            </div>
          )}
        </div>
      </div>
    );
  };
  
  const filteredComments = filter === 'all' 
    ? comments 
    : comments.filter(comment => comment.type === filter);

  return (
    <Card className="shadow-md">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-bold">Goal Discussion</CardTitle>
        <div className="flex items-center justify-between mt-1">
          <span className="text-sm text-gray-500">{goalTitle}</span>
          <div className="flex items-center gap-2">
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
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
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
                onClick={handleSubmitComment} 
                disabled={!newComment.trim()}
                size="sm"
                className="h-8"
              >
                <Send className="h-4 w-4 mr-1" />
                Post
              </Button>
            </div>
          </div>
          
          {/* Comments List */}
          <div className="space-y-4">
            {filteredComments.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No comments yet. Be the first to start the discussion!
              </div>
            ) : (
              filteredComments.map((comment) => (
                <div key={comment.id} className="space-y-4">
                  <div className="border rounded-lg p-4">
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
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Copy Link</DropdownMenuItem>
                          <DropdownMenuItem>Reply</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">Report</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm">{comment.content}</p>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <Button 
                        variant={comment.liked ? "default" : "ghost"} 
                        size="sm"
                        className={cn(
                          "h-8 text-xs gap-1",
                          comment.liked ? "bg-blue-50 text-blue-700 hover:bg-blue-100" : ""
                        )}
                      >
                        <ThumbsUp className="h-3.5 w-3.5" />
                        <span>{comment.likes > 0 ? comment.likes : ''}</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 text-xs">
                        <MessageSquare className="h-3.5 w-3.5 mr-1" />
                        Reply
                      </Button>
                    </div>
                  </div>
                  
                  {/* Replies */}
                  {comment.replies && comment.replies.length > 0 && (
                    <div className="pl-8 space-y-3">
                      {comment.replies.map((reply) => (
                        <div key={reply.id} className="border rounded-lg p-3">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarImage src={reply.user.avatar} alt={reply.user.name} />
                                <AvatarFallback>{reply.user.name.substring(0, 2)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="flex items-center gap-2">
                                  <h4 className="font-medium text-sm">{reply.user.name}</h4>
                                  <span className="text-xs text-gray-500">{reply.user.role}</span>
                                </div>
                                <p className="text-xs text-gray-500">
                                  {format(reply.createdAt, 'MMM d, yyyy h:mm a')}
                                </p>
                              </div>
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-6 w-6">
                                  <MoreHorizontal className="h-3 w-3" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>Copy Link</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600">Report</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                          <div className="mt-1">
                            <p className="text-sm">{reply.content}</p>
                          </div>
                          <div className="mt-2">
                            <Button 
                              variant={reply.liked ? "default" : "ghost"} 
                              size="sm"
                              className={cn(
                                "h-6 text-xs gap-1 px-2",
                                reply.liked ? "bg-blue-50 text-blue-700 hover:bg-blue-100" : ""
                              )}
                            >
                              <ThumbsUp className="h-3 w-3" />
                              <span>{reply.likes > 0 ? reply.likes : ''}</span>
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GoalComments; 