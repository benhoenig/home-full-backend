import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { DollarSign } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const PriceTab: React.FC = () => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="asking-price">Asking Price*</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input id="asking-price" type="number" min="0" placeholder="0" className="pl-10" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="net-price">Net Price*</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input id="net-price" type="number" min="0" placeholder="0" className="pl-10" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="rental-price">Rental Price</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input id="rental-price" type="number" min="0" placeholder="0" className="pl-10" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="price-remark">Price Remark</Label>
              <Select>
                <SelectTrigger id="price-remark">
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
            {/* Calculated prices (read-only) */}
            <div className="space-y-2">
              <Label htmlFor="price-per-sqw">Price per Sq. Wah</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input id="price-per-sqw" type="number" readOnly className="pl-10 bg-gray-50" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="price-per-sqm">Price per Sq. Meter</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input id="price-per-sqm" type="number" readOnly className="pl-10 bg-gray-50" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="price-per-usable-area">Price per Usable Area</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input id="price-per-usable-area" type="number" readOnly className="pl-10 bg-gray-50" />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PriceTab; 