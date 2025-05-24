import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { DollarSign, Briefcase } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import MultiSelectSearch, { SelectItem as MultiSelectItem } from '../MultiSelectSearch';

const PriceTab: React.FC = () => {
  // Investor Features state
  const [investorFeatures, setInvestorFeatures] = useState<MultiSelectItem[]>([
    { id: 'high-yield', name: 'High Yield' },
    { id: 'rental-guarantee', name: 'Rental Guarantee' },
    { id: 'long-term-tenants', name: 'Long-term Tenants' },
    { id: 'capital-appreciation', name: 'Capital Appreciation' },
    { id: 'low-maintenance', name: 'Low Maintenance' }
  ]);
  const [selectedInvestorFeatures, setSelectedInvestorFeatures] = useState<string[]>([]);

  // Handler functions for Investor Features
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
          {/* Pricing Information */}
          <div className="space-y-4">
            <div className="pb-2">
              <h3 className="text-lg font-medium mb-2">Pricing Information</h3>
              <Separator className="w-full" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="asking-price" className="font-medium">Asking Price*</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <Input id="asking-price" type="number" min="0" placeholder="0" className="pl-10 h-10" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="net-price" className="font-medium">Net Price*</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <Input id="net-price" type="number" min="0" placeholder="0" className="pl-10 h-10" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="rental-price" className="font-medium">Rental Price</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <Input id="rental-price" type="number" min="0" placeholder="0" className="pl-10 h-10" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="price-remark" className="font-medium">Price Remark</Label>
                  <Select>
                    <SelectTrigger id="price-remark" className="h-10">
                      <SelectValue placeholder="Select fee arrangement" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fifty-fifty-transfer">50/50 Transfer Fee</SelectItem>
                      <SelectItem value="fifty-fifty-all">50/50 All Fees</SelectItem>
                      <SelectItem value="all-included">All Included</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="pb-2">
                  <h4 className="font-medium text-muted-foreground mb-2">Calculated Values</h4>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="price-per-sqw" className="font-medium">Price per Sq. Wah</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <Input id="price-per-sqw" type="number" readOnly className="pl-10 h-10 bg-muted/30" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="price-per-sqm" className="font-medium">Price per Sq. Meter</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <Input id="price-per-sqm" type="number" readOnly className="pl-10 h-10 bg-muted/30" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="price-per-usable-area" className="font-medium">Price per Usable Area</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <Input id="price-per-usable-area" type="number" readOnly className="pl-10 h-10 bg-muted/30" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Investment Features */}
          <div className="space-y-4">
            <div className="pb-2">
              <h3 className="text-lg font-medium mb-2">Investment Features</h3>
              <Separator className="w-full" />
            </div>
            
            <div className="grid grid-cols-1 gap-6">
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
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PriceTab; 