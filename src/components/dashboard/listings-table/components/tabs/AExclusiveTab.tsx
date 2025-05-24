import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem as UISelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { DollarSign, TrendingUp, Gift, Building2, Users, Briefcase } from "lucide-react";
import MultiSelectSearch, { SelectItem } from '../MultiSelectSearch';

const AExclusiveTab: React.FC = () => {
  // Sample data - In a real app, this would come from an API or props
  const [giveaways, setGiveaways] = useState<SelectItem[]>([
    { id: 'furniture', name: 'Furniture' },
    { id: 'appliances', name: 'Appliances' },
    { id: 'fixtures', name: 'Fixtures' },
    { id: 'renovations', name: 'Renovations' }
  ]);
  const [selectedGiveaways, setSelectedGiveaways] = useState<string[]>([]);

  const [commonAreas, setCommonAreas] = useState<SelectItem[]>([
    { id: 'gym', name: 'Gym' },
    { id: 'pool', name: 'Pool' },
    { id: 'garden', name: 'Garden' },
    { id: 'playground', name: 'Playground' },
    { id: 'lobby', name: 'Lobby' },
    { id: 'parking', name: 'Parking' }
  ]);
  const [selectedCommonAreas, setSelectedCommonAreas] = useState<string[]>([]);

  const [targetBuyers, setTargetBuyers] = useState<SelectItem[]>([
    { id: 'expat', name: 'Expat' },
    { id: 'local', name: 'Local' },
    { id: 'family', name: 'Family' },
    { id: 'investor', name: 'Investor' },
    { id: 'corporate', name: 'Corporate' }
  ]);
  const [selectedTargetBuyers, setSelectedTargetBuyers] = useState<string[]>([]);

  // New Investor Features state
  const [investorFeatures, setInvestorFeatures] = useState<SelectItem[]>([
    { id: 'high-yield', name: 'High Yield' },
    { id: 'rental-guarantee', name: 'Rental Guarantee' },
    { id: 'long-term-tenants', name: 'Long-term Tenants' },
    { id: 'capital-appreciation', name: 'Capital Appreciation' },
    { id: 'low-maintenance', name: 'Low Maintenance' }
  ]);
  const [selectedInvestorFeatures, setSelectedInvestorFeatures] = useState<string[]>([]);

  const handleSelectGiveaway = (id: string) => {
    setSelectedGiveaways(prev => [...prev, id]);
  };

  const handleRemoveGiveaway = (id: string) => {
    setSelectedGiveaways(prev => prev.filter(giveawayId => giveawayId !== id));
  };

  const handleAddNewGiveaway = (name: string) => {
    const newId = `giveaway-${Date.now()}`;
    const newGiveaway = { id: newId, name };
    setGiveaways(prev => [...prev, newGiveaway]);
    setSelectedGiveaways(prev => [...prev, newId]);
  };

  const handleSelectCommonArea = (id: string) => {
    setSelectedCommonAreas(prev => [...prev, id]);
  };

  const handleRemoveCommonArea = (id: string) => {
    setSelectedCommonAreas(prev => prev.filter(areaId => areaId !== id));
  };

  const handleAddNewCommonArea = (name: string) => {
    const newId = `area-${Date.now()}`;
    const newArea = { id: newId, name };
    setCommonAreas(prev => [...prev, newArea]);
    setSelectedCommonAreas(prev => [...prev, newId]);
  };

  const handleSelectTargetBuyer = (id: string) => {
    setSelectedTargetBuyers(prev => [...prev, id]);
  };

  const handleRemoveTargetBuyer = (id: string) => {
    setSelectedTargetBuyers(prev => prev.filter(buyerId => buyerId !== id));
  };

  const handleAddNewTargetBuyer = (name: string) => {
    const newId = `buyer-${Date.now()}`;
    const newBuyer = { id: newId, name };
    setTargetBuyers(prev => [...prev, newBuyer]);
    setSelectedTargetBuyers(prev => [...prev, newId]);
  };

  // New handler functions for Investor Features
  const handleSelectInvestorFeature = (id: string) => {
    setSelectedInvestorFeatures(prev => [...prev, id]);
  };

  const handleRemoveInvestorFeature = (id: string) => {
    setSelectedInvestorFeatures(prev => prev.filter(featureId => featureId !== id));
  };

  const handleAddNewInvestorFeature = (name: string) => {
    const newId = `investor-feature-${Date.now()}`;
    const newFeature = { id: newId, name };
    setInvestorFeatures(prev => [...prev, newFeature]);
    setSelectedInvestorFeatures(prev => [...prev, newId]);
  };

  return (
    <Card className="shadow-sm">
      <CardContent className="pt-6">
        <div className="space-y-6">
          {/* Listing Classification */}
          <div className="space-y-4">
            <div className="pb-2">
              <h3 className="text-lg font-medium mb-2">Listing Classification</h3>
              <Separator className="w-full" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="listing-type" className="font-medium">Listing Type*</Label>
                  <Select>
                    <SelectTrigger id="listing-type" className="h-10">
                      <SelectValue placeholder="Select listing type" />
                    </SelectTrigger>
                    <SelectContent>
                      <UISelectItem value="normal-list">Normal List</UISelectItem>
                      <UISelectItem value="a-list">A List</UISelectItem>
                      <UISelectItem value="exclusive-list">Exclusive List</UISelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="property-hook" className="font-medium">Property Hook</Label>
                  <Textarea 
                    id="property-hook" 
                    placeholder="What makes this property special?" 
                    className="resize-none min-h-[80px]" 
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="hashtags" className="font-medium">Hashtags</Label>
                  <Input 
                    id="hashtags" 
                    placeholder="Add hashtags separated by commas" 
                    className="h-10" 
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Market Comparison */}
          <div className="space-y-4">
            <div className="pb-2">
              <h3 className="text-lg font-medium mb-2">Market Comparison</h3>
              <Separator className="w-full" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="asking-price-view" className="font-medium">Asking Price</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <Input 
                      id="asking-price-view" 
                      readOnly 
                      className="pl-10 h-10 bg-muted/30" 
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Reflects the asking price from the Price section</p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="last-match" className="font-medium">Last Match</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <Input 
                      id="last-match" 
                      type="number" 
                      min="0" 
                      placeholder="0" 
                      className="pl-10 h-10" 
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="percentage-diff" className="font-medium">% Difference</Label>
                  <div className="relative">
                    <TrendingUp className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <Input 
                      id="percentage-diff" 
                      readOnly 
                      className="pl-10 h-10 bg-muted/30" 
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Calculated from Asking Price / Last Match</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Property Features */}
          <div className="space-y-4">
            <div className="pb-2">
              <h3 className="text-lg font-medium mb-2">Property Features</h3>
              <Separator className="w-full" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <MultiSelectSearch
                  label="Giveaways"
                  searchPlaceholder="Search giveaways..."
                  emptyMessage="No giveaways found"
                  items={giveaways}
                  selectedItems={selectedGiveaways}
                  onSelect={handleSelectGiveaway}
                  onRemove={handleRemoveGiveaway}
                  onAddNew={handleAddNewGiveaway}
                  icon={<Gift className="h-10 w-10 text-muted-foreground mb-2" />}
                  badgeLabel="Giveaway"
                />
                
                <MultiSelectSearch
                  label="Common Areas"
                  searchPlaceholder="Search common areas..."
                  emptyMessage="No common areas found"
                  items={commonAreas}
                  selectedItems={selectedCommonAreas}
                  onSelect={handleSelectCommonArea}
                  onRemove={handleRemoveCommonArea}
                  onAddNew={handleAddNewCommonArea}
                  icon={<Building2 className="h-10 w-10 text-muted-foreground mb-2" />}
                  badgeLabel="Common Area"
                />
              </div>
              
              <div className="space-y-4">
                <MultiSelectSearch
                  label="Target Buyer"
                  searchPlaceholder="Search target buyers..."
                  emptyMessage="No target buyers found"
                  items={targetBuyers}
                  selectedItems={selectedTargetBuyers}
                  onSelect={handleSelectTargetBuyer}
                  onRemove={handleRemoveTargetBuyer}
                  onAddNew={handleAddNewTargetBuyer}
                  icon={<Users className="h-10 w-10 text-muted-foreground mb-2" />}
                  badgeLabel="Target Buyer"
                />
                
                <div className="space-y-2">
                  <Label htmlFor="target-buyer-remark" className="font-medium">Target Buyer Remark</Label>
                  <Textarea 
                    id="target-buyer-remark" 
                    placeholder="Notes about potential buyers" 
                    className="resize-none min-h-[80px]" 
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Investor Information */}
          <div className="space-y-4">
            <div className="pb-2">
              <h3 className="text-lg font-medium mb-2">Investor Information</h3>
              <Separator className="w-full" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <MultiSelectSearch
                  label="Investor Features"
                  searchPlaceholder="Search investor features..."
                  emptyMessage="No investor features found"
                  items={investorFeatures}
                  selectedItems={selectedInvestorFeatures}
                  onSelect={handleSelectInvestorFeature}
                  onRemove={handleRemoveInvestorFeature}
                  onAddNew={handleAddNewInvestorFeature}
                  icon={<Briefcase className="h-10 w-10 text-muted-foreground mb-2" />}
                  badgeLabel="Investor Feature"
                />
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="investor-remark" className="font-medium">Investor Remark</Label>
                  <Textarea 
                    id="investor-remark" 
                    placeholder="Notes about investment potential" 
                    className="resize-none min-h-[80px]" 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AExclusiveTab; 