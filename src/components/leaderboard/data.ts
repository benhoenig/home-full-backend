// Types for the leaderboard data
export interface Achiever {
  id: number;
  name: string;
  team: string;
  sales: number;
  rank: number;
  avatar: string;
  image: string;
  conversion: number;
  closedCases: number;
  ticketSize: number;
  buyerSatisfaction: number;
  ownerSatisfaction: number;
}

export interface NewSalesData {
  id: number;
  name: string;
  team: string;
  avatar: string;
  image: string;
  newList: number;
  ownerVisit: number;
  consult2: number;
  consult5: number;
  survey: number;
  presentProject: number;
  aList: number;
  ownerScript: number;
  consultingScript: number;
  buyerScript: number;
  academyVideo: number;
  realCase: number;
}

// Types for the leaderboard
export type LeaderboardType = 'Revenue' | 'Conversion Rate' | 'Closed Case' | 'Avg. Ticket Size' | 'Avg. Buyer Satisfaction' | 'Avg. Owner Satisfaction';
export type TimeframeType = 'Annually' | 'Quarterly' | 'Monthly';
export type ActiveTabType = 'leaderboard' | 'achievement' | 'newSales';
export type NewSalesMetricType = 
  | 'New List (Count)' 
  | 'Owner Visit (Count)' 
  | 'Consult 2% (Count)' 
  | 'Consult 5% (Count)' 
  | 'Survey (Count)' 
  | 'Present Project (Count)' 
  | 'A List (Count)' 
  | 'Owner Script (Percentage)' 
  | 'Consulting Script (Percentage)' 
  | 'Buyer Script (Percentage)' 
  | 'HOME Academy Video Watched (Count)' 
  | 'Real Case with Senior (Count)';

// Mock data for the achievers leaderboard
export const achieversList: Achiever[] = [
  { id: 1, name: 'Alex Johnson', team: 'Alpha Team', sales: 342000, rank: 1, avatar: '👨‍💼', image: '/placeholder.svg', conversion: 68, closedCases: 42, ticketSize: 24500, buyerSatisfaction: 4.8, ownerSatisfaction: 4.9 },
  { id: 2, name: 'Sarah Williams', team: 'Beta Team', sales: 298000, rank: 2, avatar: '👩‍💼', image: '/placeholder.svg', conversion: 62, closedCases: 36, ticketSize: 22000, buyerSatisfaction: 4.7, ownerSatisfaction: 4.8 },
  { id: 3, name: 'Michael Chen', team: 'Gamma Team', sales: 276500, rank: 3, avatar: '👨‍💼', image: '/placeholder.svg', conversion: 58, closedCases: 32, ticketSize: 20500, buyerSatisfaction: 4.6, ownerSatisfaction: 4.7 },
  { id: 4, name: 'Emma Rodriguez', team: 'Alpha Team', sales: 245000, rank: 4, avatar: '👩‍💼', image: '/placeholder.svg', conversion: 55, closedCases: 30, ticketSize: 19800, buyerSatisfaction: 4.5, ownerSatisfaction: 4.6 },
  { id: 5, name: 'David Kim', team: 'Delta Team', sales: 230000, rank: 5, avatar: '👨‍💼', image: '/placeholder.svg', conversion: 52, closedCases: 28, ticketSize: 18500, buyerSatisfaction: 4.4, ownerSatisfaction: 4.5 },
  { id: 6, name: 'Lisa Taylor', team: 'Beta Team', sales: 212000, rank: 6, avatar: '👩‍💼', image: '/placeholder.svg', conversion: 50, closedCases: 25, ticketSize: 17200, buyerSatisfaction: 4.3, ownerSatisfaction: 4.4 },
  { id: 7, name: 'James Wilson', team: 'Gamma Team', sales: 198000, rank: 7, avatar: '👨‍💼', image: '/placeholder.svg', conversion: 48, closedCases: 23, ticketSize: 16500, buyerSatisfaction: 4.2, ownerSatisfaction: 4.3 },
  { id: 8, name: 'Olivia Martin', team: 'Delta Team', sales: 187000, rank: 8, avatar: '👩‍💼', image: '/placeholder.svg', conversion: 45, closedCases: 21, ticketSize: 15800, buyerSatisfaction: 4.1, ownerSatisfaction: 4.2 },
  { id: 9, name: 'Daniel Lee', team: 'Alpha Team', sales: 175000, rank: 9, avatar: '👨‍💼', image: '/placeholder.svg', conversion: 43, closedCases: 20, ticketSize: 15200, buyerSatisfaction: 4.0, ownerSatisfaction: 4.1 },
  { id: 10, name: 'Sophia Garcia', team: 'Beta Team', sales: 165000, rank: 10, avatar: '👩‍💼', image: '/placeholder.svg', conversion: 40, closedCases: 19, ticketSize: 14500, buyerSatisfaction: 3.9, ownerSatisfaction: 4.0 },
];

// Mock data for the new sales tracking
export const newSalesData: NewSalesData[] = [
  { 
    id: 1, 
    name: 'Alex Johnson', 
    team: 'Alpha Team', 
    avatar: '👨‍💼', 
    image: '/placeholder.svg',
    newList: 14,
    ownerVisit: 10,
    consult2: 8,
    consult5: 6,
    survey: 5,
    presentProject: 12,
    aList: 4,
    ownerScript: 92,
    consultingScript: 88,
    buyerScript: 90,
    academyVideo: 15,
    realCase: 3
  },
  { 
    id: 2, 
    name: 'Sarah Williams', 
    team: 'Beta Team', 
    avatar: '👩‍💼', 
    image: '/placeholder.svg',
    newList: 12,
    ownerVisit: 9,
    consult2: 7,
    consult5: 5,
    survey: 6,
    presentProject: 10,
    aList: 3,
    ownerScript: 88,
    consultingScript: 90,
    buyerScript: 86,
    academyVideo: 14,
    realCase: 2
  },
  { 
    id: 3, 
    name: 'Michael Chen', 
    team: 'Gamma Team', 
    avatar: '👨‍💼', 
    image: '/placeholder.svg',
    newList: 10,
    ownerVisit: 8,
    consult2: 6,
    consult5: 4,
    survey: 7,
    presentProject: 8,
    aList: 5,
    ownerScript: 85,
    consultingScript: 82,
    buyerScript: 88,
    academyVideo: 16,
    realCase: 4
  },
  { 
    id: 4, 
    name: 'Emma Rodriguez', 
    team: 'Alpha Team', 
    avatar: '👩‍💼', 
    image: '/placeholder.svg',
    newList: 11,
    ownerVisit: 7,
    consult2: 5,
    consult5: 3,
    survey: 4,
    presentProject: 9,
    aList: 2,
    ownerScript: 80,
    consultingScript: 84,
    buyerScript: 82,
    academyVideo: 12,
    realCase: 2
  },
  { 
    id: 5, 
    name: 'David Kim', 
    team: 'Delta Team', 
    avatar: '👨‍💼', 
    image: '/placeholder.svg',
    newList: 9,
    ownerVisit: 6,
    consult2: 4,
    consult5: 2,
    survey: 3,
    presentProject: 7,
    aList: 1,
    ownerScript: 78,
    consultingScript: 80,
    buyerScript: 83,
    academyVideo: 10,
    realCase: 1
  }
]; 