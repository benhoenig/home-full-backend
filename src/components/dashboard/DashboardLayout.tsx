import React, { useEffect, useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import NotificationButton from './notifications/NotificationButton';
import { Separator } from '@/components/ui/separator';
import ActionTrackerFAB from './ActionTrackerFAB';

type DashboardLayoutProps = {
  children: React.ReactNode;
  title: string;
  headerControls?: React.ReactNode;
  // Allow disabling the action tracker if needed on certain pages
  hideActionTracker?: boolean;
};

export function DashboardLayout({ 
  children, 
  title, 
  headerControls,
  hideActionTracker = false 
}: DashboardLayoutProps) {
  const isMobile = useIsMobile();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  // Check localStorage to sync with sidebar collapsed state
  useEffect(() => {
    const handleStorageChange = () => {
      const isCollapsed = localStorage.getItem('sidebar-collapsed') === 'true';
      setSidebarCollapsed(isCollapsed);
    };
    
    // Initial check
    handleStorageChange();
    
    // Listen for changes to localStorage
    window.addEventListener('storage', handleStorageChange);
    
    // Also add a direct event listener for changes made within this window
    const storageChangeCallback = () => {
      const isCollapsed = localStorage.getItem('sidebar-collapsed') === 'true';
      setSidebarCollapsed(isCollapsed);
    };
    
    window.addEventListener('sidebar-collapsed-change', storageChangeCallback);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('sidebar-collapsed-change', storageChangeCallback);
    };
  }, []);
  
  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />
      <div 
        className={`flex-1 p-4 md:p-6 overflow-y-auto transition-all duration-300 ${
          !isMobile ? (sidebarCollapsed ? 'ml-16' : 'ml-64') : 'mt-16'
        }`}
      >
        <div className="w-full mx-auto">
          <header className="mb-6 md:mb-8 flex items-center justify-between">
            <h1 className="text-xl md:text-3xl font-bold">{title}</h1>
            <div className="flex items-center gap-1">
              {headerControls}
              <NotificationButton />
            </div>
          </header>
          <div className="dashboard-content w-full">
            {children}
          </div>
        </div>
      </div>
      
      {/* Action Tracker FAB - shown on all pages unless explicitly disabled */}
      {!hideActionTracker && <ActionTrackerFAB />}
    </div>
  );
}

export default DashboardLayout;
