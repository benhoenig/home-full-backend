import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import LeadManagerSection from '@/components/dashboard/LeadManagerSection';
import LeadSubmissionModal from '@/components/dashboard/LeadSubmissionModal';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const LeadManager: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <DashboardLayout 
      title="Lead Manager"
      headerControls={
        <Button 
          className="bg-primary text-white hover:bg-primary/90"
          onClick={handleOpenModal}
        >
          <Plus className="mr-2 h-4 w-4" />
          Lead Submission Form
        </Button>
      }
    >
      <LeadManagerSection />
      <LeadSubmissionModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </DashboardLayout>
  );
};

export default LeadManager; 