
import React from 'react';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Textarea } from '@/components/ui/textarea';

type OthersSectionProps = {
  budget?: number | string;
};

const OthersSection = ({ budget }: OthersSectionProps) => {
  return (
    <AccordionItem value="others">
      <AccordionTrigger className="text-lg font-medium py-3">
        Others :
      </AccordionTrigger>
      <AccordionContent>
        <div className="space-y-4">
          <div>
            <p className="text-sm mb-1">Rapport :</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-green-500 h-2.5 rounded-full w-4/5"></div>
            </div>
          </div>
          <div>
            <p className="text-sm mb-1">Budget :</p>
            <p className="text-xl font-medium">{budget || '10,000,000'}</p>
          </div>
          <div>
            <p className="text-sm mb-1">Schedule :</p>
            <p>To be determined</p>
          </div>
          <div>
            <p className="text-sm mb-1">Pain Point :</p>
            <p>None specified</p>
          </div>
          <div>
            <p className="text-sm mb-1">Remark :</p>
            <Textarea 
              className="w-full h-24"
              placeholder="Add remarks here..."
            />
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default OthersSection;
