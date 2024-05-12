import { RollbackOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';


const BackButton: React.FC = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <Button size='small' type="ghost" onClick={handleBack}>
            <RollbackOutlined /> Quay lại
        </Button>
    );
};

export default BackButton;