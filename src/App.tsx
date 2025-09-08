import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ClientProcess from "./pages/ClientProcess";
import NotFound from "./pages/NotFound";
import Settings from "./pages/Settings";
import LeadManager from "./pages/LeadManager";
import LeadSubmissionPage from "./pages/LeadSubmissionPage";
import RoleDashboard from "./pages/RoleDashboard";
import Goals from "./pages/Goals";
import Leaderboard from "./pages/Leaderboard";
import Mentoring from "./pages/Mentoring";
import ActionTrackerDemo from "./pages/ActionTrackerDemo";
import Listings from "@/pages/Listings";
import AllListings from "@/pages/AllListings";
import OwnerFocus from "@/pages/OwnerFocus";
import MasterDataPage from "@/pages/MasterDataPage";
import MarketingBudget from "@/pages/MarketingBudget";
import Inbox from "@/pages/Inbox";
import MyTeam from "@/pages/MyTeam";
import KPI from "@/pages/KPI";
import Roles from "@/pages/Roles";
import WelfareBenefit from "@/pages/WelfareBenefit";
import Rewards from "@/pages/Rewards";

const App = () => {
  // Create a new QueryClient instance inside the component
  const queryClient = new QueryClient();
  
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<RoleDashboard />} />
            <Route path="/inbox" element={<Inbox />} /> 
            <Route path="/client-process" element={<ClientProcess />} />
            <Route path="/lead-manager" element={<LeadManager />} />
            <Route path="/lead-submission" element={<LeadSubmissionPage />} />
            <Route path="/dashboard" element={<RoleDashboard />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/goals" element={<Goals />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/mentoring" element={<Mentoring />} />
            <Route path="/listings" element={<Listings />} />
            <Route path="/all-listings" element={<AllListings />} />
            <Route path="/owner-focus" element={<OwnerFocus />} />
            <Route path="/master-data" element={<MasterDataPage />} />
            <Route path="/marketing-budget" element={<MarketingBudget />} />
            <Route path="/my-team" element={<MyTeam />} />
            <Route path="/kpi" element={<KPI />} />
            <Route path="/roles" element={<Roles />} />
            <Route path="/welfare-benefit" element={<WelfareBenefit />} />
            <Route path="/rewards" element={<Rewards />} />

            <Route path="/action-tracker-demo" element={<ActionTrackerDemo />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;
