import React from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'; 

interface RegisterButtonProps {
    onClick: () => void;
    buttonText?: string;
}

const RegisterButton: React.FC<RegisterButtonProps> = ({ onClick, buttonText }) => {
    return (
        <Button type="primary" onClick={onClick}>
            <PlusOutlined /> {buttonText}
        </Button>
    );
};

export default RegisterButton;