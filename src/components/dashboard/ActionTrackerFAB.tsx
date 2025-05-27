import React, { useState } from 'react';
import { PlusIcon, TargetIcon, XIcon, ClipboardCheckIcon, CheckIcon, InfoIcon, CalendarIcon, HistoryIcon, ActivityIcon, HomeIcon, UserIcon, ShoppingCartIcon, MegaphoneIcon, ChevronUp, HeartIcon, Star, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { Drawer, DrawerContent, DrawerTrigger, DrawerTitle } from '@/components/ui/drawer';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import ProgressBar from './drawer/SalesProgressBar';
import { useIsMobile } from '@/hooks/use-mobile';
import AddListingModal from './listings-table/AddListingModal';
import { useListingsTableData, Listing } from '@/hooks/useListingsTableData';
import ListingDetailsDrawer from './ListingDetailsDrawer';

// Define action metadata
export type ActionType = {
  id: string;
  name: string;
  points: number;
  description: string;
  category: 'product' | 'owner' | 'buyer' | 'marketing';
  isAutomated: boolean;
  isFavorite?: boolean; // Track if action is favorited
};

// Action categories and details organized by group
const actionTypes: ActionType[] = [
  // Product
  { id: 'survey', name: 'Survey', points: 20, description: 'Property survey completed', category: 'product', isAutomated: true },
  
  // Owner
  { id: 'newList', name: 'New List', points: 5, description: 'New property listing', category: 'owner', isAutomated: true },
  { id: 'consult2', name: 'Consult', points: 15, description: 'Consultation with owner', category: 'owner', isAutomated: true },
  { id: 'consultRent', name: 'Consult (Rent Case)', points: 10, description: 'Rental consultation', category: 'owner', isAutomated: true },
  { id: 'ownerVisit', name: 'Owner Visit', points: 15, description: 'Property owner visit', category: 'owner', isAutomated: true },
  
  // Buyer
  { id: 'clientData', name: 'Client Data', points: 10, description: 'Client data completed', category: 'buyer', isAutomated: true },
  { id: 'following', name: 'Following', points: 2.5, description: 'Following up with client', category: 'buyer', isAutomated: true },
  { id: 'appointment', name: 'Appointment', points: 20, description: 'Client appointment scheduled', category: 'buyer', isAutomated: true },
  { id: 'showing', name: 'Showing', points: 30, description: 'Property showing completed', category: 'buyer', isAutomated: true },
  { id: 'negotiate', name: 'Negotiate', points: 1, description: 'Price negotiation', category: 'buyer', isAutomated: true },
  { id: 'closedRent', name: 'Closed (Rent Case)', points: 60, description: 'Rental case closed', category: 'buyer', isAutomated: true },
  { id: 'closedSell5M', name: 'Closed (Sell <5M)', points: 180, description: 'Sale closed under 5M', category: 'buyer', isAutomated: true },
  { id: 'closedSell10M', name: 'Closed (Sell 5-10M)', points: 250, description: 'Sale closed between 5-10M', category: 'buyer', isAutomated: true },
  { id: 'closedSell10M+', name: 'Closed (Sell 10M+)', points: 350, description: 'Sale closed over 10M', category: 'buyer', isAutomated: true },
  { id: 'giftReview', name: 'Gift + Review', points: 50, description: 'Gift sent and review received', category: 'buyer', isAutomated: true },
  
  // Marketing
  { id: 'sign', name: 'Sign', points: 50, description: 'Property sign installed', category: 'marketing', isAutomated: false },
  { id: 'reel', name: 'Reel', points: 50, description: 'Social media reel created', category: 'marketing', isAutomated: false },
  { id: 'hometour', name: 'Hometour', points: 120, description: 'Home tour video created', category: 'marketing', isAutomated: false },
  { id: 'exclusive', name: 'Exclusive', points: 200, description: 'Exclusive listing agreement', category: 'marketing', isAutomated: false },
];

// Mock data for the currently logged actions
const mockLoggedActions = [
  { id: '1', actionTypeId: 'survey', date: '2023-06-15', notes: 'Completed survey for 123 Main St' },
  { id: '2', actionTypeId: 'newList', date: '2023-06-16', notes: 'Added new listing for 456 Oak Ave' },
  { id: '3', actionTypeId: 'ownerVisit', date: '2023-06-17', notes: 'Met with owner of 789 Pine Blvd' },
  { id: '4', actionTypeId: 'sign', date: '2023-06-18', notes: 'Installed sign at 123 Main St' },
];

type ActionTrackerFABProps = {
  // Optional callback when an action is logged
  onActionLogged?: (actionType: ActionType) => void;
  // Pass current user progress to display
  currentMonthPoints?: number;
  targetMonthPoints?: number;
};

const ActionTrackerFAB: React.FC<ActionTrackerFABProps> = ({ 
  onActionLogged,
  currentMonthPoints = 1250,
  targetMonthPoints = 3000
}) => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'log' | 'history'>('log');
  const [selectedCategory, setSelectedCategory] = useState<'product' | 'owner' | 'buyer' | 'marketing' | null>(null);
  
  // State for favorite actions
  const [favoriteActions, setFavoriteActions] = useState<string[]>([
    'appointment', 'newList', 'sign' // Default favorites
  ]);
  
  // Add state for AddListingModal
  const [isAddListingModalOpen, setIsAddListingModalOpen] = useState(false);
  // Add state to track which tab should be active in the modal
  const [activeModalTab, setActiveModalTab] = useState<string>('basic-info');
  
  // State for listing selection view
  const [isListingSelectionView, setIsListingSelectionView] = useState(false);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [selectedActionType, setSelectedActionType] = useState<ActionType | null>(null);
  const [listingSearchTerm, setListingSearchTerm] = useState('');
  
  // State for ListingDetailsDrawer
  const [isListingDetailsDrawerOpen, setIsListingDetailsDrawerOpen] = useState(false);
  const [listingDetailsDrawerActiveTab, setListingDetailsDrawerActiveTab] = useState<'details' | 'photo' | 'location' | 'aexclusive' | 'activity'>('details');
  
  // Move the hook call to the top level of the component
  const listingsData = useListingsTableData();
  
  // Calculate progress percentage
  const progressPercentage = Math.min(100, (currentMonthPoints / targetMonthPoints) * 100);
  const remainingPoints = targetMonthPoints - currentMonthPoints;
  
  // Calculate month timeline progress
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const daysPassed = today.getDate();
  const monthProgressPercentage = (daysPassed / daysInMonth) * 100;
  
  // Calculate if user is ahead or behind pace
  const expectedPoints = Math.round((daysPassed / daysInMonth) * targetMonthPoints);
  const pointsDifference = currentMonthPoints - expectedPoints;
  const isAheadOfPace = pointsDifference >= 0;
  
  // Function to select a category
  const selectCategory = (category: 'product' | 'owner' | 'buyer' | 'marketing') => {
    setSelectedCategory(category);
  };
  
  // Function to go back to categories
  const backToCategories = () => {
    setSelectedCategory(null);
  };
  
  // Function to toggle favorite status of an action
  const toggleFavorite = (actionId: string, event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent triggering the parent onClick
    
    setFavoriteActions(prev => {
      if (prev.includes(actionId)) {
        // Remove from favorites
        toast({
          title: "Removed from favorites",
          description: "Action removed from your favorites list",
        });
        return prev.filter(id => id !== actionId);
      } else {
        // Add to favorites
        toast({
          title: "Added to favorites",
          description: "Action added to your favorites list",
        });
        return [...prev, actionId];
      }
    });
  };
  
  // Function to handle listing submission from modal
  const handleSubmitListing = (data: any) => {
    console.log('New listing data:', data);
    setIsAddListingModalOpen(false);
    
    // Get the newList action
    const newListAction = actionTypes.find(action => action.id === 'newList');
    
    if (newListAction) {
      // Notify the user
      toast({
        title: "Action Logged",
        description: `${newListAction.name} (+${newListAction.points} points)`,
      });
      
      // Call the callback if provided
      if (onActionLogged) {
        onActionLogged(newListAction);
      }
    }
  };
  
  // Modified function to handle action clicks
  const handleActionClick = (action: ActionType) => {
    // Special case for 'newList' action - open the AddListingModal
    if (action.id === 'newList') {
      setActiveModalTab('basic-info');
      setIsAddListingModalOpen(true);
      setIsOpen(false); // Close the FAB panel
      return;
    }
    
    // Special case for 'consult2' action - show listing selection view
    if (action.id === 'consult2') {
      setSelectedActionType(action);
      setIsListingSelectionView(true);
      setSelectedListing(null); // Reset selected listing
      setListingSearchTerm(''); // Reset search term
      return;
    }
    
    // Special case for 'consultRent' action - show rental listing selection view
    if (action.id === 'consultRent') {
      setSelectedActionType(action);
      setIsListingSelectionView(true);
      setSelectedListing(null); // Reset selected listing
      setListingSearchTerm(''); // Reset search term
      return;
    }
    
    // Special case for 'ownerVisit' action - show listing selection for owner visit
    if (action.id === 'ownerVisit') {
      setSelectedActionType(action);
      setIsListingSelectionView(true);
      setSelectedListing(null); // Reset selected listing
      setListingSearchTerm(''); // Reset search term
      return;
    }
    
    // For all other actions, log them directly without confirmation
    console.log(`Logging action: ${action.name}`);
    
    // Notify the user
    toast({
      title: "Action Logged",
      description: `${action.name} (+${action.points} points)`,
    });
    
    // Call the callback if provided
    if (onActionLogged) {
      onActionLogged(action);
    }
    
    // Close the panel
    setIsOpen(false);
  };
  
  // New function to handle proceeding with the selected listing
  const handleProceedWithListing = () => {
    if (!selectedListing || !selectedActionType) return;
    
    // Different behavior based on action type
    if (selectedActionType.id === 'ownerVisit') {
      // For Owner Visit, open the ListingDetailsDrawer with activity tab
      setIsListingSelectionView(false);
      setIsOpen(false); // Close the FAB panel
      setListingDetailsDrawerActiveTab('activity');
      setIsListingDetailsDrawerOpen(true);
      
      // Log the action
      console.log(`Navigating to activity tab for Owner Visit on listing ${selectedListing.listingCode}`);
      
      // Notify the user with guidance
      toast({
        title: "Owner Visit Selected",
        description: `Please add a comment about your visit to ${selectedListing.listingName} with the Owner Visit tag`,
      });
      
      // Add a second toast with more detailed instructions after a short delay
      setTimeout(() => {
        toast({
          title: "Action Logging Instructions",
          description: "Use the comment box below the timeline to add details about your owner visit. Be sure to select the 'Owner Visit' tag.",
        });
      }, 1500);
      
      // Call the callback if provided
      if (onActionLogged) {
        onActionLogged(selectedActionType);
      }
    } else {
      // For other actions (like consult2, consultRent), open the edit modal
      setIsListingSelectionView(false);
      setIsOpen(false); // Close the FAB panel
      
      // Open the edit listing modal with the price tab
      setActiveModalTab('price');
      setIsAddListingModalOpen(true);
      
      // Log the action
      console.log(`Logging ${selectedActionType.name} action for listing ${selectedListing.listingCode}`);
      
      // Notify the user
      toast({
        title: "Listing Selected",
        description: `Editing ${selectedListing.listingName} (${selectedListing.listingCode})`,
      });
    }
  };
  
  // Function to go back from listing selection to categories
  const backFromListingSelection = () => {
    setIsListingSelectionView(false);
    setSelectedActionType(null);
    setSelectedListing(null);
  };
  
  // Helper function to get category icon
  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'product': return <HomeIcon className="h-5 w-5" />;
      case 'owner': return <UserIcon className="h-5 w-5" />;
      case 'buyer': return <ShoppingCartIcon className="h-5 w-5" />;
      case 'marketing': return <MegaphoneIcon className="h-5 w-5" />;
      default: return <ActivityIcon className="h-5 w-5" />;
    }
  };
  
  // Helper function to get category color
  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'product': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'owner': return 'bg-green-100 text-green-800 border-green-200';
      case 'buyer': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'marketing': return 'bg-rose-100 text-rose-800 border-rose-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Shared content for both mobile and desktop
  const actionTrackerContent = (
    <div className="flex flex-col h-full">
      {/* Header - fixed */}
      <div className="flex items-center justify-between border-b px-4 py-3">
        <div className="flex items-center">
          <TargetIcon className="h-5 w-5 text-primary mr-2" />
          <h3 className="text-lg font-semibold">Action Tracker</h3>
        </div>
        <Button 
          size="icon" 
          variant="ghost" 
          className="h-8 w-8 rounded-full"
          onClick={() => setIsOpen(false)}
        >
          <XIcon className="h-4 w-4" />
        </Button>
      </div>

      {/* Scrollable content area */}
      <div className="flex-1 overflow-y-auto">
        {/* Monthly Progress Section */}
        <div className="px-6 py-3 border-b">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium">Points Progress</span>
            <span className="text-sm font-semibold text-teal-600">
              {currentMonthPoints} / {targetMonthPoints} pts
            </span>
          </div>
          <ProgressBar 
            value={progressPercentage} 
            color="teal" 
            showLabels={true} 
            startLabel="0" 
            endLabel={`Target: ${targetMonthPoints} pts`}
          />
          
          {/* Month Timeline Progress */}
          <div className="mt-3 mb-1">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Month Timeline</span>
              <span className="text-sm font-medium text-slate-600">
                Day {daysPassed} of {daysInMonth}
              </span>
            </div>
            <ProgressBar 
              value={monthProgressPercentage} 
                color="rose" 
              showLabels={false}
            />
            
            {/* Pace Indicator */}
            <div className="flex justify-between mt-2">
              <div className="flex items-center">
                <Badge 
                    className={`text-xs ${isAheadOfPace ? 'bg-teal-100 text-teal-700' : 'bg-rose-100 text-rose-700'} border-none`}
                >
                  {isAheadOfPace ? 'Ahead of pace' : 'Behind pace'}
                </Badge>
              </div>
              <span className="text-xs text-muted-foreground">
                {isAheadOfPace 
                  ? `+${pointsDifference} pts ahead of target` 
                  : `${Math.abs(pointsDifference)} pts behind target`}
              </span>
            </div>
          </div>
        </div>
        
        {/* Content - either listing selection or normal action tabs */}
        {isListingSelectionView ? (
          <div className="flex-1 flex flex-col px-6 pt-4 pb-6">
            <div className="flex items-center mb-4">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2"
                onClick={backFromListingSelection}
              >
                <ChevronUp className="h-4 w-4 mr-1" />
                Back
              </Button>
              <h4 className="font-medium flex items-center">
                <ClipboardCheckIcon className="h-5 w-5 mr-2 text-primary" />
                {selectedActionType ? `Select Listing for ${selectedActionType.name}` : 'Select Listing'}
              </h4>
            </div>
            
            <div className="mb-4">
              <div className="relative">
                <Input
                  placeholder="Search listings by code, name, or owner..."
                  value={listingSearchTerm}
                  onChange={(e) => setListingSearchTerm(e.target.value)}
                  className="pl-10"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Please select which listing you want to perform this action on
              </p>
            </div>
            
            <div className="flex-1 overflow-y-auto border rounded-md">
              {(() => {
                // Filter listings based on search term
                const filteredListings = listingSearchTerm.trim() === ''
                  ? listingsData
                  : listingsData.filter(listing => 
                      listing.listingCode.toLowerCase().includes(listingSearchTerm.toLowerCase()) ||
                      listing.listingName.toLowerCase().includes(listingSearchTerm.toLowerCase()) ||
                      listing.ownerName.toLowerCase().includes(listingSearchTerm.toLowerCase())
                    );
                
                // Further filter based on action type - only show rental listings for consultRent
                const actionTypeFilteredListings = selectedActionType?.id === 'consultRent'
                  ? filteredListings.filter(listing => 
                      listing.listingStatus === 'For Rent' || 
                      listing.listingStatus === 'For Sale & Rent' ||
                      listing.listingStatus === 'ขายพร้อมผู้เช่า' ||
                      Boolean(listing.rentalPrice)
                    )
                  : filteredListings;
                
                return actionTypeFilteredListings.length > 0 ? (
                  <div className="divide-y">
                    {actionTypeFilteredListings.map((listing) => (
                      <div
                        key={listing.listingCode}
                        className={`p-3 hover:bg-muted/50 cursor-pointer transition-colors ${
                          selectedListing?.listingCode === listing.listingCode ? 'bg-primary/10 border-l-4 border-primary' : ''
                        }`}
                        onClick={() => setSelectedListing(listing)}
                      >
                        <div className="flex justify-between">
                          <div>
                            <div className="flex items-center">
                              <HomeIcon className="h-4 w-4 mr-2 text-primary" />
                              <span className="font-medium">{listing.listingName}</span>
                            </div>
                            <div className="text-sm text-muted-foreground mt-1">
                              {listing.listingCode} • {listing.propertyType} • {listing.bedrooms} BR
                            </div>
                          </div>
                          <Badge 
                            variant={listing.listingType === 'A List' ? 'default' : 'outline'}
                            className="text-xs px-2 py-0.5 h-5"
                          >
                            {listing.listingType}
                          </Badge>
                        </div>
                        <div className="flex justify-between mt-2 text-sm">
                          <div>
                            <span className="text-muted-foreground">Owner: </span>
                            {listing.ownerName}
                          </div>
                          <div>
                            {selectedActionType?.id === 'consultRent' && listing.rentalPrice ? (
                              <span className="font-medium">{new Intl.NumberFormat('th-TH').format(listing.rentalPrice)} ฿/mo</span>
                            ) : (
                              <span className="font-medium">{new Intl.NumberFormat('th-TH').format(listing.askingPrice)} ฿</span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center text-muted-foreground">
                    <HomeIcon className="h-10 w-10 mx-auto mb-2 opacity-20" />
                    <p>
                      {selectedActionType?.id === 'consultRent' 
                        ? 'No matching rental listings found' 
                        : 'No matching listings found'}
                    </p>
                    <p className="text-sm mt-1">
                      {selectedActionType?.id === 'consultRent'
                        ? 'Try a different search term or check listings with rental prices'
                        : 'Try a different search term'}
                    </p>
                  </div>
                );
              })()}
            </div>
            
            <div className="flex justify-end space-x-2 mt-4">
              <Button 
                onClick={handleProceedWithListing}
                disabled={!selectedListing}
                className="w-full"
              >
                Proceed with Selected Listing
              </Button>
            </div>
          </div>
        ) : (
          <Tabs defaultValue="log" className="flex-1 flex flex-col">
            <div className="px-6 pt-4 pb-2">
              <TabsList className="w-full grid grid-cols-2">
                <TabsTrigger 
                  value="log" 
                  onClick={() => setActiveTab('log')}
                >
                  <ClipboardCheckIcon className="h-4 w-4 mr-2" />
                  Action
                </TabsTrigger>
                <TabsTrigger 
                  value="history" 
                  onClick={() => setActiveTab('history')}
                >
                  <HistoryIcon className="h-4 w-4 mr-2" />
                  History
                </TabsTrigger>
              </TabsList>
            </div>
            
            {/* Action Tab Content */}
            <TabsContent value="log" className="flex-1 px-6 pt-2 pb-4 flex flex-col">
              {selectedCategory ? (
                <>
                  {/* Category View */}
                  <div className="flex-1 flex flex-col">
                  <div className="flex items-center mb-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 px-2"
                      onClick={backToCategories}
                    >
                      <ChevronUp className="h-4 w-4 mr-1" />
                      Back
                    </Button>
                    <h4 className="font-medium flex items-center">
                      {getCategoryIcon(selectedCategory)}
                      <span className="ml-2">{selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Actions</span>
                    </h4>
                  </div>
                  
                    <div>
                    <div className="space-y-3 pb-6">
                      {actionTypes
                        .filter(action => action.category === selectedCategory)
                        .map(action => (
                          <div 
                            key={action.id} 
                              className={`flex items-center justify-between p-3 rounded-md border ${
                                action.category === 'product' ? 'border-blue-200 bg-blue-50/50' :
                                action.category === 'owner' ? 'border-green-200 bg-green-50/50' :
                                action.category === 'buyer' ? 'border-purple-200 bg-purple-50/50' :
                                action.category === 'marketing' ? 'border-rose-200 bg-rose-50/50' :
                                'border-primary/30 bg-primary/5'
                              } hover:bg-opacity-70 cursor-pointer`}
                              onClick={() => handleActionClick(action)}
                            >
                              <div className="flex items-center">
                                <button 
                                  className="p-1.5 mr-2 rounded-full hover:bg-muted/20"
                                  onClick={(e) => toggleFavorite(action.id, e)}
                                  aria-label={favoriteActions.includes(action.id) ? "Remove from favorites" : "Add to favorites"}
                                >
                                  <Star className={`h-4 w-4 ${favoriteActions.includes(action.id) ? 'text-amber-500 fill-amber-500' : 'text-muted-foreground'}`} />
                                </button>
                                <div className={`p-1.5 rounded-full ${
                                  action.category === 'product' ? 'bg-blue-100' :
                                  action.category === 'owner' ? 'bg-green-100' :
                                  action.category === 'buyer' ? 'bg-purple-100' :
                                  action.category === 'marketing' ? 'bg-rose-100' :
                                  'bg-primary/20'
                                } mr-2`}>
                                  {getCategoryIcon(action.category)}
                                </div>
                            <div>
                              <div className="font-medium">{action.name}</div>
                              <div className="text-muted-foreground text-sm">{action.description}</div>
                            </div>
                              </div>
                              <Badge className={`${
                                action.category === 'product' ? 'bg-blue-100 text-blue-800 hover:bg-blue-200' :
                                action.category === 'owner' ? 'bg-green-100 text-green-800 hover:bg-green-200' :
                                action.category === 'buyer' ? 'bg-purple-100 text-purple-800 hover:bg-purple-200' :
                                action.category === 'marketing' ? 'bg-rose-100 text-rose-800 hover:bg-rose-200' :
                                'bg-primary/20 text-primary hover:bg-primary/30'
                              } border-none`}>
                              +{action.points} pts
                              </Badge>
                          </div>
                        ))
                      }
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="space-y-5">
                  {/* Action Categories Section - moved to top */}
                  <div>
                    <h4 className="font-medium mb-3 text-foreground">Action Categories</h4>
                    <div className="flex flex-wrap gap-2">
                      <Button 
                        variant="outline"
                        size="sm"
                        className="rounded-full border-green-200 hover:bg-green-50"
                        onClick={() => selectCategory('owner')}
                      >
                        <UserIcon className="h-3.5 w-3.5 mr-1.5" />
                        <span>Owner</span>
                      </Button>
                      
                      <Button 
                        variant="outline"
                        size="sm"
                        className="rounded-full border-purple-200 hover:bg-purple-50"
                        onClick={() => selectCategory('buyer')}
                      >
                        <ShoppingCartIcon className="h-3.5 w-3.5 mr-1.5" />
                        <span>Buyer</span>
                      </Button>
                      
                      <Button 
                        variant="outline"
                        size="sm"
                        className="rounded-full border-blue-200 hover:bg-blue-50"
                        onClick={() => selectCategory('product')}
                      >
                        <HomeIcon className="h-3.5 w-3.5 mr-1.5" />
                        <span>Product</span>
                      </Button>
                      
                      <Button 
                        variant="outline"
                        size="sm"
                        className="rounded-full border-rose-200 hover:bg-rose-50"
                        onClick={() => selectCategory('marketing')}
                      >
                        <MegaphoneIcon className="h-3.5 w-3.5 mr-1.5" />
                        <span>Marketing</span>
                    </Button>
                    </div>
                  </div>
                  
                  {/* Favorite Actions Section - renamed to Starred */}
                  <div>
                    <h4 className="font-medium mb-3 text-foreground">Starred</h4>
                    <div className="space-y-2">
                      {/* Dynamically show favorite actions */}
                      {favoriteActions.length > 0 ? (
                        favoriteActions.map(actionId => {
                          const action = actionTypes.find(a => a.id === actionId);
                          if (!action) return null;
                    
                        return (
                                <div 
                                  key={action.id}
                                  className={`flex items-center justify-between p-3 rounded-md border ${
                                    action.category === 'product' ? 'border-blue-200 bg-blue-50/50' :
                                    action.category === 'owner' ? 'border-green-200 bg-green-50/50' :
                                    action.category === 'buyer' ? 'border-purple-200 bg-purple-50/50' :
                                    action.category === 'marketing' ? 'border-rose-200 bg-rose-50/50' :
                                    'border-primary/30 bg-primary/5'
                                  } hover:bg-opacity-70 cursor-pointer`}
                                  onClick={() => handleActionClick(action)}
                                >
                                  <div className="flex items-center">
                                    <button 
                                      className="p-1.5 mr-2 rounded-full hover:bg-muted/20"
                                      onClick={(e) => toggleFavorite(action.id, e)}
                                      aria-label={favoriteActions.includes(action.id) ? "Remove from favorites" : "Add to favorites"}
                                    >
                                      <Star className={`h-4 w-4 ${favoriteActions.includes(action.id) ? 'text-amber-500 fill-amber-500' : 'text-muted-foreground'}`} />
                                    </button>
                                    <div className={`p-1.5 rounded-full ${
                                      action.category === 'product' ? 'bg-blue-100' :
                                      action.category === 'owner' ? 'bg-green-100' :
                                      action.category === 'buyer' ? 'bg-purple-100' :
                                      action.category === 'marketing' ? 'bg-rose-100' :
                                      'bg-primary/20'
                                    } mr-2`}>
                                      {getCategoryIcon(action.category)}
                                    </div>
                              <div>
                                      <div className="font-medium">{action.name}</div>
                                      <div className="text-muted-foreground text-sm">{action.description}</div>
                              </div>
                            </div>
                                <Badge className={`${
                                  action.category === 'product' ? 'bg-blue-100 text-blue-800 hover:bg-blue-200' :
                                  action.category === 'owner' ? 'bg-green-100 text-green-800 hover:bg-green-200' :
                                  action.category === 'buyer' ? 'bg-purple-100 text-purple-800 hover:bg-purple-200' :
                                  action.category === 'marketing' ? 'bg-rose-100 text-rose-800 hover:bg-rose-200' :
                                  'bg-primary/20 text-primary hover:bg-primary/30'
                                } border-none`}>
                                  +{action.points} pts
                                </Badge>
                        </div>
                      );
                        })
                      ) : (
                        <div className="text-center p-4 text-muted-foreground border rounded-md">
                          <p>No starred actions yet</p>
                          <p className="text-sm mt-1">Click the star icon on any action to add it to starred</p>
                    </div>
                  )}
                </div>
              </div>
                </div>
              )}
            </TabsContent>
            
            {/* History Tab Content */}
            <TabsContent value="history" className="flex-1 px-6 pt-2 pb-4 flex flex-col">
              {/* Content removed for redesign */}
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
  
  // FAB button that triggers the drawer/sheet
  const fabButton = (
    <Button 
      size="icon" 
      className="h-14 w-14 rounded-full fixed bottom-6 right-6 shadow-lg z-50 bg-primary hover:bg-primary/90"
      onClick={() => setIsOpen(true)}
    >
      <PlusIcon className="h-6 w-6" />
      <span className="sr-only">Log Action</span>
    </Button>
  );

  // Use Drawer for mobile and Sheet for desktop
  if (isMobile) {
    return (
      <>
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerTrigger asChild>
          {fabButton}
        </DrawerTrigger>
        <DrawerContent className="max-h-[90vh] h-[90vh] p-0 bg-background flex flex-col">
          <DrawerTitle className="sr-only">Action Tracker</DrawerTitle>
          {actionTrackerContent}
        </DrawerContent>
      </Drawer>
        
        {/* Add Listing Modal */}
        <AddListingModal 
          isOpen={isAddListingModalOpen}
          onClose={() => setIsAddListingModalOpen(false)}
          onSubmit={handleSubmitListing}
          initialTab={activeModalTab}
        />
        
        {/* Listing Details Drawer for Owner Visit */}
        <ListingDetailsDrawer 
          isOpen={isListingDetailsDrawerOpen}
          onClose={() => setIsListingDetailsDrawerOpen(false)}
          listing={selectedListing}
          initialTab={listingDetailsDrawerActiveTab}
        />
      </>
    );
  }
  
  return (
    <>
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        {fabButton}
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-md p-0 border-l">
        <SheetTitle className="sr-only">Action Tracker</SheetTitle>
        {actionTrackerContent}
      </SheetContent>
    </Sheet>
      
      {/* Add Listing Modal */}
      <AddListingModal 
        isOpen={isAddListingModalOpen}
        onClose={() => setIsAddListingModalOpen(false)}
        onSubmit={handleSubmitListing}
        initialTab={activeModalTab}
      />
      
      {/* Listing Details Drawer for Owner Visit */}
      <ListingDetailsDrawer 
        isOpen={isListingDetailsDrawerOpen}
        onClose={() => setIsListingDetailsDrawerOpen(false)}
        listing={selectedListing}
        initialTab={listingDetailsDrawerActiveTab}
      />
    </>
  );
};

export default ActionTrackerFAB; 