import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const LocationTab: React.FC = () => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="zone-area">Zone/Area*</Label>
              <Select>
                <SelectTrigger id="zone-area">
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
              <Label htmlFor="location-grade">Location Grade</Label>
              <Select>
                <SelectTrigger id="location-grade">
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
              <Label htmlFor="bts">BTS Station</Label>
              <Input id="bts" placeholder="Nearest BTS station" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="mrt">MRT Station</Label>
              <Input id="mrt" placeholder="Nearest MRT station" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="arl">ARL Station</Label>
              <Input id="arl" placeholder="Nearest ARL station" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="google-maps-link">Google Maps Link</Label>
              <Input id="google-maps-link" placeholder="Enter Google Maps URL" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LocationTab; 