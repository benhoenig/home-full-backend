import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

const LocationTab: React.FC = () => {
  return (
    <Card className="shadow-sm">
      <CardContent className="pt-6">
        <div className="space-y-6">
          {/* General Location */}
          <div className="space-y-4">
            <div className="pb-2">
              <h3 className="text-lg font-medium mb-2">General Location</h3>
              <Separator className="w-full" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="zone-area" className="font-medium">Zone/Area*</Label>
                  <Select>
                    <SelectTrigger id="zone-area" className="h-10">
                      <SelectValue placeholder="Select zone/area" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sukhumvit">Sukhumvit</SelectItem>
                      <SelectItem value="silom">Silom</SelectItem>
                      <SelectItem value="sathorn">Sathorn</SelectItem>
                      <SelectItem value="riverside">Riverside</SelectItem>
                      <SelectItem value="ratchada">Ratchada</SelectItem>
                      <SelectItem value="thonglor">Thonglor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="location-grade" className="font-medium">Location Grade</Label>
                  <Select>
                    <SelectTrigger id="location-grade" className="h-10">
                      <SelectValue placeholder="Select grade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A+">A+</SelectItem>
                      <SelectItem value="A">A</SelectItem>
                      <SelectItem value="B+">B+</SelectItem>
                      <SelectItem value="B">B</SelectItem>
                      <SelectItem value="C">C</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="google-maps-link" className="font-medium">Google Maps Link</Label>
                  <Input id="google-maps-link" placeholder="Enter Google Maps URL" className="h-10" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Transit Information */}
          <div className="space-y-4">
            <div className="pb-2">
              <h3 className="text-lg font-medium mb-2">Transit Information</h3>
              <Separator className="w-full" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="bts" className="font-medium">BTS Station</Label>
                  <Input id="bts" placeholder="Nearest BTS station" className="h-10" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="mrt" className="font-medium">MRT Station</Label>
                  <Input id="mrt" placeholder="Nearest MRT station" className="h-10" />
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="arl" className="font-medium">ARL Station</Label>
                  <Input id="arl" placeholder="Nearest ARL station" className="h-10" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LocationTab; 