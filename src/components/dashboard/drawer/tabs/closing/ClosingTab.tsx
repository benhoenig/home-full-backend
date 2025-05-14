
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import ClosingDetailsSection from './ClosingDetailsSection';
import AgreementSection from './AgreementSection';
import TransferSection from './TransferSection';
import { ClosingFormValues } from './types';

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
    <div className="pt-4 space-y-6">
      {/* Closing Section */}
      <ClosingDetailsSection form={form} linkedUnit={linkedUnit} />
      
      {/* Agreement Section */}
      <AgreementSection onGenerateAgreement={handleGenerateAgreement} />
      
      {/* Transfer Section */}
      <TransferSection 
        form={form} 
        isWin={isWin} 
        onToggleWin={handleToggleWin} 
      />
    </div>
  );
};

export default ClosingTab;
