import GoalCard, { Goal } from './GoalCard';
import ChallengeCard, { Challenge } from './ChallengeCard';
import GoalDetailsModal from './GoalDetailsModal';
import ChallengeDetailsModal from './ChallengeDetailsModal';
import GoalForm, { GoalFormData } from './GoalForm';
import AchievementBadges, { AchievementBadge } from './AchievementBadges';
import ProgressCelebration, { Milestone } from './ProgressCelebration';
import RewardCustomizer from './RewardCustomizer';
import TeamCollaboration, { TeamMember, TeamGoal } from './TeamCollaboration';
import GoalAnalytics, { ProgressPoint, ComparisonData, BreakdownItem, GoalAnalyticsData } from './GoalAnalytics';
import GoalComments, { CommentType, CommentUser, Comment } from './GoalComments';
import TeamPerformance, { TeamPerformanceData } from './TeamPerformance';

// Helper function to render icons
import { renderIcon } from './utils.tsx';

// Mock data
import { mockPersonalGoals, mockTeamGoals, mockChallenges, mockTeamMembers, mockTeamGoalData, mockGoalAnalyticsData, mockComments, mockCurrentUser, mockTeamPerformanceData } from './mockData';

// Export all goal-related components
export { default as GoalCard } from './GoalCard';
export { default as ChallengeCard } from './ChallengeCard';
export { default as GoalForm } from './GoalForm';
export type { GoalFormData } from './GoalForm';
export { default as GoalDetailsModal } from './GoalDetailsModal';
export { default as ChallengeDetailsModal } from './ChallengeDetailsModal';
export { default as RewardCustomizer } from './RewardCustomizer';
export { default as AchievementBadges } from './AchievementBadges';
export { default as ProgressCelebration } from './ProgressCelebration';
export { default as TeamCollaboration } from './TeamCollaboration';
export { default as GoalAnalytics } from './GoalAnalytics';
export { default as GoalComments } from './GoalComments';
export { default as TeamPerformance } from './TeamPerformance';

// Export utility functions
export { renderIcon } from './utils.tsx';

// Export mock data
export { 
  mockPersonalGoals,
  mockTeamGoals,
  mockChallenges,
  mockTeamMembers,
  mockTeamGoalData,
  mockGoalAnalyticsData,
  mockComments,
  mockCurrentUser,
  mockTeamPerformanceData
} from './mockData';

// Export types
export type { Goal } from './GoalCard';
export type { Challenge } from './ChallengeCard';
export type { AchievementBadge } from './AchievementBadges';
export type { Milestone } from './GoalCard';
export type { TeamMember, TeamGoal } from './TeamCollaboration';
export type { ProgressPoint, ComparisonData, BreakdownItem, GoalAnalyticsData } from './GoalAnalytics';
export type { Comment, CommentUser } from './GoalComments';
export type { TeamMetric, TeamPerformanceData } from './TeamPerformance'; 