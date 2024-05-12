import React, { useState } from 'react';
import { Typography, Input } from 'antd';

// const { Text } = Typography;

interface IMOInputProps {
  onChange?: (value: string) => void;
}

const IMOInput: React.FC<IMOInputProps> = ({ onChange }) => {
  const [value, setValue] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/\D/g, ''); 
    setValue(inputValue);
    if (onChange) {
      onChange(inputValue ? `IMO${inputValue}` : '');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div>
        <Typography style={{ color: '#01509A' }}>Số IMO</Typography>
        <Input
          type="text"
          placeholder="Nhập số IMO của tàu..."
          onChange={handleChange}
          value={value}
          style={{ width: 340 }}
        />
      </div>
    </div>
  );
};

export default IMOInput;
