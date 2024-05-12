import { DownloadOutlined } from '@ant-design/icons';
import { Button, Popover } from 'antd';
import React from 'react';

const ImportDataButton: React.FC = () => {
  return (
    <Popover placement='bottom' content={<div>Hiện tại chúng tôi chưa hỗ trợ chức năng này</div>}>
    <Button disabled size="small" icon={<DownloadOutlined />}>
      Nhập thông tin
    </Button>
    </Popover>
  );
};

export default ImportDataButton;