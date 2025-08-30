import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  Mail, 
  Bell, 
  CheckSquare, 
  Send, 
  Search,
  Clock,
  User,
  MoreVertical,
  Paperclip,
  Filter,
  Tag,
  UserPlus,
  X,
  Plus
} from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';

// Types
interface Participant {
  id: string;
  name: string;
  avatar?: string;
  role: string;
  email: string;
}

interface InboxItem {
  id: string;
  type: 'message' | 'reminder' | 'task';
  subject: string;
  content: string;
  sender: {
    name: string;
    avatar?: string;
    role: string;
  };
  timestamp: Date;
  isRead: boolean;
  priority?: 'high' | 'medium' | 'low';
  dueDate?: Date;
  status?: 'pending' | 'completed' | 'overdue';
  tags: string[];
  participants: Participant[];
}

interface ChatMessage {
  id: string;
  content: string;
  sender: {
    name: string;
    avatar?: string;
  };
  timestamp: Date;
  isMe: boolean;
}

export default function Inbox() {
  const [activeTab, setActiveTab] = useState<'all' | 'unread'>('all');
  const [selectedItem, setSelectedItem] = useState<InboxItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'message' | 'reminder' | 'task'>('all');
  const [priorityFilter, setPriorityFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all');
  const [newTag, setNewTag] = useState('');
  const [isAddingTag, setIsAddingTag] = useState(false);
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');

  // Sample data
  const [inboxItems, setInboxItems] = useState<InboxItem[]>([
    {
      id: '1',
      type: 'message',
      subject: 'New client inquiry for Bangkok property',
      content: 'Hi, I\'m interested in viewing the 2-bedroom condo in Sukhumvit. Could we schedule a visit this week?',
      sender: {
        name: 'John Smith',
        avatar: '',
        role: 'Client'
      },
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      isRead: false,
      priority: 'high',
      tags: ['urgent', 'viewing'],
      participants: [
        { id: '1', name: 'John Smith', avatar: '', role: 'Client', email: 'john.smith@email.com' },
        { id: '2', name: 'You', avatar: '', role: 'Agent', email: 'you@company.com' }
      ]
    },
    {
      id: '2',
      type: 'reminder',
      subject: 'Follow up with Sarah Johnson',
      content: 'Remember to call Sarah Johnson about the Thonglor property viewing feedback.',
      sender: {
        name: 'System',
        avatar: '',
        role: 'System'
      },
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      isRead: false,
      dueDate: new Date(Date.now() + 2 * 60 * 60 * 1000),
      tags: ['follow-up', 'thonglor'],
      participants: [
        { id: '2', name: 'You', avatar: '', role: 'Agent', email: 'you@company.com' }
      ]
    },
    {
      id: '3',
      type: 'task',
      subject: 'Update listing photos',
      content: 'Upload new professional photos for the Silom apartment listing.',
      sender: {
        name: 'Marketing Team',
        avatar: '',
        role: 'Team'
      },
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      isRead: true,
      status: 'pending',
      dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
      tags: ['marketing', 'silom'],
      participants: [
        { id: '2', name: 'You', avatar: '', role: 'Agent', email: 'you@company.com' },
        { id: '3', name: 'Marketing Team', avatar: '', role: 'Team', email: 'marketing@company.com' }
      ]
    },
    {
      id: '4',
      type: 'message',
      subject: 'Meeting confirmation',
      content: 'Confirming our meeting tomorrow at 2 PM to discuss the investment property portfolio.',
      sender: {
        name: 'David Chen',
        avatar: '',
        role: 'Investor'
      },
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
      isRead: true,
      priority: 'medium',
      tags: ['meeting', 'investment'],
      participants: [
        { id: '2', name: 'You', avatar: '', role: 'Agent', email: 'you@company.com' },
        { id: '4', name: 'David Chen', avatar: '', role: 'Investor', email: 'david.chen@email.com' }
      ]
    },
    {
      id: '5',
      type: 'reminder',
      subject: 'Contract deadline approaching',
      content: 'The purchase agreement for the Phuket villa expires in 2 days. Follow up with the buyer.',
      sender: {
        name: 'System',
        avatar: '',
        role: 'System'
      },
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
      isRead: false,
      priority: 'high',
      dueDate: new Date(Date.now() + 48 * 60 * 60 * 1000),
      tags: ['deadline', 'phuket', 'urgent'],
      participants: [
        { id: '2', name: 'You', avatar: '', role: 'Agent', email: 'you@company.com' }
      ]
    },
    {
      id: '6',
      type: 'task',
      subject: 'Prepare market analysis',
      content: 'Create a comparative market analysis for the Asoke district luxury condos.',
      sender: {
        name: 'Manager',
        avatar: '',
        role: 'Management'
      },
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      isRead: true,
      status: 'completed',
      dueDate: new Date(Date.now() - 2 * 60 * 60 * 1000),
      tags: ['analysis', 'asoke', 'completed'],
      participants: [
        { id: '2', name: 'You', avatar: '', role: 'Agent', email: 'you@company.com' },
        { id: '5', name: 'Manager', avatar: '', role: 'Management', email: 'manager@company.com' }
      ]
    }
  ]);

  const [chatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      content: 'Hi! I saw your listing for the Bangkok condo. Is it still available?',
      sender: { name: 'John Smith', avatar: '' },
      timestamp: new Date(Date.now() - 10 * 60 * 1000),
      isMe: false
    },
    {
      id: '2',
      content: 'Yes, it\'s still available! Would you like to schedule a viewing?',
      sender: { name: 'You', avatar: '' },
      timestamp: new Date(Date.now() - 8 * 60 * 1000),
      isMe: true
    },
    {
      id: '3',
      content: 'That would be great. I\'m available this weekend.',
      sender: { name: 'John Smith', avatar: '' },
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      isMe: false
    },
    {
      id: '4',
      content: 'Perfect! How about Saturday at 2 PM?',
      sender: { name: 'You', avatar: '' },
      timestamp: new Date(Date.now() - 2 * 60 * 1000),
      isMe: true
    }
  ]);

  // Sample team members that can be invited
  const teamMembers: Participant[] = [
    { id: '6', name: 'Sarah Johnson', avatar: '', role: 'Senior Agent', email: 'sarah.johnson@company.com' },
    { id: '7', name: 'Mike Wilson', avatar: '', role: 'Agent', email: 'mike.wilson@company.com' },
    { id: '8', name: 'Lisa Chang', avatar: '', role: 'Marketing Specialist', email: 'lisa.chang@company.com' },
    { id: '9', name: 'Tom Rodriguez', avatar: '', role: 'Manager', email: 'tom.rodriguez@company.com' },
    { id: '10', name: 'Emma Davis', avatar: '', role: 'Legal Advisor', email: 'emma.davis@company.com' }
  ];

  // Helper functions
  const addTag = (itemId: string, tag: string) => {
    if (!tag.trim()) return;
    
    setInboxItems(prev => prev.map(item => {
      if (item.id === itemId && !item.tags.includes(tag.trim())) {
        return { ...item, tags: [...item.tags, tag.trim()] };
      }
      return item;
    }));
    setNewTag('');
    setIsAddingTag(false);
  };

  const removeTag = (itemId: string, tagToRemove: string) => {
    setInboxItems(prev => prev.map(item => {
      if (item.id === itemId) {
        return { ...item, tags: item.tags.filter(tag => tag !== tagToRemove) };
      }
      return item;
    }));
  };

  const inviteParticipant = (itemId: string, participant: Participant) => {
    setInboxItems(prev => prev.map(item => {
      if (item.id === itemId && !item.participants.find(p => p.id === participant.id)) {
        return { ...item, participants: [...item.participants, participant] };
      }
      return item;
    }));
    setIsInviteDialogOpen(false);
    setInviteEmail('');
  };

  const removeParticipant = (itemId: string, participantId: string) => {
    setInboxItems(prev => prev.map(item => {
      if (item.id === itemId) {
        return { ...item, participants: item.participants.filter(p => p.id !== participantId) };
      }
      return item;
    }));
  };

  // Filter items based on active tab, read status, type filter, priority filter, and search
  const filteredItems = inboxItems.filter(item => {
    // Tab filter (all vs unread)
    const matchesTab = activeTab === 'all' || (activeTab === 'unread' && !item.isRead);
    
    // Type filter
    const matchesType = typeFilter === 'all' || item.type === typeFilter;
    
    // Priority filter
    const matchesPriority = priorityFilter === 'all' || item.priority === priorityFilter;
    
    // Search filter
    const matchesSearch = searchQuery === '' || 
      item.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sender.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesTab && matchesType && matchesPriority && matchesSearch;
  });

  const getItemIcon = (type: string) => {
    switch (type) {
      case 'message': return <Mail className="h-4 w-4" />;
      case 'reminder': return <Bell className="h-4 w-4" />;
      case 'task': return <CheckSquare className="h-4 w-4" />;
      default: return <Mail className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'low': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-blue-100 text-blue-700';
      case 'overdue': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // In a real app, this would send the message
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  return (
    <DashboardLayout>
      <Card className="h-[calc(100vh-120px)] flex flex-col overflow-hidden">
        <CardHeader className="flex-shrink-0 pb-4">
          <div className="flex items-center space-x-2">
            <Mail className="h-6 w-6 text-teal-600" />
            <div>
              <CardTitle className="text-2xl font-bold text-gray-900">Inbox</CardTitle>
              <p className="text-sm text-gray-600">Messages, reminders and tasks</p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex overflow-hidden p-0">
          {/* Left Sidebar - Inbox Items */}
          <div className="w-96 border-r border-border bg-muted/30 flex flex-col overflow-hidden">
            {/* Search */}
            <div className="flex-shrink-0 p-4 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  className="pl-10"
                  placeholder="Search inbox..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Tabs */}
            <div className="flex-shrink-0 p-4">
              <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="unread">Unread</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Filters */}
            <div className="flex-shrink-0 px-4 pb-4 space-y-3">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Filters</span>
              </div>
              
              <div className="space-y-2">
                <div>
                  <label className="text-xs text-gray-600 mb-1 block">Type</label>
                  <Select value={typeFilter} onValueChange={(value) => setTypeFilter(value as any)}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="message">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          Messages
                        </div>
                      </SelectItem>
                      <SelectItem value="reminder">
                        <div className="flex items-center gap-2">
                          <Bell className="h-4 w-4" />
                          Reminders
                        </div>
                      </SelectItem>
                      <SelectItem value="task">
                        <div className="flex items-center gap-2">
                          <CheckSquare className="h-4 w-4" />
                          Tasks
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-xs text-gray-600 mb-1 block">Priority</label>
                  <Select value={priorityFilter} onValueChange={(value) => setPriorityFilter(value as any)}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Priorities</SelectItem>
                      <SelectItem value="high">High Priority</SelectItem>
                      <SelectItem value="medium">Medium Priority</SelectItem>
                      <SelectItem value="low">Low Priority</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Clear Filters Button */}
              {(typeFilter !== 'all' || priorityFilter !== 'all') && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => {
                    setTypeFilter('all');
                    setPriorityFilter('all');
                  }}
                >
                  Clear Filters
                </Button>
              )}
            </div>

            {/* Items Count */}
            <div className="flex-shrink-0 px-4 pb-2">
              <p className="text-xs text-gray-500">
                {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'}
                {activeTab === 'unread' && ' unread'}
              </p>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-hidden">
              <ScrollArea className="h-full">
                <div className="p-4 space-y-3">
                  {filteredItems.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <Mail className="h-8 w-8 mx-auto mb-3 text-gray-300" />
                      <h3 className="text-sm font-medium mb-1">No items found</h3>
                      <p className="text-xs text-gray-400">
                        {activeTab === 'unread' 
                          ? "No unread items match your current filters" 
                          : "No items match your current filters"
                        }
                      </p>
                    </div>
                  ) : (
                    filteredItems.map((item) => (
                    <Card
                      key={item.id}
                      className={`cursor-pointer transition-colors hover:bg-gray-50 ${
                        selectedItem?.id === item.id ? 'ring-2 ring-teal-500' : ''
                      } ${!item.isRead ? 'border-l-4 border-l-teal-500' : ''}`}
                      onClick={() => setSelectedItem(item)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 mt-1">
                            {getItemIcon(item.type)}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <h3 className={`text-sm font-medium truncate ${
                                !item.isRead ? 'font-semibold' : ''
                              }`}>
                                {item.subject}
                              </h3>
                              <span className="text-xs text-gray-500 whitespace-nowrap">
                                {formatDistanceToNow(item.timestamp, { addSuffix: true })}
                              </span>
                            </div>
                            
                            <div className="flex items-center justify-between gap-2 mb-2">
                              <p className="text-xs text-gray-600 truncate">
                                {item.sender.name} • {item.sender.role}
                              </p>
                              <div className="flex items-center gap-1">
                                {item.priority && (
                                  <Badge className={`text-xs ${getPriorityColor(item.priority)}`}>
                                    {item.priority}
                                  </Badge>
                                )}
                                {item.status && (
                                  <Badge className={`text-xs ${getStatusColor(item.status)}`}>
                                    {item.status}
                                  </Badge>
                                )}
                                {!item.isRead && (
                                  <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                                )}
                              </div>
                            </div>
                            
                            <p className="text-xs text-gray-500 truncate leading-tight">
                              {item.content}
                            </p>
                            
                            {/* Tags */}
                            {item.tags.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-2">
                                {item.tags.slice(0, 2).map((tag) => (
                                  <Badge key={tag} variant="secondary" className="text-xs px-1.5 py-0.5">
                                    {tag}
                                  </Badge>
                                ))}
                                {item.tags.length > 2 && (
                                  <Badge variant="secondary" className="text-xs px-1.5 py-0.5">
                                    +{item.tags.length - 2}
                                  </Badge>
                                )}
                              </div>
                            )}
                            
                            {item.dueDate && (
                              <div className="flex items-center gap-1 mt-2">
                                <Clock className="h-3 w-3 text-gray-400" />
                                <span className="text-xs text-gray-500">
                                  Due: {format(item.dueDate, 'MMM dd, HH:mm')}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    ))
                  )}
                </div>
              </ScrollArea>
            </div>
          </div>

          {/* Right Side - Chat */}
          <div className="flex-1 flex flex-col overflow-hidden bg-white">
            {selectedItem ? (
              <>
                {/* Chat Header */}
                <div className="flex-shrink-0 p-4 border-b border-border bg-muted/30">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={selectedItem.sender.avatar} />
                        <AvatarFallback>
                          {selectedItem.sender.name.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h2 className="font-semibold text-gray-900">{selectedItem.sender.name}</h2>
                        <p className="text-sm text-gray-600">{selectedItem.sender.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {/* Invite Participant Button */}
                      <Dialog open={isInviteDialogOpen} onOpenChange={setIsInviteDialogOpen}>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="icon" title="Invite participant">
                            <UserPlus className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Invite Participant</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <p className="text-sm text-gray-600">Select team member to invite:</p>
                              <div className="space-y-2 max-h-48 overflow-y-auto">
                                {teamMembers
                                  .filter(member => !selectedItem.participants.find(p => p.id === member.id))
                                  .map((member) => (
                                    <div
                                      key={member.id}
                                      className="flex items-center justify-between p-2 border rounded-lg hover:bg-gray-50 cursor-pointer"
                                      onClick={() => inviteParticipant(selectedItem.id, member)}
                                    >
                                      <div className="flex items-center gap-2">
                                        <Avatar className="h-6 w-6">
                                          <AvatarFallback className="text-xs">
                                            {member.name.slice(0, 2).toUpperCase()}
                                          </AvatarFallback>
                                        </Avatar>
                                        <div>
                                          <p className="text-sm font-medium">{member.name}</p>
                                          <p className="text-xs text-gray-500">{member.role}</p>
                                        </div>
                                      </div>
                                      <Button size="sm">Invite</Button>
                                    </div>
                                  ))}
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Participants */}
                  <div className="mt-3">
                    <div className="flex items-center gap-2 mb-2">
                      <User className="h-4 w-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-700">Participants ({selectedItem.participants.length})</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedItem.participants.map((participant) => (
                        <div key={participant.id} className="flex items-center gap-1 bg-white rounded-full px-2 py-1 border text-xs">
                          <Avatar className="h-4 w-4">
                            <AvatarFallback className="text-xs">
                              {participant.name.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <span>{participant.name}</span>
                          {participant.name !== 'You' && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-4 w-4 p-0 hover:bg-red-100"
                              onClick={() => removeParticipant(selectedItem.id, participant.id)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Selected Item Content */}
                <div className="flex-shrink-0 p-4 bg-muted/50 border-b border-border">
                  <div className="flex items-start gap-3">
                    {getItemIcon(selectedItem.type)}
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 mb-1">{selectedItem.subject}</h3>
                      <p className="text-sm text-gray-700 mb-2">{selectedItem.content}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                        <span>{format(selectedItem.timestamp, 'PPpp')}</span>
                        {selectedItem.dueDate && (
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            Due: {format(selectedItem.dueDate, 'PPp')}
                          </span>
                        )}
                      </div>

                      {/* Tags Management */}
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Tag className="h-4 w-4 text-gray-500" />
                          <span className="text-sm font-medium text-gray-700">Tags</span>
                        </div>
                        <div className="flex flex-wrap gap-2 items-center">
                          {selectedItem.tags.map((tag) => (
                            <div key={tag} className="flex items-center gap-1 bg-white rounded-full px-2 py-1 border text-xs">
                              <span>{tag}</span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-4 w-4 p-0 hover:bg-red-100"
                                onClick={() => removeTag(selectedItem.id, tag)}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          ))}
                          
                          {/* Add Tag */}
                          {isAddingTag ? (
                            <div className="flex items-center gap-1">
                              <Input
                                placeholder="Tag name"
                                value={newTag}
                                onChange={(e) => setNewTag(e.target.value)}
                                className="h-6 w-20 text-xs"
                                onKeyPress={(e) => {
                                  if (e.key === 'Enter') {
                                    addTag(selectedItem.id, newTag);
                                  }
                                  if (e.key === 'Escape') {
                                    setIsAddingTag(false);
                                    setNewTag('');
                                  }
                                }}
                                onBlur={() => {
                                  if (newTag.trim()) {
                                    addTag(selectedItem.id, newTag);
                                  } else {
                                    setIsAddingTag(false);
                                  }
                                }}
                                autoFocus
                              />
                            </div>
                          ) : (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 px-2 text-xs border border-dashed"
                              onClick={() => setIsAddingTag(true)}
                            >
                              <Plus className="h-3 w-3 mr-1" />
                              Add Tag
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Chat Messages */}
                <div className="flex-1 overflow-hidden">
                  <ScrollArea className="h-full">
                    <div className="p-4 space-y-4">
                      {chatMessages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex gap-3 ${message.isMe ? 'flex-row-reverse' : ''}`}
                        >
                          <Avatar className="h-8 w-8 flex-shrink-0">
                            <AvatarImage src={message.sender.avatar} />
                            <AvatarFallback>
                              {message.isMe ? 'YOU' : message.sender.name.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className={`flex-1 max-w-xs ${message.isMe ? 'text-right' : ''}`}>
                            <div className={`inline-block p-3 rounded-lg ${
                              message.isMe 
                                ? 'bg-teal-600 text-white' 
                                : 'bg-gray-100 text-gray-900'
                            }`}>
                              <p className="text-sm">{message.content}</p>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                              {formatDistanceToNow(message.timestamp, { addSuffix: true })}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>

                {/* Message Input */}
                <div className="flex-shrink-0 p-4 border-t border-border bg-muted/30">
                  <div className="flex gap-3 items-end">
                    <div className="flex-1">
                      <Textarea
                        placeholder="Type your message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="min-h-[80px] resize-none"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage();
                          }
                        }}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button variant="ghost" size="icon">
                        <Paperclip className="h-4 w-4" />
                      </Button>
                      <Button 
                        onClick={handleSendMessage}
                        className="bg-teal-600 hover:bg-teal-700"
                        disabled={!newMessage.trim()}
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <Mail className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-lg font-medium mb-2">No conversation selected</h3>
                  <p>Choose a message, reminder, or task from the sidebar to start chatting</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
