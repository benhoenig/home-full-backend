
import React from 'react';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';
import { Drawer, DrawerContent, DrawerTitle } from '@/components/ui/drawer';
import { Accordion } from '@/components/ui/accordion';
import { useIsMobile } from '@/hooks/use-mobile';
import LeadHeader from './drawer/LeadHeader';
import LeadStatus from './drawer/LeadStatus';
import DetailTabsSection from './drawer/DetailTabsSection';
import { useTimelineItems } from '@/hooks/useTimelineItems';
import { toast } from "sonner";

type LeadDetailsDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  lead: Record<string, any> | null;
};

const LeadDetailsDrawer = ({
  isOpen,
  onClose,
  lead
}: LeadDetailsDrawerProps) => {
  const isMobile = useIsMobile();
  
  // We need to initialize timelineProps regardless of lead being null
  // to ensure hooks are always called in the same order
  const timelineProps = useTimelineItems(lead?.timeline || []);
  
  // Guard clause after hooks are called
  if (!lead) return null;
  
  const handleUpdateLeadInfo = (section: string, data: any) => {
    // In a real application, this would update the lead data in the database
    console.log('Updating lead info for section:', section, data);
    // For now, we'll just log the change
  };
  
  const handleStatusChange = (status: string) => {
    console.log('Status changed to:', status);
    // In a real app, this would update the lead status in the database
    handleUpdateLeadInfo('status', {
      status
    });
  };
  
  const handlePipelineStageChange = (stage: string) => {
    console.log('Pipeline stage changed to:', stage);
    // In a real app, this would update the lead pipeline stage in the database
    handleUpdateLeadInfo('pipelineStage', {
      pipelineStage: stage
    });
  };

  const handlePotentialChange = (potential: string) => {
    console.log('Potential changed to:', potential);
    // In a real app, this would update the lead potential in the database
    handleUpdateLeadInfo('potential', {
      potential
    });
    toast.success(`Lead potential updated to ${potential}`);
  };

  // Sample attachments - in a real app, these would come from the lead data
  const sampleAttachments = lead.attachments || [{
    type: 'image',
    url: '#',
    name: 'Property photo.jpg'
  }, {
    type: 'document',
    url: '#',
    name: 'Requirements.pdf'
  }];

  // Content of the drawer/sheet that's shared between mobile and desktop
  const drawerContent = (
    <div className="h-full flex flex-col">
      <LeadHeader 
        name={lead.name} 
        phone={lead.phone} 
        budget={lead.budget} 
        potential={lead.potential || 'C'} 
        onClose={onClose} 
        onPotentialChange={handlePotentialChange}
      />

      <div className="flex-1 overflow-y-auto p-4 bg-white px-[25px]">
        {/* Lead Status and Pipeline Stage */}
        <LeadStatus status={lead.status} pipelineStage={lead.pipelineStage} onStatusChange={handleStatusChange} onPipelineStageChange={handlePipelineStageChange} />

        {/* Accordion sections - ContactInfoSection and InitialInterestSection are now moved to DetailTabsSection */}
        <div className="space-y-4">
          <Accordion type="single" collapsible className="w-full">
            <DetailTabsSection 
              projectInterest={lead.projectInterest} 
              budget={lead.budget} 
              phone={lead.phone} 
              email={lead.email} 
              additionalPhone={lead.additionalPhone} 
              leadLineId={lead.leadLineId} 
              gender={lead.gender} 
              nationality={lead.nationality} 
              birthday={lead.birthday} 
              occupation={lead.occupation} 
              hobbyInterest={lead.hobbyInterest} 
              estimateIncome={lead.estimateIncome} 
              listingCode={lead.listingCode} 
              listingType={lead.listingTypeInterest} 
              listingName={lead.listingNameInterest} 
              propertyType={lead.propertyTypeInterest} 
              agentRemark={lead.agentRemark} 
              adminRemark={lead.adminRemark} 
              attachments={sampleAttachments} 
              timelineProps={timelineProps}
              onUpdateContactInfo={data => handleUpdateLeadInfo('contactInfo', data)} 
            />
          </Accordion>
        </div>
      </div>
    </div>
  );

  // Use Drawer for mobile and Sheet for desktop
  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={open => !open && onClose()}>
        <DrawerContent className="max-h-[90vh] h-[90vh] p-0 bg-background flex flex-col">
          <DrawerTitle className="sr-only">Lead Details</DrawerTitle>
          {drawerContent}
        </DrawerContent>
      </Drawer>
    );
  }
  return (
    <Sheet open={isOpen} onOpenChange={open => !open && onClose()}>
      <SheetContent side="right" className="w-full sm:w-[90%] md:w-[50%] lg:w-[40%] xl:w-[35%] p-0 overflow-y-auto bg-background border-l border-border shadow-lg">
        <SheetTitle className="sr-only">Lead Details</SheetTitle>
        {drawerContent}
      </SheetContent>
    </Sheet>
  );
};

export default LeadDetailsDrawer;
