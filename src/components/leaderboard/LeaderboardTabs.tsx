import React from 'react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ActiveTabType } from './data';

interface LeaderboardTabsProps {
  activeTab: ActiveTabType;
  setActiveTab: (value: ActiveTabType) => void;
}

export const LeaderboardTabs: React.FC<LeaderboardTabsProps> = ({
  activeTab,
  setActiveTab
}) => {
  return (
    <Tabs
      value={activeTab}
      onValueChange={(value) => setActiveTab(value as ActiveTabType)}
      className="w-full"
    >
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="leaderboard" className="flex items-center justify-center">
          <span className="hidden sm:inline">Leaderboard</span>
          <span className="sm:hidden">Board</span>
        </TabsTrigger>
        <TabsTrigger value="achievement" className="flex items-center justify-center">
          <span className="hidden sm:inline">Achievement</span>
          <span className="sm:hidden">Achieve</span>
        </TabsTrigger>
        <TabsTrigger value="newSales" className="flex items-center justify-center">
          <span className="hidden sm:inline">New Sales</span>
          <span className="sm:hidden">Sales</span>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default LeaderboardTabs; 