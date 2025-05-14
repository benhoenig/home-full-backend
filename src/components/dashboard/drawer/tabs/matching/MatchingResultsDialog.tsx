
import React, { useState } from 'react';
import { Settings } from 'lucide-react';
import { DialogHeader, DialogTitle, DialogContent, DialogDescription } from '@/components/ui/dialog';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MatchingResult } from './MatchingTypes';
import { useIsMobile } from '@/hooks/use-mobile';

interface MatchingResultsDialogProps {
  matchCount: number;
  matchingResults: MatchingResult[];
}

const MatchingResultsDialog: React.FC<MatchingResultsDialogProps> = ({ 
  matchCount, 
  matchingResults 
}) => {
  const [isColumnCustomizerOpen, setIsColumnCustomizerOpen] = useState(false);
  const isMobile = useIsMobile();
  
  return (
    <DialogContent className={`${isMobile ? 'w-[95vw] max-w-[95vw] h-[95vh] max-h-[95vh] p-0 rounded-lg' : 'w-[90vw] max-w-[90vw] h-[90vh] max-h-[90vh] p-0'}`}>
      <div className="flex flex-col h-full overflow-hidden">
        <DialogHeader className="p-3 sm:p-4 border-b">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <DialogTitle className="text-base sm:text-lg">Matching Properties ({matchCount})</DialogTitle>
              <DialogDescription className="text-xs sm:text-sm text-muted-foreground">
                Displaying all properties that match your criteria
              </DialogDescription>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setIsColumnCustomizerOpen(true)} 
              className="self-start sm:self-auto whitespace-nowrap"
            >
              <Settings className="h-4 w-4 mr-1 sm:mr-2" />
              <span className="text-xs sm:text-sm">Customize Columns</span>
            </Button>
          </div>
        </DialogHeader>
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="w-full min-w-max p-2 sm:p-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="sticky top-0 whitespace-nowrap bg-background">Property</TableHead>
                    <TableHead className="sticky top-0 whitespace-nowrap bg-background">Type</TableHead>
                    <TableHead className="sticky top-0 whitespace-nowrap bg-background">Location</TableHead>
                    <TableHead className="sticky top-0 whitespace-nowrap bg-background">Price</TableHead>
                    <TableHead className="sticky top-0 whitespace-nowrap bg-background">Beds</TableHead>
                    <TableHead className="sticky top-0 whitespace-nowrap bg-background">Match</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {matchingResults.map((result) => (
                    <TableRow key={result.id}>
                      <TableCell className="whitespace-nowrap">{result.name}</TableCell>
                      <TableCell className="whitespace-nowrap">{result.type}</TableCell>
                      <TableCell className="whitespace-nowrap">{result.location}</TableCell>
                      <TableCell className="whitespace-nowrap">฿{result.price}</TableCell>
                      <TableCell className="whitespace-nowrap">{result.bedrooms}</TableCell>
                      <TableCell className="whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div className="bg-primary/10 text-primary text-xs font-medium px-2 py-0.5 rounded-full">
                            {result.matchPercentage}%
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </div>
    </DialogContent>
  );
};

export default MatchingResultsDialog;
