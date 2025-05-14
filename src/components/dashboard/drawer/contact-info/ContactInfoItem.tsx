
import React from 'react';

type ContactInfoItemProps = {
  icon: React.ReactNode;
  label: string;
  value: string | null | undefined;
};

const ContactInfoItem = ({ icon, label, value }: ContactInfoItemProps) => {
  return (
    <div>
      <label className="text-sm text-muted-foreground flex items-center">
        {icon}
        {label}
      </label>
      <p className="font-medium">{value || 'N/A'}</p>
    </div>
  );
};

export default ContactInfoItem;
