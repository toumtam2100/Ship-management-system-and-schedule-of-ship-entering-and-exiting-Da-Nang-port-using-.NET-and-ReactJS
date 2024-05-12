import { InputNumber, Typography } from 'antd';
import React from 'react';

interface ShipLengthInputProps {
  onChange?: (value: string) => void;
}

const ShipLengthInput: React.FC<ShipLengthInputProps> = ({ onChange }) => {
  return (
    <>
      <Typography style={{ color: '#01509A' }}>Chiều dài (mét)</Typography>
      <InputNumber
        controls={false}
        placeholder="Nhập vào chiều dài tàu..."
        style={{ width: '100%' }}
        onChange={(value) => {
          const stringValue = value !== undefined && value !== null ? value.toString() : '';
          if (onChange) {
            onChange(stringValue);
          }
        }}
      />
    </>
  );
};

export default ShipLengthInput;
