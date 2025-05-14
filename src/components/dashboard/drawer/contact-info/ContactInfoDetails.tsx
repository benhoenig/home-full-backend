
import React from 'react';
import { Phone, Mail, User, Globe, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ContactInfoItem from './ContactInfoItem';

type ContactInfoDetailsProps = {
  phone?: string;
  email?: string;
  additionalPhone?: string;
  leadLineId?: string;
  gender?: string;
  nationality?: string;
  birthday?: string;
  occupation?: string;
  hobbyInterest?: string;
  estimateIncome?: string;
  onEditClick: () => void;
};

const ContactInfoDetails = ({
  phone,
  email,
  additionalPhone,
  leadLineId,
  gender,
  nationality,
  birthday,
  occupation,
  hobbyInterest,
  estimateIncome,
  onEditClick
}: ContactInfoDetailsProps) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ContactInfoItem 
          icon={<Phone className="mr-2 h-4 w-4" />}
          label="Phone"
          value={phone}
        />
        <ContactInfoItem 
          icon={<Phone className="mr-2 h-4 w-4" />}
          label="Additional Phone"
          value={additionalPhone}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ContactInfoItem 
          icon={<Mail className="mr-2 h-4 w-4" />}
          label="Email"
          value={email || 'example@email.com'}
        />
        <ContactInfoItem 
          icon={<Mail className="mr-2 h-4 w-4" />}
          label="LINE ID"
          value={leadLineId}
        />
      </div>

      <ContactInfoItem 
        icon={<User className="mr-2 h-4 w-4" />}
        label="Gender"
        value={gender ? gender.charAt(0).toUpperCase() + gender.slice(1) : undefined}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ContactInfoItem 
          icon={<Globe className="mr-2 h-4 w-4" />}
          label="Nationality"
          value={nationality}
        />
        <ContactInfoItem 
          icon={<Calendar className="mr-2 h-4 w-4" />}
          label="Birthday"
          value={birthday}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ContactInfoItem 
          icon={<User className="mr-2 h-4 w-4" />}
          label="Occupation"
          value={occupation}
        />
        <ContactInfoItem 
          icon={<User className="mr-2 h-4 w-4" />}
          label="Hobby / Interest"
          value={hobbyInterest}
        />
      </div>

      <ContactInfoItem 
        icon={<User className="mr-2 h-4 w-4" />}
        label="Estimated Income / Month"
        value={estimateIncome}
      />

      <Button 
        variant="outline" 
        size="sm" 
        onClick={onEditClick}
        className="mt-2"
      >
        Edit Contact Info
      </Button>
    </div>
  );
};

export default ContactInfoDetails;
