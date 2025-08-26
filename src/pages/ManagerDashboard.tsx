import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart3, Users, TrendingUp, Building } from 'lucide-react';

const ManagerDashboard = () => {
  return (
    <DashboardLayout title="Manager Dashboard">
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 bg-gradient-to-br from-purple-500 to-teal-600 rounded-full flex items-center justify-center mb-6">
            <BarChart3 className="h-12 w-12 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Manager Dashboard
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Welcome to your management hub. This dashboard will be customized with comprehensive 
            analytics, team performance metrics, and strategic insights tailored for managers.
          </p>
          
          <Badge variant="secondary" className="text-sm px-4 py-2">
            🚧 Under Development
          </Badge>
        </div>

        {/* Coming Soon Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="text-center p-6 border-dashed border-2 border-gray-300">
            <CardHeader className="pb-3">
              <div className="mx-auto w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle className="text-lg">Team Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Comprehensive team performance metrics, individual agent tracking, and resource allocation insights.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center p-6 border-dashed border-2 border-gray-300">
            <CardHeader className="pb-3">
              <div className="mx-auto w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle className="text-lg">Revenue Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Advanced revenue forecasting, pipeline analysis, and strategic financial insights across all teams.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center p-6 border-dashed border-2 border-gray-300">
            <CardHeader className="pb-3">
              <div className="mx-auto w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                <Building className="h-6 w-6 text-purple-600" />
              </div>
              <CardTitle className="text-lg">Portfolio Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Complete portfolio oversight, listing performance analytics, and market trend analysis.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Development Notice */}
        <Card className="bg-gradient-to-r from-purple-50 to-teal-50 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-teal-600 rounded-lg flex items-center justify-center">
                  <BarChart3 className="h-5 w-5 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Custom Manager Dashboard in Development
                </h3>
                <p className="text-gray-700 mb-4">
                  We're building a specialized dashboard that will provide managers with:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>Real-time team performance tracking</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                    <span>Advanced analytics and reporting</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>Strategic decision-making tools</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                    <span>Resource allocation optimization</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ManagerDashboard;
