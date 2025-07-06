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
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Tabs, 
  TabsList, 
  TabsTrigger, 
  TabsContent 
} from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  LineChart as RechartsLineChart, 
  Line, 
  BarChart as RechartsBarChart, 
  Bar, 
  PieChart as RechartsPieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend 
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  Minus,
  Users,
  CheckCircle2,
  Clock,
  BarChart2,
  PieChart as PieChartIcon,
  LineChart as LineChartIcon,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  Award,
  Download
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { format, subDays } from 'date-fns';

// Define types for the component
export type TeamMember = {
  id: number;
  name: string;
  avatar: string;
  role?: string;
  performance: number;
  goalsCompleted: number;
  tasksCompleted: number;
  streak: number;
  trend: 'up' | 'down' | 'stable';
  trendValue: number;
};

export type TeamMetric = {
  label: string;
  value: number;
  previousValue: number;
  change: number;
  trend: 'up' | 'down' | 'stable';
};

export type TeamPerformanceData = {
  members: TeamMember[];
  metrics: {
    goalsCompleted: TeamMetric;
    tasksCompleted: TeamMetric;
    avgCompletion: TeamMetric;
    onTimeDelivery: TeamMetric;
  };
  history: {
    date: string;
    performance: number;
  }[];
  distribution: {
    label: string;
    value: number;
    color: string;
  }[];
};

type TeamPerformanceProps = {
  data: TeamPerformanceData;
  title?: string;
  description?: string;
};

const TeamPerformance: React.FC<TeamPerformanceProps> = ({
  data,
  title = "Team Performance",
  description = "Performance metrics and analytics for your team"
}) => {
  const [timeframe, setTimeframe] = useState<string>("month");
  
  // Format the performance history data for charts
  const performanceData = data.history.map(point => ({
    name: point.date,
    value: point.performance
  }));
  
  // Format the distribution data for pie chart
  const distributionData = data.distribution.map(item => ({
    name: item.label,
    value: item.value,
    fill: item.color
  }));
  
  // Format the team members data for bar chart
  const memberPerformanceData = data.members.map(member => ({
    name: member.name,
    performance: member.performance
  }));
  
  // Calculate team average performance
  const averagePerformance = data.members.reduce(
    (sum, member) => sum + member.performance, 
    0
  ) / data.members.length;
  
  // Render trend indicator
  const renderTrend = (trend: 'up' | 'down' | 'stable', value: number) => {
    if (trend === 'up') {
      return (
        <div className="flex items-center text-green-600">
          <ArrowUpRight className="h-4 w-4 mr-1" />
          <span>+{value}%</span>
        </div>
      );
    } else if (trend === 'down') {
      return (
        <div className="flex items-center text-red-600">
          <ArrowDownRight className="h-4 w-4 mr-1" />
          <span>-{value}%</span>
        </div>
      );
    } else {
      return (
        <div className="flex items-center text-gray-600">
          <ChevronRight className="h-4 w-4 mr-1" />
          <span>{value}%</span>
        </div>
      );
    }
  };
  
  // Get top performer
  const topPerformer = [...data.members]
    .sort((a, b) => b.performance - a.performance)[0];
  
  const getTrendIcon = (trend: 'up' | 'down' | 'stable', size = 4) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className={`h-${size} w-${size} text-green-500`} />;
      case 'down':
        return <TrendingDown className={`h-${size} w-${size} text-red-500`} />;
      case 'stable':
        return <Minus className={`h-${size} w-${size} text-gray-500`} />;
    }
  };
  
  const formatTrendValue = (value: number) => {
    return value > 0 ? `+${value}%` : `${value}%`;
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border rounded-md shadow-sm">
          <p className="text-sm font-medium">{`${label}`}</p>
          <p className="text-sm text-gray-600">{`Performance: ${payload[0].value}%`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                {title}
              </CardTitle>
              <CardDescription>
                {description}
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Tabs defaultValue={timeframe} onValueChange={setTimeframe}>
                <TabsList>
                  <TabsTrigger value="week">Week</TabsTrigger>
                  <TabsTrigger value="month">Month</TabsTrigger>
                  <TabsTrigger value="quarter">Quarter</TabsTrigger>
                  <TabsTrigger value="year">Year</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Summary Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Goals Completed</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{data.metrics.goalsCompleted.value}</div>
                <div className="flex items-center justify-between mt-1">
                  <div className="text-xs text-muted-foreground">
                    Previous: {data.metrics.goalsCompleted.previousValue}
                  </div>
                  {renderTrend(data.metrics.goalsCompleted.trend, data.metrics.goalsCompleted.change)}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Tasks Completed</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{data.metrics.tasksCompleted.value}</div>
                <div className="flex items-center justify-between mt-1">
                  <div className="text-xs text-muted-foreground">
                    Previous: {data.metrics.tasksCompleted.previousValue}
                  </div>
                  {renderTrend(data.metrics.tasksCompleted.trend, data.metrics.tasksCompleted.change)}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Completion</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{data.metrics.avgCompletion.value}%</div>
                <div className="flex items-center justify-between mt-1">
                  <div className="text-xs text-muted-foreground">
                    Previous: {data.metrics.avgCompletion.previousValue}%
                  </div>
                  {renderTrend(data.metrics.avgCompletion.trend, data.metrics.avgCompletion.change)}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">On-Time Delivery</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{data.metrics.onTimeDelivery.value}%</div>
                <div className="flex items-center justify-between mt-1">
                  <div className="text-xs text-muted-foreground">
                    Previous: {data.metrics.onTimeDelivery.previousValue}%
                  </div>
                  {renderTrend(data.metrics.onTimeDelivery.trend, data.metrics.onTimeDelivery.change)}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Performance Charts */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="members">Team Members</TabsTrigger>
              <TabsTrigger value="distribution">Distribution</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-4">
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsLineChart
                    data={data.history}
                    margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis 
                      dataKey="date" 
                      tick={{ fontSize: 12 }} 
                      tickLine={false}
                      axisLine={{ stroke: '#e5e7eb' }}
                    />
                    <YAxis 
                      domain={[0, 100]} 
                      tick={{ fontSize: 12 }} 
                      tickLine={false}
                      axisLine={{ stroke: '#e5e7eb' }}
                      tickFormatter={(value) => `${value}%`}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Line 
                      type="monotone" 
                      dataKey="performance" 
                      stroke="#2563eb" 
                      strokeWidth={2}
                      dot={{ r: 3, fill: '#2563eb', strokeWidth: 0 }}
                      activeDot={{ r: 5, stroke: '#2563eb', strokeWidth: 1, fill: '#ffffff' }}
                    />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </div>
              <div className="text-center text-sm text-muted-foreground">
                Team performance over time
              </div>
            </TabsContent>
            
            <TabsContent value="members" className="space-y-4">
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart
                    data={data.members}
                    margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis 
                      dataKey="name" 
                      tick={{ fontSize: 12 }} 
                      tickLine={false}
                      axisLine={{ stroke: '#e5e7eb' }}
                    />
                    <YAxis 
                      domain={[0, 100]} 
                      tick={{ fontSize: 12 }} 
                      tickLine={false}
                      axisLine={{ stroke: '#e5e7eb' }}
                      tickFormatter={(value) => `${value}%`}
                    />
                    <Tooltip />
                    <Bar 
                      dataKey="performance" 
                      fill="#2563eb" 
                      radius={[4, 4, 0, 0]}
                    />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </div>
              <div className="text-center text-sm text-muted-foreground">
                Individual performance by team member
              </div>
            </TabsContent>
            
            <TabsContent value="distribution" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={data.distribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        innerRadius={40}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="label"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {data.distribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-4">
                  <h4 className="font-medium">Performance Distribution</h4>
                  <div className="space-y-2">
                    {distributionData.map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div 
                            className="h-3 w-3 rounded-full" 
                            style={{ backgroundColor: item.fill }}
                          ></div>
                          <span>{item.name}</span>
                        </div>
                        <div className="font-medium">{item.value}%</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          {/* Top Performer */}
          {topPerformer && (
            <div className="flex items-center justify-between p-4 bg-primary/5 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={topPerformer.avatar} alt={topPerformer.name} />
                    <AvatarFallback>{topPerformer.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="absolute -top-1 -right-1 h-6 w-6 rounded-full bg-amber-400 flex items-center justify-center">
                    <Award className="h-4 w-4 text-white" />
                  </div>
                </div>
                <div>
                  <div className="font-medium">{topPerformer.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {topPerformer.role || 'Team Member'}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium">Top Performer</div>
                <div className="text-2xl font-bold">{topPerformer.performance}%</div>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Download className="h-4 w-4" />
            <span>Export Report</span>
          </Button>
          <Button size="sm">View Detailed Analytics</Button>
        </CardFooter>
      </Card>
      
      {/* Team Members Table */}
      <Card>
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
          <CardDescription>
            Individual performance metrics for team members
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Member</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="text-center">Goals Completed</TableHead>
                <TableHead className="text-center">Tasks Completed</TableHead>
                <TableHead className="text-center">Streak</TableHead>
                <TableHead className="text-right">Performance</TableHead>
                <TableHead className="text-right">Trend</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.members.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback>{member.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{member.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {member.role || 'Team Member'}
                  </TableCell>
                  <TableCell className="text-center">
                    {member.goalsCompleted}
                  </TableCell>
                  <TableCell className="text-center">
                    {member.tasksCompleted}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                      {member.streak} days
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="space-y-1">
                      <div className="font-medium">{member.performance}%</div>
                      <div className={cn(
                        member.performance >= 80 ? "bg-green-500" :
                        member.performance >= 60 ? "bg-amber-500" :
                        "bg-red-500",
                        "h-1.5 rounded-full"
                      )} style={{ width: `${member.performance}%` }}></div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    {renderTrend(member.trend, member.trendValue)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeamPerformance; 