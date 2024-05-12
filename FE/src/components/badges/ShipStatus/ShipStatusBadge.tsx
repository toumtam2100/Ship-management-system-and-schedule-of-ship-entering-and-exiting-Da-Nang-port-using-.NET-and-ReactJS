import React from 'react';
import { Badge } from 'antd';

interface ShipStatusBadgeProps {
    text: boolean;
}

const ShipStatusBadge: React.FC<ShipStatusBadgeProps> = ({ text }) => {
    const statusText = text === true ? 'Đã cập cảng' : 'Đang ra khơi';
    const status = text === true ? 'success' : 'processing';

    return (
        <>
            <Badge  status={status} />
            {statusText}
        </>
    );
};

export default ShipStatusBadge;
