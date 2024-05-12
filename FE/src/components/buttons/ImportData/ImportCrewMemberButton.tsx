import { DownloadOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';

const ImportCrewMemberButton: React.FC = () => {
  return (
    <Button size="small" icon={<DownloadOutlined />}>
      Nhập thông tin
    </Button>
  );
};

export default ImportCrewMemberButton;