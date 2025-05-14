import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { ClosingFormValues } from './types';

type ClosingDetailsSectionProps = {
  form: UseFormReturn<ClosingFormValues>;
  linkedUnit: string;
};

const ClosingDetailsSection = ({
  form,
  linkedUnit
}: ClosingDetailsSectionProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-end mb-2">
        <Button variant="outline" size="sm">
          Update Status
        </Button>
      </div>
      
      {/* Grid layout for form fields with labels above inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Reserve Amount */}
        <div className="space-y-2">
          <Label htmlFor="reserve-amount">Reserve Amount</Label>
          <Input id="reserve-amount" type="text" placeholder="Enter reserve amount" {...form.register("reserveAmount")} />
        </div>
        
        {/* Closing Date */}
        <div className="space-y-2">
          <Label htmlFor="closing-date">Closing Date</Label>
          <div className="relative">
            <Input id="closing-date" type="date" {...form.register("closingDate")} />
            <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
        
        {/* Deposit Amount */}
        <div className="space-y-2">
          <Label htmlFor="deposit-amount">Deposit Amount</Label>
          <Input id="deposit-amount" type="text" placeholder="Enter deposit amount" {...form.register("depositAmount")} />
        </div>
        
        {/* Agreement Signing Date */}
        <div className="space-y-2">
          <Label htmlFor="agreement-date">Agreement Signing Date</Label>
          <div className="relative">
            <Input id="agreement-date" type="date" {...form.register("agreementSigningDate")} />
            <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
        
        {/* Closing Price */}
        <div className="space-y-2">
          <Label htmlFor="closing-price">Closing Price</Label>
          <Input id="closing-price" type="text" placeholder="Enter closing price" {...form.register("closingPrice")} />
        </div>
        
        {/* Commission */}
        <div className="space-y-2">
          <Label htmlFor="commission">Commission</Label>
          <Input id="commission" type="text" placeholder="Enter commission amount" {...form.register("commission")} />
        </div>
        
        {/* Closing Unit */}
        <div className="space-y-2 col-span-2">
          <Label htmlFor="closing-unit">Closing Unit</Label>
          <Input id="closing-unit" type="text" value={linkedUnit} readOnly {...form.register("closingUnit")} />
          <p className="text-xs text-gray-500 mt-1">
            Linked to tagged listing in activity
          </p>
        </div>
      </div>
      
      <Button className="w-full mt-4">Save Closing Details</Button>
    </div>
  );
};

export default ClosingDetailsSection;
