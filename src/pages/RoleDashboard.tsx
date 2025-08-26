import React, { useState, useEffect } from 'react';
import Dashboard from './Dashboard';
import AdminDashboard from './AdminDashboard';
import ListingSupportDashboard from './ListingSupportDashboard';
import ManagerDashboard from './ManagerDashboard';

const RoleDashboard = () => {
  const [userRole, setUserRole] = useState<'Sales' | 'Admin' | 'Listing Support' | 'Manager'>(() =>
    (localStorage.getItem('user-role') as 'Sales' | 'Admin' | 'Listing Support' | 'Manager') || 'Sales'
  );

  // Listen for role changes
  useEffect(() => {
    const handleRoleChange = () => {
      const newRole = (localStorage.getItem('user-role') as 'Sales' | 'Admin' | 'Listing Support' | 'Manager') || 'Sales';
      setUserRole(newRole);
    };
    
    window.addEventListener('role-changed', handleRoleChange);
    return () => {
      window.removeEventListener('role-changed', handleRoleChange);
    };
  }, []);

  // Route to the appropriate dashboard based on role
  switch (userRole) {
    case 'Admin':
      return <AdminDashboard />;
    case 'Listing Support':
      return <ListingSupportDashboard />;
    case 'Manager':
      return <ManagerDashboard />;
    case 'Sales':
    default:
      return <Dashboard />;
  }
};

export default RoleDashboard;
