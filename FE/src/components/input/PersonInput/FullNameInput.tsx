import { Input, Typography } from 'antd';
import React, { useState } from 'react';

interface FullNameProps {
  onChange?: (setFullName: any) => void;
}

const FullNameInput: React.FC<FullNameProps> = ({ onChange }) => {
  const [fullName, setFullName] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setFullName(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <>
      <Typography style={{ color: '#01509A' }}>Họ và tên</Typography>
      <Input placeholder="Nhập họ và tên" maxLength={30} onChange={handleInputChange} style={{ width: '300px' }} />
    </>
  );
};

export default FullNameInput;
