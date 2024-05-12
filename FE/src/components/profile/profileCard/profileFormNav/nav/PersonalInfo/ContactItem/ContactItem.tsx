// ContactItem.tsx
import React, { useEffect, useState } from 'react';
import { Typography, Input } from 'antd';

interface ContactItemProps {
  addonBefore?: string;
  phoneNumber: string;
  onPhoneNumberChange: (newPhoneNumber: string) => void;
}

const ContactItem: React.FC<ContactItemProps> = ({ addonBefore, phoneNumber, onPhoneNumberChange }) => {
  // Local state for the country code and local number parts of the phone number
  const [countryCode, setCountryCode] = useState<string>('');
  const [localNumber, setLocalNumber] = useState<string>('');

  // Effect to update local state when phoneNumber prop changes
  useEffect(() => {
    setCountryCode(phoneNumber.slice(0, 3));
    setLocalNumber(phoneNumber.slice(3));
  }, [phoneNumber]);

  const handleLocalNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newLocalNumber = e.target.value;
    setLocalNumber(newLocalNumber); // Update the local number state
    onPhoneNumberChange(countryCode + newLocalNumber); // Call the passed in handler to update the full phone number
  };

  return (
    <>
      <Typography style={{ color: '#01509A' }}>Liên lạc</Typography>
      <Input addonBefore={addonBefore} value={localNumber} onChange={handleLocalNumberChange} />
    </>
  );
};

export default ContactItem;
