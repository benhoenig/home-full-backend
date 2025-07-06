import React from 'react';
import { 
  Target, 
  Home, 
  Star, 
  Users, 
  Award, 
  Trophy, 
  Flame, 
  Calendar, 
  BarChart, 
  DollarSign,
  Briefcase,
  Globe,
  Heart,
  Phone
} from 'lucide-react';

// Function to render icon based on icon name
export const renderIcon = (iconName: string) => {
  switch (iconName) {
    case 'target':
      return <Target className="h-5 w-5" />;
    case 'home':
      return <Home className="h-5 w-5" />;
    case 'star':
      return <Star className="h-5 w-5" />;
    case 'users':
      return <Users className="h-5 w-5" />;
    case 'award':
      return <Award className="h-5 w-5" />;
    case 'trophy':
      return <Trophy className="h-5 w-5" />;
    case 'flame':
      return <Flame className="h-5 w-5" />;
    case 'calendar':
      return <Calendar className="h-5 w-5" />;
    case 'chart':
      return <BarChart className="h-5 w-5" />;
    case 'dollar':
      return <DollarSign className="h-5 w-5" />;
    case 'briefcase':
      return <Briefcase className="h-5 w-5" />;
    case 'globe':
      return <Globe className="h-5 w-5" />;
    case 'heart':
      return <Heart className="h-5 w-5" />;
    case 'phone':
      return <Phone className="h-5 w-5" />;
    default:
      return <Target className="h-5 w-5" />;
  }
};

// Mock data for goals and challenges
export const mockPersonalGoals = [
  {
    id: 1,
    title: "Reach 5M in Sales",
    progress: 65,
    target: "5,000,000",
    current: "3,250,000",
    deadline: "Dec 31, 2023",
    reward: "3% Bonus Commission",
    type: "personal" as const,
    icon: "target",
    description: "Achieve 5 million in total sales volume for the fiscal year to earn bonus commission.",
    milestones: [
      { value: 25, label: "1.25M", reached: true },
      { value: 50, label: "2.5M", reached: true },
      { value: 75, label: "3.75M", reached: false },
      { value: 100, label: "5M", reached: false },
    ],
    createdAt: "2023-08-15"
  },
  {
    id: 2,
    title: "List 10 New Properties",
    progress: 40,
    target: "10",
    current: "4",
    deadline: "Nov 30, 2023",
    reward: "Marketing Budget Increase",
    type: "personal" as const,
    icon: "home",
    description: "List 10 new properties to qualify for additional marketing budget allocation.",
    milestones: [
      { value: 25, label: "2", reached: true },
      { value: 50, label: "5", reached: false },
      { value: 75, label: "7", reached: false },
      { value: 100, label: "10", reached: false },
    ],
    createdAt: "2023-09-01"
  }
];

export const mockTeamGoals = [
  {
    id: 3,
    title: "Team Quarterly Target",
    progress: 78,
    target: "15,000,000",
    current: "11,700,000",
    deadline: "Dec 31, 2023",
    reward: "Team Retreat",
    type: "team" as const,
    icon: "users",
    description: "Achieve team quarterly sales target to earn a team retreat package.",
    milestones: [
      { value: 25, label: "3.75M", reached: true },
      { value: 50, label: "7.5M", reached: true },
      { value: 75, label: "11.25M", reached: true },
      { value: 100, label: "15M", reached: false },
    ],
    createdAt: "2023-07-01",
    teamMembers: [
      { id: 1, name: "Alex", avatar: "/avatars/alex.jpg" },
      { id: 2, name: "Sarah", avatar: "/avatars/sarah.jpg" },
      { id: 3, name: "Michael", avatar: "/avatars/michael.jpg" },
    ]
  }
];

export const mockChallenges = [
  {
    id: 1,
    title: "Listing Marathon",
    description: "List the most properties in 30 days",
    deadline: "Nov 15, 2023",
    reward: "Premium Marketing Package",
    participants: 12,
    icon: "award",
    image: "/placeholder.svg",
    progress: 60,
    isJoined: true,
    ranking: 3,
    themeColor: "purple",
    milestones: [
      { value: 25, label: "3 listings", reached: true },
      { value: 50, label: "5 listings", reached: true },
      { value: 75, label: "8 listings", reached: false },
      { value: 100, label: "10 listings", reached: false },
    ],
    leaderboard: [
      { name: "Emma", score: "9 listings", avatar: "/avatars/emma.jpg" },
      { name: "David", score: "7 listings", avatar: "/avatars/david.jpg" },
      { name: "You", score: "6 listings", avatar: "/avatars/alex.jpg" },
    ]
  },
  {
    id: 2,
    title: "Client Satisfaction Hero",
    description: "Achieve highest client satisfaction score",
    deadline: "Ongoing",
    reward: "Recognition + Bonus",
    participants: 8,
    icon: "heart",
    image: "/placeholder.svg",
    progress: 85,
    isJoined: false,
    themeColor: "red",
    milestones: [
      { value: 25, label: "4.0 rating", reached: true },
      { value: 50, label: "4.5 rating", reached: true },
      { value: 75, label: "4.8 rating", reached: true },
      { value: 100, label: "5.0 rating", reached: false },
    ]
  }
]; 