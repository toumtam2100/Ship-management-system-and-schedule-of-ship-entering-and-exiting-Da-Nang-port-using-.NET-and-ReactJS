// MoreOptionMenu.tsx
import React from 'react';
import { Menu } from 'antd';
import { ShipTableRow } from '@app/api/shipTable.api';
import { deleteButtonStyle, editButtonStyle } from '../MoreOptionMenu.style';

interface MoreOptionMenuProps<T> {
    record: T;
    onViewDetail: (record: T) => void;
    onDeleteClick: (record: T) => void;
}

const MoreOptionMenu: React.FC<MoreOptionMenuProps<any>> = ({
    record,
    onViewDetail,
    onDeleteClick,
}) => (
    <Menu>
        <Menu.Item key="view" onClick={() => onViewDetail(record)} style={editButtonStyle}>
            Xem chi tiết
        </Menu.Item>
        <Menu.Item key="delete" onClick={() => onDeleteClick(record)} style={deleteButtonStyle}>
            Khóa
        </Menu.Item>
    </Menu>
);

export default MoreOptionMenu;
