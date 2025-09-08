import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Plus, 
  Gift, 
  Trophy, 
  DollarSign, 
  Star,
  Briefcase,
  Clock,
  Monitor,
  Users,
  Award,
  MoreHorizontal,
  Edit,
  Trash2,
  ToggleLeft,
  ToggleRight,
  Shield,
  ArrowUp,
  Zap
} from 'lucide-react';
import { useRewardsData, RewardDefinition, CreateRewardData, RewardCategory, RewardTier, SettingType } from '@/hooks/useRewardsData';
import { formatDistanceToNow } from 'date-fns';

const Rewards = () => {
  const { 
    rewards, 
    createReward, 
    updateReward, 
    toggleRewardActive, 
    deleteReward,
    getRewardsStats 
  } = useRewardsData();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedReward, setSelectedReward] = useState<RewardDefinition | null>(null);
  const [formData, setFormData] = useState<CreateRewardData>({
    name: '',
    description: '',
    category: 'commission',
    tier: 'normal',
    settingTypes: ['maintain'],
    estimatedValue: ''
  });

  const stats = getRewardsStats();

  const getCategoryIcon = (category: RewardCategory) => {
    const icons: Record<RewardCategory, React.ReactNode> = {
      'commission': <DollarSign className="h-4 w-4" />,
      'recognition': <Trophy className="h-4 w-4" />,
      'training': <Star className="h-4 w-4" />,
      'marketing': <Briefcase className="h-4 w-4" />,
      'time-off': <Clock className="h-4 w-4" />,
      'equipment': <Monitor className="h-4 w-4" />,
      'experience': <Gift className="h-4 w-4" />,
      'leadership': <Users className="h-4 w-4" />,
      'custom': <Award className="h-4 w-4" />
    };
    return icons[category] || <Gift className="h-4 w-4" />;
  };

  const getCategoryColor = (category: RewardCategory) => {
    const colors: Record<RewardCategory, string> = {
      'commission': 'bg-green-100 text-green-800 border-green-200',
      'recognition': 'bg-amber-100 text-amber-800 border-amber-200',
      'training': 'bg-blue-100 text-blue-800 border-blue-200',
      'marketing': 'bg-purple-100 text-purple-800 border-purple-200',
      'time-off': 'bg-indigo-100 text-indigo-800 border-indigo-200',
      'equipment': 'bg-gray-100 text-gray-800 border-gray-200',
      'experience': 'bg-pink-100 text-pink-800 border-pink-200',
      'leadership': 'bg-orange-100 text-orange-800 border-orange-200',
      'custom': 'bg-red-100 text-red-800 border-red-200'
    };
    return colors[category] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getTierColor = (tier: RewardTier) => {
    const colors: Record<RewardTier, string> = {
      'normal': 'bg-slate-100 text-slate-800 border-slate-200',
      'premium': 'bg-blue-100 text-blue-800 border-blue-200',
      'exceptional': 'bg-purple-100 text-purple-800 border-purple-200'
    };
    return colors[tier];
  };

  const getSettingTypeIcon = (settingType: SettingType) => {
    const icons: Record<SettingType, React.ReactNode> = {
      'maintain': <Shield className="h-3 w-3" />,
      'boost': <ArrowUp className="h-3 w-3" />,
      'supercharge': <Zap className="h-3 w-3" />
    };
    return icons[settingType];
  };

  const getSettingTypeColor = (settingType: SettingType) => {
    const colors: Record<SettingType, string> = {
      'maintain': 'bg-gray-100 text-gray-700 border-gray-200',
      'boost': 'bg-blue-100 text-blue-700 border-blue-200',
      'supercharge': 'bg-red-100 text-red-700 border-red-200'
    };
    return colors[settingType];
  };

  const handleCreateReward = () => {
    if (!formData.name || !formData.description) return;
    
    createReward(formData);
    resetForm();
    setIsCreateModalOpen(false);
  };

  const handleEditReward = (reward: RewardDefinition) => {
    setSelectedReward(reward);
    setFormData({
      name: reward.name,
      description: reward.description,
      category: reward.category,
      tier: reward.tier,
      settingTypes: reward.settingTypes,
      estimatedValue: reward.estimatedValue || ''
    });
    setIsEditModalOpen(true);
  };

  const handleUpdateReward = () => {
    if (!selectedReward || !formData.name || !formData.description) return;
    
    updateReward(selectedReward.id, formData);
    resetForm();
    setIsEditModalOpen(false);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      category: 'commission',
      tier: 'normal',
      settingTypes: ['maintain'],
      estimatedValue: ''
    });
    setSelectedReward(null);
  };

  const handleSettingTypeChange = (settingType: SettingType, checked: boolean) => {
    setFormData(prev => {
      const newSettingTypes = checked 
        ? [...prev.settingTypes, settingType]
        : prev.settingTypes.filter(type => type !== settingType);
      
      // Ensure at least one setting type is selected
      return {
        ...prev,
        settingTypes: newSettingTypes.length > 0 ? newSettingTypes : [settingType]
      };
    });
  };

  return (
    <DashboardLayout 
      title="Rewards Management"
      headerControls={
        <Button onClick={() => setIsCreateModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create Reward
        </Button>
      }
    >
      <div className="space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Rewards</CardTitle>
              <Gift className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalRewards}</div>
              <p className="text-xs text-muted-foreground">
                Available reward options
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Rewards</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeRewards}</div>
              <p className="text-xs text-muted-foreground">
                Ready for goal assignment
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Reward Tiers</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Object.keys(stats.rewardsByTier).length}</div>
              <p className="text-xs text-muted-foreground">
                Normal, Premium, Exceptional
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Categories</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Object.keys(stats.rewardsByCategory).length}</div>
              <p className="text-xs text-muted-foreground">
                Different reward types
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Rewards Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Rewards</CardTitle>
            <CardDescription>
              Manage the master list of rewards that can be assigned to goals
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Status</TableHead>
                    <TableHead>Reward Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Tier</TableHead>
                    <TableHead>Setting Types</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rewards.map((reward) => (
                    <TableRow key={reward.id} className={!reward.isActive ? 'opacity-50' : ''}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {reward.isActive ? (
                            <div className="w-2 h-2 bg-green-500 rounded-full" />
                          ) : (
                            <div className="w-2 h-2 bg-gray-400 rounded-full" />
                          )}
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <div>
                          <div className="font-medium">{reward.name}</div>
                          <div className="text-sm text-gray-600 truncate max-w-xs">
                            {reward.description}
                          </div>
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <Badge 
                          variant="outline" 
                          className={`${getCategoryColor(reward.category)} flex items-center gap-1 w-fit`}
                        >
                          {getCategoryIcon(reward.category)}
                          <span className="capitalize">{reward.category}</span>
                        </Badge>
                      </TableCell>
                      
                      <TableCell>
                        <Badge 
                          variant="outline"
                          className={`${getTierColor(reward.tier)} capitalize`}
                        >
                          {reward.tier}
                        </Badge>
                      </TableCell>
                      
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {reward.settingTypes.map(settingType => (
                            <Badge
                              key={settingType}
                              variant="outline"
                              className={`${getSettingTypeColor(settingType)} text-xs flex items-center gap-1`}
                            >
                              {getSettingTypeIcon(settingType)}
                              <span className="capitalize">{settingType}</span>
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        {reward.estimatedValue ? (
                          <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                            {reward.estimatedValue}
                          </code>
                        ) : (
                          <span className="text-gray-400 text-sm">-</span>
                        )}
                      </TableCell>
                      
                      <TableCell>
                        <div className="text-sm text-gray-600">
                          {formatDistanceToNow(new Date(reward.updatedAt), { addSuffix: true })}
                        </div>
                      </TableCell>
                      
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleEditReward(reward)}>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Reward
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => toggleRewardActive(reward.id)}>
                              {reward.isActive ? (
                                <>
                                  <ToggleLeft className="h-4 w-4 mr-2" />
                                  Deactivate
                                </>
                              ) : (
                                <>
                                  <ToggleRight className="h-4 w-4 mr-2" />
                                  Activate
                                </>
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => deleteReward(reward.id)}
                              className="text-red-600"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Create Reward Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Reward</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="reward-name">Reward Name</Label>
              <Input
                id="reward-name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="e.g., Premium Bonus Commission"
              />
            </div>
            
            <div>
              <Label htmlFor="reward-description">Description</Label>
              <Textarea
                id="reward-description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe what this reward provides"
                rows={3}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="reward-category">Category</Label>
                <Select value={formData.category} onValueChange={(value: RewardCategory) => setFormData(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="commission">Commission</SelectItem>
                    <SelectItem value="recognition">Recognition</SelectItem>
                    <SelectItem value="training">Training</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="time-off">Time Off</SelectItem>
                    <SelectItem value="equipment">Equipment</SelectItem>
                    <SelectItem value="experience">Experience</SelectItem>
                    <SelectItem value="leadership">Leadership</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="reward-tier">Tier</Label>
                <Select value={formData.tier} onValueChange={(value: RewardTier) => setFormData(prev => ({ ...prev, tier: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="premium">Premium</SelectItem>
                    <SelectItem value="exceptional">Exceptional</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <Label>Available for Setting Types</Label>
              <div className="flex flex-wrap gap-4 mt-2">
                {(['maintain', 'boost', 'supercharge'] as SettingType[]).map(settingType => (
                  <div key={settingType} className="flex items-center space-x-2">
                    <Checkbox
                      id={`setting-${settingType}`}
                      checked={formData.settingTypes.includes(settingType)}
                      onCheckedChange={(checked) => handleSettingTypeChange(settingType, checked as boolean)}
                    />
                    <label
                      htmlFor={`setting-${settingType}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-1 capitalize"
                    >
                      {getSettingTypeIcon(settingType)}
                      {settingType}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <Label htmlFor="reward-value">Estimated Value (Optional)</Label>
              <Input
                id="reward-value"
                value={formData.estimatedValue}
                onChange={(e) => setFormData(prev => ({ ...prev, estimatedValue: e.target.value }))}
                placeholder="e.g., $500, 5% of deal, 1 day salary"
              />
            </div>
            
            <div className="flex space-x-3 pt-4">
              <Button onClick={handleCreateReward} className="flex-1">
                Create Reward
              </Button>
              <Button variant="outline" onClick={() => { setIsCreateModalOpen(false); resetForm(); }}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Reward Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Reward</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-reward-name">Reward Name</Label>
              <Input
                id="edit-reward-name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="e.g., Premium Bonus Commission"
              />
            </div>
            
            <div>
              <Label htmlFor="edit-reward-description">Description</Label>
              <Textarea
                id="edit-reward-description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe what this reward provides"
                rows={3}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-reward-category">Category</Label>
                <Select value={formData.category} onValueChange={(value: RewardCategory) => setFormData(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="commission">Commission</SelectItem>
                    <SelectItem value="recognition">Recognition</SelectItem>
                    <SelectItem value="training">Training</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="time-off">Time Off</SelectItem>
                    <SelectItem value="equipment">Equipment</SelectItem>
                    <SelectItem value="experience">Experience</SelectItem>
                    <SelectItem value="leadership">Leadership</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="edit-reward-tier">Tier</Label>
                <Select value={formData.tier} onValueChange={(value: RewardTier) => setFormData(prev => ({ ...prev, tier: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="premium">Premium</SelectItem>
                    <SelectItem value="exceptional">Exceptional</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <Label>Available for Setting Types</Label>
              <div className="flex flex-wrap gap-4 mt-2">
                {(['maintain', 'boost', 'supercharge'] as SettingType[]).map(settingType => (
                  <div key={settingType} className="flex items-center space-x-2">
                    <Checkbox
                      id={`edit-setting-${settingType}`}
                      checked={formData.settingTypes.includes(settingType)}
                      onCheckedChange={(checked) => handleSettingTypeChange(settingType, checked as boolean)}
                    />
                    <label
                      htmlFor={`edit-setting-${settingType}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-1 capitalize"
                    >
                      {getSettingTypeIcon(settingType)}
                      {settingType}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <Label htmlFor="edit-reward-value">Estimated Value (Optional)</Label>
              <Input
                id="edit-reward-value"
                value={formData.estimatedValue}
                onChange={(e) => setFormData(prev => ({ ...prev, estimatedValue: e.target.value }))}
                placeholder="e.g., $500, 5% of deal, 1 day salary"
              />
            </div>
            
            <div className="flex space-x-3 pt-4">
              <Button onClick={handleUpdateReward} className="flex-1">
                Update Reward
              </Button>
              <Button variant="outline" onClick={() => { setIsEditModalOpen(false); resetForm(); }}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Rewards;

