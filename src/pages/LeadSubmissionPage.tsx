import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription 
} from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { LeadSubmissionModal } from '@/components/dashboard/LeadSubmissionModal';

const LeadSubmissionPage: React.FC = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(true);
  
  // Close modal and navigate back when closed
  const handleClose = () => {
    // Redirect to lead manager or another appropriate page
    navigate('/lead-manager');
  };

  return (
    <DashboardLayout 
      title="Lead Submission Form"
      headerControls={
        <Button 
          variant="outline"
          onClick={() => navigate('/lead-manager')}
        >
          Back to Lead Manager
        </Button>
      }
    >
      <div className="pb-6">
        <Card className="mx-auto max-w-6xl">
          <CardHeader className="pb-3">
            <CardTitle className="text-2xl font-bold">Submit New Lead</CardTitle>
            <CardDescription>Fill in the form below to submit a new lead into the system</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Using the modal as a standalone form */}
            <LeadSubmissionModal isOpen={true} onClose={handleClose} standalone={true} />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default LeadSubmissionPage; 