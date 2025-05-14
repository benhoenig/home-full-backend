
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Calendar, FileIcon } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { ClosingFormValues } from './types';

type TransferSectionProps = {
  form: UseFormReturn<ClosingFormValues>;
  isWin: boolean;
  onToggleWin: (checked: boolean) => void;
};

const TransferSection = ({ form, isWin, onToggleWin }: TransferSectionProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Transfer Details :</h3>
      
      <Card className="border rounded-md shadow-sm">
        <CardContent className="p-4 bg-slate-50">
          <div className="space-y-4">
            {/* Loan Checkbox */}
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="loan" 
                checked={form.watch("hasLoan")}
                onCheckedChange={(checked) => 
                  form.setValue("hasLoan", checked as boolean)
                }
              />
              <Label htmlFor="loan">Loan</Label>
            </div>
            
            {/* Bank (Multiple Selection) */}
            <div className="space-y-2">
              <Label htmlFor="banks">Banks</Label>
              <Select>
                <SelectTrigger id="banks" className="bg-white">
                  <SelectValue placeholder="Select banks" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bank-a">Bank A</SelectItem>
                  <SelectItem value="bank-b">Bank B</SelectItem>
                  <SelectItem value="bank-c">Bank C</SelectItem>
                  <SelectItem value="bank-d">Bank D</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Bank Loan (Single Select) */}
            <div className="space-y-2">
              <Label htmlFor="bank-loan">Bank Loan</Label>
              <Select 
                onValueChange={(value) => form.setValue("bankLoan", value)}
                value={form.watch("bankLoan")}
              >
                <SelectTrigger id="bank-loan" className="bg-white">
                  <SelectValue placeholder="Select bank loan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="loan-a">Loan Type A</SelectItem>
                  <SelectItem value="loan-b">Loan Type B</SelectItem>
                  <SelectItem value="loan-c">Loan Type C</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Transfer Date */}
            <div className="space-y-2">
              <Label htmlFor="transfer-date">Transfer Date</Label>
              <div className="relative">
                <Input 
                  id="transfer-date" 
                  type="date" 
                  className="bg-white" 
                  {...form.register("transferDate")}
                />
                <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
            
            {/* Win Toggle */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="win-toggle">Complete Case</Label>
                <p className="text-sm text-gray-500">
                  Mark as win and update pipeline stage
                </p>
              </div>
              <Switch
                id="win-toggle"
                checked={isWin}
                onCheckedChange={onToggleWin}
              />
            </div>
            
            {/* File Attachment */}
            <div className="space-y-2">
              <Label>Transfer Documents</Label>
              <div className="flex items-center gap-2">
                <Button variant="outline" className="w-full">
                  <FileIcon className="mr-2 h-4 w-4" />
                  Attach Files
                </Button>
              </div>
            </div>
            
            <Button className="w-full">Save Transfer Details</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TransferSection;
