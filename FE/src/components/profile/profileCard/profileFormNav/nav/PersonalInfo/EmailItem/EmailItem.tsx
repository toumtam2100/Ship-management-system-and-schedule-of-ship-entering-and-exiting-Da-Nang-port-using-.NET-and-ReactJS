import React from 'react';
import { Typography, Input } from 'antd';

interface EmailItemProps {
  value?: string;
}

const EmailItem: React.FC<EmailItemProps> = ({ value }) => {
  return (
    <>
      <Typography style={{ color: '#01509A' }}>E-Mail</Typography>
      <Input disabled value={value} />
    </>
  );
};

export default EmailItem;
