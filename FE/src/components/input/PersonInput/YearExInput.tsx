import { InputNumber, Typography } from 'antd';
import React, { useState } from 'react';

interface YearExInputProps {
  onChange?: (value: number | undefined) => void;
}

const YearExInput: React.FC<YearExInputProps> = ({ onChange }) => {
  const [yearEx, setYearEx] = useState<number | undefined>(undefined);

  const handleInputChange = (value: number | undefined) => {
    setYearEx(value);
    if (onChange) {
      onChange(value);
    }
  };

  const formatYear = (value: number | undefined) => {
    if (value !== undefined) {
      return `${value} Năm`;
    }
    return '';
  };

  return (
    <>
      <Typography style={{ color: '#01509A' }}>Năm kinh nghiệm</Typography>
      <InputNumber
        min={0}
        max={50}
        defaultValue={0}
        onChange={handleInputChange as any} // Type assertion
        formatter={formatYear}
        style={{ width: '300px' }}
      />
    </>
  );
};

export default YearExInput;
