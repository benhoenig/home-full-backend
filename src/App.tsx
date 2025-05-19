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
import Dashboard from "./pages/Dashboard";
import Goals from "./pages/Goals";
import Leaderboard from "./pages/Leaderboard";
import Mentoring from "./pages/Mentoring";
import ActionTrackerDemo from "./pages/ActionTrackerDemo";
import Listings from "@/pages/Listings";

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
            <Route path="/" element={<Index />} />
            <Route path="/inbox" element={<Index />} /> 
            <Route path="/client-process" element={<ClientProcess />} />
            <Route path="/lead-manager" element={<LeadManager />} />
            <Route path="/lead-submission" element={<LeadSubmissionPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/goals" element={<Goals />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/mentoring" element={<Mentoring />} />
            <Route path="/listings" element={<Listings />} />
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
