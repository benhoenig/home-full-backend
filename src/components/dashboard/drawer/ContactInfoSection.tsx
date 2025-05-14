import React, { useState } from 'react';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { toast } from 'sonner';
import ContactInfoForm from './contact-info/ContactInfoForm';
import ContactInfoDetails from './contact-info/ContactInfoDetails';
import { Card, CardContent } from '@/components/ui/card';
import { Users } from 'lucide-react';

type ContactInfoProps = {
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
  onUpdate?: (data: Partial<ContactInfoProps>) => void;
};

const ContactInfoSection = ({ 
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
  onUpdate 
}: ContactInfoProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    phone: phone || '',
    email: email || '',
    additionalPhone: additionalPhone || '',
    leadLineId: leadLineId || '',
    gender: gender || '',
    nationality: nationality || '',
    birthday: birthday || '',
    occupation: occupation || '',
    hobbyInterest: hobbyInterest || '',
    estimateIncome: estimateIncome || ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (value: string) => {
    setFormData(prev => ({ ...prev, gender: value }));
  };

  const handleSave = () => {
    if (onUpdate) {
      onUpdate(formData);
    }
    setIsEditing(false);
    toast.success('Contact information updated');
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <AccordionItem value="contact-info">
      <AccordionTrigger className="text-base font-medium py-4 flex items-center">
        <div className="flex items-center">
          <Users className="mr-2 h-4 w-4" />
          Contact Information
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <Card className="border-0 shadow-none">
          <CardContent className="pt-4">
            {isEditing ? (
              <ContactInfoForm
                formData={formData}
                handleChange={handleChange}
                handleRadioChange={handleRadioChange}
                handleSave={handleSave}
                handleCancel={handleCancel}
              />
            ) : (
              <ContactInfoDetails
                phone={phone}
                email={email}
                additionalPhone={additionalPhone}
                leadLineId={leadLineId}
                gender={gender}
                nationality={nationality}
                birthday={birthday}
                occupation={occupation}
                hobbyInterest={hobbyInterest}
                estimateIncome={estimateIncome}
                onEditClick={() => setIsEditing(true)}
              />
            )}
          </CardContent>
        </Card>
      </AccordionContent>
    </AccordionItem>
  );
};

export default ContactInfoSection;
