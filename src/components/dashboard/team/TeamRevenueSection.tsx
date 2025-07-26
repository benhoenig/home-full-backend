import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import TeamRevenue from '@/components/dashboard/team/TeamRevenue';
import RevenueToggleButtons from '@/components/dashboard/RevenueToggleButtons';
import { RevenuePeriod, RevenueType } from '@/components/dashboard/RevenueSection';

// Mock team data
const mockTeamMembers = [
  { id: 1, name: 'สมชาย วงศ์สุข', position: 'Senior Sales' },
  { id: 2, name: 'วิภาดา มานะ', position: 'Sales Manager' },
  { id: 3, name: 'ธนพล รุ่งเรือง', position: 'Sales Executive' },
  { id: 4, name: 'นภัสวรรณ ใจดี', position: 'Sales Associate' },
  { id: 5, name: 'อนุชา พงศ์ธร', position: 'Sales Executive' },
];

export function TeamRevenueSection() {
  const [period, setPeriod] = useState<RevenuePeriod>('monthly');
  const [revenueType, setRevenueType] = useState<RevenueType>('closing');
  
  // Revenue data based on period and type
  const getRevenueData = () => {
    // This would usually come from an API or more complex data source
    // These are placeholder values that change based on the selected period and type
    
    if (revenueType === 'closing') {
      if (period === 'monthly') {
        return [
          { id: 1, name: 'สมชาย วงศ์สุข', current: 420000, target: 600000, percentage: 70 },
          { id: 2, name: 'วิภาดา มานะ', current: 380000, target: 500000, percentage: 76 },
          { id: 3, name: 'ธนพล รุ่งเรือง', current: 320000, target: 450000, percentage: 71 },
          { id: 4, name: 'นภัสวรรณ ใจดี', current: 260000, target: 400000, percentage: 65 },
          { id: 5, name: 'อนุชา พงศ์ธร', current: 220000, target: 350000, percentage: 63 },
        ];
      } else if (period === 'quarterly') {
        return [
          { id: 1, name: 'สมชาย วงศ์สุข', current: 1250000, target: 1800000, percentage: 69 },
          { id: 2, name: 'วิภาดา มานะ', current: 1100000, target: 1500000, percentage: 73 },
          { id: 3, name: 'ธนพล รุ่งเรือง', current: 950000, target: 1350000, percentage: 70 },
          { id: 4, name: 'นภัสวรรณ ใจดี', current: 780000, target: 1200000, percentage: 65 },
          { id: 5, name: 'อนุชา พงศ์ธร', current: 650000, target: 1050000, percentage: 62 },
        ];
      } else { // annually
        return [
          { id: 1, name: 'สมชาย วงศ์สุข', current: 4800000, target: 7200000, percentage: 67 },
          { id: 2, name: 'วิภาดา มานะ', current: 4200000, target: 6000000, percentage: 70 },
          { id: 3, name: 'ธนพล รุ่งเรือง', current: 3600000, target: 5400000, percentage: 67 },
          { id: 4, name: 'นภัสวรรณ ใจดี', current: 3000000, target: 4800000, percentage: 63 },
          { id: 5, name: 'อนุชา พงศ์ธร', current: 2500000, target: 4200000, percentage: 60 },
        ];
      }
    } else { // actual
      if (period === 'monthly') {
        return [
          { id: 1, name: 'สมชาย วงศ์สุข', current: 380000, target: 600000, percentage: 63 },
          { id: 2, name: 'วิภาดา มานะ', current: 340000, target: 500000, percentage: 68 },
          { id: 3, name: 'ธนพล รุ่งเรือง', current: 290000, target: 450000, percentage: 64 },
          { id: 4, name: 'นภัสวรรณ ใจดี', current: 230000, target: 400000, percentage: 58 },
          { id: 5, name: 'อนุชา พงศ์ธร', current: 190000, target: 350000, percentage: 54 },
        ];
      } else if (period === 'quarterly') {
        return [
          { id: 1, name: 'สมชาย วงศ์สุข', current: 1120000, target: 1800000, percentage: 62 },
          { id: 2, name: 'วิภาดา มานะ', current: 980000, target: 1500000, percentage: 65 },
          { id: 3, name: 'ธนพล รุ่งเรือง', current: 860000, target: 1350000, percentage: 64 },
          { id: 4, name: 'นภัสวรรณ ใจดี', current: 680000, target: 1200000, percentage: 57 },
          { id: 5, name: 'อนุชา พงศ์ธร', current: 580000, target: 1050000, percentage: 55 },
        ];
      } else { // annually
        return [
          { id: 1, name: 'สมชาย วงศ์สุข', current: 4300000, target: 7200000, percentage: 60 },
          { id: 2, name: 'วิภาดา มานะ', current: 3800000, target: 6000000, percentage: 63 },
          { id: 3, name: 'ธนพล รุ่งเรือง', current: 3200000, target: 5400000, percentage: 59 },
          { id: 4, name: 'นภัสวรรณ ใจดี', current: 2700000, target: 4800000, percentage: 56 },
          { id: 5, name: 'อนุชา พงศ์ธร', current: 2200000, target: 4200000, percentage: 52 },
        ];
      }
    }
  };
  
  const revenueData = getRevenueData();
  
  // Calculate team total
  const teamTotal = {
    current: revenueData.reduce((sum, member) => sum + member.current, 0),
    target: revenueData.reduce((sum, member) => sum + member.target, 0),
    percentage: Math.round((revenueData.reduce((sum, member) => sum + member.current, 0) / 
                           revenueData.reduce((sum, member) => sum + member.target, 0)) * 100)
  };

  return (
    <div className="mb-0">
      <Card className="data-card">
        <CardHeader className="relative pb-2">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Team Revenue :</h3>
            <RevenueToggleButtons 
              period={period} 
              setPeriod={setPeriod} 
              revenueType={revenueType} 
              setRevenueType={setRevenueType} 
            />
          </div>
        </CardHeader>
        <CardContent>
          {/* Team Total */}
          <div className="mb-6 pb-4 border-b">
            <TeamRevenue 
              title="Team Total :" 
              name=""
              current={teamTotal.current} 
              target={teamTotal.target} 
              percentage={teamTotal.percentage} 
              isTotal={true}
            />
          </div>
          
          {/* Individual Team Members */}
          <div className="space-y-4">
            {revenueData.map(member => (
              <TeamRevenue 
                key={member.id}
                title=""
                name={member.name}
                current={member.current} 
                target={member.target} 
                percentage={member.percentage}
                isTotal={false} 
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default TeamRevenueSection; 