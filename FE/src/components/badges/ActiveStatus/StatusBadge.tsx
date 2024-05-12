import React from 'react';
import { Badge } from 'antd';
import { statusStyle } from './StatusBadge.style';

interface StatusBadgeProps {
    text: boolean;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ text }) => {
    const statusText = text === true ? 'Đã Khóa' : 'Hoạt Động';
    const status = text === true ? 'default' : 'success';

    return (
        <>
            <Badge style={statusStyle} status={status} />
            {statusText}
        </>
    );
};

export default StatusBadge;