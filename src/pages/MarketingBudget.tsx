import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Trash2, Plus, Calendar, DollarSign, Target, TrendingUp, Filter, X } from 'lucide-react';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';

// Types
interface PlatformAction {
  id: string;
  actionName: string;
  platformName: string;
  creditPerAction: number;
  creditToThb: number;
  settingDate: Date;
  isActive: boolean;
  addedBy: string;
}

interface SocialMediaCost {
  id: string;
  channel: string;
  amount: number;
  dateTime: Date;
  remark: string;
  campaign?: string;
  addedBy: string;
}

export default function MarketingBudget() {
  // Platform Actions State
  const [platformActions, setPlatformActions] = useState<PlatformAction[]>([
    {
      id: '1',
      actionName: 'New List Posted',
      platformName: 'Ddproperty',
      creditPerAction: 5,
      creditToThb: 10,
      settingDate: new Date('2024-01-01'),
      isActive: true,
      addedBy: 'Admin User',
    },
    {
      id: '2',
      actionName: 'New List Repost',
      platformName: 'Ddproperty',
      creditPerAction: 3,
      creditToThb: 10,
      settingDate: new Date('2024-01-01'),
      isActive: true,
      addedBy: 'Admin User',
    },
    {
      id: '3',
      actionName: 'A List Boost',
      platformName: 'Livinginsider',
      creditPerAction: 8,
      creditToThb: 12,
      settingDate: new Date('2024-01-15'),
      isActive: true,
      addedBy: 'Sarah Johnson',
    },
  ]);

  // Social Media Costs State
  const [socialMediaCosts, setSocialMediaCosts] = useState<SocialMediaCost[]>([
    {
      id: '1',
      channel: 'Facebook Ad',
      amount: 2500,
      dateTime: new Date('2024-01-20'),
      remark: 'Property listing campaign - Bangkok condos',
      campaign: 'Q1 Condo Campaign',
      addedBy: 'Marketing Manager',
    },
    {
      id: '2',
      channel: 'Instagram',
      amount: 1800,
      dateTime: new Date('2024-01-22'),
      remark: 'Story ads for luxury properties',
      campaign: 'Luxury Properties',
      addedBy: 'Sarah Johnson',
    },
    {
      id: '3',
      channel: 'Youtube',
      amount: 3200,
      dateTime: new Date('2024-01-25'),
      remark: 'Video marketing for new developments',
      campaign: 'Q1 Condo Campaign',
      addedBy: 'Marketing Manager',
    },
    {
      id: '4',
      channel: 'Facebook Ad',
      amount: 1500,
      dateTime: new Date('2024-02-01'),
      remark: 'Retargeting campaign',
      campaign: 'Retargeting Feb',
      addedBy: 'David Chen',
    },
    {
      id: '5',
      channel: 'Google Ads',
      amount: 4200,
      dateTime: new Date('2024-02-05'),
      remark: 'Search ads for premium properties',
      campaign: 'Premium Search',
      addedBy: 'Admin User',
    },
  ]);

  // Form States
  const [isAddingPlatformAction, setIsAddingPlatformAction] = useState(false);
  const [isAddingSocialCost, setIsAddingSocialCost] = useState(false);
  const [confirmationDialog, setConfirmationDialog] = useState<{
    isOpen: boolean;
    actionId?: string;
    newData?: Partial<PlatformAction>;
  }>({ isOpen: false });

  // Filter States for Social Media Costs
  const [socialFilters, setSocialFilters] = useState({
    campaign: 'all',
    channel: 'all',
    dateFrom: null as Date | null,
    dateTo: null as Date | null,
  });

  // New Platform Action Form
  const [newPlatformAction, setNewPlatformAction] = useState({
    actionName: '',
    platformName: '',
    creditPerAction: 0,
    creditToThb: 0,
    settingDate: new Date(),
  });

  // New Social Media Cost Form
  const [newSocialCost, setNewSocialCost] = useState({
    channel: '',
    amount: 0,
    dateTime: new Date(),
    remark: '',
    campaign: '',
  });

  // Platform and Channel Options
  const platforms = ['Ddproperty', 'Livinginsider', 'Proppit', 'PropertyGuru', 'Hipflat'];
  const socialChannels = ['Facebook Ad', 'Facebook Group', 'Instagram', 'Youtube', 'Tiktok', 'LINE OA', 'Google Ads'];

  // Get unique campaigns and channels for filter options
  const uniqueCampaigns = Array.from(new Set(socialMediaCosts.map(cost => cost.campaign).filter(Boolean)));
  const uniqueChannels = Array.from(new Set(socialMediaCosts.map(cost => cost.channel)));

  // Filter social media costs
  const filteredSocialCosts = socialMediaCosts.filter(cost => {
    // Campaign filter
    if (socialFilters.campaign !== 'all' && cost.campaign !== socialFilters.campaign) {
      return false;
    }

    // Channel filter
    if (socialFilters.channel !== 'all' && cost.channel !== socialFilters.channel) {
      return false;
    }

    // Date range filter
    if (socialFilters.dateFrom) {
      const costDate = new Date(cost.dateTime);
      const fromDate = new Date(socialFilters.dateFrom);
      fromDate.setHours(0, 0, 0, 0);
      costDate.setHours(0, 0, 0, 0);
      if (costDate < fromDate) {
        return false;
      }
    }

    if (socialFilters.dateTo) {
      const costDate = new Date(cost.dateTime);
      const toDate = new Date(socialFilters.dateTo);
      toDate.setHours(23, 59, 59, 999);
      costDate.setHours(0, 0, 0, 0);
      if (costDate > toDate) {
        return false;
      }
    }

    return true;
  });

  // Calculate total budget for filtered results
  const totalFilteredBudget = filteredSocialCosts.reduce((sum, cost) => sum + cost.amount, 0);

  // Clear filters function
  const clearSocialFilters = () => {
    setSocialFilters({
      campaign: 'all',
      channel: 'all',
      dateFrom: null,
      dateTo: null,
    });
  };

  // Handle adding new platform action
  const handleAddPlatformAction = () => {
    // Check if same action exists with current date
    const existingAction = platformActions.find(
      action => 
        action.actionName === newPlatformAction.actionName &&
        action.platformName === newPlatformAction.platformName &&
        action.isActive
    );

    if (existingAction && format(newPlatformAction.settingDate, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')) {
      setConfirmationDialog({
        isOpen: true,
        actionId: existingAction.id,
        newData: newPlatformAction,
      });
      return;
    }

    const newAction: PlatformAction = {
      id: Date.now().toString(),
      ...newPlatformAction,
      isActive: true,
      addedBy: 'Admin User', // In a real app, this would be the current user
    };

    setPlatformActions([...platformActions, newAction]);
    setNewPlatformAction({
      actionName: '',
      platformName: '',
      creditPerAction: 0,
      creditToThb: 0,
      settingDate: new Date(),
    });
    setIsAddingPlatformAction(false);
  };

  // Handle confirmation dialog
  const handleConfirmRateChange = () => {
    if (confirmationDialog.actionId && confirmationDialog.newData) {
      // Deactivate old action
      setPlatformActions(prev =>
        prev.map(action =>
          action.id === confirmationDialog.actionId
            ? { ...action, isActive: false }
            : action
        )
      );

      // Add new action
      const newAction: PlatformAction = {
        id: Date.now().toString(),
        ...confirmationDialog.newData as PlatformAction,
        isActive: true,
        addedBy: 'Admin User', // In a real app, this would be the current user
      };

      setPlatformActions(prev => [...prev, newAction]);
    }

    setConfirmationDialog({ isOpen: false });
    setNewPlatformAction({
      actionName: '',
      platformName: '',
      creditPerAction: 0,
      creditToThb: 0,
      settingDate: new Date(),
    });
    setIsAddingPlatformAction(false);
  };

  // Handle adding social media cost
  const handleAddSocialCost = () => {
    const newCost: SocialMediaCost = {
      id: Date.now().toString(),
      ...newSocialCost,
      addedBy: 'Admin User', // In a real app, this would be the current user
    };

    setSocialMediaCosts([...socialMediaCosts, newCost]);
    setNewSocialCost({
      channel: '',
      amount: 0,
      dateTime: new Date(),
      remark: '',
      campaign: '',
    });
    setIsAddingSocialCost(false);
  };

  // Delete functions
  const deletePlatformAction = (id: string) => {
    setPlatformActions(prev => prev.filter(action => action.id !== id));
  };

  const deleteSocialCost = (id: string) => {
    setSocialMediaCosts(prev => prev.filter(cost => cost.id !== id));
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto p-6 space-y-8">
      <div className="flex items-center space-x-2">
        <Target className="h-8 w-8 text-teal-600" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Marketing Budget</h1>
          <p className="text-gray-600">Manage platform listing costs and social media marketing expenses</p>
        </div>
      </div>

      {/* Platform Listing Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <DollarSign className="h-5 w-5 text-teal-600" />
            <span>Platform Listing Actions Cost</span>
          </CardTitle>
          <CardDescription>
            Set the cost per listing action for platform channels
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              Manage costs for listing actions across different platforms
            </div>
            <Dialog open={isAddingPlatformAction} onOpenChange={setIsAddingPlatformAction}>
              <DialogTrigger asChild>
                <Button className="bg-teal-600 hover:bg-teal-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Action
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add New Platform Action</DialogTitle>
                  <DialogDescription>
                    Configure the cost settings for a new listing action
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="actionName">Action Name</Label>
                    <Input
                      id="actionName"
                      value={newPlatformAction.actionName}
                      onChange={(e) => setNewPlatformAction(prev => ({ ...prev, actionName: e.target.value }))}
                      placeholder="e.g., Featured Listing, Premium Boost"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="platform">Platform</Label>
                    <Select
                      value={newPlatformAction.platformName}
                      onValueChange={(value) => setNewPlatformAction(prev => ({ ...prev, platformName: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select platform" />
                      </SelectTrigger>
                      <SelectContent>
                        {platforms.map(platform => (
                          <SelectItem key={platform} value={platform}>{platform}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="creditPerAction">Credits per Action</Label>
                    <Input
                      id="creditPerAction"
                      type="number"
                      value={newPlatformAction.creditPerAction}
                      onChange={(e) => setNewPlatformAction(prev => ({ ...prev, creditPerAction: Number(e.target.value) }))}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="creditToThb">Credit to THB Rate</Label>
                    <Input
                      id="creditToThb"
                      type="number"
                      step="0.01"
                      value={newPlatformAction.creditToThb}
                      onChange={(e) => setNewPlatformAction(prev => ({ ...prev, creditToThb: Number(e.target.value) }))}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>Setting Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="justify-start text-left font-normal">
                          <Calendar className="mr-2 h-4 w-4" />
                          {format(newPlatformAction.settingDate, 'PPP')}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <CalendarComponent
                          mode="single"
                          selected={newPlatformAction.settingDate}
                          onSelect={(date) => date && setNewPlatformAction(prev => ({ ...prev, settingDate: date }))}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddingPlatformAction(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddPlatformAction} className="bg-teal-600 hover:bg-teal-700">
                    Add Action
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Action Name</TableHead>
                  <TableHead>Platform</TableHead>
                  <TableHead>Credits/Action</TableHead>
                  <TableHead>Credit Rate (THB)</TableHead>
                  <TableHead>Cost/Action</TableHead>
                  <TableHead>Setting Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Added By</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {platformActions.map((action) => (
                  <TableRow key={action.id}>
                    <TableCell className="font-medium">{action.actionName}</TableCell>
                    <TableCell>{action.platformName}</TableCell>
                    <TableCell>{action.creditPerAction}</TableCell>
                    <TableCell>฿{action.creditToThb}</TableCell>
                    <TableCell className="font-semibold">
                      ฿{(action.creditPerAction * action.creditToThb).toFixed(2)}
                    </TableCell>
                    <TableCell>{format(action.settingDate, 'dd/MM/yyyy')}</TableCell>
                    <TableCell>
                      <Badge variant={action.isActive ? "default" : "secondary"}>
                        {action.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">{action.addedBy}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deletePlatformAction(action.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Social Media Marketing Costs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-teal-600" />
            <span>Social Media Marketing Costs</span>
          </CardTitle>
          <CardDescription>
            Log and track social media marketing expenses
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Filters Section */}
          <div className="bg-gray-50 p-4 rounded-lg border">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">Filters</span>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={clearSocialFilters}
                className="text-gray-600 hover:text-gray-800"
              >
                <X className="h-4 w-4 mr-1" />
                Clear All
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Campaign Filter */}
              <div className="space-y-2">
                <Label className="text-xs font-medium text-gray-600">Campaign</Label>
                <Select
                  value={socialFilters.campaign}
                  onValueChange={(value) => setSocialFilters(prev => ({ ...prev, campaign: value }))}
                >
                  <SelectTrigger className="h-8">
                    <SelectValue placeholder="All campaigns" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All campaigns</SelectItem>
                    {uniqueCampaigns.map(campaign => (
                      <SelectItem key={campaign} value={campaign}>{campaign}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Channel Filter */}
              <div className="space-y-2">
                <Label className="text-xs font-medium text-gray-600">Channel</Label>
                <Select
                  value={socialFilters.channel}
                  onValueChange={(value) => setSocialFilters(prev => ({ ...prev, channel: value }))}
                >
                  <SelectTrigger className="h-8">
                    <SelectValue placeholder="All channels" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All channels</SelectItem>
                    {uniqueChannels.map(channel => (
                      <SelectItem key={channel} value={channel}>{channel}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Date From Filter */}
              <div className="space-y-2">
                <Label className="text-xs font-medium text-gray-600">Date From</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="h-8 w-full justify-start text-left font-normal">
                      <Calendar className="mr-2 h-3 w-3" />
                      {socialFilters.dateFrom ? format(socialFilters.dateFrom, 'dd/MM/yy') : 'From date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <CalendarComponent
                      mode="single"
                      selected={socialFilters.dateFrom}
                      onSelect={(date) => setSocialFilters(prev => ({ ...prev, dateFrom: date || null }))}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Date To Filter */}
              <div className="space-y-2">
                <Label className="text-xs font-medium text-gray-600">Date To</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="h-8 w-full justify-start text-left font-normal">
                      <Calendar className="mr-2 h-3 w-3" />
                      {socialFilters.dateTo ? format(socialFilters.dateTo, 'dd/MM/yy') : 'To date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <CalendarComponent
                      mode="single"
                      selected={socialFilters.dateTo}
                      onSelect={(date) => setSocialFilters(prev => ({ ...prev, dateTo: date || null }))}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>

          {/* Summary and Add Button */}
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                Record marketing costs for social media channels and campaigns
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="bg-teal-50 text-teal-700 border-teal-200">
                  {filteredSocialCosts.length} record{filteredSocialCosts.length !== 1 ? 's' : ''}
                </Badge>
                <Badge variant="default" className="bg-teal-600 text-white">
                  Total: ฿{totalFilteredBudget.toLocaleString()}
                </Badge>
              </div>
            </div>
            <Dialog open={isAddingSocialCost} onOpenChange={setIsAddingSocialCost}>
              <DialogTrigger asChild>
                <Button className="bg-teal-600 hover:bg-teal-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Log Cost
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Log Social Media Cost</DialogTitle>
                  <DialogDescription>
                    Record a new marketing expense for social media campaigns
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="channel">Channel</Label>
                    <Select
                      value={newSocialCost.channel}
                      onValueChange={(value) => setNewSocialCost(prev => ({ ...prev, channel: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select channel" />
                      </SelectTrigger>
                      <SelectContent>
                        {socialChannels.map(channel => (
                          <SelectItem key={channel} value={channel}>{channel}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="amount">Amount (THB)</Label>
                    <Input
                      id="amount"
                      type="number"
                      step="0.01"
                      value={newSocialCost.amount}
                      onChange={(e) => setNewSocialCost(prev => ({ ...prev, amount: Number(e.target.value) }))}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>Date & Time</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="justify-start text-left font-normal">
                          <Calendar className="mr-2 h-4 w-4" />
                          {format(newSocialCost.dateTime, 'PPP')}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <CalendarComponent
                          mode="single"
                          selected={newSocialCost.dateTime}
                          onSelect={(date) => date && setNewSocialCost(prev => ({ ...prev, dateTime: date }))}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="campaign">Campaign (Optional)</Label>
                    <Input
                      id="campaign"
                      value={newSocialCost.campaign}
                      onChange={(e) => setNewSocialCost(prev => ({ ...prev, campaign: e.target.value }))}
                      placeholder="e.g., Q1 Condo Campaign"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="remark">Remark</Label>
                    <Textarea
                      id="remark"
                      value={newSocialCost.remark}
                      onChange={(e) => setNewSocialCost(prev => ({ ...prev, remark: e.target.value }))}
                      placeholder="Additional notes about this expense..."
                      rows={3}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddingSocialCost(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddSocialCost} className="bg-teal-600 hover:bg-teal-700">
                    Log Cost
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Channel</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Campaign</TableHead>
                  <TableHead>Remark</TableHead>
                  <TableHead>Added By</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSocialCosts.map((cost) => (
                  <TableRow key={cost.id}>
                    <TableCell className="font-medium">{cost.channel}</TableCell>
                    <TableCell className="font-semibold">฿{cost.amount.toLocaleString()}</TableCell>
                    <TableCell>{format(cost.dateTime, 'dd/MM/yyyy')}</TableCell>
                    <TableCell>{cost.campaign || '-'}</TableCell>
                    <TableCell className="max-w-xs truncate" title={cost.remark}>
                      {cost.remark}
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">{cost.addedBy}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteSocialCost(cost.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Confirmation Dialog */}
      <Dialog open={confirmationDialog.isOpen} onOpenChange={(open) => setConfirmationDialog({ isOpen: open })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rate Change Confirmation</DialogTitle>
            <DialogDescription>
              You are setting a new rate for an existing action on today's date. This will create a new rate
              that will be effective from today, and the previous rate will be marked as inactive.
              <br /><br />
              <strong>This means the new credit calculation will start with the new rate from today.</strong>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmationDialog({ isOpen: false })}>
              Cancel
            </Button>
            <Button onClick={handleConfirmRateChange} className="bg-teal-600 hover:bg-teal-700">
              Confirm Rate Change
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      </div>
    </DashboardLayout>
  );
}
