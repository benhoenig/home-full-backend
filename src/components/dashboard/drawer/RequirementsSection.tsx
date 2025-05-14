
import React from 'react';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const RequirementsSection = () => {
  return (
    <AccordionItem value="requirements">
      <AccordionTrigger className="text-lg font-medium py-3">
        Requirement :
      </AccordionTrigger>
      <AccordionContent>
        <p>Client requirements will be listed here</p>
      </AccordionContent>
    </AccordionItem>
  );
};

export default RequirementsSection;
