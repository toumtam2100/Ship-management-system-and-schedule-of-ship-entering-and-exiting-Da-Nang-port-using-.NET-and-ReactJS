import React from 'react';
import { Button, Space } from 'antd';
import { buttonStyle } from './SaveAndCancelButton.style';

interface SaveAndCancelButtonProps {
    onSave: () => void;
    onCancel: () => void;
}

const SaveAndCancelButton: React.FC<SaveAndCancelButtonProps> = ({ onSave, onCancel }) => {
    return (
        <Space>
            <Button style={buttonStyle} size='small' type="primary" onClick={onSave}>
                Lưu
            </Button>
            <Button style={buttonStyle} size='small' type="primary" danger onClick={onCancel}>
                Hủy
            </Button>
        </Space>
    );
};

export default SaveAndCancelButton;