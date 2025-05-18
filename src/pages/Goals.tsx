import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

const goalCategories = [
  { key: 'personal', label: 'Personal' },
  { key: 'team', label: 'Team' },
  { key: 'mentoring', label: 'Mentoring' },
];

const Goals = () => {
  const [goals, setGoals] = useState({
    personal: { goal: '', target: '' },
    team: { goal: '', target: '' },
    mentoring: { goal: '', target: '' },
  });

  const handleChange = (category, field, value) => {
    setGoals((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value,
      },
    }));
  };

  return (
    <DashboardLayout title="Goals & Target">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {goalCategories.map(({ key, label }) => (
          <Card className="data-card" key={key}>
            <CardHeader>
              <CardTitle>{label} Goals & Target</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor={`${key}-goal`}>Goal</label>
                <Input
                  id={`${key}-goal`}
                  placeholder={`Enter ${label.toLowerCase()} goal`}
                  value={goals[key].goal}
                  onChange={e => handleChange(key, 'goal', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor={`${key}-target`}>Target</label>
                <Input
                  id={`${key}-target`}
                  placeholder={`Enter ${label.toLowerCase()} target`}
                  value={goals[key].target}
                  onChange={e => handleChange(key, 'target', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default Goals; 