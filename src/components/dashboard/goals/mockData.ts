import { Goal } from './GoalCard';
import { Challenge } from './ChallengeCard';
import { TeamGoal, TeamMember } from './TeamCollaboration';
import { GoalAnalyticsData, ProgressPoint, ComparisonData, BreakdownItem } from './GoalAnalytics';
import { Comment, CommentUser } from './GoalComments';
import { TeamPerformanceData, TeamMetric } from './TeamPerformance';
import { format, subDays } from 'date-fns';

// Mock personal goals data
export const mockPersonalGoals: Goal[] = [
  {
    id: 1,
    title: "Achieve $5M in Sales",
    type: "personal",
    goalType: "target-revenue",
    timelineType: "quarterly",
    timelinePeriod: "2023-Q3",
    description: "Reach $5 million in total sales volume by the end of Q3.",
    target: "5,000,000",
    current: "3,750,000",
    deadline: "Sep 30, 2023",
    progress: 75,
    reward: "5% Bonus Commission",
    icon: "target",
    iconColor: "blue",
    milestones: [
      { value: 25, label: "25%", reached: true },
      { value: 50, label: "50%", reached: true },
      { value: 75, label: "75%", reached: true },
      { value: 100, label: "100%", reached: false },
    ],
    createdAt: "Jun 1, 2023"
  },
  {
    id: 2,
    title: "10 New Listings",
    type: "personal",
    goalType: "kpi",
    timelineType: "monthly",
    timelinePeriod: "2023-12",
    description: "Acquire 10 new property listings in the luxury market segment.",
    target: "10",
    current: "4",
    deadline: "Dec 15, 2023",
    progress: 40,
    reward: "Marketing Budget Increase",
    icon: "home",
    iconColor: "green",
    milestones: [
      { value: 25, label: "25%", reached: true },
      { value: 50, label: "50%", reached: false },
      { value: 75, label: "75%", reached: false },
      { value: 100, label: "100%", reached: false },
    ],
    createdAt: "Jul 15, 2023"
  },
  {
    id: 3,
    title: "Client Satisfaction",
    type: "personal",
    goalType: "kpi",
    timelineType: "annually",
    timelinePeriod: "2023",
    description: "Maintain a 95% client satisfaction rating across all transactions.",
    target: "95",
    current: "92",
    deadline: "Dec 31, 2023",
    progress: 97,
    reward: "Recognition Award",
    icon: "star",
    iconColor: "amber",
    milestones: [
      { value: 25, label: "25%", reached: true },
      { value: 50, label: "50%", reached: true },
      { value: 75, label: "75%", reached: true },
      { value: 100, label: "100%", reached: false },
    ],
    createdAt: "Jan 5, 2023"
  }
];

// Mock team goals data
export const mockTeamGoals: Goal[] = [
  {
    id: 4,
    title: "Team Sales Target",
    type: "team",
    goalType: "target-revenue",
    timelineType: "quarterly",
    timelinePeriod: "2023-Q4",
    description: "Achieve $15 million in team sales volume for Q4.",
    target: "15,000,000",
    current: "5,250,000",
    deadline: "Dec 31, 2023",
    progress: 35,
    reward: "Team Retreat",
    icon: "users",
    iconColor: "purple",
    milestones: [
      { value: 25, label: "25%", reached: true },
      { value: 50, label: "50%", reached: false },
      { value: 75, label: "75%", reached: false },
      { value: 100, label: "100%", reached: false },
    ],
    createdAt: "Oct 1, 2023",
    teamMembers: [
      { id: 1, name: "Alex", avatar: "/avatars/alex.jpg" },
      { id: 2, name: "Sarah", avatar: "/avatars/sarah.jpg" },
      { id: 3, name: "Michael", avatar: "/avatars/michael.jpg" },
      { id: 4, name: "Emma", avatar: "/avatars/emma.jpg" },
    ]
  },
  {
    id: 5,
    title: "Market Expansion",
    type: "team",
    goalType: "custom",
    timelineType: "monthly",
    timelinePeriod: "2023-11",
    description: "Expand into the downtown luxury condo market with at least 5 new listings.",
    target: "5",
    current: "2",
    deadline: "Nov 30, 2023",
    progress: 40,
    reward: "Marketing Budget Increase",
    icon: "target",
    iconColor: "red",
    milestones: [
      { value: 25, label: "25%", reached: true },
      { value: 50, label: "50%", reached: false },
      { value: 75, label: "75%", reached: false },
      { value: 100, label: "100%", reached: false },
    ],
    createdAt: "Aug 15, 2023",
    teamMembers: [
      { id: 1, name: "Alex", avatar: "/avatars/alex.jpg" },
      { id: 2, name: "Sarah", avatar: "/avatars/sarah.jpg" },
    ]
  }
];

// Mock challenges data
export const mockChallenges: Challenge[] = [
  {
    id: 1,
    title: "Summer Sales Sprint",
    description: "Achieve the highest sales volume during the summer months (June-August).",
    deadline: "Aug 31, 2023",
    reward: "Luxury Weekend Getaway",
    icon: "flame",
    participants: 12,
    themeColor: "amber",
    leaderboard: [
      { name: "Alex Johnson", avatar: "/avatars/alex.jpg", score: "4.2M" },
      { name: "Sarah Williams", avatar: "/avatars/sarah.jpg", score: "3.8M" },
      { name: "David Chen", avatar: "/avatars/david.jpg", score: "3.5M" },
    ]
  },
  {
    id: 2,
    title: "Listing Challenge",
    description: "Acquire the most new property listings in the luxury segment (min. $1M value).",
    deadline: "Oct 15, 2023",
    reward: "Marketing Package Worth $5,000",
    icon: "home",
    participants: 8,
    themeColor: "blue",
    leaderboard: [
      { name: "Sarah Williams", avatar: "/avatars/sarah.jpg", score: "7" },
      { name: "Michael Brown", avatar: "/avatars/michael.jpg", score: "5" },
      { name: "Emma Davis", avatar: "/avatars/emma.jpg", score: "4" },
    ]
  },
  {
    id: 3,
    title: "Client Satisfaction Champion",
    description: "Maintain the highest client satisfaction rating for Q3.",
    deadline: "Sep 30, 2023",
    reward: "Recognition & Bonus",
    icon: "star",
    participants: 15,
    themeColor: "green",
    leaderboard: [
      { name: "Emma Davis", avatar: "/avatars/emma.jpg", score: "98%" },
      { name: "Alex Johnson", avatar: "/avatars/alex.jpg", score: "97%" },
      { name: "Michael Brown", avatar: "/avatars/michael.jpg", score: "95%" },
    ]
  }
];

// Mock team members data
export const mockTeamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Alex Johnson",
    avatar: "/avatars/alex.jpg",
    role: "Team Lead",
    contribution: 35,
    status: "active",
    lastActive: "Today"
  },
  {
    id: 2,
    name: "Sarah Williams",
    avatar: "/avatars/sarah.jpg",
    role: "Senior Agent",
    contribution: 28,
    status: "active",
    lastActive: "Today"
  },
  {
    id: 3,
    name: "Michael Brown",
    avatar: "/avatars/michael.jpg",
    role: "Agent",
    contribution: 20,
    status: "active",
    lastActive: "Yesterday"
  },
  {
    id: 4,
    name: "Emma Davis",
    avatar: "/avatars/emma.jpg",
    role: "Agent",
    contribution: 17,
    status: "active",
    lastActive: "Today"
  },
  {
    id: 5,
    name: "David Chen",
    avatar: "/avatars/david.jpg",
    role: "Junior Agent",
    contribution: 0,
    status: "inactive",
    lastActive: "3 days ago"
  }
];

// Mock team goal data
export const mockTeamGoalData: TeamGoal = {
  id: 4,
  title: "Team Sales Target",
  description: "Achieve $15 million in team sales volume for Q4.",
  target: "15,000,000",
  current: "5,250,000",
  progress: 35,
  teamMembers: mockTeamMembers,
  startDate: "Oct 1, 2023",
  deadline: "Dec 31, 2023"
};

// Mock progress history data
export const mockProgressHistory: ProgressPoint[] = Array.from({ length: 30 }, (_, i) => {
  const date = subDays(new Date(), 30 - i);
  return {
    date: format(date, 'MMM dd'),
    value: Math.min(100, Math.round(i * 1.2))
  };
});

// Mock comparison data
export const mockComparisonData: ComparisonData[] = [
  {
    label: "Current Month",
    current: 35,
    previous: 25,
    change: 40
  },
  {
    label: "Last Month",
    current: 25,
    previous: 18,
    change: 39
  },
  {
    label: "Team Average",
    current: 42,
    previous: 38,
    change: 11
  }
];

// Mock breakdown data
export const mockBreakdownData: BreakdownItem[] = [
  {
    label: "Completed Sales",
    value: 45,
    color: "#2563eb"
  },
  {
    label: "Pending Contracts",
    value: 30,
    color: "#f59e0b"
  },
  {
    label: "Initial Consultations",
    value: 15,
    color: "#10b981"
  },
  {
    label: "Follow-ups",
    value: 10,
    color: "#6366f1"
  }
];

// Mock goal analytics data
export const mockGoalAnalyticsData: GoalAnalyticsData = {
  progressHistory: mockProgressHistory,
  comparisons: mockComparisonData,
  breakdown: mockBreakdownData,
  projectedCompletion: "Dec 15, 2023",
  riskLevel: "medium",
  recommendations: [
    "Increase focus on downtown luxury condo market",
    "Schedule more property viewings with potential clients",
    "Follow up with leads from the recent marketing campaign"
  ]
};

// Mock comments data
export const mockCurrentUser: CommentUser = {
  id: 1,
  name: "Alex Johnson",
  avatar: "/avatars/alex.jpg",
  role: "Team Lead"
};

export const mockComments: Comment[] = [
  {
    id: 1,
    user: mockTeamMembers[0],
    content: "Great progress on the downtown condo listings! We're on track to meet our target by the end of the month.",
    type: "update",
    createdAt: new Date(2023, 9, 8, 9, 30),
    likes: 3,
    liked: true
  },
  {
    id: 2,
    user: mockTeamMembers[1],
    content: "I've scheduled viewings with 5 potential buyers for next week. Should help us close at least 2 more sales.",
    type: "comment",
    createdAt: new Date(2023, 9, 8, 10, 15),
    likes: 2,
    liked: false
  },
  {
    id: 3,
    user: mockTeamMembers[2],
    content: "We're having issues with the marketing materials for the luxury condos. The brochures don't highlight the amenities properly.",
    type: "issue",
    createdAt: new Date(2023, 9, 7, 14, 45),
    likes: 0,
    liked: false,
    replies: [
      {
        id: 4,
        user: mockTeamMembers[1],
        content: "I'll revise the brochures today and send them for review.",
        type: "comment",
        createdAt: new Date(2023, 9, 7, 15, 10),
        likes: 1,
        liked: true
      }
    ]
  },
  {
    id: 5,
    user: mockTeamMembers[3],
    content: "I've updated the client database with all the new leads from the open house event.",
    type: "update",
    createdAt: new Date(2023, 9, 6, 11, 20),
    likes: 2,
    liked: false
  },
  {
    id: 6,
    user: mockTeamMembers[0],
    content: "We've resolved the issue with the marketing materials. New brochures are ready and look great!",
    type: "resolution",
    createdAt: new Date(2023, 9, 8, 16, 30),
    likes: 4,
    liked: false
  }
];

// Mock team performance data
export const mockTeamPerformanceData: TeamPerformanceData = {
  members: [
    {
      id: 1,
      name: "Alex Johnson",
      avatar: "/avatars/alex.jpg",
      role: "Team Lead",
      performance: 85,
      goalsCompleted: 5,
      tasksCompleted: 28,
      streak: 14,
      trend: "up",
      trendValue: 8
    },
    {
      id: 2,
      name: "Sarah Williams",
      avatar: "/avatars/sarah.jpg",
      role: "Senior Agent",
      performance: 78,
      goalsCompleted: 4,
      tasksCompleted: 22,
      streak: 10,
      trend: "up",
      trendValue: 5
    },
    {
      id: 3,
      name: "Michael Brown",
      avatar: "/avatars/michael.jpg",
      role: "Agent",
      performance: 62,
      goalsCompleted: 2,
      tasksCompleted: 18,
      streak: 7,
      trend: "stable",
      trendValue: 0
    },
    {
      id: 4,
      name: "Emma Davis",
      avatar: "/avatars/emma.jpg",
      role: "Agent",
      performance: 70,
      goalsCompleted: 3,
      tasksCompleted: 20,
      streak: 5,
      trend: "down",
      trendValue: 3
    },
    {
      id: 5,
      name: "David Chen",
      avatar: "/avatars/david.jpg",
      role: "Junior Agent",
      performance: 45,
      goalsCompleted: 1,
      tasksCompleted: 12,
      streak: 2,
      trend: "down",
      trendValue: 10
    }
  ],
  metrics: {
    goalsCompleted: {
      label: "Goals Completed",
      value: 15,
      previousValue: 12,
      change: 25,
      trend: "up"
    },
    tasksCompleted: {
      label: "Tasks Completed",
      value: 100,
      previousValue: 85,
      change: 18,
      trend: "up"
    },
    avgCompletion: {
      label: "Avg. Completion",
      value: 68,
      previousValue: 65,
      change: 5,
      trend: "up"
    },
    onTimeDelivery: {
      label: "On-Time Delivery",
      value: 92,
      previousValue: 88,
      change: 5,
      trend: "up"
    }
  },
  history: Array.from({ length: 12 }, (_, i) => {
    const baseValue = 60;
    const variance = Math.floor(Math.random() * 20) - 10;
    return {
      date: format(subDays(new Date(), 12 - i), 'MMM dd'),
      performance: Math.min(100, Math.max(0, baseValue + variance + i * 2))
    };
  }),
  distribution: [
    {
      label: "Excellent (80-100%)",
      value: 20,
      color: "#10b981"
    },
    {
      label: "Good (60-79%)",
      value: 45,
      color: "#2563eb"
    },
    {
      label: "Average (40-59%)",
      value: 25,
      color: "#f59e0b"
    },
    {
      label: "Below Average (0-39%)",
      value: 10,
      color: "#ef4444"
    }
  ]
};

export const mockGoals = [
  {
    id: 1,
    title: "$50,000 Revenue Target for January 2024",
    progress: 65,
    target: "50000",
    current: "32500",
    deadline: "2024-01-31",
    reward: "Team dinner",
    type: "team",
    goalType: "target-revenue",
    settingType: "boost",
    timelineType: "monthly",
    timelinePeriod: "2024-01",
    icon: "dollar-sign",
    iconColor: "green",
    description: "Achieve $50,000 in team revenue for January 2024",
    milestones: [
      { id: 1, name: "25% - $12,500", completed: true },
      { id: 2, name: "50% - $25,000", completed: true },
      { id: 3, name: "75% - $37,500", completed: false },
      { id: 4, name: "100% - $50,000", completed: false },
    ],
    createdAt: "2023-12-15",
    teamMembers: [
      { id: 1, name: "Alex Johnson", avatar: "/avatars/alex.jpg" },
      { id: 2, name: "Sarah Williams", avatar: "/avatars/sarah.jpg" },
      { id: 3, name: "Michael Brown", avatar: "/avatars/michael.jpg" },
    ],
  },
  {
    id: 2,
    title: "New List Target: 5 for Q1 2024",
    progress: 40,
    target: "5",
    current: "2",
    deadline: "2024-03-31",
    reward: "$500 bonus",
    type: "personal",
    goalType: "kpi",
    kpiType: "new-list",
    settingType: "maintain",
    timelineType: "quarterly",
    timelinePeriod: "2024-Q1",
    icon: "clipboard-list",
    iconColor: "blue",
    description: "Secure 5 new property listings in Q1 2024",
    milestones: [
      { id: 1, name: "First listing", completed: true },
      { id: 2, name: "Second listing", completed: true },
      { id: 3, name: "Third listing", completed: false },
      { id: 4, name: "Fourth listing", completed: false },
      { id: 5, name: "Fifth listing", completed: false },
    ],
    createdAt: "2023-12-20",
  },
  {
    id: 3,
    title: "Consult Target: 12 for February 2024",
    progress: 25,
    target: "12",
    current: "3",
    deadline: "2024-02-29",
    reward: "Day off",
    type: "personal",
    goalType: "kpi",
    kpiType: "consult",
    settingType: "boost",
    timelineType: "monthly",
    timelinePeriod: "2024-02",
    icon: "users",
    iconColor: "purple",
    description: "Complete 12 client consultations in February 2024",
    milestones: [
      { id: 1, name: "3 consultations", completed: true },
      { id: 2, name: "6 consultations", completed: false },
      { id: 3, name: "9 consultations", completed: false },
      { id: 4, name: "12 consultations", completed: false },
    ],
    createdAt: "2024-01-05",
  },
  {
    id: 4,
    title: "Improve Photography Skills",
    progress: 80,
    target: "100",
    current: "80",
    deadline: "2024-06-30",
    reward: "New camera equipment",
    type: "personal",
    goalType: "custom",
    settingType: "maintain",
    timelineType: "annually",
    timelinePeriod: "2024",
    icon: "camera",
    iconColor: "amber",
    description: "Complete photography course and implement skills in property listings",
    milestones: [
      { id: 1, name: "Complete basic course", completed: true },
      { id: 2, name: "Practice with 10 properties", completed: true },
      { id: 3, name: "Advanced lighting techniques", completed: true },
      { id: 4, name: "Create portfolio", completed: false },
    ],
    createdAt: "2024-01-10",
  },
  {
    id: 5,
    title: "Buyer Review Target: 8 for Q2 2024",
    progress: 0,
    target: "8",
    current: "0",
    deadline: "2024-06-30",
    reward: "$300 bonus",
    type: "personal",
    goalType: "kpi",
    kpiType: "buyer-review",
    settingType: "supercharge",
    timelineType: "quarterly",
    timelinePeriod: "2024-Q2",
    icon: "star",
    iconColor: "yellow",
    description: "Receive 8 positive buyer reviews in Q2 2024",
    milestones: [
      { id: 1, name: "2 reviews", completed: false },
      { id: 2, name: "4 reviews", completed: false },
      { id: 3, name: "6 reviews", completed: false },
      { id: 4, name: "8 reviews", completed: false },
    ],
    createdAt: "2024-03-15",
  },
  {
    id: 6,
    title: "$75,000 Revenue Target for Q2 2024",
    progress: 10,
    target: "75000",
    current: "7500",
    deadline: "2024-06-30",
    reward: "Weekend retreat",
    type: "team",
    goalType: "target-revenue",
    settingType: "supercharge",
    timelineType: "quarterly",
    timelinePeriod: "2024-Q2",
    icon: "dollar-sign",
    iconColor: "green",
    description: "Achieve $75,000 in team revenue for Q2 2024",
    milestones: [
      { id: 1, name: "25% - $18,750", completed: false },
      { id: 2, name: "50% - $37,500", completed: false },
      { id: 3, name: "75% - $56,250", completed: false },
      { id: 4, name: "100% - $75,000", completed: false },
    ],
    createdAt: "2024-03-20",
    teamMembers: [
      { id: 1, name: "Alex Johnson", avatar: "/avatars/alex.jpg" },
      { id: 2, name: "Sarah Williams", avatar: "/avatars/sarah.jpg" },
      { id: 4, name: "David Miller", avatar: "/avatars/david.jpg" },
      { id: 5, name: "Emma Wilson", avatar: "/avatars/emma.jpg" },
    ],
  },
  {
    id: 7,
    title: "Survey Target: 15 for 2024",
    progress: 20,
    target: "15",
    current: "3",
    deadline: "2024-12-31",
    reward: "Professional development course",
    type: "personal",
    goalType: "kpi",
    kpiType: "survey",
    settingType: "boost",
    timelineType: "annually",
    timelinePeriod: "2024",
    icon: "file-text",
    iconColor: "indigo",
    description: "Complete 15 property surveys throughout 2024",
    milestones: [
      { id: 1, name: "Q1: 3 surveys", completed: true },
      { id: 2, name: "Q2: 4 surveys", completed: false },
      { id: 3, name: "Q3: 4 surveys", completed: false },
      { id: 4, name: "Q4: 4 surveys", completed: false },
    ],
    createdAt: "2024-01-02",
  },
  {
    id: 8,
    title: "Action Score Target: 90 for March 2024",
    progress: 78,
    target: "90",
    current: "70",
    deadline: "2024-03-31",
    reward: "Recognition award (3x with High Risk)",
    type: "personal",
    goalType: "kpi",
    kpiType: "action-score",
    settingType: "supercharge",
    timelineType: "monthly",
    timelinePeriod: "2024-03",
    icon: "activity",
    iconColor: "red",
    description: "Achieve an action score of 90 for March 2024",
    milestones: [
      { id: 1, name: "Score 70", completed: true },
      { id: 2, name: "Score 80", completed: false },
      { id: 3, name: "Score 90", completed: false },
    ],
    createdAt: "2024-02-28",
  },
]; 