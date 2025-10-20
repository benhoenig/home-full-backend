import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format, addMonths, addQuarters, addYears } from 'date-fns';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Goal } from './GoalCard';
import { 
  CalendarIcon, 
  Plus, 
  Target, 
  Trophy, 
  Users, 
  Calendar as CalendarIcon2, 
  BarChart, 
  Gauge, 
  Star, 
  Home, 
  Award, 
  Flame, 
  Heart, 
  Briefcase,
  DollarSign,
  Globe,
  Phone,
  Shield,
  ArrowUp,
  Zap,
  AlertTriangle,
  Bell
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Import the RewardCustomizer component
import RewardCustomizer from './RewardCustomizer';
// Import new components
import PerformanceGraph, { calculateTargetValue } from './PerformanceGraph';
import TieredRewards from './TieredRewards';
import RewardBetting from './RewardBetting';

// Define goal types for selection
const goalTypes = [
  {
    id: 'target-revenue',
    name: 'เป้าหมายรายได้',
    icon: 'target',
    description: 'ตั้งเป้าหมายรายได้ที่ต้องการบรรลุภายในระยะเวลาที่กำหนด',
    defaultTarget: '5,000,000',
    defaultReward: 'โบนัสค่าคอมมิชชั่น',
  },
  {
    id: 'kpi',
    name: 'ตัวชี้วัดผลงาน (KPI)',
    icon: 'chart',
    description: 'ตั้งเป้าหมายตัวชี้วัดหลักเพื่อติดตามและปรับปรุงประสิทธิภาพ',
    defaultTarget: '100',
    defaultReward: 'รางวัลยกย่องผลงาน',
  },
  {
    id: 'custom',
    name: 'กำหนดเอง',
    icon: 'star',
    description: 'สร้างเป้าหมายของคุณเองด้วยตัวชี้วัดและเป้าหมายที่กำหนดเอง',
    defaultTarget: '',
    defaultReward: 'รางวัลตามที่กำหนด',
  },
];

// Define KPI types
const kpiTypes = [
  { id: 'new-list', name: 'รายการใหม่' },
  { id: 'consult', name: 'การให้คำปรึกษา' },
  { id: 'survey', name: 'การสำรวจ' },
  { id: 'buyer-review', name: 'รีวิวผู้ซื้อ' },
  { id: 'owner-review', name: 'รีวิวเจ้าของ' },
  { id: 'skillset', name: 'ทักษะความสามารถ' },
  { id: 'action-score', name: 'คะแนนการดำเนินงาน' },
];

// Define setting types
const settingTypes = [
  { 
    id: 'maintain', 
    name: 'รักษาระดับ', 
    description: 'รักษาระดับผลงานปัจจุบันของคุณสำหรับช่วงเวลาที่เลือก',
    icon: 'Shield'
  },
  { 
    id: 'boost', 
    name: 'เพิ่มประสิทธิภาพ', 
    description: 'เพิ่มประสิทธิภาพของคุณด้วยการกำหนดเปอร์เซ็นต์การเติบโต',
    icon: 'ArrowUp'
  },
  { 
    id: 'supercharge', 
    name: 'ท้าทายสูงสุด', 
    description: 'เพิ่มผลงานของคุณเป็นสองเท่าด้วยเป้าหมายที่ท้าทาย',
    icon: 'Zap'
  },
];

// Timeline type options
const timelineTypes = [
  { id: 'monthly', name: 'รายเดือน' },
  { id: 'quarterly', name: 'รายไตรมาส' },
  { id: 'annually', name: 'รายปี' },
];

// Icon options with colors
const iconOptions = [
  { icon: 'target', component: Target, colors: ['blue', 'green', 'red', 'amber', 'purple'] },
  { icon: 'chart', component: BarChart, colors: ['blue', 'green', 'red', 'amber', 'purple'] },
  { icon: 'star', component: Star, colors: ['blue', 'green', 'red', 'amber', 'purple'] },
  { icon: 'users', component: Users, colors: ['blue', 'green', 'red', 'amber', 'purple'] },
  { icon: 'home', component: Home, colors: ['blue', 'green', 'red', 'amber', 'purple'] },
  { icon: 'award', component: Award, colors: ['blue', 'green', 'red', 'amber', 'purple'] },
  { icon: 'flame', component: Flame, colors: ['blue', 'green', 'red', 'amber', 'purple'] },
  { icon: 'heart', component: Heart, colors: ['blue', 'green', 'red', 'amber', 'purple'] },
  { icon: 'dollar', component: DollarSign, colors: ['blue', 'green', 'red', 'amber', 'purple'] },
  { icon: 'briefcase', component: Briefcase, colors: ['blue', 'green', 'red', 'amber', 'purple'] },
  { icon: 'globe', component: Globe, colors: ['blue', 'green', 'red', 'amber', 'purple'] },
  { icon: 'calendar', component: CalendarIcon2, colors: ['blue', 'green', 'red', 'amber', 'purple'] },
];

// Get color class based on color name
const getColorClass = (color: string) => {
  switch(color) {
    case 'blue': return 'text-blue-500 bg-blue-100';
    case 'green': return 'text-green-500 bg-green-100';
    case 'red': return 'text-red-500 bg-red-100';
    case 'amber': return 'text-amber-500 bg-amber-100';
    case 'purple': return 'text-purple-500 bg-purple-100';
    default: return 'text-gray-500 bg-gray-100';
  }
};

// Define the form schema with validation rules
const formSchema = z.object({
  title: z.string().min(3, {
    message: "ชื่อเป้าหมายต้องมีอย่างน้อย 3 ตัวอักษร",
  }),
  type: z.enum(['personal', 'team']),
  goalType: z.enum(['target-revenue', 'kpi', 'custom']),
  kpiType: z.enum(['new-list', 'consult', 'survey', 'buyer-review', 'owner-review', 'skillset', 'action-score']).optional(),
  settingType: z.enum(['maintain', 'boost', 'supercharge']),
  boostPercentage: z.string().optional(),
  timelineType: z.enum(['monthly', 'quarterly', 'annually']),
  timelinePeriod: z.string().min(1, {
    message: "กรุณาเลือกช่วงเวลา",
  }),
  notificationFrequency: z.enum(['none', 'daily', 'weekly', 'monthly']).default('weekly'),
  description: z.string().optional(),
  target: z.string().min(1, {
    message: "กรุณากรอกเป้าหมาย",
  }),
  current: z.string().default('0'),
  reward: z.string().min(1, {
    message: "กรุณากรอกรางวัล",
  }),
  icon: z.string().default('target'),
  iconColor: z.string().default('blue'),
}).refine(data => {
  // If goalType is kpi, kpiType is required
  if (data.goalType === 'kpi' && !data.kpiType) {
    return false;
  }
  return true;
}, {
  message: "กรุณาเลือกประเภทตัวชี้วัด KPI สำหรับเป้าหมายประเภทนี้",
  path: ["kpiType"]
});

type FormValues = z.infer<typeof formSchema>;

// Create a separate interface for the form's initialData
export interface GoalFormData extends Omit<Goal, 'deadline'> {
  deadline: Date;
  goalType?: 'target-revenue' | 'kpi' | 'custom';
  kpiType?: 'new-list' | 'consult' | 'survey' | 'buyer-review' | 'owner-review' | 'skillset' | 'action-score';
  settingType?: 'maintain' | 'boost' | 'supercharge';
  boostPercentage?: string;
  notificationFrequency?: 'none' | 'daily' | 'weekly' | 'monthly';
  timelineType?: 'monthly' | 'quarterly' | 'annually';
  timelinePeriod?: string;
  iconColor?: string;
}

type GoalFormProps = {
  initialData?: GoalFormData;
  onSubmit: (data: FormValues) => void;
  onCancel: () => void;
};

const GoalForm: React.FC<GoalFormProps> = ({ 
  initialData, 
  onSubmit,
  onCancel
}) => {
  const [selectedGoalType, setSelectedGoalType] = useState<string | null>(initialData?.goalType || null);
  const [selectedSettingType, setSelectedSettingType] = useState<string>(initialData?.settingType || 'maintain');
  const [activeTab, setActiveTab] = useState<string>("details");
  const [isIconPickerOpen, setIsIconPickerOpen] = useState(false);
  const [selectedTimelineType, setSelectedTimelineType] = useState<string>(initialData?.timelineType || 'monthly');
  const [previousPerformanceValue, setPreviousPerformanceValue] = useState<number>(0);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const isEditing = !!initialData;

  // Initialize the form with either initial data or default values
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData ? {
      title: initialData.title,
      type: initialData.type,
      goalType: initialData.goalType || 'target-revenue',
      kpiType: initialData.kpiType,
      settingType: initialData.settingType || 'maintain',
      boostPercentage: initialData.boostPercentage || '15',
      timelineType: initialData.timelineType || 'monthly',
      timelinePeriod: initialData.timelinePeriod || getCurrentPeriod('monthly'),
      notificationFrequency: initialData.notificationFrequency || 'weekly',
      description: initialData.description,
      target: initialData.target,
      current: initialData.current,
      reward: initialData.reward,
      icon: initialData.icon,
      iconColor: initialData.iconColor || 'blue',
    } : {
      title: '',
      type: 'personal',
      goalType: 'target-revenue',
      kpiType: undefined,
      settingType: 'maintain',
      boostPercentage: '15',
      timelineType: 'monthly',
      timelinePeriod: getCurrentPeriod('monthly'),
      notificationFrequency: 'weekly',
      description: '',
      target: '',
      current: '0',
      reward: '',
      icon: 'target',
      iconColor: 'blue',
    }
  });

  // Get current period based on timeline type
  function getCurrentPeriod(timelineType: string): string {
    const now = new Date();
    switch(timelineType) {
      case 'monthly':
        return format(now, 'yyyy-MM');
      case 'quarterly':
        const quarter = Math.floor(now.getMonth() / 3) + 1;
        return `${now.getFullYear()}-Q${quarter}`;
      case 'annually':
        return now.getFullYear().toString();
      default:
        return format(now, 'yyyy-MM');
    }
  }

  // Generate timeline period options based on timeline type
  function getTimelinePeriodOptions(timelineType: string): { value: string, label: string }[] {
    const now = new Date();
    const options = [];

    switch(timelineType) {
      case 'monthly':
        // Generate next 12 months
        for (let i = 0; i < 12; i++) {
          const date = addMonths(now, i);
          const value = format(date, 'yyyy-MM');
          const label = format(date, 'MMMM yyyy');
          options.push({ value, label });
        }
        break;
      case 'quarterly':
        // Generate next 8 quarters
        for (let i = 0; i < 8; i++) {
          const date = addQuarters(now, i);
          const quarter = Math.floor(date.getMonth() / 3) + 1;
          const value = `${date.getFullYear()}-Q${quarter}`;
          const label = `Q${quarter} ${date.getFullYear()}`;
          options.push({ value, label });
        }
        break;
      case 'annually':
        // Generate next 5 years
        for (let i = 0; i < 5; i++) {
          const date = addYears(now, i);
          const value = date.getFullYear().toString();
          const label = date.getFullYear().toString();
          options.push({ value, label });
        }
        break;
      default:
        break;
    }

    return options;
  }

  // Apply a goal type to the form
  const applyGoalType = (goalTypeId: string) => {
    const goalType = goalTypes.find(t => t.id === goalTypeId);
    if (goalType) {
      setSelectedGoalType(goalTypeId);
      form.setValue('goalType', goalTypeId as 'target-revenue' | 'kpi' | 'custom');
      form.setValue('icon', goalType.icon);
      
      // Reset kpiType if not a KPI goal
      if (goalTypeId !== 'kpi') {
        form.setValue('kpiType', undefined);
      } else {
        // Set a default KPI type if it's a KPI goal
        form.setValue('kpiType', 'new-list');
      }
      
      // Set default setting type based on goal type
      if (goalTypeId === 'custom') {
        // For custom goals, always use 'maintain' as the setting type
        setSelectedSettingType('maintain');
        form.setValue('settingType', 'maintain');
      }
      
      // Only set defaults if not editing and if it's not a custom type
      if (!isEditing && goalTypeId !== 'custom') {
        form.setValue('title', goalType.name);
        form.setValue('description', goalType.description);
        form.setValue('target', goalType.defaultTarget);
        form.setValue('reward', goalType.defaultReward);
      }
    }
  };

  // Handle timeline type change
  const handleTimelineTypeChange = (value: string) => {
    setSelectedTimelineType(value);
    form.setValue('timelineType', value as 'monthly' | 'quarterly' | 'annually');
    form.setValue('timelinePeriod', getCurrentPeriod(value));
  };

  // Handle reward change from the RewardCustomizer
  const handleRewardChange = (reward: string) => {
    form.setValue('reward', reward);
  };

  // Handle icon selection
  const handleIconSelect = (iconName: string, color: string) => {
    form.setValue('icon', iconName);
    form.setValue('iconColor', color);
    setIsIconPickerOpen(false);
  };

  // Handle form submission
  const handleSubmit = (values: FormValues) => {
    // Ensure type field is set (default to personal if not specified)
    const formData = {
      ...values,
      type: values.type || 'personal'
    };
    
    onSubmit(formData);
  };

  // Handle create goal button click
  const handleCreateGoalClick = () => {
    // If editing an existing goal, submit directly
    if (isEditing) {
      form.handleSubmit(handleSubmit)();
    } else {
      // Otherwise show confirmation dialog
      setShowConfirmDialog(true);
    }
  };

  // Get icon component based on icon name
  const getIconComponent = (iconName: string) => {
    const iconOption = iconOptions.find(option => option.icon === iconName);
    if (iconOption) {
      const IconComponent = iconOption.component;
      return <IconComponent className="h-4 w-4" />;
    }
    return <Target className="h-4 w-4" />;
  };

  // Generate title based on form values
  const generateTitle = () => {
    const goalType = form.getValues('goalType');
    const timelineType = form.getValues('timelineType');
    const timelinePeriod = form.getValues('timelinePeriod');
    const target = form.getValues('target');
    const kpiType = form.getValues('kpiType');

    if (goalType === 'target-revenue') {
      return `$${target} Revenue Target for ${getTimelinePeriodLabel(timelineType, timelinePeriod)}`;
    } else if (goalType === 'kpi') {
      const kpiTypeName = kpiTypes.find(k => k.id === kpiType)?.name || 'KPI';
      return `${kpiTypeName} Target: ${target} for ${getTimelinePeriodLabel(timelineType, timelinePeriod)}`;
    }
    
    return form.getValues('title');
  };

  // Get formatted timeline period label
  const getTimelinePeriodLabel = (timelineType: string, timelinePeriod: string) => {
    const options = getTimelinePeriodOptions(timelineType);
    const option = options.find(opt => opt.value === timelinePeriod);
    return option ? option.label : timelinePeriod;
  };

  // Update title when relevant fields change
  React.useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === 'goalType' || name === 'timelineType' || name === 'timelinePeriod' || name === 'target') {
        if (value.goalType !== 'custom') {
          form.setValue('title', generateTitle());
        }
      }
    });
    
    return () => subscription.unsubscribe();
  }, [form.watch]);

  // If editing, only show notification settings
  if (isEditing) {
    return (
      <div className="space-y-6" style={{ fontFamily: "'IBM Plex Sans Thai', sans-serif" }}>
        <div className="flex items-center gap-2 mb-4">
          <Bell className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-medium">ตั้งค่าการแจ้งเตือน</h3>
        </div>
        
        <p className="text-muted-foreground mb-6">
          คุณสามารถแก้ไขการตั้งค่าการแจ้งเตือนสำหรับเป้าหมายนี้เท่านั้น รายละเอียดเป้าหมายอื่นๆ ไม่สามารถเปลี่ยนแปลงได้หลังจากสร้างเป้าหมายแล้ว
        </p>
        
        <Form {...form}>
          <form className="space-y-6">
            <FormField
              control={form.control}
              name="notificationFrequency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ความถี่ในการแจ้งเตือน</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="เลือกความถี่ในการแจ้งเตือน" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="none">ไม่ต้องการแจ้งเตือน</SelectItem>
                      <SelectItem value="daily">รายวัน</SelectItem>
                      <SelectItem value="weekly">รายสัปดาห์</SelectItem>
                      <SelectItem value="monthly">รายเดือน</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    คุณต้องการรับการแจ้งเตือนเกี่ยวกับเป้าหมายนี้บ่อยแค่ไหน?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex justify-end gap-2 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={onCancel}
              >
                ยกเลิก
              </Button>
              <Button 
                type="button"
                onClick={form.handleSubmit(handleSubmit)}
              >
                อัปเดตการตั้งค่า
              </Button>
            </div>
          </form>
        </Form>
      </div>
    );
  }

  return (
    <div className="space-y-6" style={{ fontFamily: "'IBM Plex Sans Thai', sans-serif" }}>
      <Form {...form}>
        <Tabs defaultValue="details" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="details">รายละเอียดเป้าหมาย</TabsTrigger>
            <TabsTrigger value="rewards">รางวัล</TabsTrigger>
          </TabsList>
          
          <TabsContent value="details" className="space-y-6 pt-4">
            <div className="space-y-2">
              <h4 className="text-sm font-medium">เลือกประเภทเป้าหมาย</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {goalTypes.map((goalType) => (
                  <div 
                    key={goalType.id}
                    className={`p-4 border rounded-md cursor-pointer hover:border-primary transition-colors ${
                      selectedGoalType === goalType.id ? 'border-primary bg-primary/5' : ''
                    }`}
                    onClick={() => applyGoalType(goalType.id)}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      {getIconComponent(goalType.icon)}
                      <h5 className="font-medium">{goalType.name}</h5>
                    </div>
                    <p className="text-xs text-muted-foreground">{goalType.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <Separator />

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="timelineType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ประเภทช่วงเวลา</FormLabel>
                      <Select 
                        onValueChange={(value) => handleTimelineTypeChange(value)} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="เลือกประเภทช่วงเวลา" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {timelineTypes.map((type) => (
                            <SelectItem key={type.id} value={type.id}>{type.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="timelinePeriod"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ช่วงเวลา</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="เลือกช่วงเวลา" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {getTimelinePeriodOptions(selectedTimelineType).map((option) => (
                            <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {selectedGoalType === 'kpi' && (
                <FormField
                  control={form.control}
                  name="kpiType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ประเภทตัวชี้วัด KPI</FormLabel>
                      <Select 
                        onValueChange={(value) => {
                          field.onChange(value);
                          // Update title when KPI type changes
                          if (selectedGoalType === 'kpi') {
                            form.setValue('title', generateTitle());
                          }
                        }} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="เลือกประเภทตัวชี้วัด KPI" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {kpiTypes.map((type) => (
                            <SelectItem key={type.id} value={type.id}>{type.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {/* Performance Graph Section */}
              {selectedGoalType && selectedGoalType !== 'custom' && (
                <div className="mt-4 mb-6">
                  <h4 className="text-sm font-medium mb-2">ผลงานย้อนหลัง</h4>
                  <PerformanceGraph 
                    goalType={selectedGoalType}
                    kpiType={form.getValues('kpiType')}
                    onPreviousValueChange={setPreviousPerformanceValue}
                  />
                  <p className="text-sm text-muted-foreground mt-2">
                    ทบทวนผลงานที่ผ่านมาของคุณเพื่อช่วยในการตั้งเป้าหมายที่เหมาะสมสำหรับอนาคต
                  </p>
                </div>
              )}

              {/* Setting Type Section - Only shown for non-custom goals */}
              {selectedGoalType && selectedGoalType !== 'custom' && (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">เลือกประเภทการตั้งค่า</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {settingTypes.map((settingType) => {
                      // Determine which icon component to use
                      let IconComponent;
                      switch(settingType.icon) {
                        case 'Shield': IconComponent = Shield; break;
                        case 'ArrowUp': IconComponent = ArrowUp; break;
                        case 'Zap': IconComponent = Zap; break;
                        default: IconComponent = Shield;
                      }
                      
                      return (
                        <div 
                          key={settingType.id}
                          className={`p-4 border rounded-md cursor-pointer hover:border-primary transition-colors ${
                            selectedSettingType === settingType.id ? 'border-primary bg-primary/5' : ''
                          }`}
                          onClick={() => {
                            setSelectedSettingType(settingType.id);
                            form.setValue('settingType', settingType.id as 'maintain' | 'boost' | 'supercharge');
                            
                            // Update target based on setting type
                            if (selectedGoalType) {
                              if (selectedGoalType === 'target-revenue' || selectedGoalType === 'kpi') {
                                const newTarget = calculateTargetValue(
                                  settingType.id,
                                  selectedGoalType,
                                  form.getValues('kpiType'),
                                  form.getValues('timelineType')
                                );
                                form.setValue('target', newTarget);
                                
                                // Update title
                                form.setValue('title', generateTitle());
                              }
                            }
                          }}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <IconComponent className="h-4 w-4" />
                            <h5 className="font-medium">{settingType.name}</h5>
                          </div>
                          <p className="text-xs text-muted-foreground">{settingType.description}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Boost Percentage Selector - Only shown when Boost is selected */}
              {selectedGoalType && selectedGoalType !== 'custom' && selectedSettingType === 'boost' && (
                <div className="mt-4">
                  <FormField
                    control={form.control}
                    name="boostPercentage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>เปอร์เซ็นต์การเพิ่มประสิทธิภาพ</FormLabel>
                        <Select 
                          onValueChange={(value) => {
                            field.onChange(value);
                            // Update target based on boost percentage
                            if (selectedGoalType) {
                              const percentage = parseInt(value) / 100 + 1; // Convert to multiplier (e.g., 15% -> 1.15)
                              let baseValue = 0;
                              
                              if (selectedGoalType === 'target-revenue') {
                                // Get the latest month's revenue from performance data
                                const mockRevenueData = [
                                  { month: 'Jun', personal: 1400000 } // Last month's data
                                ];
                                baseValue = mockRevenueData[0].personal;
                              } else if (selectedGoalType === 'kpi') {
                                // Get base value based on KPI type
                                const kpiType = form.getValues('kpiType');
                                switch(kpiType) {
                                  case 'new-list': baseValue = 4; break;
                                  case 'consult': baseValue = 10; break;
                                  case 'survey': baseValue = 8; break;
                                  case 'buyer-review': baseValue = 7; break;
                                  case 'owner-review': baseValue = 4; break;
                                  case 'skillset': baseValue = 88; break;
                                  case 'action-score': baseValue = 78; break;
                                  default: baseValue = 5;
                                }
                              }
                              
                              const newTarget = Math.round(baseValue * percentage).toString();
                              form.setValue('target', newTarget);
                              
                              // Update title
                              form.setValue('title', generateTitle());
                            }
                          }}
                          defaultValue="15"
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="เลือกเปอร์เซ็นต์การเพิ่มประสิทธิภาพ" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="5">เพิ่ม 5%</SelectItem>
                            <SelectItem value="10">เพิ่ม 10%</SelectItem>
                            <SelectItem value="15">เพิ่ม 15%</SelectItem>
                            <SelectItem value="20">เพิ่ม 20%</SelectItem>
                            <SelectItem value="25">เพิ่ม 25%</SelectItem>
                            <SelectItem value="30">เพิ่ม 30%</SelectItem>
                            <SelectItem value="50">เพิ่ม 50%</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          เลือกเปอร์เซ็นต์การเพิ่มขึ้นที่คุณต้องการบรรลุเมื่อเทียบกับผลงานปัจจุบันของคุณ
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {selectedGoalType === 'custom' && (
                <>
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ชื่อเป้าหมาย</FormLabel>
                        <FormControl>
                          <Input placeholder="กรอกชื่อเป้าหมาย" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>คำอธิบาย</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="อธิบายเป้าหมายของคุณ" 
                            className="min-h-[100px]" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}

              <FormField
                control={form.control}
                name="target"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>เป้าหมาย</FormLabel>
                    <FormControl>
                      <Input placeholder="กรอกค่าเป้าหมาย" {...field} />
                    </FormControl>
                    <FormDescription>
                      {selectedGoalType === 'target-revenue' 
                        ? 'กรอกจำนวนเป้าหมายรายได้'
                        : selectedGoalType === 'kpi'
                          ? 'กรอกค่าเป้าหมาย KPI'
                          : 'กรอกค่าเป้าหมายที่คุณกำหนด'}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {isEditing && (
                <FormField
                  control={form.control}
                  name="current"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ความคืบหน้าปัจจุบัน</FormLabel>
                      <FormControl>
                        <Input placeholder="ความคืบหน้าปัจจุบัน" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <div className="flex justify-between">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setActiveTab("rewards")}
                >
                  ถัดไป: ตั้งค่ารางวัล
                </Button>
              </div>
            </form>
          </TabsContent>
          
          <TabsContent value="rewards" className="space-y-6 pt-4 overflow-y-auto">
            <div className="space-y-6">
              <h4 className="text-lg font-medium">ตั้งค่ารางวัลสำหรับเป้าหมายของคุณ</h4>
              
              {/* Tiered rewards based on setting type */}
              <FormField
                control={form.control}
                name="reward"
                render={({ field }) => (
                  <FormItem>
                    <TieredRewards 
                      settingType={form.getValues('settingType')}
                      onRewardSelect={(reward) => {
                        field.onChange(reward);
                      }}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Show reward betting only for supercharge goals */}
              {form.getValues('settingType') === 'supercharge' && (
                <FormField
                  control={form.control}
                  name="reward"
                  render={({ field }) => (
                    <FormItem>
                      <RewardBetting 
                        reward={field.value}
                        onBettingChange={(bettingOption, adjustedReward) => {
                          field.onChange(adjustedReward);
                        }}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              
              <Separator />
              
              {/* Notification Reminder Setting */}
              <div className="mb-6">
                <FormField
                  control={form.control}
                  name="notificationFrequency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ความถี่ในการแจ้งเตือน</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="เลือกความถี่ในการแจ้งเตือน" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="none">ไม่ต้องการแจ้งเตือน</SelectItem>
                          <SelectItem value="daily">รายวัน</SelectItem>
                          <SelectItem value="weekly">รายสัปดาห์</SelectItem>
                          <SelectItem value="monthly">รายเดือน</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        คุณต้องการรับการแจ้งเตือนเกี่ยวกับเป้าหมายนี้บ่อยแค่ไหน?
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="flex justify-between pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setActiveTab("details")}
                >
                  กลับไปรายละเอียด
                </Button>
                
                <div className="flex gap-2">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={onCancel}
                  >
                    ยกเลิก
                  </Button>
                  <Button 
                    type="button"
                    onClick={handleCreateGoalClick}
                  >
                    {isEditing ? 'อัปเดตเป้าหมาย' : 'สร้างเป้าหมาย'}
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </Form>

      {/* Confirmation Dialog */}
      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent style={{ fontFamily: "'IBM Plex Sans Thai', sans-serif" }}>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              ยืนยันการสร้างเป้าหมาย
            </AlertDialogTitle>
            <AlertDialogDescription className="space-y-3">
              <p>
                คุณกำลังจะสร้างเป้าหมายด้วยการตั้งค่าดังต่อไปนี้:
              </p>
              <div className="bg-muted p-3 rounded-md text-sm">
                <p><strong>ชื่อ:</strong> {form.getValues('title')}</p>
                <p><strong>ประเภท:</strong> {form.getValues('type') === 'personal' ? 'เป้าหมายส่วนตัว' : 'เป้าหมายทีม'}</p>
                <p><strong>เป้าหมาย:</strong> {form.getValues('target')}</p>
                <p><strong>ช่วงเวลา:</strong> {getTimelinePeriodLabel(form.getValues('timelineType'), form.getValues('timelinePeriod'))}</p>
                <p><strong>รางวัล:</strong> {form.getValues('reward')}</p>
              </div>
              <p className="font-medium text-destructive">
                สำคัญ: เมื่อสร้างแล้ว เป้าหมายนี้จะไม่สามารถแก้ไขหรือลบได้จนกว่าจะเสร็จสมบูรณ์ และจะถูกติดตามเป็นส่วนหนึ่งของสถิติตลอดชีวิตของคุณ
              </p>
              <p>
                คุณแน่ใจหรือไม่ว่าต้องการสร้างเป้าหมายนี้?
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>ยกเลิก</AlertDialogCancel>
            <AlertDialogAction 
              onClick={form.handleSubmit(handleSubmit)}
              className="bg-primary hover:bg-primary/90"
            >
              ใช่ สร้างเป้าหมาย
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default GoalForm; 