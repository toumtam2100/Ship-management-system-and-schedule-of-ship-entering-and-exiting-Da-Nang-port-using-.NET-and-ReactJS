// RegistrationTag.tsx

import React from 'react';
import { Tag } from 'antd';
import { registrationTagStyle } from './RegistrationTag.style';

interface RegistrationTagProps {
    deadlineRegistration: Date;
}

const RegistrationTag: React.FC<RegistrationTagProps> = ({ deadlineRegistration }) => {
    const now = new Date();
    const daysDifference = Math.floor((deadlineRegistration.getTime() - now.getTime()) / (24 * 60 * 60 * 1000));
    let color;
    let content;

    if (daysDifference >= 7) {
        color = '#24B24B';
        content = `${daysDifference} ngày`;
    } else if (daysDifference < 0) {
        color = '#DF1616';
        content = 'Đã hết hạn';
    } else if (daysDifference < 7) {
        color = '#E2B93B';
        content = `${daysDifference} ngày`;
    }

    return <Tag style={registrationTagStyle} color={color}>{content}</Tag>;
};

export default RegistrationTag;