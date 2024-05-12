import React from 'react';
import { Tag, Badge } from 'antd';

interface StatusTagProps {
    status: boolean;
}

const StatusTag: React.FC<StatusTagProps> = ({ status }) => {
    return (
        <Tag color={status === true ? 'default' : 'success'}>
            <Badge status={status === true ? 'default' : 'success'} />
            {status === true ? ' Đã Khóa' : ' Hoạt động'}
        </Tag>
    );
};

export default StatusTag;
