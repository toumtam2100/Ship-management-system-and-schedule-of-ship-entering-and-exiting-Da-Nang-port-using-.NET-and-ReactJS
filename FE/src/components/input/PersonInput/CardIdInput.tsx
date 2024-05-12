import { Input, Typography } from 'antd';
import React, { useState } from 'react';

interface CardIdInputProps {
  onChange?: (setCardId: any) => void;
}

const CardIdInput: React.FC<CardIdInputProps> = ({ onChange }) => {
  const [cardId, setCardId] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (!newValue || /^\d+$/.test(newValue)) {
      setCardId(newValue);
      if (onChange) {
        onChange(newValue);
      }
    }
  };

  return (
    <>
      <Typography style={{ color: '#01509A' }}>Căn cước công dân</Typography>
      <Input
        placeholder="Nhập số căn cước công dân..."
        maxLength={12}
        onChange={handleInputChange}
        value={cardId}
        style={{ width: '300px' }}
      />
    </>
  );
};

export default CardIdInput;
