import { Input, Typography } from 'antd';
import React, { useState } from 'react';

interface UserNameInputProps {
  onChange?: (setUserName: any) => void;
}

const UserNameInput: React.FC<UserNameInputProps> = ({ onChange }) => {
  const [userName, setUserName] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setUserName(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <>
      <Typography style={{ color: '#01509A' }}>Tài khoản</Typography>
      <Input
        placeholder="Nhập tài khoản (ví dụ CuongTM01)"
        maxLength={30}
        onChange={handleInputChange}
        style={{ width: '300px' }}
      />
    </>
  );
};

export default UserNameInput;
