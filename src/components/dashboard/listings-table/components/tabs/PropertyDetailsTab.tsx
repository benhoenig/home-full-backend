import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Gift, Building2 } from "lucide-react";
import MultiSelectSearch, { SelectItem as MultiSelectItem } from '../MultiSelectSearch';

const PropertyDetailsTab: React.FC = () => {
  // Sample data for giveaways and common areas
  const [giveaways, setGiveaways] = useState<MultiSelectItem[]>([
    { id: 'furniture', name: 'Furniture' },
    { id: 'appliances', name: 'Appliances' },
    { id: 'fixtures', name: 'Fixtures' },
    { id: 'renovations', name: 'Renovations' }
  ]);
  const [selectedGiveaways, setSelectedGiveaways] = useState<string[]>([]);

  const [commonAreas, setCommonAreas] = useState<MultiSelectItem[]>([
    { id: 'gym', name: 'Gym' },
    { id: 'pool', name: 'Pool' },
    { id: 'garden', name: 'Garden' },
    { id: 'playground', name: 'Playground' },
    { id: 'lobby', name: 'Lobby' },
    { id: 'parking', name: 'Parking' }
  ]);
  const [selectedCommonAreas, setSelectedCommonAreas] = useState<string[]>([]);

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

  return (
    <Card className="shadow-sm">
      <CardContent className="pt-6">
        <div className="space-y-6">
          {/* Property Details Section */}
          <div className="space-y-4">
            <div className="pb-2">
              <h3 className="text-lg font-medium mb-2">Property Details</h3>
              <Separator className="w-full" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="bedrooms" className="font-medium">Bedrooms</Label>
                    <Input id="bedrooms" type="number" min="0" placeholder="0" className="h-10" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="bathrooms" className="font-medium">Bathrooms</Label>
                    <Input id="bathrooms" type="number" min="0" placeholder="0" className="h-10" />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="building" className="font-medium">Building</Label>
                    <Input id="building" placeholder="Building name/number" className="h-10" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="floor" className="font-medium">Floor</Label>
                    <Input id="floor" type="number" min="0" placeholder="0" className="h-10" />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="view" className="font-medium">View</Label>
                    <Select>
                      <SelectTrigger id="view" className="h-10">
                        <SelectValue placeholder="Select view" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="city">City View</SelectItem>
                        <SelectItem value="garden">Garden View</SelectItem>
                        <SelectItem value="pool">Pool View</SelectItem>
                        <SelectItem value="river">River View</SelectItem>
                        <SelectItem value="sea">Sea View</SelectItem>
                        <SelectItem value="mountain">Mountain View</SelectItem>
                        <SelectItem value="park">Park View</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="direction" className="font-medium">Direction</Label>
                    <Select>
                      <SelectTrigger id="direction" className="h-10">
                        <SelectValue placeholder="Select direction" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="north">North</SelectItem>
                        <SelectItem value="northeast">North East</SelectItem>
                        <SelectItem value="east">East</SelectItem>
                        <SelectItem value="southeast">South East</SelectItem>
                        <SelectItem value="south">South</SelectItem>
                        <SelectItem value="southwest">South West</SelectItem>
                        <SelectItem value="west">West</SelectItem>
                        <SelectItem value="northwest">North West</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="unit-no" className="font-medium">Unit No.</Label>
                  <Input id="unit-no" placeholder="Enter unit number" className="h-10" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="usable-area" className="font-medium">Usable Area (sqm)</Label>
                  <Input id="usable-area" type="number" min="0" placeholder="0" className="h-10" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="condo-area" className="font-medium">Condo Area (sqm)</Label>
                  <Input id="condo-area" type="number" min="0" placeholder="0" className="h-10" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Land Size Section */}
          <div className="space-y-4">
            <div className="pb-2">
              <h3 className="text-lg font-medium mb-2">Land Size</h3>
              <Separator className="w-full" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="rai" className="font-medium">ไร่</Label>
                  <Input id="rai" type="number" min="0" placeholder="0" className="h-10" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="ngan" className="font-medium">งาน</Label>
                  <Input id="ngan" type="number" min="0" placeholder="0" className="h-10" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="wa" className="font-medium">วา</Label>
                  <Input id="wa" type="number" min="0" placeholder="0" className="h-10" />
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="parking" className="font-medium">Parking Spaces</Label>
                  <Input id="parking" type="number" min="0" placeholder="0" className="h-10" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="remark" className="font-medium">Remark</Label>
                  <Textarea id="remark" placeholder="Enter any additional notes" className="resize-none min-h-[80px]" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Property Features Section */}
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
              </div>
              
              <div className="space-y-4">
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
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyDetailsTab; 