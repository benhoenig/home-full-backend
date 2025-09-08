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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Plus, 
  BarChart3, 
  TrendingUp, 
  Target, 
  Users, 
  Building, 
  UserCheck,
  MoreHorizontal,
  Edit,
  Trash2,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';
import { useKPIMetricsData, KPIMetricDefinition, CreateKPIMetricData } from '@/hooks/useKPIMetricsData';
import { availableKPIMetrics } from '@/hooks/useRoleKPIData';
import { formatDistanceToNow } from 'date-fns';

const KPI = () => {
  const { 
    kpiMetrics, 
    createKPIMetric, 
    updateKPIMetric, 
    toggleKPIMetricActive, 
    deleteKPIMetric,
    getKPIMetricsStats 
  } = useKPIMetricsData();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState<KPIMetricDefinition | null>(null);
  const [modalMode, setModalMode] = useState<'select' | 'custom'>('select'); // New state for modal mode
  const [selectedExistingMetric, setSelectedExistingMetric] = useState<string>(''); // For selecting existing metrics
  const [formData, setFormData] = useState<CreateKPIMetricData>({
    name: '',
    description: '',
    category: 'sales',
    unit: ''
  });

  const stats = getKPIMetricsStats();

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, React.ReactNode> = {
      'sales': <BarChart3 className="h-4 w-4" />,
      'listings': <Building className="h-4 w-4" />,
      'leads': <Users className="h-4 w-4" />,
      'client': <UserCheck className="h-4 w-4" />,
      'performance': <Target className="h-4 w-4" />,
      'revenue': <TrendingUp className="h-4 w-4" />,
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

  const handleCreateMetric = () => {
    if (modalMode === 'select') {
      // Adding existing metric from system
      if (!selectedExistingMetric) return;
      
      const existingMetric = availableKPIMetrics.find(m => m.id === selectedExistingMetric);
      if (!existingMetric) return;
      
      // Check if metric already exists in our KPI metrics list
      const alreadyExists = kpiMetrics.some(m => m.id === existingMetric.id);
      if (alreadyExists) {
        alert('This metric already exists in your KPI list!');
        return;
      }
      
      const metricData: CreateKPIMetricData = {
        name: existingMetric.name,
        description: existingMetric.description,
        category: existingMetric.category,
        unit: existingMetric.unit
      };
      
      createKPIMetric(metricData);
      setSelectedExistingMetric('');
    } else {
      // Creating custom metric
      if (!formData.name || !formData.unit) return;
      
      createKPIMetric(formData);
      setFormData({
        name: '',
        description: '',
        category: 'sales',
        unit: ''
      });
    }
    
    setIsCreateModalOpen(false);
    setModalMode('select'); // Reset to default mode
  };

  const handleEditMetric = (metric: KPIMetricDefinition) => {
    setSelectedMetric(metric);
    setFormData({
      name: metric.name,
      description: metric.description,
      category: metric.category,
      unit: metric.unit
    });
    setIsEditModalOpen(true);
  };

  const handleUpdateMetric = () => {
    if (!selectedMetric || !formData.name || !formData.unit) return;
    
    updateKPIMetric(selectedMetric.id, formData);
    setSelectedMetric(null);
    setFormData({
      name: '',
      description: '',
      category: 'sales',
      unit: ''
    });
    setIsEditModalOpen(false);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      category: 'sales',
      unit: ''
    });
    setSelectedMetric(null);
    setSelectedExistingMetric('');
    setModalMode('select');
  };

  // Get available system metrics that aren't already in our KPI list
  const getAvailableSystemMetrics = () => {
    return availableKPIMetrics.filter(systemMetric => 
      !kpiMetrics.some(existingMetric => existingMetric.id === systemMetric.id)
    );
  };

  return (
    <DashboardLayout 
      title="KPI Metrics Management"
      headerControls={
        <Button onClick={() => setIsCreateModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add KPI Metric
        </Button>
      }
    >
      <div className="space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Metrics</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalMetrics}</div>
              <p className="text-xs text-muted-foreground">
                Available KPI metrics
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Metrics</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeMetrics}</div>
              <p className="text-xs text-muted-foreground">
                Ready to assign to roles
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Inactive Metrics</CardTitle>
              <ToggleLeft className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.inactiveMetrics}</div>
              <p className="text-xs text-muted-foreground">
                Temporarily disabled
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Categories</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Object.keys(stats.metricsByCategory).length}</div>
              <p className="text-xs text-muted-foreground">
                Different metric types
              </p>
            </CardContent>
          </Card>
        </div>

        {/* KPI Metrics Table */}
        <Card>
          <CardHeader>
            <CardTitle>All KPI Metrics</CardTitle>
            <CardDescription>
              Manage the master list of KPI metrics that can be assigned to roles
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Status</TableHead>
                    <TableHead>Metric Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Unit</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {kpiMetrics.map((metric) => (
                    <TableRow key={metric.id} className={!metric.isActive ? 'opacity-50' : ''}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {metric.isActive ? (
                            <div className="w-2 h-2 bg-green-500 rounded-full" />
                          ) : (
                            <div className="w-2 h-2 bg-gray-400 rounded-full" />
                          )}
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <div>
                          <div className="font-medium">{metric.name}</div>
                          <div className="text-sm text-gray-600 truncate max-w-xs">
                            {metric.description}
                          </div>
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <Badge 
                          variant="outline" 
                          className={`${getCategoryColor(metric.category)} flex items-center gap-1 w-fit`}
                        >
                          {getCategoryIcon(metric.category)}
                          <span className="capitalize">{metric.category}</span>
                        </Badge>
                      </TableCell>
                      
                      <TableCell>
                        <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                          {metric.unit}
                        </code>
                      </TableCell>
                      
                      <TableCell>
                        <div className="text-sm text-gray-600">
                          {formatDistanceToNow(new Date(metric.updatedAt), { addSuffix: true })}
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
                            <DropdownMenuItem onClick={() => handleEditMetric(metric)}>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Metric
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => toggleKPIMetricActive(metric.id)}>
                              {metric.isActive ? (
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
                              onClick={() => deleteKPIMetric(metric.id)}
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

      {/* Create KPI Metric Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add KPI Metric</DialogTitle>
          </DialogHeader>
          
          <Tabs value={modalMode} onValueChange={(value: any) => setModalMode(value)}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="select">Select Existing Metric</TabsTrigger>
              <TabsTrigger value="custom">Create Custom Metric</TabsTrigger>
            </TabsList>
            
            <TabsContent value="select" className="space-y-4 mt-6">
              <div>
                <Label htmlFor="existing-metric">Choose from System Metrics</Label>
                <Select value={selectedExistingMetric} onValueChange={setSelectedExistingMetric}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a metric from your system" />
                  </SelectTrigger>
                  <SelectContent>
                    {getAvailableSystemMetrics().map((metric) => (
                      <SelectItem key={metric.id} value={metric.id}>
                        <div className="flex items-center gap-2">
                          {getCategoryIcon(metric.category)}
                          <span>{metric.name}</span>
                          <Badge variant="outline" className={`${getCategoryColor(metric.category)} text-xs ml-2`}>
                            {metric.category}
                          </Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {selectedExistingMetric && (
                <div className="p-4 bg-gray-50 rounded-lg">
                  {(() => {
                    const metric = availableKPIMetrics.find(m => m.id === selectedExistingMetric);
                    return metric ? (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{metric.name}</h4>
                          <Badge variant="outline" className={getCategoryColor(metric.category)}>
                            {getCategoryIcon(metric.category)}
                            <span className="ml-1 capitalize">{metric.category}</span>
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">{metric.description}</p>
                        <div className="text-sm">
                          <span className="font-medium">Unit: </span>
                          <code className="bg-white px-2 py-1 rounded text-xs">{metric.unit}</code>
                        </div>
                      </div>
                    ) : null;
                  })()}
                </div>
              )}
              
              {getAvailableSystemMetrics().length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <div className="text-sm">All system metrics have already been added to your KPI list!</div>
                  <div className="text-xs mt-1">Switch to "Create Custom Metric" to add new ones.</div>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="custom" className="space-y-4 mt-6">
              <div>
                <Label htmlFor="custom-metric-name">Metric Name</Label>
                <Input
                  id="custom-metric-name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g., Custom Performance Score"
                />
              </div>
              
              <div>
                <Label htmlFor="custom-metric-description">Description</Label>
                <Textarea
                  id="custom-metric-description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe what this custom metric measures"
                  rows={3}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="custom-metric-category">Category</Label>
                  <Select value={formData.category} onValueChange={(value: any) => setFormData(prev => ({ ...prev, category: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sales">Sales</SelectItem>
                      <SelectItem value="listings">Listings</SelectItem>
                      <SelectItem value="leads">Leads</SelectItem>
                      <SelectItem value="client">Client</SelectItem>
                      <SelectItem value="performance">Performance</SelectItem>
                      <SelectItem value="revenue">Revenue</SelectItem>
                      <SelectItem value="activity">Activity</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="custom-metric-unit">Unit</Label>
                  <Input
                    id="custom-metric-unit"
                    value={formData.unit}
                    onChange={(e) => setFormData(prev => ({ ...prev, unit: e.target.value }))}
                    placeholder="e.g., THB, %, count, score"
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="flex space-x-3 pt-6 border-t">
            <Button 
              onClick={handleCreateMetric} 
              className="flex-1"
              disabled={
                (modalMode === 'select' && !selectedExistingMetric) ||
                (modalMode === 'custom' && (!formData.name || !formData.unit))
              }
            >
              {modalMode === 'select' ? 'Add Selected Metric' : 'Create Custom Metric'}
            </Button>
            <Button variant="outline" onClick={() => { setIsCreateModalOpen(false); resetForm(); }}>
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit KPI Metric Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit KPI Metric</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-metric-name">Metric Name</Label>
              <Input
                id="edit-metric-name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="e.g., Total Sales"
              />
            </div>
            
            <div>
              <Label htmlFor="edit-metric-description">Description</Label>
              <Textarea
                id="edit-metric-description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe what this metric measures"
                rows={3}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-metric-category">Category</Label>
                <Select value={formData.category} onValueChange={(value: any) => setFormData(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sales">Sales</SelectItem>
                    <SelectItem value="listings">Listings</SelectItem>
                    <SelectItem value="leads">Leads</SelectItem>
                    <SelectItem value="client">Client</SelectItem>
                    <SelectItem value="performance">Performance</SelectItem>
                    <SelectItem value="revenue">Revenue</SelectItem>
                    <SelectItem value="activity">Activity</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="edit-metric-unit">Unit</Label>
                <Input
                  id="edit-metric-unit"
                  value={formData.unit}
                  onChange={(e) => setFormData(prev => ({ ...prev, unit: e.target.value }))}
                  placeholder="e.g., THB, %, count"
                />
              </div>
            </div>
            
            <div className="flex space-x-3 pt-4">
              <Button onClick={handleUpdateMetric} className="flex-1">
                Update Metric
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

export default KPI;