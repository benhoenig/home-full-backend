import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const AExclusiveTab: React.FC = () => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="listing-type">Listing Type*</Label>
              <Select>
                <SelectTrigger id="listing-type">
                  <SelectValue placeholder="Select listing type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="normal-list">Normal List</SelectItem>
                  <SelectItem value="a-list">A List</SelectItem>
                  <SelectItem value="exclusive-list">Exclusive List</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="property-hook">Property Hook</Label>
              <Textarea id="property-hook" placeholder="What makes this property special?" className="resize-none" />
            </div>
            
            <div className="space-y-2">
              <Label>Giveaways</Label>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="furniture" />
                  <Label htmlFor="furniture">Furniture</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="appliances" />
                  <Label htmlFor="appliances">Appliances</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="fixtures" />
                  <Label htmlFor="fixtures">Fixtures</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="renovations" />
                  <Label htmlFor="renovations">Renovations</Label>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Common Areas</Label>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="gym" />
                  <Label htmlFor="gym">Gym</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="pool" />
                  <Label htmlFor="pool">Pool</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="garden" />
                  <Label htmlFor="garden">Garden</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="playground" />
                  <Label htmlFor="playground">Playground</Label>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Target Buyer</Label>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="expat" />
                  <Label htmlFor="expat">Expat</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="local" />
                  <Label htmlFor="local">Local</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="family" />
                  <Label htmlFor="family">Family</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="investor" />
                  <Label htmlFor="investor">Investor</Label>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="target-buyer-remark">Target Buyer Remark</Label>
              <Textarea id="target-buyer-remark" placeholder="Notes about potential buyers" className="resize-none" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="hashtags">Hashtags</Label>
              <Input id="hashtags" placeholder="Add hashtags separated by commas" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AExclusiveTab; 