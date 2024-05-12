import { Input, Typography } from 'antd';
import React, { useState } from 'react';

interface ShipNameProps {
  onChange?: (setShipName: any) => void;
}

const ShipNameInput: React.FC<ShipNameProps> = ({ onChange }) => {
  const [shipName, setShipName] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setShipName(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <>
      <Typography style={{ color: '#01509A' }}>Tên tàu cá</Typography>
      <Input placeholder="Nhập tên tàu" maxLength={30} onChange={handleInputChange} />
    </>
  );
};

export default ShipNameInput;
