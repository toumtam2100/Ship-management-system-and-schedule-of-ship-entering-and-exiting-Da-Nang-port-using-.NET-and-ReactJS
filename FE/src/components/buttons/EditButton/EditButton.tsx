import { Button } from 'antd';
import React from 'react';
import { editButtonStyle } from './EditButton.style';

const EditButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
    return (
        <Button style={editButtonStyle} size="small" type="primary" onClick={onClick}>
            Chỉnh sửa thông tin
        </Button>
    );
};

export default EditButton;
