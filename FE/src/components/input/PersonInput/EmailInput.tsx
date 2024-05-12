import { Input, Typography } from 'antd';
import React, { useState } from 'react';

interface EmailInputProps {
  onChange?: (setEmail: any) => void;
}

const EmailInput: React.FC<EmailInputProps> = ({ onChange }) => {
  const [email, setEmail] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setEmail(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <>
      <Typography style={{ color: '#01509A' }}>Email</Typography>
      <Input placeholder="Nhập địa chỉ email" maxLength={30} onChange={handleInputChange} style={{ width: '300px' }} />
    </>
  );
};

export default EmailInput;
