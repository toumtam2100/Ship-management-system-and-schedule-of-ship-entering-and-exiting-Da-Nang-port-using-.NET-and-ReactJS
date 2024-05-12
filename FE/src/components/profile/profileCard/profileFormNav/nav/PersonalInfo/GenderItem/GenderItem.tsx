// GenderItem.tsx
import React, { useState, useEffect } from 'react';
import { Typography, Select } from 'antd';

interface GenderItemProps {
  initialValue: string; // The initial gender value
  onUpdate: (newGender: string) => void; // Callback to update the parent component
}

const GenderItem: React.FC<GenderItemProps> = ({ initialValue, onUpdate }) => {
  const [gender, setGender] = useState(initialValue);

  // Handle changes to the gender Select component
  const handleGenderChange = (newGender: string) => {
    setGender(newGender); // Update local state
    onUpdate(newGender); // Notify parent of change
  };

  // If the initialValue prop changes (e.g., fetched from an API), update the state
  useEffect(() => {
    setGender(initialValue);
  }, [initialValue]);

  return (
    <>
      <Typography style={{ color: '#01509A' }}>Giới tính</Typography>
      <Select
        style={{ width: '100%' }}
        value={gender}
        onChange={handleGenderChange}
        options={[
          { value: 'Male', label: 'Nam' },
          { value: 'Female', label: 'Nữ' },
        ]}
      />
    </>
  );
};

export default GenderItem;
