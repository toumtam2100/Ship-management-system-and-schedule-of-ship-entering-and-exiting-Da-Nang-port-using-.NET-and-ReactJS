import React from 'react';
import { Tag} from 'antd';
import { ManOutlined, WomanOutlined } from '@ant-design/icons';

interface SexTagProps {
    sex: boolean;
}

const SexTag: React.FC<SexTagProps> = ({ sex }) => {
    return (
        <Tag color={sex ? 'blue' : 'pink'}>
  {sex ? <ManOutlined /> : <WomanOutlined />}
  {sex ? ' Nam' : ' Nữ'}
</Tag>
    );
};

export default SexTag;
