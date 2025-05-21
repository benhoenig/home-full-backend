import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const PropertyDetailsTab: React.FC = () => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="bedrooms">Bedrooms</Label>
                <Input id="bedrooms" type="number" min="0" placeholder="0" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bathrooms">Bathrooms</Label>
                <Input id="bathrooms" type="number" min="0" placeholder="0" />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="building">Building</Label>
                <Input id="building" placeholder="Building name/number" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="floor">Floor</Label>
                <Input id="floor" type="number" min="0" placeholder="0" />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="view">View</Label>
                <Select>
                  <SelectTrigger id="view">
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
                <Label htmlFor="direction">Direction</Label>
                <Select>
                  <SelectTrigger id="direction">
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
              <Label htmlFor="unit-no">Unit No.</Label>
              <Input id="unit-no" placeholder="Enter unit number" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="usable-area">Usable Area (sqm)</Label>
              <Input id="usable-area" type="number" min="0" placeholder="0" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="condo-area">Condo Area (sqm)</Label>
              <Input id="condo-area" type="number" min="0" placeholder="0" />
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="rai">ไร่</Label>
                <Input id="rai" type="number" min="0" placeholder="0" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="ngan">งาน</Label>
                <Input id="ngan" type="number" min="0" placeholder="0" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="wa">วา</Label>
                <Input id="wa" type="number" min="0" placeholder="0" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="parking">Parking Spaces</Label>
              <Input id="parking" type="number" min="0" placeholder="0" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="remark">Remark</Label>
              <Textarea id="remark" placeholder="Enter any additional notes" className="resize-none" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyDetailsTab; 