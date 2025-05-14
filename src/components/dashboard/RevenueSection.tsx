
import React, { useState } from 'react';
import Revenue from '@/components/dashboard/Revenue';
import RevenueToggleButtons from '@/components/dashboard/RevenueToggleButtons';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

export type RevenuePeriod = 'monthly' | 'quarterly' | 'annually';
export type RevenueType = 'closing' | 'actual';

export function RevenueSection() {
  const [period, setPeriod] = useState<RevenuePeriod>('monthly');
  const [revenueType, setRevenueType] = useState<RevenueType>('closing');
  
  // Revenue data based on period and type
  const getRevenueData = () => {
    // This would usually come from an API or more complex data source
    // These are placeholder values that change based on the selected period and type
    if (revenueType === 'closing') {
      if (period === 'monthly') {
        return {
          myCurrent: 220000,
          myTarget: 400000,
          myPercentage: 55,
          teamCurrent: 1600000,
          teamTarget: 2000000,
          teamPercentage: 80
        };
      } else if (period === 'quarterly') {
        return {
          myCurrent: 650000,
          myTarget: 1200000,
          myPercentage: 54,
          teamCurrent: 4200000,
          teamTarget: 6000000,
          teamPercentage: 70
        };
      } else { // annually
        return {
          myCurrent: 2500000,
          myTarget: 4800000,
          myPercentage: 52,
          teamCurrent: 16000000,
          teamTarget: 24000000,
          teamPercentage: 67
        };
      }
    } else { // actual
      if (period === 'monthly') {
        return {
          myCurrent: 180000,
          myTarget: 400000,
          myPercentage: 45,
          teamCurrent: 1400000,
          teamTarget: 2000000,
          teamPercentage: 70
        };
      } else if (period === 'quarterly') {
        return {
          myCurrent: 540000,
          myTarget: 1200000,
          myPercentage: 45,
          teamCurrent: 3800000,
          teamTarget: 6000000,
          teamPercentage: 63
        };
      } else { // annually
        return {
          myCurrent: 2100000,
          myTarget: 4800000,
          myPercentage: 44,
          teamCurrent: 14500000,
          teamTarget: 24000000,
          teamPercentage: 60
        };
      }
    }
  };
  
  const revenueData = getRevenueData();

  return (
    <div className="mb-0">
      <Card>
        <CardHeader className="relative pb-2">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Revenue :</h3>
            <RevenueToggleButtons 
              period={period} 
              setPeriod={setPeriod} 
              revenueType={revenueType} 
              setRevenueType={setRevenueType} 
            />
          </div>
        </CardHeader>
        <CardContent>
          <Revenue 
            title="My Revenue :" 
            current={revenueData.myCurrent} 
            target={revenueData.myTarget} 
            percentage={revenueData.myPercentage} 
          />
          <Revenue 
            title="Team Revenue :" 
            current={revenueData.teamCurrent} 
            target={revenueData.teamTarget} 
            percentage={revenueData.teamPercentage} 
          />
        </CardContent>
      </Card>
    </div>
  );
}

export default RevenueSection;
