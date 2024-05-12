// FullNameItem.tsx
import React from 'react';
import { Input, Typography } from 'antd';

interface FullNameProps {
  value?: string;
  onUpdate: (newFullName: string) => void; // Callback to update the parent component
}

const FullNameItem: React.FC<FullNameProps> = ({ value, onUpdate }) => {
  // Handler for when the text in the input field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Call the onUpdate function provided via props with the new value
    onUpdate(e.target.value);
  };

  return (
    <>
      <Typography style={{ color: '#01509A' }}>Họ và tên</Typography>
      <Input
        maxLength={30}
        value={value}
        onChange={handleChange} // Use the local handleChange function
      />
    </>
  );
};

export default FullNameItem;
