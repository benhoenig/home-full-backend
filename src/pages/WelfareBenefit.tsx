import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { 
  Gift, 
  Users, 
  Target, 
  Plus,
  DollarSign,
  Calendar,
  Heart,
  BookOpen,
  Star,
  Car,
  Coffee,
  TrendingUp,
  Award,
  Clock,
  Home,
  Activity,
  Leaf,
  UserCheck,
  Megaphone,
  X,
  Settings,
  Edit3,
  Trash2
} from 'lucide-react';
import { useWelfareBenefitData, RoleWelfareConfig, WelfareBenefit } from '@/hooks/useWelfareBenefitData';
import { useRolesData } from '@/hooks/useRolesData';

// Icon mapping for welfare benefits
const iconMap: Record<string, React.ComponentType<any>> = {
  DollarSign,
  TrendingUp,
  Award,
  Calendar,
  Clock,
  Home,
  Heart,
  Activity,
  Leaf,
  BookOpen,
  Users,
  UserCheck,
  Star,
  Megaphone,
  Car,
  Coffee
};

const WelfareBenefit = () => {
  const { 
    roleWelfareConfigs, 
    availableWelfareBenefits,
    customWelfareBenefits,
    createRoleWelfareConfig,
    toggleConfigActive,
    addBenefitToRange,
    removeBenefitFromRange,
    createWelfareBenefit,
    updateWelfareBenefit,
    deleteWelfareBenefit,
    updatePerformanceRanges,
    getAllAvailableBenefits,
    getWelfareStats
  } = useWelfareBenefitData();
  
  const { getActiveRoles } = useRolesData();
  
  const [selectedRoleId, setSelectedRoleId] = useState<string>('');
  const [selectedConfig, setSelectedConfig] = useState<RoleWelfareConfig | null>(null);
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [selectedRangeId, setSelectedRangeId] = useState<string>('');
  const [isBenefitModalOpen, setIsBenefitModalOpen] = useState(false);
  
  // New state for benefit management
  const [isCreateBenefitModalOpen, setIsCreateBenefitModalOpen] = useState(false);
  const [isEditBenefitModalOpen, setIsEditBenefitModalOpen] = useState(false);
  const [selectedBenefit, setSelectedBenefit] = useState<WelfareBenefit | null>(null);
  const [benefitFormData, setBenefitFormData] = useState({
    name: '',
    description: '',
    type: 'monetary' as WelfareBenefit['type'],
    value: '',
    unit: '',
    icon: 'DollarSign'
  });
  
  // New state for performance range management
  const [isRangeModalOpen, setIsRangeModalOpen] = useState(false);
  const [rangeFormData, setRangeFormData] = useState([
    { id: 'excellent', name: 'Excellent', minScore: 90, maxScore: 100, color: 'bg-green-500' },
    { id: 'good', name: 'Good', minScore: 75, maxScore: 89, color: 'bg-blue-500' },
    { id: 'satisfactory', name: 'Satisfactory', minScore: 60, maxScore: 74, color: 'bg-yellow-500' },
    { id: 'needs_improvement', name: 'Needs Improvement', minScore: 0, maxScore: 59, color: 'bg-red-500' }
  ]);

  const activeRoles = getActiveRoles();
  const stats = getWelfareStats();

  // Get roles that don't have welfare configs yet
  const rolesWithoutWelfare = activeRoles.filter(role => 
    !roleWelfareConfigs.some(config => config.roleId === role.id)
  );

  const getIcon = (iconName: string) => {
    const IconComponent = iconMap[iconName] || Gift;
    return <IconComponent className="h-4 w-4" />;
  };

  const getBenefitTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      'monetary': 'bg-green-100 text-green-800 border-green-200',
      'time_off': 'bg-blue-100 text-blue-800 border-blue-200',
      'health': 'bg-red-100 text-red-800 border-red-200',
      'development': 'bg-purple-100 text-purple-800 border-purple-200',
      'recognition': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'other': 'bg-gray-100 text-gray-800 border-gray-200'
    };
    return colors[type] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const handleCreateConfig = () => {
    if (!selectedRoleId) return;
    
    const role = activeRoles.find(r => r.id === selectedRoleId);
    if (!role) return;
    
    const newConfig = createRoleWelfareConfig(selectedRoleId, role.name);
    setSelectedConfig(newConfig);
    setSelectedRoleId('');
    setIsConfigModalOpen(true);
  };

  const handleAddBenefit = (benefitId: string) => {
    if (!selectedConfig || !selectedRangeId) return;
    
    addBenefitToRange(selectedConfig.id, selectedRangeId, benefitId);
    setIsBenefitModalOpen(false);
  };

  const handleRemoveBenefit = (rangeId: string, benefitId: string) => {
    if (!selectedConfig) return;
    
    removeBenefitFromRange(selectedConfig.id, rangeId, benefitId);
  };

  const getAvailableBenefitsForRange = (rangeId: string) => {
    if (!selectedConfig) return getAllAvailableBenefits();
    
    const range = selectedConfig.performanceRanges.find(r => r.id === rangeId);
    if (!range) return getAllAvailableBenefits();
    
    const usedBenefitIds = range.benefits.map(b => b.id);
    return getAllAvailableBenefits().filter(b => !usedBenefitIds.includes(b.id));
  };

  // Benefit management handlers
  const handleCreateBenefit = () => {
    if (!benefitFormData.name || !benefitFormData.value) return;
    
    createWelfareBenefit(benefitFormData);
    setBenefitFormData({
      name: '',
      description: '',
      type: 'monetary',
      value: '',
      unit: '',
      icon: 'DollarSign'
    });
    setIsCreateBenefitModalOpen(false);
  };

  const handleEditBenefit = (benefit: WelfareBenefit) => {
    setSelectedBenefit(benefit);
    setBenefitFormData({
      name: benefit.name,
      description: benefit.description,
      type: benefit.type,
      value: benefit.value,
      unit: benefit.unit,
      icon: benefit.icon
    });
    setIsEditBenefitModalOpen(true);
  };

  const handleUpdateBenefit = () => {
    if (!selectedBenefit || !benefitFormData.name || !benefitFormData.value) return;
    
    updateWelfareBenefit(selectedBenefit.id, benefitFormData);
    setSelectedBenefit(null);
    setBenefitFormData({
      name: '',
      description: '',
      type: 'monetary',
      value: '',
      unit: '',
      icon: 'DollarSign'
    });
    setIsEditBenefitModalOpen(false);
  };

  const handleDeleteBenefit = (benefitId: string) => {
    deleteWelfareBenefit(benefitId);
  };

  // Performance range handlers
  const handleUpdateRanges = () => {
    if (!selectedConfig) return;
    
    const updatedRanges = rangeFormData.map(range => ({
      ...range,
      benefits: selectedConfig.performanceRanges.find(r => r.id === range.id)?.benefits || []
    }));
    
    updatePerformanceRanges(selectedConfig.id, updatedRanges);
    setIsRangeModalOpen(false);
  };

  const handleOpenRangeModal = (config: RoleWelfareConfig) => {
    setSelectedConfig(config);
    setRangeFormData(config.performanceRanges.map(range => ({
      id: range.id,
      name: range.name,
      minScore: range.minScore,
      maxScore: range.maxScore,
      color: range.color
    })));
    setIsRangeModalOpen(true);
  };

  return (
    <DashboardLayout 
      title="Welfare & Benefits"
      headerControls={
        <div className="flex items-center gap-2">
          <Button 
            variant="outline"
            onClick={() => setIsCreateBenefitModalOpen(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Benefit
          </Button>
          <Select value={selectedRoleId} onValueChange={setSelectedRoleId}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              {rolesWithoutWelfare.map(role => (
                <SelectItem key={role.id} value={role.id}>
                  {role.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button 
            onClick={handleCreateConfig}
            disabled={!selectedRoleId}
          >
            <Plus className="h-4 w-4 mr-2" />
            Configure Welfare
          </Button>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Configured Roles</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalConfigs}</div>
              <p className="text-xs text-muted-foreground">
                {stats.activeConfigs} active
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Benefits</CardTitle>
              <Gift className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalBenefits}</div>
              <p className="text-xs text-muted-foreground">
                Assigned across roles
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Available Benefits</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.availableBenefits}</div>
              <p className="text-xs text-muted-foreground">
                Ready to assign
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Benefit Types</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Object.keys(stats.benefitsByType).length}</div>
              <p className="text-xs text-muted-foreground">
                Different categories
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Custom Benefits Management */}
        {customWelfareBenefits.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Custom Benefits</span>
                <Badge variant="outline">
                  {customWelfareBenefits.length} custom benefits
                </Badge>
              </CardTitle>
              <CardDescription>
                Manage your custom welfare benefits
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {customWelfareBenefits.map((benefit) => (
                  <Card key={benefit.id} className="border-dashed">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          {getIcon(benefit.icon)}
                          <div className="flex-1">
                            <div className="font-medium text-sm">{benefit.name}</div>
                            <div className="text-xs text-gray-600 mt-1">
                              {benefit.description}
                            </div>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge 
                                variant="outline" 
                                className={`${getBenefitTypeColor(benefit.type)} text-xs`}
                              >
                                {benefit.type.replace('_', ' ')}
                              </Badge>
                              <span className="text-xs font-medium">
                                {benefit.value} {benefit.unit}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleEditBenefit(benefit)}
                          >
                            <Edit3 className="h-3 w-3" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleDeleteBenefit(benefit.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Role Welfare Configurations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {roleWelfareConfigs.map((config) => (
            <Card key={config.id} className={!config.isActive ? 'opacity-60' : ''}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">{config.roleName}</CardTitle>
                    <CardDescription>
                      Performance-based welfare benefits
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    {config.isActive ? (
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                    ) : (
                      <Badge variant="outline">Inactive</Badge>
                    )}
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleOpenRangeModal(config)}
                    >
                      <Settings className="h-4 w-4 mr-1" />
                      Ranges
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        setSelectedConfig(config);
                        setIsConfigModalOpen(true);
                      }}
                    >
                      Configure
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {config.performanceRanges.map((range) => (
                    <div key={range.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${range.color}`} />
                          <span className="font-medium">{range.name}</span>
                          <Badge variant="outline" className="text-xs">
                            {range.minScore}-{range.maxScore}%
                          </Badge>
                        </div>
                        <Badge variant="outline">
                          {range.benefits.length} benefits
                        </Badge>
                      </div>
                      
                      {range.benefits.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {range.benefits.slice(0, 3).map((benefit) => (
                            <Badge 
                              key={benefit.id} 
                              variant="outline" 
                              className={`${getBenefitTypeColor(benefit.type)} text-xs`}
                            >
                              {getIcon(benefit.icon)}
                              <span className="ml-1">{benefit.name}</span>
                            </Badge>
                          ))}
                          {range.benefits.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{range.benefits.length - 3} more
                            </Badge>
                          )}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500">No benefits configured</p>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {roleWelfareConfigs.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16">
              <div className="text-center space-y-4">
                <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                  <Gift className="h-6 w-6 text-gray-400" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">No Welfare Configurations</h3>
                  <p className="text-gray-500 mt-1">
                    Start by selecting a role and configuring welfare benefits
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Configuration Modal */}
      <Dialog open={isConfigModalOpen} onOpenChange={setIsConfigModalOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>
              Configure Welfare Benefits - {selectedConfig?.roleName}
            </DialogTitle>
          </DialogHeader>
          
          {selectedConfig && (
            <div className="flex-1 overflow-hidden">
              <ScrollArea className="h-[60vh]">
                <div className="space-y-6 pr-4">
                  {selectedConfig.performanceRanges.map((range) => (
                    <Card key={range.id}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-4 h-4 rounded-full ${range.color}`} />
                            <div>
                              <CardTitle className="text-lg">{range.name}</CardTitle>
                              <CardDescription>
                                Performance Score: {range.minScore}-{range.maxScore}%
                              </CardDescription>
                            </div>
                          </div>
                          <Button 
                            size="sm"
                            onClick={() => {
                              setSelectedRangeId(range.id);
                              setIsBenefitModalOpen(true);
                            }}
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Add Benefit
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        {range.benefits.length > 0 ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {range.benefits.map((benefit) => (
                              <div 
                                key={benefit.id}
                                className="flex items-center justify-between p-3 border rounded-lg"
                              >
                                <div className="flex items-center gap-3">
                                  {getIcon(benefit.icon)}
                                  <div>
                                    <div className="font-medium text-sm">{benefit.name}</div>
                                    <div className="text-xs text-gray-600">
                                      {benefit.value} {benefit.unit}
                                    </div>
                                  </div>
                                </div>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => handleRemoveBenefit(range.id, benefit.id)}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-gray-500 text-center py-8">
                            No benefits configured for this performance range
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Benefit Modal */}
      <Dialog open={isBenefitModalOpen} onOpenChange={setIsBenefitModalOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>Add Welfare Benefit</DialogTitle>
          </DialogHeader>
          
          <div className="flex-1 overflow-hidden">
            <ScrollArea className="h-[60vh]">
              <div className="space-y-4 pr-4">
                {Object.entries(
                  getAvailableBenefitsForRange(selectedRangeId).reduce((acc, benefit) => {
                    if (!acc[benefit.type]) acc[benefit.type] = [];
                    acc[benefit.type].push(benefit);
                    return acc;
                  }, {} as Record<string, WelfareBenefit[]>)
                ).map(([type, benefits]) => (
                  <div key={type}>
                    <h3 className="font-medium text-sm mb-3 capitalize">
                      {type.replace('_', ' ')} Benefits
                    </h3>
                    <div className="grid grid-cols-1 gap-2">
                      {benefits.map((benefit) => (
                        <Card 
                          key={benefit.id}
                          className="cursor-pointer hover:shadow-md transition-shadow"
                          onClick={() => handleAddBenefit(benefit.id)}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-start gap-3">
                              {getIcon(benefit.icon)}
                              <div className="flex-1">
                                <div className="font-medium">{benefit.name}</div>
                                <div className="text-sm text-gray-600 mt-1">
                                  {benefit.description}
                                </div>
                                <div className="flex items-center gap-2 mt-2">
                                  <Badge 
                                    variant="outline" 
                                    className={`${getBenefitTypeColor(benefit.type)} text-xs`}
                                  >
                                    {benefit.type.replace('_', ' ')}
                                  </Badge>
                                  <span className="text-sm font-medium">
                                    {benefit.value} {benefit.unit}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </DialogContent>
      </Dialog>

      {/* Create Benefit Modal */}
      <Dialog open={isCreateBenefitModalOpen} onOpenChange={setIsCreateBenefitModalOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Create New Welfare Benefit</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="benefit-name">Benefit Name</Label>
              <Input
                id="benefit-name"
                value={benefitFormData.name}
                onChange={(e) => setBenefitFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter benefit name"
              />
            </div>
            
            <div>
              <Label htmlFor="benefit-description">Description</Label>
              <Textarea
                id="benefit-description"
                value={benefitFormData.description}
                onChange={(e) => setBenefitFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe the benefit"
                rows={3}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="benefit-type">Type</Label>
                <Select value={benefitFormData.type} onValueChange={(value: any) => setBenefitFormData(prev => ({ ...prev, type: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monetary">Monetary</SelectItem>
                    <SelectItem value="time_off">Time Off</SelectItem>
                    <SelectItem value="health">Health</SelectItem>
                    <SelectItem value="development">Development</SelectItem>
                    <SelectItem value="recognition">Recognition</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="benefit-icon">Icon</Label>
                <Select value={benefitFormData.icon} onValueChange={(value) => setBenefitFormData(prev => ({ ...prev, icon: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="DollarSign">💰 Money</SelectItem>
                    <SelectItem value="Calendar">📅 Calendar</SelectItem>
                    <SelectItem value="Heart">❤️ Health</SelectItem>
                    <SelectItem value="BookOpen">📚 Learning</SelectItem>
                    <SelectItem value="Star">⭐ Recognition</SelectItem>
                    <SelectItem value="Gift">🎁 Gift</SelectItem>
                    <SelectItem value="Car">🚗 Transport</SelectItem>
                    <SelectItem value="Coffee">☕ Food</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="benefit-value">Value</Label>
                <Input
                  id="benefit-value"
                  value={benefitFormData.value}
                  onChange={(e) => setBenefitFormData(prev => ({ ...prev, value: e.target.value }))}
                  placeholder="e.g., 5000 or 2-10"
                />
              </div>
              
              <div>
                <Label htmlFor="benefit-unit">Unit</Label>
                <Input
                  id="benefit-unit"
                  value={benefitFormData.unit}
                  onChange={(e) => setBenefitFormData(prev => ({ ...prev, unit: e.target.value }))}
                  placeholder="e.g., THB, days, %"
                />
              </div>
            </div>
            
            <div className="flex space-x-3 pt-4">
              <Button onClick={handleCreateBenefit} className="flex-1">
                Create Benefit
              </Button>
              <Button variant="outline" onClick={() => setIsCreateBenefitModalOpen(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Benefit Modal */}
      <Dialog open={isEditBenefitModalOpen} onOpenChange={setIsEditBenefitModalOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Welfare Benefit</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-benefit-name">Benefit Name</Label>
              <Input
                id="edit-benefit-name"
                value={benefitFormData.name}
                onChange={(e) => setBenefitFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter benefit name"
              />
            </div>
            
            <div>
              <Label htmlFor="edit-benefit-description">Description</Label>
              <Textarea
                id="edit-benefit-description"
                value={benefitFormData.description}
                onChange={(e) => setBenefitFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe the benefit"
                rows={3}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-benefit-type">Type</Label>
                <Select value={benefitFormData.type} onValueChange={(value: any) => setBenefitFormData(prev => ({ ...prev, type: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monetary">Monetary</SelectItem>
                    <SelectItem value="time_off">Time Off</SelectItem>
                    <SelectItem value="health">Health</SelectItem>
                    <SelectItem value="development">Development</SelectItem>
                    <SelectItem value="recognition">Recognition</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="edit-benefit-icon">Icon</Label>
                <Select value={benefitFormData.icon} onValueChange={(value) => setBenefitFormData(prev => ({ ...prev, icon: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="DollarSign">💰 Money</SelectItem>
                    <SelectItem value="Calendar">📅 Calendar</SelectItem>
                    <SelectItem value="Heart">❤️ Health</SelectItem>
                    <SelectItem value="BookOpen">📚 Learning</SelectItem>
                    <SelectItem value="Star">⭐ Recognition</SelectItem>
                    <SelectItem value="Gift">🎁 Gift</SelectItem>
                    <SelectItem value="Car">🚗 Transport</SelectItem>
                    <SelectItem value="Coffee">☕ Food</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-benefit-value">Value</Label>
                <Input
                  id="edit-benefit-value"
                  value={benefitFormData.value}
                  onChange={(e) => setBenefitFormData(prev => ({ ...prev, value: e.target.value }))}
                  placeholder="e.g., 5000 or 2-10"
                />
              </div>
              
              <div>
                <Label htmlFor="edit-benefit-unit">Unit</Label>
                <Input
                  id="edit-benefit-unit"
                  value={benefitFormData.unit}
                  onChange={(e) => setBenefitFormData(prev => ({ ...prev, unit: e.target.value }))}
                  placeholder="e.g., THB, days, %"
                />
              </div>
            </div>
            
            <div className="flex space-x-3 pt-4">
              <Button onClick={handleUpdateBenefit} className="flex-1">
                Update Benefit
              </Button>
              <Button variant="outline" onClick={() => setIsEditBenefitModalOpen(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Performance Ranges Modal */}
      <Dialog open={isRangeModalOpen} onOpenChange={setIsRangeModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              Edit Performance Score Ranges - {selectedConfig?.roleName}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            {rangeFormData.map((range, index) => (
              <Card key={range.id}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-4 h-4 rounded-full ${range.color}`} />
                    
                    <div className="flex-1">
                      <Label htmlFor={`range-name-${index}`}>Range Name</Label>
                      <Input
                        id={`range-name-${index}`}
                        value={range.name}
                        onChange={(e) => {
                          const newRanges = [...rangeFormData];
                          newRanges[index].name = e.target.value;
                          setRangeFormData(newRanges);
                        }}
                        placeholder="Range name"
                      />
                    </div>
                    
                    <div className="w-24">
                      <Label htmlFor={`range-min-${index}`}>Min %</Label>
                      <Input
                        id={`range-min-${index}`}
                        type="number"
                        min="0"
                        max="100"
                        value={range.minScore}
                        onChange={(e) => {
                          const newRanges = [...rangeFormData];
                          newRanges[index].minScore = parseInt(e.target.value) || 0;
                          setRangeFormData(newRanges);
                        }}
                      />
                    </div>
                    
                    <div className="w-24">
                      <Label htmlFor={`range-max-${index}`}>Max %</Label>
                      <Input
                        id={`range-max-${index}`}
                        type="number"
                        min="0"
                        max="100"
                        value={range.maxScore}
                        onChange={(e) => {
                          const newRanges = [...rangeFormData];
                          newRanges[index].maxScore = parseInt(e.target.value) || 100;
                          setRangeFormData(newRanges);
                        }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            <div className="flex space-x-3 pt-4">
              <Button onClick={handleUpdateRanges} className="flex-1">
                Update Ranges
              </Button>
              <Button variant="outline" onClick={() => setIsRangeModalOpen(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default WelfareBenefit;
