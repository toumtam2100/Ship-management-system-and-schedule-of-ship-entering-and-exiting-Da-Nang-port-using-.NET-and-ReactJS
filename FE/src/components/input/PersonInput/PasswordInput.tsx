import { ReloadOutlined } from '@ant-design/icons';
import { Button, Input, InputNumber, Typography } from 'antd';
import React, { useState } from 'react';

interface PasswordInputProps {
  onChange?: (setPassword: any) => void;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ onChange }) => {
  const [password, setPassword] = useState('');
  const [passwordLength, setPasswordLength] = useState(8);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setPassword(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  const handleLengthChange = (value: number | null) => {
    if (value !== null) {
      setPasswordLength(value);
    }
  };

  const generatePassword = () => {
    const length = passwordLength;
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const specialCharset = '!@#$%^&*()_+~`|}{[]:;?><,./-=';
    let retVal = '';
    retVal += charset.charAt(Math.floor(Math.random() * 26)); // Lowercase
    retVal += charset.charAt(Math.floor(Math.random() * 26) + 26); // Uppercase
    retVal += charset.charAt(Math.floor(Math.random() * 10) + 52); // Number
    retVal += specialCharset.charAt(Math.floor(Math.random() * specialCharset.length)); // Special character
    for (let i = 4, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    // Shuffle the string to make the password random
    retVal = retVal
      .split('')
      .sort(() => 0.5 - Math.random())
      .join('');
    setPassword(retVal);
    if (onChange) {
      onChange(retVal);
    }
  };

  return (
    <>
      <Typography style={{ color: '#01509A' }}>Mật khẩu</Typography>
      <Input.Password
        placeholder="Nhập mật khẩu"
        maxLength={30}
        onChange={handleInputChange}
        value={password}
        style={{ width: '300px' }}
      />
      <InputNumber
        style={{ marginLeft: '6px', width: '60px' }}
        min={8}
        max={30}
        defaultValue={8}
        onChange={handleLengthChange}
      />
      <Button
        style={{ marginLeft: '4px' }}
        type="primary"
        shape="circle"
        icon={<ReloadOutlined />}
        onClick={generatePassword}
      />
    </>
  );
};

export default PasswordInput;
