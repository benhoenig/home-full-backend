import React, { useState, useRef } from 'react';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';
import { Drawer, DrawerContent, DrawerTitle } from '@/components/ui/drawer';
import { useIsMobile } from '@/hooks/use-mobile';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Achiever, NewSalesData } from '@/components/leaderboard/data';
import { Button } from "@/components/ui/button";
import { ClipboardList, ChevronDown, ChevronUp } from 'lucide-react';
import SalesProfileHeader from './SalesProfileHeader';
import ProbationTab from './ProbationTab';
import ProfileTab from './ProfileTab';
import StatsTab from './StatsTab';
import ReviewsTab from './ReviewsTab';
import LogTab from './LogTab';

type SalesProfileDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  salesData: Achiever | NewSalesData | null;
  type: 'leaderboard' | 'newSales';
  canEditComments?: boolean;
};

const SalesProfileDrawer: React.FC<SalesProfileDrawerProps> = ({
  isOpen,
  onClose,
  salesData,
  type,
  canEditComments = false
}) => {
  const isMobile = useIsMobile();
  const [showLog, setShowLog] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);

  // Simple toggle function for the header
  const toggleHeader = () => {
    setHeaderVisible(!headerVisible);
  };

  if (!salesData) return null;

  // Shared drawer/sheet content
  const profileHeader = (
    <div 
      className={`relative transition-all duration-300 ease-in-out overflow-hidden border-b ${
        headerVisible ? '' : 'max-h-[64px] min-h-[64px]'
      }`}
    >
      <div className={`${headerVisible ? '' : 'opacity-0 pointer-events-none'} transition-opacity duration-300`}>
        <SalesProfileHeader salesData={salesData} type={type} />
      </div>
      
      {/* Always visible header when collapsed */}
      <div className={`absolute top-0 left-0 right-0 h-[64px] bg-gradient-to-b from-muted/50 to-background px-6 flex items-center justify-between ${
        headerVisible ? 'opacity-0' : 'opacity-100'
      } transition-opacity duration-300`}>
        <div className="flex items-center">
          <span className="font-bold text-lg">{salesData.name}</span>
          <span className="ml-2 text-sm text-muted-foreground">{salesData.team}</span>
        </div>
        
        {/* Top buttons container - only visible when collapsed */}
        <div className={`${headerVisible ? 'opacity-0 pointer-events-none' : 'opacity-100'} transition-opacity duration-300`}>
          {/* These buttons are duplicated for layout purposes */}
        </div>
      </div>
      
      {/* Top right buttons - always visible */}
      <div className="absolute top-6 right-6 z-10 flex items-center gap-2">
        {/* Toggle button */}
        <Button 
          variant="ghost" 
          size="icon"
          className="h-8 w-8 rounded-full bg-background shadow-sm"
          onClick={toggleHeader}
          title={headerVisible ? "Collapse header" : "Expand header"}
          aria-label={headerVisible ? "Collapse header" : "Expand header"}
        >
          {headerVisible ? 
            <ChevronUp className="h-4 w-4" /> : 
            <ChevronDown className="h-4 w-4" />
          }
        </Button>
        
        {/* Log button */}
        <Button 
          variant="outline" 
          size="icon"
          className="h-8 w-8 rounded-full"
          onClick={() => setShowLog(!showLog)}
          title="Activity Log"
          aria-label="View activity log"
        >
          <ClipboardList className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );

  const tabsContent = (
    <div 
      ref={contentRef}
      className="flex-1 overflow-y-auto"
    >
      {showLog ? (
        <div className="px-6 pt-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold">Activity Log</h3>
            <Button variant="ghost" size="sm" onClick={() => setShowLog(false)}>
              Back to Profile
            </Button>
          </div>
          <LogTab salesData={salesData} />
        </div>
      ) : (
        <Tabs defaultValue={type === 'leaderboard' ? "profile" : "probation"} className="w-full">
          <div className="px-6 pt-4">
            <TabsList className="w-full grid grid-cols-4 mb-4">
              {type === 'newSales' && (
                <TabsTrigger value="probation">Probation</TabsTrigger>
              )}
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="stats">Stats</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
          </div>
          
          {/* Probation Tab - Only for New Sales */}
          {type === 'newSales' && (
            <TabsContent value="probation">
              <ProbationTab salesData={salesData as NewSalesData} canEditComments={canEditComments} />
            </TabsContent>
          )}
          
          {/* Profile Tab */}
          <TabsContent value="profile">
            <ProfileTab salesData={salesData} />
          </TabsContent>
          
          {/* Stats Tab */}
          <TabsContent value="stats">
            <StatsTab salesData={salesData} type={type} />
          </TabsContent>
          
          {/* Reviews Tab */}
          <TabsContent value="reviews">
            <ReviewsTab salesData={salesData} />
          </TabsContent>
        </Tabs>
      )}
    </div>
  );

  // Use Drawer for mobile and Sheet for desktop
  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={open => !open && onClose()}>
        <DrawerContent 
          className="max-h-[90vh] h-[90vh] p-0 bg-background flex flex-col"
        >
          <DrawerTitle className="sr-only">Sales Profile</DrawerTitle>
          <div className="h-full flex flex-col">
            {profileHeader}
            {tabsContent}
          </div>
        </DrawerContent>
      </Drawer>
    );
  }
  
  return (
    <Sheet open={isOpen} onOpenChange={open => !open && onClose()}>
      <SheetContent side="right" className="w-full sm:w-[90%] md:w-[50%] lg:w-[40%] xl:w-[35%] p-0 overflow-y-auto bg-background border-l border-border shadow-lg">
        <SheetTitle className="sr-only">Sales Profile</SheetTitle>
        <div className="h-full flex flex-col">
          {profileHeader}
          {tabsContent}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SalesProfileDrawer; 