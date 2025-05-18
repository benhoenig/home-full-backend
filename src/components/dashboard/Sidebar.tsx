import React, { useState, useEffect } from 'react';
import { Link, useLocation, NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Inbox, 
  Target, 
  Trophy, 
  LayoutList, 
  Users, 
  FileText, 
  Settings,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Users2
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

export function Sidebar() {
  const isMobile = useIsMobile();
  const location = useLocation();
  const [isOpen, setIsOpen] = React.useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [role, setRole] = useState<'Sales' | 'Admin' | 'Listing Support'>(() =>
    (localStorage.getItem('user-role') as 'Sales' | 'Admin' | 'Listing Support') || 'Sales'
  );
  if (role === 'Admin') {
    console.log('[Sidebar] Current role: Admin (Admin sidebar)');
  } else if (role === 'Listing Support') {
    console.log('[Sidebar] Current role: Listing Support (Listing Support sidebar)');
  } else {
    console.log('[Sidebar] Current role: Sales (Sales sidebar)');
  }

  // Always expand sidebar on /settings
  useEffect(() => {
    if (location.pathname === '/settings') {
      setIsCollapsed(false);
    } else {
      const storedState = localStorage.getItem('sidebar-collapsed');
      if (storedState !== null) {
        setIsCollapsed(storedState === 'true');
      }
    }
  }, [location.pathname]);

  useEffect(() => {
    const handleRoleChange = () => {
      setRole((localStorage.getItem('user-role') as 'Sales' | 'Admin' | 'Listing Support') || 'Sales');
    };
    window.addEventListener('role-changed', handleRoleChange);
    return () => {
      window.removeEventListener('role-changed', handleRoleChange);
    };
  }, []);

  const toggleCollapse = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    localStorage.setItem('sidebar-collapsed', String(newState));
    
    // Dispatch a custom event to notify other components about the state change
    const event = new Event('sidebar-collapsed-change');
    window.dispatchEvent(event);
  };

  // Define role-based menus
  const menus: Record<string, { label: string; to: string; icon: React.ReactNode }[]> = {
    Admin: [
      { label: 'Dashboard', to: '/', icon: <LayoutDashboard className="h-5 w-5" /> },
      { label: 'Inbox', to: '/inbox', icon: <Inbox className="h-5 w-5" /> },
      { label: 'Lead Manager', to: '/lead-manager', icon: <Users className="h-5 w-5" /> },
      { label: 'Lead Submission', to: '/lead-submission', icon: <FileText className="h-5 w-5" /> },
      { label: 'Contacts', to: '/contacts', icon: <Users className="h-5 w-5" /> },
      { label: 'Settings', to: '/settings', icon: <Settings className="h-5 w-5" /> },
    ],
    'Listing Support': [
      { label: 'Dashboard', to: '/', icon: <LayoutDashboard className="h-5 w-5" /> },
      { label: 'Inbox', to: '/inbox', icon: <Inbox className="h-5 w-5" /> },
      { label: 'Listing Manager', to: '/listing-manager', icon: <LayoutList className="h-5 w-5" /> },
      { label: 'All Listings', to: '/all-listings', icon: <LayoutList className="h-5 w-5" /> },
      { label: 'Settings', to: '/settings', icon: <Settings className="h-5 w-5" /> },
    ],
  };

  // Show custom menu for Admin and Listing Support, default (Sales) sidebar for Sales
  const isCustomRole = role === 'Admin' || role === 'Listing Support';

  const sidebarContent = (
    <>
      <div className={`p-4 flex justify-between items-center ${isCollapsed ? 'px-3' : 'px-4'}`}>
        {!isCollapsed && (
          <div className="flex items-center justify-start w-full">
            <img 
              src="/images/home-logo.png" 
              alt="HOME REAL ESTATE" 
              className="h-8 object-contain" 
            />
          </div>
        )}
        
        {!isMobile && (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleCollapse} 
            className={`text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ${isCollapsed ? 'ml-auto' : ''}`}
          >
            {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </Button>
        )}
      </div>
      
      <nav className={`flex-1 ${isCollapsed ? 'px-2' : 'px-3'} space-y-6 overflow-y-auto`}>
        {isCustomRole ? (
          <div className="space-y-1">
            {menus[role].map((item) => (
              item.label !== 'Settings' && (
                <NavLink key={item.label} to={item.to} className={({ isActive }) => `sidebar-item ${isCollapsed ? 'justify-center px-2' : ''}${isActive ? ' active' : ''}`}>
                  {item.icon}
                  {!isCollapsed && <span>{item.label}</span>}
                </NavLink>
              )
            ))}
          </div>
        ) : (
          <>
            <div className="space-y-1">
              <NavLink to="/dashboard" className={({ isActive }) => `sidebar-item ${isCollapsed ? 'justify-center px-2' : ''}${isActive ? ' active' : ''}`}>
                <LayoutDashboard className="h-5 w-5" />
                {!isCollapsed && <span>Dashboard</span>}
              </NavLink>
              <NavLink to="/inbox" className={({ isActive }) => `sidebar-item ${isCollapsed ? 'justify-center px-2' : ''}${isActive ? ' active' : ''}`}>
                <Inbox className="h-5 w-5" />
                {!isCollapsed && <span>Inbox</span>}
              </NavLink>
              <NavLink to="/goals" className={({ isActive }) => `sidebar-item ${isCollapsed ? 'justify-center px-2' : ''}${isActive ? ' active' : ''}`}>
                <Target className="h-5 w-5" />
                {!isCollapsed && <span>Goals & Target</span>}
              </NavLink>
              <NavLink to="/leaderboard" className={({ isActive }) => `sidebar-item ${isCollapsed ? 'justify-center px-2' : ''}${isActive ? ' active' : ''}`}>
                <Trophy className="h-5 w-5" />
                {!isCollapsed && <span>Leaderboard</span>}
              </NavLink>
            </div>
            
            {!isCollapsed && (
              <div>
                <h3 className="px-3 text-xs uppercase text-sidebar-foreground/50 font-semibold tracking-wider">
                  Main
                </h3>
                <div className="mt-2 space-y-1">
                  <NavLink to="/listings" className={({ isActive }) => `sidebar-item ${isCollapsed ? 'justify-center px-2' : ''}${isActive ? ' active' : ''}`}>
                    <LayoutList className="h-5 w-5" />
                    <span>My Listings</span>
                  </NavLink>
                  <NavLink to="/owner-focus" className={({ isActive }) => `sidebar-item ${isCollapsed ? 'justify-center px-2' : ''}${isActive ? ' active' : ''}`}>
                    <Users className="h-5 w-5" />
                    <span>OF (Owner Focus)</span>
                  </NavLink>
                  <NavLink to="/client-process" className={({ isActive }) => `sidebar-item ${isCollapsed ? 'justify-center px-2' : ''}${isActive ? ' active' : ''}`}>
                    <FileText className="h-5 w-5" />
                    <span>UCP (Client Process)</span>
                  </NavLink>
                  <NavLink to="/mentoring" className={({ isActive }) => `sidebar-item ${isCollapsed ? 'justify-center px-2' : ''}${isActive ? ' active' : ''}`}>
                    <Users2 className="h-5 w-5" />
                    <span>Mentoring</span>
                  </NavLink>
                </div>
              </div>
            )}
            
            {isCollapsed && (
              <div className="space-y-1">
                <NavLink to="/listings" className={({ isActive }) => `sidebar-item ${isCollapsed ? 'justify-center px-2' : ''}${isActive ? ' active' : ''}`}>
                  <LayoutList className="h-5 w-5" />
                </NavLink>
                <NavLink to="/owner-focus" className={({ isActive }) => `sidebar-item ${isCollapsed ? 'justify-center px-2' : ''}${isActive ? ' active' : ''}`}>
                  <Users className="h-5 w-5" />
                </NavLink>
                <NavLink to="/client-process" className={({ isActive }) => `sidebar-item ${isCollapsed ? 'justify-center px-2' : ''}${isActive ? ' active' : ''}`}>
                  <FileText className="h-5 w-5" />
                </NavLink>
                <NavLink to="/mentoring" className={({ isActive }) => `sidebar-item ${isCollapsed ? 'justify-center px-2' : ''}${isActive ? ' active' : ''}`}>
                  <Users2 className="h-5 w-5" />
                </NavLink>
              </div>
            )}
            
            {!isCollapsed && (
              <div>
                <h3 className="px-3 text-xs uppercase text-sidebar-foreground/50 font-semibold tracking-wider">
                  Tools
                </h3>
                <div className="mt-2 space-y-1">
                  <NavLink to="/all-listings" className={({ isActive }) => `sidebar-item ${isCollapsed ? 'justify-center px-2' : ''}${isActive ? ' active' : ''}`}>
                    <LayoutList className="h-5 w-5" />
                    <span>All Listings</span>
                  </NavLink>
                  <NavLink to="/agreement" className={({ isActive }) => `sidebar-item ${isCollapsed ? 'justify-center px-2' : ''}${isActive ? ' active' : ''}`}>
                    <FileText className="h-5 w-5" />
                    <span>Agreement Gen.</span>
                  </NavLink>
                </div>
              </div>
            )}
            
            {isCollapsed && (
              <div className="space-y-1">
                <NavLink to="/all-listings" className={({ isActive }) => `sidebar-item ${isCollapsed ? 'justify-center px-2' : ''}${isActive ? ' active' : ''}`}>
                  <LayoutList className="h-5 w-5" />
                </NavLink>
                <NavLink to="/agreement" className={({ isActive }) => `sidebar-item ${isCollapsed ? 'justify-center px-2' : ''}${isActive ? ' active' : ''}`}>
                  <FileText className="h-5 w-5" />
                </NavLink>
              </div>
            )}
          </>
        )}
      </nav>
      
      <div className={`p-4 border-t border-sidebar-border ${isCollapsed ? 'flex justify-center' : ''}`}>
        <NavLink to="/settings" className={({ isActive }) => `sidebar-item ${isCollapsed ? 'justify-center px-2' : ''}${isActive ? ' active' : ''}`}>
          <Settings className="h-5 w-5" />
          {!isCollapsed && <span>Settings</span>}
        </NavLink>
      </div>
    </>
  );

  if (isMobile) {
    return (
      <>
        <Button 
          variant="ghost" 
          size="icon" 
          className="fixed top-4 left-4 z-30 bg-sidebar text-sidebar-foreground rounded-md"
          onClick={() => setIsOpen(true)}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Open Menu</span>
        </Button>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetContent side="left" className="w-64 p-0 bg-sidebar border-r border-sidebar-border">
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute right-4 top-4 text-sidebar-foreground hover:bg-sidebar-accent"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Close Menu</span>
            </Button>
            <div className="flex flex-col h-full">
              {sidebarContent}
            </div>
          </SheetContent>
        </Sheet>
      </>
    );
  }

  return (
    <div className={`${isCollapsed ? 'w-16' : 'w-64'} bg-sidebar fixed h-screen flex flex-col border-r border-sidebar-border transition-all duration-300`}>
      {sidebarContent}
    </div>
  );
}

export default Sidebar;
