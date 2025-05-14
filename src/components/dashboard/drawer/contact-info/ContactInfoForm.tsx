
import React from 'react';
import { Phone, Mail, User, Globe, Calendar } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';

type ContactInfoFormProps = {
  formData: {
    phone: string;
    email: string;
    additionalPhone: string;
    leadLineId: string;
    gender: string;
    nationality: string;
    birthday: string;
    occupation: string;
    hobbyInterest: string;
    estimateIncome: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRadioChange: (value: string) => void;
  handleSave: () => void;
  handleCancel: () => void;
};

const ContactInfoForm = ({
  formData,
  handleChange,
  handleRadioChange,
  handleSave,
  handleCancel
}: ContactInfoFormProps) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="flex items-center">
            <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
            <Label htmlFor="phone">Phone</Label>
          </div>
          <Input 
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone number"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center">
            <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
            <Label htmlFor="additionalPhone">Additional Phone</Label>
          </div>
          <Input
            id="additionalPhone"
            name="additionalPhone"
            value={formData.additionalPhone}
            onChange={handleChange}
            placeholder="Additional phone number"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="flex items-center">
            <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
            <Label htmlFor="email">Email</Label>
          </div>
          <Input 
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email address"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center">
            <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
            <Label htmlFor="leadLineId">LINE ID</Label>
          </div>
          <Input 
            id="leadLineId"
            name="leadLineId"
            value={formData.leadLineId}
            onChange={handleChange}
            placeholder="LINE ID"
          />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center">
          <User className="mr-2 h-4 w-4 text-muted-foreground" />
          <Label>Gender</Label>
        </div>
        <RadioGroup 
          value={formData.gender} 
          onValueChange={handleRadioChange}
          className="flex space-x-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="male" id="male" />
            <Label htmlFor="male">Male</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="female" id="female" />
            <Label htmlFor="female">Female</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="other" id="other" />
            <Label htmlFor="other">Other</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="flex items-center">
            <Globe className="mr-2 h-4 w-4 text-muted-foreground" />
            <Label htmlFor="nationality">Nationality</Label>
          </div>
          <Input 
            id="nationality"
            name="nationality"
            value={formData.nationality}
            onChange={handleChange}
            placeholder="Nationality"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center">
            <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
            <Label htmlFor="birthday">Birthday</Label>
          </div>
          <Input 
            id="birthday"
            name="birthday"
            type="date"
            value={formData.birthday}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="flex items-center">
            <User className="mr-2 h-4 w-4 text-muted-foreground" />
            <Label htmlFor="occupation">Occupation</Label>
          </div>
          <Input 
            id="occupation"
            name="occupation"
            value={formData.occupation}
            onChange={handleChange}
            placeholder="Occupation"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center">
            <User className="mr-2 h-4 w-4 text-muted-foreground" />
            <Label htmlFor="hobbyInterest">Hobby / Interest</Label>
          </div>
          <Input 
            id="hobbyInterest"
            name="hobbyInterest"
            value={formData.hobbyInterest}
            onChange={handleChange}
            placeholder="Hobby / Interest"
          />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center">
          <User className="mr-2 h-4 w-4 text-muted-foreground" />
          <Label htmlFor="estimateIncome">Estimated Income / Month</Label>
        </div>
        <Input 
          id="estimateIncome"
          name="estimateIncome"
          value={formData.estimateIncome}
          onChange={handleChange}
          placeholder="Estimated Income / Month"
        />
      </div>

      <div className="flex justify-end space-x-2 pt-2">
        <Button variant="outline" onClick={handleCancel}>
          Cancel
        </Button>
        <Button onClick={handleSave}>Save</Button>
      </div>
    </div>
  );
};

export default ContactInfoForm;
