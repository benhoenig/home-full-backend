
import React, { useState } from 'react';
import { AccordionItem } from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DetailTab, ActivityTab, MatchingTab, ClosingTab } from './tabs';
import { useTimelineItems } from '@/hooks/useTimelineItems';
import { FilterOption } from './tabs/comment/CommentFilter';

type DetailTabsProps = {
  // Detail Tab Props
  projectInterest?: string;
  budget?: number | string;
  phone?: string;
  email?: string;
  additionalPhone?: string;
  leadLineId?: string;
  gender?: string;
  nationality?: string;
  birthday?: string;
  occupation?: string;
  hobbyInterest?: string;
  estimateIncome?: string;
  listingCode?: string;
  listingType?: string;
  listingName?: string;
  propertyType?: string;
  agentRemark?: string;
  adminRemark?: string;
  attachments?: {
    type: string;
    url: string;
    name: string;
  }[];
  timelineProps?: ReturnType<typeof useTimelineItems>;
  onUpdateContactInfo?: (data: any) => void;
};

const DetailTabsSection = ({
  // Destructure all props
  projectInterest,
  budget: initialBudget,
  phone,
  email,
  additionalPhone,
  leadLineId,
  gender,
  nationality,
  birthday,
  occupation,
  hobbyInterest,
  estimateIncome,
  listingCode,
  listingType,
  listingName,
  propertyType,
  agentRemark,
  adminRemark,
  attachments,
  timelineProps,
  onUpdateContactInfo
}: DetailTabsProps) => {
  // State for Detail tab
  const [rapport, setRapport] = useState([80]); // Default value of 80%
  const [budget, setBudget] = useState(initialBudget || '10,000,000');
  const [schedule, setSchedule] = useState('');
  const [painPoint, setPainPoint] = useState('');

  // Use the provided timelineProps or create a new one if not provided
  const timelineData = timelineProps || useTimelineItems();
  
  // Event handlers
  const handleRapportChange = (value: number[]) => setRapport(value);
  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => setBudget(e.target.value);
  const handleScheduleChange = (e: React.ChangeEvent<HTMLInputElement>) => setSchedule(e.target.value);
  const handlePainPointChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setPainPoint(e.target.value);

  return (
    <AccordionItem value="details-tabs" className="border-b">
      <div className="py-3">
        <Tabs defaultValue="details">
          <TabsList className="w-full grid grid-cols-4 py-0 my-0 bg-slate-50">
            <TabsTrigger value="details" className="bg-inherit">Details</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="matching">Matching</TabsTrigger>
            <TabsTrigger value="closing">Closing</TabsTrigger>
          </TabsList>
          
          {/* Details Tab */}
          <TabsContent value="details" className="pt-4 space-y-4 py-0">
            <DetailTab 
              rapport={rapport} 
              budget={budget} 
              schedule={schedule} 
              painPoint={painPoint} 
              projectInterest={projectInterest} 
              listingCode={listingCode} 
              listingType={listingType} 
              listingName={listingName} 
              propertyType={propertyType} 
              agentRemark={agentRemark} 
              adminRemark={adminRemark} 
              attachments={attachments} 
              phone={phone} 
              email={email} 
              additionalPhone={additionalPhone} 
              leadLineId={leadLineId} 
              gender={gender} 
              nationality={nationality} 
              birthday={birthday} 
              occupation={occupation} 
              hobbyInterest={hobbyInterest} 
              estimateIncome={estimateIncome} 
              onUpdateContactInfo={onUpdateContactInfo} 
              onRapportChange={handleRapportChange} 
              onBudgetChange={handleBudgetChange} 
              onScheduleChange={handleScheduleChange} 
              onPainPointChange={handlePainPointChange} 
            />
          </TabsContent>
          
          {/* Activity Tab */}
          <TabsContent value="activity" className="pt-4">
            <ActivityTab {...timelineData} />
          </TabsContent>
          
          {/* Matching Tab */}
          <TabsContent value="matching">
            <MatchingTab />
          </TabsContent>
          
          {/* Closing Tab */}
          <TabsContent value="closing">
            <ClosingTab />
          </TabsContent>
        </Tabs>
      </div>
    </AccordionItem>
  );
};

export default DetailTabsSection;
