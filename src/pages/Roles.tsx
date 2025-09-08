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
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
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
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Plus, 
  Users, 
  Building, 
  BarChart3, 
  Gift,
  MoreHorizontal,
  Edit,
  Trash2,
  ToggleLeft,
  ToggleRight,
  UserCheck,
  Target
} from 'lucide-react';
import { useRolesData, CreateRoleData, Role, User } from '@/hooks/useRolesData';
import { useRoleKPIData, KPIMetric } from '@/hooks/useRoleKPIData';
import { formatDistanceToNow } from 'date-fns';

const Roles = () => {
  const { 
    roles, 
    departments, 
    createRole, 
    updateRole, 
    updateRoleKPICount,
    assignUserToRole,
    removeUserFromRole,
    getUnassignedUsers,
    getAllUsers,
    deleteRole, 
    toggleRoleActive,
    getRoleStats
  } = useRolesData();
  
  const {
    roleKPIConfigs,
    availableKPIMetrics,
    createRoleKPIConfig,
    addKPIToRole,
    removeKPIFromRole,
    updateKPITarget,
    toggleKPIActive,
    getConfigByRoleId,
    getAvailableKPIsForRole
  } = useRoleKPIData();
  
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [formData, setFormData] = useState<CreateRoleData>({
    name: '',
    description: '',
    department: '',
    level: 'Mid'
  });

  // KPI configuration state
  const [isKPIModalOpen, setIsKPIModalOpen] = useState(false);
  const [selectedKPIRole, setSelectedKPIRole] = useState<Role | null>(null);
  const [selectedKPIConfig, setSelectedKPIConfig] = useState<any>(null);
  const [isAddKPIModalOpen, setIsAddKPIModalOpen] = useState(false);
  const [kpiFormData, setKPIFormData] = useState({
    kpiId: '',
    targetValue: 0
  });

  // Role details modal state
  const [isRoleDetailsModalOpen, setIsRoleDetailsModalOpen] = useState(false);
  const [selectedRoleForDetails, setSelectedRoleForDetails] = useState<Role | null>(null);

  // User assignment modal state
  const [isAssignUserModalOpen, setIsAssignUserModalOpen] = useState(false);
  const [selectedRoleForAssignment, setSelectedRoleForAssignment] = useState<Role | null>(null);

  const stats = getRoleStats();

  const getLevelColor = (level: string) => {
    const colors: Record<string, string> = {
      'Junior': 'bg-blue-100 text-blue-800',
      'Mid': 'bg-green-100 text-green-800', 
      'Senior': 'bg-purple-100 text-purple-800',
      'Lead': 'bg-orange-100 text-orange-800',
      'Manager': 'bg-red-100 text-red-800',
      'Director': 'bg-gray-100 text-gray-800'
    };
    return colors[level] || 'bg-gray-100 text-gray-800';
  };

  const getDepartmentColor = (department: string) => {
    const colors: Record<string, string> = {
      'Sales': 'bg-green-100 text-green-800',
      'Marketing': 'bg-blue-100 text-blue-800',
      'Listing Support': 'bg-teal-100 text-teal-800',
      'Admin': 'bg-gray-100 text-gray-800',
      'IT': 'bg-purple-100 text-purple-800',
      'HR': 'bg-pink-100 text-pink-800',
      'Finance': 'bg-yellow-100 text-yellow-800',
      'Operations': 'bg-orange-100 text-orange-800',
      'Customer Support': 'bg-indigo-100 text-indigo-800'
    };
    return colors[department] || 'bg-gray-100 text-gray-800';
  };

  const handleCreateRole = () => {
    if (!formData.name || !formData.department) return;
    
    createRole(formData);
    setFormData({
      name: '',
      description: '',
      department: '',
      level: 'Mid'
    });
    setIsCreateModalOpen(false);
  };

  const handleEditRole = (role: Role) => {
    setSelectedRole(role);
    setFormData({
      name: role.name,
      description: role.description,
      department: role.department,
      level: role.level
    });
    setIsEditModalOpen(true);
  };

  const handleUpdateRole = () => {
    if (!selectedRole || !formData.name || !formData.department) return;
    
    updateRole(selectedRole.id, formData);
    setSelectedRole(null);
    setFormData({
      name: '',
      description: '',
      department: '',
      level: 'Mid'
    });
    setIsEditModalOpen(false);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      department: '',
      level: 'Mid'
    });
    setSelectedRole(null);
  };

  // KPI configuration handlers
  const handleOpenKPIModal = (role: Role) => {
    setSelectedKPIRole(role);
    let config = getConfigByRoleId(role.id);
    
    if (!config) {
      config = createRoleKPIConfig(role.id, role.name);
    }
    
    setSelectedKPIConfig(config);
    setIsKPIModalOpen(true);
  };

  const handleAddKPI = () => {
    if (!selectedKPIConfig || !kpiFormData.kpiId || !kpiFormData.targetValue) return;
    
    addKPIToRole(selectedKPIConfig.id, kpiFormData.kpiId, kpiFormData.targetValue);
    
    // Update role KPI count
    const newConfig = getConfigByRoleId(selectedKPIConfig.roleId);
    if (newConfig && selectedKPIRole) {
      updateRoleKPICount(selectedKPIRole.id, newConfig.kpiMetrics.length);
    }
    
    setKPIFormData({ kpiId: '', targetValue: 0 });
    setIsAddKPIModalOpen(false);
  };

  const handleRemoveKPI = (kpiId: string) => {
    if (!selectedKPIConfig || !selectedKPIRole) return;
    
    removeKPIFromRole(selectedKPIConfig.id, kpiId);
    
    // Update role KPI count
    const newConfig = getConfigByRoleId(selectedKPIConfig.roleId);
    if (newConfig) {
      updateRoleKPICount(selectedKPIRole.id, newConfig.kpiMetrics.length);
    }
  };

  const handleUpdateKPITarget = (kpiId: string, targetValue: number) => {
    if (!selectedKPIConfig) return;
    
    updateKPITarget(selectedKPIConfig.id, kpiId, targetValue);
  };

  const handleToggleKPI = (kpiId: string) => {
    if (!selectedKPIConfig) return;
    
    toggleKPIActive(selectedKPIConfig.id, kpiId);
  };

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, React.ReactNode> = {
      'sales': <BarChart3 className="h-4 w-4" />,
      'listings': <Building className="h-4 w-4" />,
      'leads': <Users className="h-4 w-4" />,
      'client': <UserCheck className="h-4 w-4" />,
      'performance': <Target className="h-4 w-4" />,
      'revenue': <BarChart3 className="h-4 w-4" />,
      'activity': <Target className="h-4 w-4" />
    };
    return icons[category] || <BarChart3 className="h-4 w-4" />;
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'sales': 'bg-green-100 text-green-800 border-green-200',
      'listings': 'bg-blue-100 text-blue-800 border-blue-200',
      'leads': 'bg-purple-100 text-purple-800 border-purple-200',
      'client': 'bg-orange-100 text-orange-800 border-orange-200',
      'performance': 'bg-red-100 text-red-800 border-red-200',
      'revenue': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'activity': 'bg-gray-100 text-gray-800 border-gray-200'
    };
    return colors[category] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  // Role details modal handlers
  const handleOpenRoleDetails = (role: Role) => {
    console.log('Opening role details for:', role.name);
    setSelectedRoleForDetails(role);
    setIsRoleDetailsModalOpen(true);
  };

  const getUserStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'active': 'bg-green-100 text-green-800',
      'inactive': 'bg-gray-100 text-gray-800',
      'on_leave': 'bg-yellow-100 text-yellow-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getPerformanceColor = (performance?: number) => {
    if (!performance) return 'text-gray-400';
    if (performance >= 90) return 'text-green-600';
    if (performance >= 75) return 'text-blue-600';
    if (performance >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  // User assignment handlers
  const handleOpenAssignUser = (role: Role) => {
    setSelectedRoleForAssignment(role);
    setIsAssignUserModalOpen(true);
  };

  const handleAssignUser = (user: User) => {
    if (!selectedRoleForAssignment) return;
    
    assignUserToRole(selectedRoleForAssignment.id, user);
    setIsAssignUserModalOpen(false);
  };

  const handleRemoveUser = (userId: string) => {
    if (!selectedRoleForDetails) return;
    
    removeUserFromRole(selectedRoleForDetails.id, userId);
  };

  return (
    <DashboardLayout 
      title="Roles Management"
      headerControls={
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => resetForm()}>
              <Plus className="h-4 w-4 mr-2" />
              Create Role
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Role</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Role Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter role name"
                />
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe the role responsibilities"
                  rows={3}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="department">Department</Label>
                  <Select value={formData.department} onValueChange={(value) => setFormData(prev => ({ ...prev, department: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map(dept => (
                        <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="level">Level</Label>
                  <Select value={formData.level} onValueChange={(value: any) => setFormData(prev => ({ ...prev, level: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Junior">Junior</SelectItem>
                      <SelectItem value="Mid">Mid</SelectItem>
                      <SelectItem value="Senior">Senior</SelectItem>
                      <SelectItem value="Lead">Lead</SelectItem>
                      <SelectItem value="Manager">Manager</SelectItem>
                      <SelectItem value="Director">Director</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex space-x-3 pt-4">
                <Button onClick={handleCreateRole} className="flex-1">
                  Create Role
                </Button>
                <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      }
    >
      <div className="space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Roles</CardTitle>
              <UserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalRoles}</div>
              <p className="text-xs text-muted-foreground">
                {stats.activeRoles} active
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
              <p className="text-xs text-muted-foreground">
                Across all roles
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">With KPIs</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.rolesWithKPIs}</div>
              <p className="text-xs text-muted-foreground">
                Roles have KPIs set
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">With Welfare</CardTitle>
              <Gift className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.rolesWithWelfare}</div>
              <p className="text-xs text-muted-foreground">
                Have welfare benefits
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Roles Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Roles</CardTitle>
            <CardDescription>
              Manage user roles and their configurations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Status</TableHead>
                    <TableHead>Role Name</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Level</TableHead>
                    <TableHead className="text-right">Users</TableHead>
                    <TableHead className="text-right">KPIs</TableHead>
                    <TableHead className="text-center">Welfare</TableHead>
                    <TableHead className="text-right">Last Updated</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {roles.map((role) => (
                    <TableRow key={role.id} className={!role.isActive ? 'opacity-50' : ''}>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {role.isActive ? (
                            <div className="w-2 h-2 bg-green-500 rounded-full" />
                          ) : (
                            <div className="w-2 h-2 bg-gray-400 rounded-full" />
                          )}
                        </div>
                      </TableCell>
                      
                      <TableCell 
                        className="cursor-pointer hover:bg-gray-50" 
                        onClick={() => handleOpenRoleDetails(role)}
                      >
                        <div>
                          <div className="font-medium hover:text-blue-600 hover:underline transition-colors">
                            {role.name}
                          </div>
                          <div className="text-sm text-gray-600 truncate max-w-xs">
                            {role.description}
                          </div>
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <Badge variant="outline" className={getDepartmentColor(role.department)}>
                          {role.department}
                        </Badge>
                      </TableCell>
                      
                      <TableCell>
                        <Badge variant="outline" className={getLevelColor(role.level)}>
                          {role.level}
                        </Badge>
                      </TableCell>
                      
                      <TableCell className="text-right font-medium">
                        {role.userCount}
                      </TableCell>
                      
                      <TableCell className="text-right">
                        {role.kpiCount > 0 ? (
                          <Badge variant="outline" className="bg-blue-50 text-blue-700">
                            {role.kpiCount}
                          </Badge>
                        ) : (
                          <span className="text-gray-400">0</span>
                        )}
                      </TableCell>
                      
                      <TableCell className="text-center">
                        {role.hasWelfareBenefits ? (
                          <Gift className="h-4 w-4 text-green-600 mx-auto" />
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </TableCell>
                      
                      <TableCell className="text-right text-sm text-gray-600">
                        {formatDistanceToNow(new Date(role.updatedAt), { addSuffix: true })}
                      </TableCell>
                      
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleEditRole(role)}>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Role
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => toggleRoleActive(role.id)}>
                              {role.isActive ? (
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
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              onClick={() => deleteRole(role.id)}
                              className="text-red-600 hover:text-red-700"
                              disabled={role.userCount > 0}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete Role
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

      {/* Edit Role Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Role</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-name">Role Name</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter role name"
              />
            </div>
            
            <div>
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe the role responsibilities"
                rows={3}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-department">Department</Label>
                <Select value={formData.department} onValueChange={(value) => setFormData(prev => ({ ...prev, department: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map(dept => (
                      <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="edit-level">Level</Label>
                <Select value={formData.level} onValueChange={(value: any) => setFormData(prev => ({ ...prev, level: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Junior">Junior</SelectItem>
                    <SelectItem value="Mid">Mid</SelectItem>
                    <SelectItem value="Senior">Senior</SelectItem>
                    <SelectItem value="Lead">Lead</SelectItem>
                    <SelectItem value="Manager">Manager</SelectItem>
                    <SelectItem value="Director">Director</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex space-x-3 pt-4">
              <Button onClick={handleUpdateRole} className="flex-1">
                Update Role
              </Button>
              <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* KPI Configuration Modal */}
      <Dialog open={isKPIModalOpen} onOpenChange={setIsKPIModalOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>
              Configure KPIs - {selectedKPIRole?.name}
            </DialogTitle>
          </DialogHeader>
          
          {selectedKPIConfig && (
            <div className="flex-1 overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm text-gray-600">
                  {selectedKPIConfig.kpiMetrics.length} KPIs configured
                </div>
                <Button 
                  size="sm"
                  onClick={() => setIsAddKPIModalOpen(true)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add KPI
                </Button>
              </div>

              <div className="overflow-y-auto max-h-[50vh] space-y-4">
                {selectedKPIConfig.kpiMetrics.length > 0 ? (
                  selectedKPIConfig.kpiMetrics.map((kpi: KPIMetric) => (
                    <Card key={kpi.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {getCategoryIcon(kpi.category)}
                            <div>
                              <div className="font-medium">{kpi.name}</div>
                              <div className="text-sm text-gray-600">{kpi.description}</div>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge 
                                  variant="outline" 
                                  className={`${getCategoryColor(kpi.category)} text-xs`}
                                >
                                  {kpi.category}
                                </Badge>
                                <span className="text-sm">
                                  Target: {kpi.targetValue} {kpi.unit}
                                </span>
                                {kpi.currentValue !== undefined && (
                                  <span className="text-sm text-gray-500">
                                    Current: {kpi.currentValue} {kpi.unit}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleToggleKPI(kpi.id)}
                              className={kpi.isActive ? 'text-green-600' : 'text-gray-400'}
                            >
                              {kpi.isActive ? (
                                <ToggleRight className="h-4 w-4" />
                              ) : (
                                <ToggleLeft className="h-4 w-4" />
                              )}
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleRemoveKPI(kpi.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No KPIs configured for this role yet.
                    <br />
                    Click "Add KPI" to get started.
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Add KPI Modal */}
      <Dialog open={isAddKPIModalOpen} onOpenChange={setIsAddKPIModalOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>Add KPI Metric</DialogTitle>
          </DialogHeader>
          
          <div className="flex-1 overflow-hidden">
            <div className="space-y-4 mb-6">
              <div>
                <Label htmlFor="kpi-select">Select KPI Metric</Label>
                <Select value={kpiFormData.kpiId} onValueChange={(value) => setKPIFormData(prev => ({ ...prev, kpiId: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a KPI metric" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedKPIConfig && Object.entries(
                      getAvailableKPIsForRole(selectedKPIConfig.id).reduce((acc, kpi) => {
                        if (!acc[kpi.category]) acc[kpi.category] = [];
                        acc[kpi.category].push(kpi);
                        return acc;
                      }, {} as Record<string, any[]>)
                    ).map(([category, kpis]) => (
                      <div key={category}>
                        <div className="px-2 py-1 text-sm font-medium text-gray-500 capitalize">
                          {category} KPIs
                        </div>
                        {kpis.map((kpi) => (
                          <SelectItem key={kpi.id} value={kpi.id}>
                            <div className="flex items-center gap-2">
                              {getCategoryIcon(kpi.category)}
                              <div>
                                <div className="font-medium">{kpi.name}</div>
                                <div className="text-xs text-gray-600">{kpi.description}</div>
                              </div>
                            </div>
                          </SelectItem>
                        ))}
                      </div>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="target-value">Target Value</Label>
                <Input
                  id="target-value"
                  type="number"
                  value={kpiFormData.targetValue}
                  onChange={(e) => setKPIFormData(prev => ({ ...prev, targetValue: parseFloat(e.target.value) || 0 }))}
                  placeholder="Enter target value"
                />
                {kpiFormData.kpiId && (
                  <div className="text-xs text-gray-500 mt-1">
                    Unit: {availableKPIMetrics.find(k => k.id === kpiFormData.kpiId)?.unit}
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex space-x-3">
              <Button onClick={handleAddKPI} className="flex-1" disabled={!kpiFormData.kpiId || !kpiFormData.targetValue}>
                Add KPI
              </Button>
              <Button variant="outline" onClick={() => setIsAddKPIModalOpen(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Role Details Modal */}
      <Dialog open={isRoleDetailsModalOpen} onOpenChange={setIsRoleDetailsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                {selectedRoleForDetails?.isActive ? (
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                ) : (
                  <div className="w-3 h-3 bg-gray-400 rounded-full" />
                )}
                {selectedRoleForDetails?.name}
              </div>
              <Badge variant="outline" className={selectedRoleForDetails ? getLevelColor(selectedRoleForDetails.level) : ''}>
                {selectedRoleForDetails?.level}
              </Badge>
              <Badge variant="outline" className={selectedRoleForDetails ? getDepartmentColor(selectedRoleForDetails.department) : ''}>
                {selectedRoleForDetails?.department}
              </Badge>
            </DialogTitle>
          </DialogHeader>
          
          {selectedRoleForDetails && (
            <div className="flex-1 overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                {/* Summary Cards */}
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Users className="h-8 w-8 text-blue-500" />
                      <div>
                        <div className="text-2xl font-bold">{selectedRoleForDetails.userCount}</div>
                        <div className="text-sm text-gray-600">Users Assigned</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Target className="h-8 w-8 text-green-500" />
                      <div>
                        <div className="text-2xl font-bold">{selectedRoleForDetails.kpiCount}</div>
                        <div className="text-sm text-gray-600">KPIs Configured</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Gift className="h-8 w-8 text-purple-500" />
                      <div>
                        <div className="text-2xl font-bold">
                          {selectedRoleForDetails.hasWelfareBenefits ? 'Yes' : 'No'}
                        </div>
                        <div className="text-sm text-gray-600">Welfare Benefits</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 overflow-y-auto max-h-[40vh]">
                {/* Users List */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        Assigned Users ({selectedRoleForDetails.users.length})
                      </CardTitle>
                      <Button 
                        size="sm"
                        onClick={() => handleOpenAssignUser(selectedRoleForDetails)}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Assign User
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="max-h-[300px] overflow-y-auto">
                    {selectedRoleForDetails.users.length > 0 ? (
                      <div className="space-y-2">
                        {selectedRoleForDetails.users.map((user) => (
                          <div key={user.id} className="p-3 border rounded-lg">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center gap-3 flex-1 min-w-0">
                                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                                  <span className="text-sm font-medium">
                                    {user.name.split(' ').map(n => n[0]).join('')}
                                  </span>
                                </div>
                                <div className="min-w-0 flex-1">
                                  <div className="font-medium text-sm truncate">{user.name}</div>
                                  <div className="text-xs text-gray-600 truncate">{user.email}</div>
                                </div>
                              </div>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleRemoveUser(user.id)}
                                className="text-red-600 hover:text-red-700 flex-shrink-0 ml-2"
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                              <div className="text-gray-500">
                                Joined {formatDistanceToNow(new Date(user.joinedAt), { addSuffix: true })}
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge className={getUserStatusColor(user.status)} variant="outline">
                                  {user.status.replace('_', ' ')}
                                </Badge>
                                {user.performance && (
                                  <div className={`text-sm font-medium ${getPerformanceColor(user.performance)}`}>
                                    {user.performance}%
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        No users assigned to this role yet
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* KPIs List */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Target className="h-5 w-5" />
                        Configured KPIs ({selectedRoleForDetails.kpiCount})
                      </CardTitle>
                      <Button 
                        size="sm"
                        onClick={() => handleOpenKPIModal(selectedRoleForDetails)}
                      >
                        <Target className="h-4 w-4 mr-2" />
                        Configure KPIs
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="max-h-[300px] overflow-y-auto">
                    {(() => {
                      const kpiConfig = getConfigByRoleId(selectedRoleForDetails.id);
                      return kpiConfig && kpiConfig.kpiMetrics.length > 0 ? (
                        <div className="space-y-3">
                          {kpiConfig.kpiMetrics.map((kpi: KPIMetric) => (
                            <div key={kpi.id} className="p-3 border rounded-lg">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  {getCategoryIcon(kpi.category)}
                                  <span className="font-medium text-sm">{kpi.name}</span>
                                </div>
                                <Badge 
                                  variant="outline" 
                                  className={`${getCategoryColor(kpi.category)} text-xs`}
                                >
                                  {kpi.category}
                                </Badge>
                              </div>
                              <div className="text-xs text-gray-600 mb-2">{kpi.description}</div>
                              <div className="flex items-center justify-between text-sm">
                                <span>Target: {kpi.targetValue} {kpi.unit}</span>
                                {kpi.currentValue !== undefined && (
                                  <span className="text-gray-500">
                                    Current: {kpi.currentValue} {kpi.unit}
                                  </span>
                                )}
                                <Badge variant={kpi.isActive ? "default" : "secondary"} className="text-xs">
                                  {kpi.isActive ? 'Active' : 'Inactive'}
                                </Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8 text-gray-500">
                          No KPIs configured for this role yet
                        </div>
                      );
                    })()}
                  </CardContent>
                </Card>
              </div>

              {/* Role Description */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="text-lg">Role Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{selectedRoleForDetails.description}</p>
                  <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
                    <span>Created: {formatDistanceToNow(new Date(selectedRoleForDetails.createdAt), { addSuffix: true })}</span>
                    <span>Last updated: {formatDistanceToNow(new Date(selectedRoleForDetails.updatedAt), { addSuffix: true })}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Assign User Modal */}
      <Dialog open={isAssignUserModalOpen} onOpenChange={setIsAssignUserModalOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>
              Assign User to {selectedRoleForAssignment?.name}
            </DialogTitle>
          </DialogHeader>
          
          <div className="flex-1 overflow-hidden">
            <div className="mb-4">
              <div className="text-sm text-gray-600">
                Select a user to assign to this role
              </div>
            </div>

            <div className="overflow-y-auto max-h-[50vh] space-y-3">
              {(() => {
                const unassignedUsers = getUnassignedUsers();
                const allUsers = getAllUsers();
                
                // Show unassigned users first, then all users
                const availableUsers = unassignedUsers.length > 0 ? unassignedUsers : allUsers.filter(user => 
                  !selectedRoleForAssignment?.users.some(u => u.id === user.id)
                );

                return availableUsers.length > 0 ? (
                  <>
                    {unassignedUsers.length > 0 && (
                      <div>
                        <h3 className="font-medium text-sm mb-3 text-green-700">
                          Available Users (Not assigned to any role)
                        </h3>
                        <div className="space-y-2">
                          {unassignedUsers.map((user) => (
                            <Card 
                              key={user.id}
                              className="cursor-pointer hover:shadow-md transition-shadow border-green-200"
                              onClick={() => handleAssignUser(user)}
                            >
                              <CardContent className="p-4">
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                                    <span className="text-sm font-medium">
                                      {user.name.split(' ').map(n => n[0]).join('')}
                                    </span>
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <div className="font-medium text-sm truncate">{user.name}</div>
                                    <div className="text-xs text-gray-600 truncate">{user.email}</div>
                                    <div className="flex items-center gap-2 mt-1">
                                      <Badge className={getUserStatusColor(user.status)} variant="outline">
                                        {user.status.replace('_', ' ')}
                                      </Badge>
                                      {user.performance && (
                                        <div className={`text-xs font-medium ${getPerformanceColor(user.performance)}`}>
                                          {user.performance}%
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {unassignedUsers.length === 0 && (
                      <div>
                        <h3 className="font-medium text-sm mb-3 text-gray-700">
                          All Users (Some may be assigned to other roles)
                        </h3>
                        <div className="space-y-2">
                          {availableUsers.map((user) => {
                            const isAssignedElsewhere = roles.some(role => 
                              role.id !== selectedRoleForAssignment?.id && 
                              role.users.some(u => u.id === user.id)
                            );
                            
                            return (
                              <Card 
                                key={user.id}
                                className={`cursor-pointer hover:shadow-md transition-shadow ${
                                  isAssignedElsewhere ? 'border-yellow-200 bg-yellow-50' : ''
                                }`}
                                onClick={() => handleAssignUser(user)}
                              >
                                <CardContent className="p-4">
                                  <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                                      <span className="text-sm font-medium">
                                        {user.name.split(' ').map(n => n[0]).join('')}
                                      </span>
                                    </div>
                                    <div className="min-w-0 flex-1">
                                      <div className="font-medium text-sm truncate">{user.name}</div>
                                      <div className="text-xs text-gray-600 truncate">{user.email}</div>
                                      {isAssignedElsewhere && (
                                        <div className="text-xs text-yellow-600 truncate">
                                          Currently assigned to another role
                                        </div>
                                      )}
                                      <div className="flex items-center gap-2 mt-1">
                                        <Badge className={getUserStatusColor(user.status)} variant="outline">
                                          {user.status.replace('_', ' ')}
                                        </Badge>
                                        {user.performance && (
                                          <div className={`text-xs font-medium ${getPerformanceColor(user.performance)}`}>
                                            {user.performance}%
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No users available for assignment
                  </div>
                );
              })()}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Roles;
