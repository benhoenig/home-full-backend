
import React from 'react';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const MatchingDetailsSection = () => {
  return (
    <AccordionItem value="matching-details">
      <AccordionTrigger className="text-lg font-medium py-3">
        Other Matching Details
      </AccordionTrigger>
      <AccordionContent>
        <p>Additional matching details will be shown here</p>
      </AccordionContent>
    </AccordionItem>
  );
};

export default MatchingDetailsSection;
