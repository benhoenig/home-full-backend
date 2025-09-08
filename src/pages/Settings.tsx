import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

const ROLES = ['Sales', 'Admin', 'Listing Support', 'Manager', 'HR'] as const;
type Role = typeof ROLES[number];

const Settings: React.FC = () => {
  const [role, setRole] = useState<Role>(() => {
    // Optionally persist role in localStorage
    return (localStorage.getItem('user-role') as Role) || 'Sales';
  });

  useEffect(() => {
    localStorage.setItem('user-role', role);
    window.dispatchEvent(new Event('role-changed'));
  }, [role]);

  return (
    <DashboardLayout title="Settings">
      <div className="max-w-xl mx-auto py-10">
        <h2 className="text-2xl font-bold mb-6">Settings</h2>
        <div className="mb-4">
          <span className="font-medium">Current Role: </span>
          <span className="inline-block px-2 py-1 rounded bg-primary text-primary-foreground ml-2">{role}</span>
        </div>
        <div className="flex gap-4 mb-8">
          {ROLES.map((r) => (
            <Button
              key={r}
              variant={role === r ? 'default' : 'outline'}
              onClick={() => {
                console.log('[Settings] Setting role to:', r);
                setRole(r);
              }}
              className="min-w-[120px]"
            >
              {r}
            </Button>
          ))}
        </div>
        <p className="text-muted-foreground">Switching roles will change the sidebar navigation and interface to match the selected role.</p>
      </div>
    </DashboardLayout>
  );
};

export default Settings; 