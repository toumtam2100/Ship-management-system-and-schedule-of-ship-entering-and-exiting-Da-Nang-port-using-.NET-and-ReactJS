import React from 'react';
import { Typography, Input } from 'antd';

interface NationalIDItemProps {
  nationalId?: string;
}

const NationalIDItem: React.FC<NationalIDItemProps> = ({ nationalId }) => {
  return (
    <>
      <Typography>Căn cước công dân</Typography>
      <Input disabled value={nationalId} />
    </>
  );
};

export default NationalIDItem;
