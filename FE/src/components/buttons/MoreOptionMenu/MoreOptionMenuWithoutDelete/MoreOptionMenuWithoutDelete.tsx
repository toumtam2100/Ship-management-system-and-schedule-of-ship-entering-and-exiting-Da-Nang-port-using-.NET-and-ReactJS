import React from 'react';
import { Menu } from 'antd';
import { ShipTableRow } from '@app/api/shipTable.api';
import { editButtonStyle } from '../MoreOptionMenu.style';

interface MoreOptionMenuWithoutDeleteProps<T> {
    record: T;
    onViewDetail: (record: T) => void;
}

const MoreOptionMenuWithoutDelete: React.FC<MoreOptionMenuWithoutDeleteProps<any>> = ({
    record,
    onViewDetail,
}) => (
    <Menu>
        <Menu.Item key="view" onClick={() => onViewDetail(record)} style={editButtonStyle}>
            Xem chi tiết
        </Menu.Item>
    </Menu>
);

export default MoreOptionMenuWithoutDelete;
