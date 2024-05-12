import { Input, Typography } from 'antd';
import React, { useState } from 'react';

interface AddressInputProps {
  onChange?: (setAddress: any) => void;
}

const AddressInput: React.FC<AddressInputProps> = ({ onChange }) => {
  const [address, setAddress] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setAddress(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <>
      <Typography style={{ color: '#01509A' }}>Địa chỉ</Typography>
      <Input placeholder="Nhập địa chỉ" maxLength={30} onChange={handleInputChange} style={{ width: '300px' }} />
    </>
  );
};

export default AddressInput;
