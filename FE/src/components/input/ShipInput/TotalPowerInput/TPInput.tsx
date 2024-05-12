import React from 'react';
import { Typography, InputNumber } from 'antd';

interface TPInputProps {
  onChange?: (value: string) => void;
}

const TPInput: React.FC<TPInputProps> = ({ onChange }) => {
  return (
    <div>
      <Typography>Tổng công suất (kW)</Typography>
      <InputNumber
        placeholder="Nhập vào tổng công suất..."
        controls={false}
        style={{ width: '100%' }}
        onChange={(value) => {
          const stringValue = (value !== undefined && value !== null) ? value.toString() : '';
          if (onChange) {
            onChange(stringValue);
          }
        }}
      />
    </div>
  );
};

export default TPInput;
