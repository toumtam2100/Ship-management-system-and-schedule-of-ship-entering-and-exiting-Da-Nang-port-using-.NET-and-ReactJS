import { Input, Typography } from 'antd';
import React, { useState } from 'react';

interface CountryInputProps {
  onChange?: (setCountry: any) => void;
}

const CountryInput: React.FC<CountryInputProps> = ({ onChange }) => {
  const [country, setCountry] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setCountry(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <>
      <Typography style={{ color: '#01509A' }}>Quốc tịch</Typography>
      <Input placeholder="Nhập quốc tịch" maxLength={20} onChange={handleInputChange} style={{ width: '300px' }} />
    </>
  );
};

export default CountryInput;
