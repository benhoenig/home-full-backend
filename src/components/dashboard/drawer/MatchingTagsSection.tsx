
import React from 'react';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ChevronDown } from 'lucide-react';

const MatchingTagsSection = () => {
  return (
    <AccordionItem value="matching-tags">
      <AccordionTrigger className="text-lg font-medium py-3">
        Matching Tags :
      </AccordionTrigger>
      <AccordionContent>
        <div className="relative">
          <div className="flex items-center border rounded-md px-4 py-2">
            <span className="flex-grow">Select Tags</span>
            <ChevronDown className="h-4 w-4" />
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default MatchingTagsSection;
