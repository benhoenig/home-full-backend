import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { X, Star, StarOff, User, MapPin, Home, Bed, Bath, Square, Ruler, Car, Calendar, DollarSign, Image, MapPin as MapPinned, Crown, History, ClipboardCheckIcon, Clock, MessageCircle, Search } from 'lucide-react';
import { Listing } from '@/hooks/useListingsTableData';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/utils';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useIsMobile } from '@/hooks/use-mobile';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useTimelineItems } from '@/hooks/useTimelineItems';
import TimelineItemComponent from '@/components/dashboard/drawer/tabs/TimelineItem';
import NewCommentInput from '@/components/dashboard/drawer/tabs/comment/NewCommentInput';
import CommentFilter, { FilterOption } from '@/components/dashboard/drawer/tabs/comment/CommentFilter';
import ActivityLogItem from '@/components/dashboard/drawer/tabs/ActivityLogItem';
import AddListingModal from './listings-table/AddListingModal';

type ListingDetailsDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  listing: Listing | null;
  initialTab?: TabType;
  onStarToggle?: (listing: Listing) => void;
};

type TabType = 'details' | 'photo' | 'location' | 'aexclusive' | 'activity';

// Default custom tags
const defaultCustomTags = [
  { name: "Follow Up", color: "bg-blue-500" },
  { name: "Important", color: "bg-red-500" },
  { name: "Waiting", color: "bg-amber-500" },
  { name: "Complete", color: "bg-green-500" },
  { name: "Question", color: "bg-purple-500" },
  { name: "Owner Visit", color: "bg-green-600" },
];

const ListingDetailsDrawer = ({ isOpen, onClose, listing, initialTab = 'details', onStarToggle }: ListingDetailsDrawerProps) => {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState<TabType>(initialTab);
  
  // Update active tab when initialTab prop changes
  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);
  
  // State for Edit Listing Modal
  const [isEditListingModalOpen, setIsEditListingModalOpen] = useState(false);
  
  // Set up timeline for activity tab
  const {
    timelineItems,
    newComment,
    selectedItem,
    editingItem,
    editContent,
    activeFilter,
    setSelectedItem,
    handleNewCommentChange,
    handleSendComment,
    handleEditItem,
    handleSaveEdit,
    handleDeleteItem,
    handleEditContentChange,
    handleEditCancel,
    handleFilterChange
  } = useTimelineItems([
    // Sample timeline items for the listing
    {
      id: '1',
      type: 'system_log',
      content: 'Listing was created',
      date: format(new Date(listing?.createdTime || new Date()), 'MMM dd, yyyy'),
      timestamp: new Date(listing?.createdTime || new Date()).getTime(),
      tag: 'Status Change'
    },
    {
      id: '2',
      type: 'system_log',
      content: listing?.propertyType === 'Condo' ? 'Listing categorized as Condo' : `Listing categorized as ${listing?.propertyType}`,
      date: format(new Date(listing?.createdTime || new Date()), 'MMM dd, yyyy'),
      timestamp: new Date(listing?.createdTime || new Date()).getTime() + 1000,
      tag: 'Update'
    }
  ]);
  
  // For search in activity tab
  const [searchQuery, setSearchQuery] = useState('');
  const [customTags, setCustomTags] = useState(defaultCustomTags);
  
  const filteredItems = searchQuery 
    ? timelineItems.filter(item => 
        item.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.user?.name && item.user.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.customTag?.name && item.customTag.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.taggedPerson?.name && item.taggedPerson.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.taggedListing?.name && item.taggedListing.name.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : timelineItems;
    
  if (!listing) return null;

  const handleStarToggle = () => {
    if (listing && onStarToggle) {
      onStarToggle(listing);
    }
  };
  
  const handleEditListing = () => {
    setIsEditListingModalOpen(true);
  };
  
  const handleSubmitEditedListing = (data: any) => {
    console.log('Edited listing data:', data);
    // Handle the submission data - in a real app this would update the listing
    setIsEditListingModalOpen(false);
  };
  
  return (
    <>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent 
          className={`p-0 ${isMobile ? 'h-[85vh] rounded-t-xl' : 'w-full sm:w-[90%] md:w-[60%] lg:w-[50%] xl:w-[40%] overflow-y-auto bg-background border-l border-border shadow-lg'}`}
          side={isMobile ? 'bottom' : 'right'}
        >
          <div className="flex flex-col h-full">
            <SheetHeader className="px-6 py-4 border-b">
              <div className="flex items-center justify-between">
                <SheetTitle className="text-lg mr-2">
                  {listing.listingName}
                </SheetTitle>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={handleStarToggle}
                  >
                    {listing.isStarred ? 
                      <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" /> : 
                      <StarOff className="h-5 w-5" />
                    }
                    <span className="sr-only">
                      {listing.isStarred ? 'Unstar' : 'Star'} listing
                    </span>
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={onClose}
                  >
                    <X className="h-5 w-5" />
                    <span className="sr-only">Close</span>
                  </Button>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant={listing.marketingStatus === 'Active' ? 'default' : 
                        listing.marketingStatus === 'Pending' ? 'outline' : 
                        listing.marketingStatus === 'Sold' ? 'secondary' : 'destructive'}>
                  {listing.marketingStatus}
                </Badge>
                <Badge variant={listing.listingType === 'Normal List' ? 'outline' : 
                        listing.listingType === 'A List' ? 'secondary' : 'default'}>
                  {listing.listingType}
                </Badge>
                <Badge variant="outline" className="bg-background">
                  {listing.listingCode}
                </Badge>
              </div>
            </SheetHeader>
            
            <Tabs 
              defaultValue="details" 
              value={activeTab}
              onValueChange={(value) => setActiveTab(value as TabType)}
              className="flex-1 flex flex-col overflow-hidden"
            >
              <div className={`px-6 pt-2.5 pb-3 border-b sticky top-0 bg-background z-10 ${!isMobile ? 'flex justify-center' : 'overflow-x-auto'}`}>
                {isMobile ? (
                  <TabsList className="inline-flex w-auto bg-slate-100 p-1 rounded-md">
                    <TabsTrigger value="details" className="px-4 text-sm data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm rounded-sm">
                      Details
                    </TabsTrigger>
                    <TabsTrigger value="photo" className="px-4 text-sm data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm rounded-sm">
                      Photo
                    </TabsTrigger>
                    <TabsTrigger value="location" className="px-4 text-sm data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm rounded-sm">
                      Location
                    </TabsTrigger>
                    <TabsTrigger value="aexclusive" className="px-4 text-sm data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm rounded-sm">
                      A & Exclusive
                    </TabsTrigger>
                    <TabsTrigger value="activity" className="px-4 text-sm data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm rounded-sm">
                      Activity
                    </TabsTrigger>
                  </TabsList>
                ) : (
                  <TabsList className="w-full md:w-full flex justify-between bg-slate-100 p-1 rounded-md">
                    <TabsTrigger value="details" className="flex-1 text-sm data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm rounded-sm">
                      Details
                    </TabsTrigger>
                    <TabsTrigger value="photo" className="flex-1 text-sm data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm rounded-sm">
                      Photo
                    </TabsTrigger>
                    <TabsTrigger value="location" className="flex-1 text-sm data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm rounded-sm">
                      Location
                    </TabsTrigger>
                    <TabsTrigger value="aexclusive" className="flex-1 text-sm data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm rounded-sm">
                      A & Exclusive
                    </TabsTrigger>
                    <TabsTrigger value="activity" className="flex-1 text-sm data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm rounded-sm">
                      Activity
                    </TabsTrigger>
                  </TabsList>
                )}
              </div>
            
              <div className="flex-1 overflow-y-auto h-full" style={{ maxHeight: 'calc(100% - 76px)' }}>
                <TabsContent value="details" className="m-0 h-full overflow-y-auto">
                  <div className="p-6 space-y-6">
                    {/* Thumbnail Image */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Thumbnail</h3>
                      <div className="overflow-hidden rounded-md border">
                        {listing.thumbnailUrl ? (
                          <img 
                            src={listing.thumbnailUrl} 
                            alt={`Thumbnail for ${listing.listingName}`}
                            className="w-full h-auto object-cover"
                          />
                        ) : (
                          <div className="flex flex-col items-center justify-center h-48 bg-muted">
                            <Image className="h-10 w-10 text-muted-foreground mb-2" />
                            <p className="text-center text-muted-foreground">No thumbnail available</p>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <Separator />
                    
                    {/* Basic Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Basic Information</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Owner</p>
                            <p className="text-sm text-muted-foreground">{listing.ownerName}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Location</p>
                            <p className="text-sm text-muted-foreground">{listing.zoneArea}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Home className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Type</p>
                            <p className="text-sm text-muted-foreground">{listing.propertyType}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Listed</p>
                            <p className="text-sm text-muted-foreground">
                              {listing.createdTime ? format(new Date(listing.createdTime), 'MMM dd, yyyy') : 'N/A'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    {/* Property Details */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Property Details</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                          <Bed className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Bedrooms</p>
                            <p className="text-sm text-muted-foreground">{listing.bedrooms}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Bath className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Bathrooms</p>
                            <p className="text-sm text-muted-foreground">{listing.bathrooms}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Square className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Area</p>
                            <p className="text-sm text-muted-foreground">
                              {listing.propertyType === 'Condo' && listing.condoArea ? 
                                `${listing.condoArea} sqm` : 
                                listing.usableArea ? `${listing.usableArea} sqm` : 'N/A'}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Car className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Parking</p>
                            <p className="text-sm text-muted-foreground">{listing.parking}</p>
                          </div>
                        </div>
                        {(listing.rai > 0 || listing.ngan > 0 || listing.wa > 0) && (
                          <div className="flex items-center gap-2">
                            <Ruler className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <p className="text-sm font-medium">Land</p>
                              <p className="text-sm text-muted-foreground">
                                {listing.rai > 0 ? `${listing.rai} ไร่ ` : ''}
                                {listing.ngan > 0 ? `${listing.ngan} งาน ` : ''}
                                {listing.wa > 0 ? `${listing.wa} วา` : ''}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <Separator />
                    
                    {/* Price Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Price Information</h3>
                      <div className="grid grid-cols-1 gap-4">
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Asking Price</p>
                            <p className="text-sm font-bold">{formatCurrency(listing.askingPrice)}</p>
                          </div>
                        </div>
                        {listing.rentalPrice && (
                          <div className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <p className="text-sm font-medium">Rental Price</p>
                              <p className="text-sm font-bold">{formatCurrency(listing.rentalPrice)}</p>
                            </div>
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Net Price</p>
                            <p className="text-sm text-muted-foreground">{formatCurrency(listing.netPrice)}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Remark */}
                    {listing.remark && (
                      <>
                        <Separator />
                        <div className="space-y-2">
                          <h3 className="text-lg font-medium">Remark</h3>
                          <p className="text-sm text-muted-foreground">{listing.remark}</p>
                        </div>
                      </>
                    )}
                    
                    {/* Last Modified */}
                    <Separator />
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Metadata</h3>
                      <div className="text-sm text-muted-foreground">
                        <p>Created by: {listing.createdBy}</p>
                        <p>Last modified: {listing.lastModifiedTime ? format(new Date(listing.lastModifiedTime), 'MMM dd, yyyy') : 'N/A'}</p>
                        <p>Assigned to: {listing.assignedTo}</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="photo" className="m-0 h-full overflow-y-auto">
                  <div className="p-6 space-y-6">
                    <div className="flex flex-col items-center justify-center h-40 border-2 border-dashed rounded-md">
                      <Image className="h-10 w-10 text-muted-foreground mb-2" />
                      <p className="text-center text-muted-foreground">No photos available</p>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="location" className="m-0 h-full overflow-y-auto">
                  <div className="p-6 space-y-6">
                    <div className="flex flex-col items-center justify-center h-40 border-2 border-dashed rounded-md">
                      <MapPinned className="h-10 w-10 text-muted-foreground mb-2" />
                      <p className="text-center text-muted-foreground">Location map will be displayed here</p>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="aexclusive" className="m-0 h-full overflow-y-auto">
                  <div className="p-6 space-y-6">
                    {/* Listing Classification */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Listing Classification</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium">Listing Type</p>
                          <p className="text-sm text-muted-foreground">{listing.listingType}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Property Hook</p>
                          <p className="text-sm text-muted-foreground">
                            {listing.propertyHook || <span className="italic text-gray-400">Not specified</span>}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Hashtags</p>
                          {listing.hashtags && listing.hashtags.length > 0 ? (
                            <div className="flex flex-wrap gap-1 mt-1">
                              {listing.hashtags.map((tag, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  #{tag}
                                </Badge>
                              ))}
                            </div>
                          ) : (
                            <p className="text-sm italic text-gray-400">No hashtags</p>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    {/* Market Comparison */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Market Comparison</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium">Asking Price</p>
                          <p className="text-sm text-muted-foreground">{formatCurrency(listing.askingPrice)}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Last Match</p>
                          <p className="text-sm text-muted-foreground">
                            {listing.lastMatch ? formatCurrency(listing.lastMatch) : <span className="italic text-gray-400">Not specified</span>}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">% Difference</p>
                          {listing.lastMatchDiff ? (
                            <p className={`text-sm ${listing.lastMatchDiff > 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {listing.lastMatchDiff > 0 ? '+' : ''}{listing.lastMatchDiff}%
                            </p>
                          ) : (
                            <p className="text-sm italic text-gray-400">Not calculated</p>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    {/* Property Features */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Property Features</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium">Giveaways</p>
                          {listing.giveaways && listing.giveaways.length > 0 ? (
                            <div className="flex flex-wrap gap-1 mt-1">
                              {listing.giveaways.map((item, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {item}
                                </Badge>
                              ))}
                            </div>
                          ) : (
                            <p className="text-sm italic text-gray-400">None specified</p>
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium">Common Areas</p>
                          {listing.commonAreas && listing.commonAreas.length > 0 ? (
                            <div className="flex flex-wrap gap-1 mt-1">
                              {listing.commonAreas.map((item, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {item}
                                </Badge>
                              ))}
                            </div>
                          ) : (
                            <p className="text-sm italic text-gray-400">None specified</p>
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium">Unit Condition</p>
                          {listing.propertyCondition && listing.propertyCondition.length > 0 ? (
                            <div className="flex flex-wrap gap-1 mt-1">
                              {listing.propertyCondition.map((item, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {item}
                                </Badge>
                              ))}
                            </div>
                          ) : (
                            <p className="text-sm italic text-gray-400">Not specified</p>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    {/* Location */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Location</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium">Environment</p>
                          {listing.environment && listing.environment.length > 0 ? (
                            <div className="flex flex-wrap gap-1 mt-1">
                              {listing.environment.map((item, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {item}
                                </Badge>
                              ))}
                            </div>
                          ) : (
                            <p className="text-sm italic text-gray-400">None specified</p>
                          )}
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium">Location</p>
                          {listing.locations && listing.locations.length > 0 ? (
                            <div className="flex flex-wrap gap-1 mt-1">
                              {listing.locations.map((item, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {item}
                                </Badge>
                              ))}
                            </div>
                          ) : (
                            <p className="text-sm italic text-gray-400">None specified</p>
                          )}
                        </div>
                        
                        <div className="col-span-2">
                          <p className="text-sm font-medium">Location Remark</p>
                          <p className="text-sm text-muted-foreground">
                            {listing.locationRemark || <span className="italic text-gray-400">No remarks</span>}
                          </p>
                        </div>
                      </div>
                      
                      {/* Nearby Places */}
                      <div className="mt-4">
                        <p className="text-sm font-medium mb-2">Nearby Transit Stations</p>
                        {listing.transitDistance && listing.transitDistance.length > 0 ? (
                          <div className="space-y-1">
                            {listing.transitDistance.map((item, index) => (
                              <div key={index} className="flex justify-between text-sm">
                                <span>{item.name}</span>
                                <span className="text-muted-foreground">{item.distance} km</span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm italic text-gray-400">None specified</p>
                        )}
                      </div>
                      
                      <div className="mt-4">
                        <p className="text-sm font-medium mb-2">Nearby Hospitals</p>
                        {listing.hospitalDistance && listing.hospitalDistance.length > 0 ? (
                          <div className="space-y-1">
                            {listing.hospitalDistance.map((item, index) => (
                              <div key={index} className="flex justify-between text-sm">
                                <span>{item.name}</span>
                                <span className="text-muted-foreground">{item.distance} km</span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm italic text-gray-400">None specified</p>
                        )}
                      </div>
                      
                      <div className="mt-4">
                        <p className="text-sm font-medium mb-2">Nearby Schools & Colleges</p>
                        {listing.educationDistance && listing.educationDistance.length > 0 ? (
                          <div className="space-y-1">
                            {listing.educationDistance.map((item, index) => (
                              <div key={index} className="flex justify-between text-sm">
                                <span>{item.name}</span>
                                <span className="text-muted-foreground">{item.distance} km</span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm italic text-gray-400">None specified</p>
                        )}
                      </div>
                      
                      <div className="mt-4">
                        <p className="text-sm font-medium mb-2">Nearby Shopping Malls</p>
                        {listing.mallDistance && listing.mallDistance.length > 0 ? (
                          <div className="space-y-1">
                            {listing.mallDistance.map((item, index) => (
                              <div key={index} className="flex justify-between text-sm">
                                <span>{item.name}</span>
                                <span className="text-muted-foreground">{item.distance} km</span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm italic text-gray-400">None specified</p>
                        )}
                      </div>
                    </div>
                    
                    <Separator />
                    
                    {/* Buyer Profile */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Buyer Profile</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium">Target Buyer</p>
                          {listing.targetBuyer && listing.targetBuyer.length > 0 ? (
                            <div className="flex flex-wrap gap-1 mt-1">
                              {listing.targetBuyer.map((item, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {item}
                                </Badge>
                              ))}
                            </div>
                          ) : (
                            <p className="text-sm italic text-gray-400">None specified</p>
                          )}
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium">Age Range</p>
                          <p className="text-sm text-muted-foreground">
                            {listing.ageRange || <span className="italic text-gray-400">Not specified</span>}
                          </p>
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium">Occupations</p>
                          <p className="text-sm text-muted-foreground">
                            {listing.occupations || <span className="italic text-gray-400">Not specified</span>}
                          </p>
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium">Investor Features</p>
                          {listing.investors && listing.investors.length > 0 ? (
                            <div className="flex flex-wrap gap-1 mt-1">
                              {listing.investors.map((item, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {item}
                                </Badge>
                              ))}
                            </div>
                          ) : (
                            <p className="text-sm italic text-gray-400">None specified</p>
                          )}
                        </div>
                        
                        <div className="col-span-2">
                          <p className="text-sm font-medium">Target Buyer Remark</p>
                          <p className="text-sm text-muted-foreground">
                            {listing.targetBuyerRemark || <span className="italic text-gray-400">No remarks</span>}
                          </p>
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium">Monthly Payment</p>
                          <p className="text-sm text-muted-foreground">
                            {listing.monthlyPayment ? formatCurrency(listing.monthlyPayment) : <span className="italic text-gray-400">Not specified</span>}
                          </p>
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium">Target Salary</p>
                          <p className="text-sm text-muted-foreground">
                            {listing.targetSalary ? formatCurrency(listing.targetSalary) : <span className="italic text-gray-400">Not specified</span>}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="activity" className="m-0 h-full overflow-y-auto">
                  <div className="px-6 pt-6 pb-0 space-y-6">
                    {/* Timeline Activity Card */}
                    <Card>
                      <CardHeader className="p-6 pb-3 space-y-0">
                        <div className="flex items-center justify-between mb-1.5">
                          <CardTitle className="flex items-center text-base font-medium">
                            <Clock className="mr-2 h-4 w-4" />
                            Timeline Activity
                          </CardTitle>
                          <div className="flex items-center space-x-2">
                            <div className="relative">
                              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-500" />
                              <Input 
                                placeholder="Search..." 
                                className="pl-7 h-9 w-30 md:w-32 text-xs py-0" 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                              />
                            </div>
                            <CommentFilter 
                              customTags={customTags}
                              activeFilter={activeFilter}
                              onFilterChange={handleFilterChange}
                              timelineItems={timelineItems}
                            />
                          </div>
                        </div>
                        <CardDescription>View and manage listing activity timeline</CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <ScrollArea className="h-[450px] pr-3">
                          <div className="space-y-4">
                            {filteredItems.length > 0 ? (
                              filteredItems.map(item => 
                                item.type === 'system_log' ? (
                                  <ActivityLogItem key={item.id} logItem={item} />
                                ) : (
                                  <TimelineItemComponent 
                                    key={item.id} 
                                    item={item} 
                                    selectedItem={selectedItem} 
                                    editingItem={editingItem} 
                                    editContent={editContent} 
                                    onMouseEnter={() => setSelectedItem(item.id)} 
                                    onMouseLeave={() => setSelectedItem(null)} 
                                    onEditItem={handleEditItem} 
                                    onDeleteItem={handleDeleteItem} 
                                    onEditCancel={handleEditCancel} 
                                    onSaveEdit={handleSaveEdit} 
                                    onEditContentChange={handleEditContentChange} 
                                  />
                                )
                              )
                            ) : (
                              <div className="text-center py-8 text-gray-500">
                                {searchQuery ? 
                                  "No matching items found" : 
                                  "No timeline items yet"}
                              </div>
                            )}
                          </div>
                        </ScrollArea>
                      </CardContent>
                    </Card>
                    
                    {/* Add Comment Card */}
                    <Card className="mb-6">
                      <CardHeader className="pb-3">
                        <CardTitle className="flex items-center text-base font-medium">
                          <MessageCircle className="mr-2 h-4 w-4" />
                          Add Comment
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <NewCommentInput 
                          newComment={newComment} 
                          onNewCommentChange={handleNewCommentChange} 
                          onSendComment={handleSendComment} 
                          showLeadSelector={true}
                        />
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
            
            <div className="px-6 py-4 border-t">
              <div className="flex justify-between gap-4">
                <Button variant="outline" onClick={onClose}>Close</Button>
                <Button onClick={handleEditListing}>Edit Listing</Button>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
      
      {/* Edit Listing Modal */}
      <AddListingModal 
        isOpen={isEditListingModalOpen}
        onClose={() => setIsEditListingModalOpen(false)}
        onSubmit={handleSubmitEditedListing}
      />
    </>
  );
};

export default ListingDetailsDrawer; 