import React, { useState } from 'react';
import { InputNumber, Typography } from 'antd';

interface ClassNumberInputProps {
  onChange?: (value: string) => void;
}

const ClassNumberInput: React.FC<ClassNumberInputProps> = ({ onChange }) => {
  const [value, setValue] = useState<number | null>(null);

  const handleChange = (inputValue: number | null) => {
    setValue(inputValue);
    if (onChange && inputValue !== null) {
      onChange(`VR${inputValue}`);
    }
  };

  return (
    <>
      <Typography style={{ color: '#01509A' }}>Số phân cấp</Typography>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Typography style={{ marginRight: '5px' }}>VR - </Typography>
        <InputNumber
          maxLength={6}
          controls={false}
          style={{ width: '300px' }}
          placeholder="Nhập vào số phân cấp"
          onChange={handleChange}
          value={value}
        />
      </div>
    </>
  );
};

export default ClassNumberInput;
