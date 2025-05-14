import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import ClosingDetailsSection from './ClosingDetailsSection';
import AgreementSection from './AgreementSection';
import TransferSection from './TransferSection';
import { ClosingFormValues } from './types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { DollarSign, FileText, ArrowUpRight } from 'lucide-react';

const ClosingTab = () => {
  const [isWin, setIsWin] = useState(false);
  const [linkedUnit, setLinkedUnit] = useState("Unit #1234"); // This would come from tagged listing in activity
  
  const form = useForm<ClosingFormValues>({
    defaultValues: {
      reserveAmount: "",
      closingDate: "",
      depositAmount: "",
      agreementSigningDate: "",
      closingPrice: "",
      commission: "3",
      closingUnit: linkedUnit,
      hasLoan: false,
      transferDate: "",
      banks: [],
      bankLoan: ""
    }
  });

  const handleToggleWin = (checked: boolean) => {
    setIsWin(checked);
    // In a real implementation, this would update the pipeline stage to Win (Transfer)
    if (checked) {
      console.log("Updating pipeline stage to Win (Transfer)");
    }
  };

  const handleGenerateAgreement = () => {
    console.log("Opening agreement generator modal");
    // This would open the agreement generator modal
  };

  return (
    <div className="space-y-6">
      {/* Closing Details Card */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center text-base font-medium">
            <DollarSign className="mr-2 h-4 w-4" />
            Closing Details
          </CardTitle>
          <CardDescription>Enter financial and closing information</CardDescription>
        </CardHeader>
        <CardContent>
          <ClosingDetailsSection form={form} linkedUnit={linkedUnit} />
        </CardContent>
      </Card>
      
      {/* Agreement Card */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center text-base font-medium">
            <FileText className="mr-2 h-4 w-4" />
            Agreement Generation
          </CardTitle>
          <CardDescription>Generate and manage agreements</CardDescription>
        </CardHeader>
        <CardContent>
          <AgreementSection onGenerateAgreement={handleGenerateAgreement} />
        </CardContent>
      </Card>
      
      {/* Transfer Card */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center text-base font-medium">
            <ArrowUpRight className="mr-2 h-4 w-4" />
            Transfer Status
          </CardTitle>
          <CardDescription>Update property transfer status</CardDescription>
        </CardHeader>
        <CardContent>
          <TransferSection 
            form={form} 
            isWin={isWin} 
            onToggleWin={handleToggleWin} 
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ClosingTab;
