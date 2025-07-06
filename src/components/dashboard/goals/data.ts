import { Goal } from './GoalCard';
import { Challenge, Leaderboard } from './ChallengeCard';

// Mock personal goals data
export const mockPersonalGoals: Goal[] = [
  {
    id: 1,
    title: "Achieve $5M in Sales",
    type: "personal",
    description: "Reach $5 million in total sales volume by the end of Q3.",
    target: "5,000,000",
    current: "3,750,000",
    deadline: "Sep 30, 2023",
    progress: 75,
    reward: "5% Bonus Commission",
    icon: "target",
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
    description: "Acquire 10 new property listings in the luxury market segment.",
    target: "10",
    current: "4",
    deadline: "Dec 15, 2023",
    progress: 40,
    reward: "Marketing Budget Increase",
    icon: "home",
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
    description: "Maintain a 95% client satisfaction rating across all transactions.",
    target: "95",
    current: "92",
    deadline: "Dec 31, 2023",
    progress: 97,
    reward: "Recognition Award",
    icon: "star",
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
    description: "Achieve $15 million in team sales volume for Q4.",
    target: "15,000,000",
    current: "5,250,000",
    deadline: "Dec 31, 2023",
    progress: 35,
    reward: "Team Retreat",
    icon: "users",
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
    description: "Expand into the downtown luxury condo market with at least 5 new listings.",
    target: "5",
    current: "2",
    deadline: "Nov 30, 2023",
    progress: 40,
    reward: "Marketing Budget Increase",
    icon: "target",
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