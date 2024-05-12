import React from 'react';
import { ManOutlined, WomanOutlined } from '@ant-design/icons';
import { BaseSelect, Option } from '@app/components/common/selects/BaseSelect/BaseSelect';
import { BaseSpace } from '@app/components/common/BaseSpace/BaseSpace';
import { Typography } from 'antd';

interface SexItemProps {
  value?: string;
  onChange?: (value: unknown, option: any) => void;
}

export const SexItem: React.FC<SexItemProps> = ({ value, onChange }) => {
  return (
    <>
      <Typography style={{ color: '#01509A' }}>Giới tính</Typography>
      <BaseSelect value={value} onChange={onChange} style={{ width: '120px' }}>
        <Option value="male">
          <BaseSpace align="center">
            <ManOutlined />
            {'Nam'}
          </BaseSpace>
        </Option>
        <Option value="female">
          <BaseSpace align="center">
            <WomanOutlined />
            {'Nữ'}
          </BaseSpace>
        </Option>
      </BaseSelect>
    </>
  );
};
