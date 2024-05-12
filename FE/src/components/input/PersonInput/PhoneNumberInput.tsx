import { Input, Typography } from 'antd';
import React, { useState } from 'react';

interface PhoneNumberInputProps {
  onChange?: (setPhoneNumber: any) => void;
}

const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({ onChange }) => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (!newValue || /^\d+$/.test(newValue)) {
      setPhoneNumber(newValue);
      if (onChange) {
        onChange(`+84` + newValue);
      }
    }
  };

  return (
    <>
      <Typography style={{ color: '#01509A' }}>Số điện thoại người thân</Typography>
      <Input
        addonBefore="+84"
        placeholder="Nhập số điện thoại"
        maxLength={10}
        value={phoneNumber}
        onChange={handleInputChange}
        style={{ width: '300px' }}
      />
    </>
  );
};

export default PhoneNumberInput;
