import React from 'react';
import { Button, Space, message } from 'antd';

interface ApproveCancelButtonProps {
    onApprove: () => void;
    onDeny: () => void;
}

const ApproveAndCancelButton: React.FC<ApproveCancelButtonProps> = ({ onApprove, onDeny }) => {
    return (
        <Space size={'large'}>
            <Button style={{ paddingLeft: 50, paddingRight: 50}} type="primary" onClick={onApprove}>
                Phê Duyệt
            </Button>
            <Button style={{ paddingLeft: 50, paddingRight: 50}} type="primary" danger onClick={onDeny}>
                Từ Chối
            </Button>
        </Space>
    );
};

export default ApproveAndCancelButton;
