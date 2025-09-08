import { useState } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  joinedAt: string;
  status: 'active' | 'inactive' | 'on_leave';
  performance?: number; // Performance score 0-100
}

export interface Role {
  id: string;
  name: string;
  description: string;
  department: string;
  level: 'Junior' | 'Mid' | 'Senior' | 'Lead' | 'Manager' | 'Director';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  userCount: number; // Number of users assigned to this role
  users: User[]; // List of users assigned to this role
  kpiCount: number; // Number of KPIs assigned to this role
  hasWelfareBenefits: boolean; // Whether welfare benefits are configured
}

export interface CreateRoleData {
  name: string;
  description: string;
  department: string;
  level: 'Junior' | 'Mid' | 'Senior' | 'Lead' | 'Manager' | 'Director';
}

// Mock departments - these could come from a separate system
export const departments = [
  'Sales',
  'Marketing', 
  'Listing Support',
  'Admin',
  'IT',
  'HR',
  'Finance',
  'Operations',
  'Customer Support'
];

// Mock users data
const mockUsers: User[] = [
  { id: 'user_1', name: 'Sarah Johnson', email: 'sarah.johnson@company.com', joinedAt: '2023-03-15T09:00:00Z', status: 'active', performance: 92 },
  { id: 'user_2', name: 'Michael Chen', email: 'michael.chen@company.com', joinedAt: '2023-05-20T09:00:00Z', status: 'active', performance: 88 },
  { id: 'user_3', name: 'Emma Wilson', email: 'emma.wilson@company.com', joinedAt: '2023-07-10T09:00:00Z', status: 'active', performance: 85 },
  { id: 'user_4', name: 'David Rodriguez', email: 'david.rodriguez@company.com', joinedAt: '2023-02-28T09:00:00Z', status: 'active', performance: 91 },
  { id: 'user_5', name: 'Lisa Thompson', email: 'lisa.thompson@company.com', joinedAt: '2023-08-05T09:00:00Z', status: 'active', performance: 79 },
  { id: 'user_6', name: 'James Park', email: 'james.park@company.com', joinedAt: '2023-04-12T09:00:00Z', status: 'active', performance: 94 },
  { id: 'user_7', name: 'Amanda Foster', email: 'amanda.foster@company.com', joinedAt: '2023-06-18T09:00:00Z', status: 'active', performance: 87 },
  { id: 'user_8', name: 'Robert Kim', email: 'robert.kim@company.com', joinedAt: '2023-09-22T09:00:00Z', status: 'active', performance: 83 },
  { id: 'user_9', name: 'Jennifer Martinez', email: 'jennifer.martinez@company.com', joinedAt: '2023-01-30T09:00:00Z', status: 'on_leave', performance: 76 },
  { id: 'user_10', name: 'Kevin Wong', email: 'kevin.wong@company.com', joinedAt: '2023-10-15T09:00:00Z', status: 'active', performance: 90 },
  { id: 'user_11', name: 'Rachel Green', email: 'rachel.green@company.com', joinedAt: '2023-11-08T09:00:00Z', status: 'active', performance: 82 },
  { id: 'user_12', name: 'Daniel Lee', email: 'daniel.lee@company.com', joinedAt: '2023-12-01T09:00:00Z', status: 'active', performance: 89 },
  { id: 'user_13', name: 'Sophie Brown', email: 'sophie.brown@company.com', joinedAt: '2022-11-20T09:00:00Z', status: 'active', performance: 96 },
  { id: 'user_14', name: 'Alex Turner', email: 'alex.turner@company.com', joinedAt: '2022-08-15T09:00:00Z', status: 'active', performance: 93 },
  { id: 'user_15', name: 'Maria Garcia', email: 'maria.garcia@company.com', joinedAt: '2022-12-10T09:00:00Z', status: 'active', performance: 88 }
];

// Mock initial roles data
const mockRoles: Role[] = [
  {
    id: 'role_1',
    name: 'Sales Representative',
    description: 'Responsible for client acquisition and property sales',
    department: 'Sales',
    level: 'Mid',
    isActive: true,
    createdAt: '2024-01-10T10:00:00Z',
    updatedAt: '2024-01-15T14:30:00Z',
    userCount: 8,
    users: mockUsers.slice(0, 8),
    kpiCount: 8,
    hasWelfareBenefits: true
  },
  {
    id: 'role_2',
    name: 'Senior Sales Manager',
    description: 'Manages sales team and oversees major client relationships',
    department: 'Sales',
    level: 'Manager',
    isActive: true,
    createdAt: '2024-01-08T09:15:00Z',
    updatedAt: '2024-01-14T16:20:00Z',
    userCount: 3,
    users: mockUsers.slice(8, 11),
    kpiCount: 12,
    hasWelfareBenefits: true
  },
  {
    id: 'role_3',
    name: 'Listing Coordinator',
    description: 'Manages property listings and coordinates with owners',
    department: 'Listing Support',
    level: 'Mid',
    isActive: true,
    createdAt: '2024-01-12T11:30:00Z',
    updatedAt: '2024-01-16T10:45:00Z',
    userCount: 3,
    users: mockUsers.slice(11, 14),
    kpiCount: 6,
    hasWelfareBenefits: false
  },
  {
    id: 'role_4',
    name: 'Marketing Specialist',
    description: 'Develops and executes marketing campaigns',
    department: 'Marketing',
    level: 'Mid',
    isActive: true,
    createdAt: '2024-01-05T08:00:00Z',
    updatedAt: '2024-01-13T12:15:00Z',
    userCount: 2,
    users: mockUsers.slice(13, 15),
    kpiCount: 4,
    hasWelfareBenefits: false
  },
  {
    id: 'role_5',
    name: 'Junior Sales Associate',
    description: 'Entry-level sales position with training focus',
    department: 'Sales',
    level: 'Junior',
    isActive: false,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-10T15:30:00Z',
    userCount: 0,
    users: [],
    kpiCount: 0,
    hasWelfareBenefits: false
  }
];

export function useRolesData() {
  const [roles, setRoles] = useState<Role[]>(mockRoles);

  const createRole = (roleData: CreateRoleData): Role => {
    const newRole: Role = {
      id: `role_${Date.now()}`,
      name: roleData.name,
      description: roleData.description,
      department: roleData.department,
      level: roleData.level,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      userCount: 0,
      users: [],
      kpiCount: 0,
      hasWelfareBenefits: false
    };

    setRoles(prev => [...prev, newRole]);
    return newRole;
  };

  const updateRole = (roleId: string, updates: Partial<Role>) => {
    setRoles(prev => prev.map(role => 
      role.id === roleId 
        ? { ...role, ...updates, updatedAt: new Date().toISOString() }
        : role
    ));
  };

  // Update role KPI count
  const updateRoleKPICount = (roleId: string, count: number) => {
    setRoles(prev => prev.map(role => 
      role.id === roleId 
        ? { ...role, kpiCount: count, updatedAt: new Date().toISOString() }
        : role
    ));
  };

  // Update role welfare status
  const updateRoleWelfareStatus = (roleId: string, hasWelfare: boolean) => {
    setRoles(prev => prev.map(role => 
      role.id === roleId 
        ? { ...role, hasWelfareBenefits: hasWelfare, updatedAt: new Date().toISOString() }
        : role
    ));
  };

  // User assignment functions
  const assignUserToRole = (roleId: string, user: User) => {
    setRoles(prev => prev.map(role => {
      if (role.id !== roleId) return role;
      
      // Check if user is already assigned
      if (role.users.some(u => u.id === user.id)) return role;
      
      return {
        ...role,
        users: [...role.users, user],
        userCount: role.users.length + 1,
        updatedAt: new Date().toISOString()
      };
    }));
  };

  const removeUserFromRole = (roleId: string, userId: string) => {
    setRoles(prev => prev.map(role => {
      if (role.id !== roleId) return role;
      
      const updatedUsers = role.users.filter(u => u.id !== userId);
      return {
        ...role,
        users: updatedUsers,
        userCount: updatedUsers.length,
        updatedAt: new Date().toISOString()
      };
    }));
  };

  // Get all users that are not assigned to any role (available for assignment)
  const getUnassignedUsers = (): User[] => {
    const assignedUserIds = new Set();
    roles.forEach(role => {
      role.users.forEach(user => assignedUserIds.add(user.id));
    });
    
    return mockUsers.filter(user => !assignedUserIds.has(user.id));
  };

  // Get all users across all roles
  const getAllUsers = (): User[] => {
    return mockUsers;
  };

  const deleteRole = (roleId: string) => {
    setRoles(prev => prev.filter(role => role.id !== roleId));
  };

  const toggleRoleActive = (roleId: string) => {
    setRoles(prev => prev.map(role => 
      role.id === roleId 
        ? { ...role, isActive: !role.isActive, updatedAt: new Date().toISOString() }
        : role
    ));
  };

  // Get roles by department
  const getRolesByDepartment = (department: string) => {
    return roles.filter(role => role.department === department);
  };

  // Get active roles only
  const getActiveRoles = () => {
    return roles.filter(role => role.isActive);
  };

  // Get role statistics
  const getRoleStats = () => {
    const totalRoles = roles.length;
    const activeRoles = roles.filter(r => r.isActive).length;
    const totalUsers = roles.reduce((sum, role) => sum + role.userCount, 0);
    const rolesWithKPIs = roles.filter(r => r.kpiCount > 0).length;
    const rolesWithWelfare = roles.filter(r => r.hasWelfareBenefits).length;

    return {
      totalRoles,
      activeRoles,
      totalUsers,
      rolesWithKPIs,
      rolesWithWelfare,
      departmentBreakdown: departments.map(dept => ({
        department: dept,
        count: roles.filter(r => r.department === dept).length,
        activeCount: roles.filter(r => r.department === dept && r.isActive).length
      }))
    };
  };

  return {
    roles,
    departments,
    createRole,
    updateRole,
    updateRoleKPICount,
    updateRoleWelfareStatus,
    assignUserToRole,
    removeUserFromRole,
    getUnassignedUsers,
    getAllUsers,
    deleteRole,
    toggleRoleActive,
    getRolesByDepartment,
    getActiveRoles,
    getRoleStats
  };
}
