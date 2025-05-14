import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { FileIcon } from 'lucide-react';

type AgreementSectionProps = {
  onGenerateAgreement: () => void;
};

const AgreementSection = ({ onGenerateAgreement }: AgreementSectionProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-4">
        {/* File Attachment */}
        <div className="space-y-2">
          <Label>Agreement Documents</Label>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="w-full">
              <FileIcon className="mr-2 h-4 w-4" />
              Attach Files
            </Button>
          </div>
        </div>
        
        {/* Agreement Generator Button */}
        <div className="space-y-2">
          <Button className="w-full" onClick={onGenerateAgreement}>
            Generate Agreement
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AgreementSection;
