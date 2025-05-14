import React from 'react';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { FileImage, FileText, Paperclip, Building } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

type InitialInterestProps = {
  projectInterest?: string;
  listingCode?: string;
  listingType?: string;
  listingName?: string;
  propertyType?: string;
  agentRemark?: string;
  adminRemark?: string;
  attachments?: { type: string; url: string; name: string }[];
};

const InitialInterestSection = ({ 
  projectInterest, 
  listingCode, 
  listingType, 
  listingName, 
  propertyType,
  agentRemark,
  adminRemark,
  attachments = []
}: InitialInterestProps) => {
  return (
    <AccordionItem value="initial-interest">
      <AccordionTrigger className="text-base font-medium py-4 flex items-center">
        <div className="flex items-center">
          <Building className="mr-2 h-4 w-4" />
          Property Information
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <Card className="border-0 shadow-none">
          <CardContent className="pt-4">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Project */}
                <div className="space-y-1">
                  <label className="text-sm font-medium text-muted-foreground">Project</label>
                  <p className="text-sm">{projectInterest || 'N/A'}</p>
                </div>
                
                {/* Listing Code */}
                <div className="space-y-1">
                  <label className="text-sm font-medium text-muted-foreground">Listing Code</label>
                  <p className="text-sm">{listingCode || 'N/A'}</p>
                </div>
                
                {/* Listing Type */}
                <div className="space-y-1">
                  <label className="text-sm font-medium text-muted-foreground">Listing Type</label>
                  <p className="text-sm">{listingType || 'N/A'}</p>
                </div>
                
                {/* Listing Name */}
                <div className="space-y-1">
                  <label className="text-sm font-medium text-muted-foreground">Listing Name</label>
                  <p className="text-sm">{listingName || 'N/A'}</p>
                </div>
                
                {/* Property Type */}
                <div className="space-y-1">
                  <label className="text-sm font-medium text-muted-foreground">Property Type</label>
                  <p className="text-sm">{propertyType || 'N/A'}</p>
                </div>
              </div>

              {(agentRemark || adminRemark) && <Separator className="my-4" />}
              
              {/* Remarks */}
              <div className="space-y-4">
                {/* Agent Remark */}
                {agentRemark && (
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-muted-foreground">Agent Remark</label>
                    <p className="text-sm">{agentRemark}</p>
                  </div>
                )}
                
                {/* Admin Remark */}
                {adminRemark && (
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-muted-foreground">Admin Remark</label>
                    <p className="text-sm">{adminRemark}</p>
                  </div>
                )}
              </div>
              
              {/* Attachments */}
              {attachments && attachments.length > 0 && (
                <>
                  <Separator className="my-4" />
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-muted-foreground">Attachments</label>
                    <div className="flex flex-col gap-2 mt-1">
                      {attachments.map((file, index) => (
                        <a 
                          href={file.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          key={index}
                          className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 hover:underline"
                        >
                          {file.type === 'image' && <FileImage className="h-4 w-4" />}
                          {file.type === 'document' && <FileText className="h-4 w-4" />}
                          {file.type === 'other' && <Paperclip className="h-4 w-4" />}
                          {file.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </AccordionContent>
    </AccordionItem>
  );
};

export default InitialInterestSection;
