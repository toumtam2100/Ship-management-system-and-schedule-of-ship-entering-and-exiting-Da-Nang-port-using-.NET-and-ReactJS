import React from 'react';
import { Typography, InputNumber } from 'antd';

interface GTInputProps {
  onChange?: (value: string) => void;
}

const GTInput: React.FC<GTInputProps> = ({ onChange }) => {
  return (
    <div>
      <Typography style={{ color: '#01509A' }}>Tổng trọng tải (tấn)</Typography>
      <InputNumber
        placeholder="Nhập vào tổng trọng tải..."
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

export default GTInput;