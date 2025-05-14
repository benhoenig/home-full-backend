import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const LeadSubmissionForm: React.FC = () => {
  return (
    <DashboardLayout title="Lead Submission Form">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Lead Submission Form</CardTitle>
            <CardDescription>
              Submit a new lead by filling out the form below
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="py-10 text-center">
              <p className="text-muted-foreground">
                Form content will be implemented in a future update.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default LeadSubmissionForm; 