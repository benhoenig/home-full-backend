import React from 'react';
import { Accordion } from '@/components/ui/accordion';
import ContactInfoSection from '../ContactInfoSection';
import InitialInterestSection from '../InitialInterestSection';
import RapportSection from './detail/RapportSection';
import MainInfoSection from './detail/MainInfoSection';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Users, Building, Info } from 'lucide-react';

type DetailTabProps = {
  rapport: number[];
  budget: string | number;
  schedule: string;
  painPoint: string;
  projectInterest?: string;
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
  onUpdateContactInfo?: (data: any) => void;
  onRapportChange: (value: number[]) => void;
  onBudgetChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onScheduleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPainPointChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

const DetailTab = ({
  rapport,
  budget,
  schedule,
  painPoint,
  projectInterest,
  listingCode,
  listingType,
  listingName,
  propertyType,
  agentRemark,
  adminRemark,
  attachments,
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
  onUpdateContactInfo,
  onRapportChange,
  onBudgetChange,
  onScheduleChange,
  onPainPointChange
}: DetailTabProps) => {
  return (
    <div className="space-y-6">
      {/* Rapport Slider Card */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center text-base font-medium">
            <Info className="mr-2 h-4 w-4" />
            Rapport & Budget
          </CardTitle>
          <CardDescription>Lead rapport level and budget information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <RapportSection rapport={rapport} onRapportChange={onRapportChange} />
          <MainInfoSection 
            budget={budget} 
            schedule={schedule} 
            painPoint={painPoint} 
            onBudgetChange={onBudgetChange} 
            onScheduleChange={onScheduleChange} 
            onPainPointChange={onPainPointChange} 
          />
        </CardContent>
      </Card>
      
      {/* Contact Information & Initial Interest */}
      <div className="space-y-6">
        <Accordion type="single" collapsible className="w-full">
          <ContactInfoSection 
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
            onUpdate={onUpdateContactInfo} 
          />
          <InitialInterestSection 
            projectInterest={projectInterest} 
            listingCode={listingCode} 
            listingType={listingType} 
            listingName={listingName} 
            propertyType={propertyType} 
            agentRemark={agentRemark} 
            adminRemark={adminRemark} 
            attachments={attachments} 
          />
        </Accordion>
      </div>
    </div>
  );
};

export default DetailTab;