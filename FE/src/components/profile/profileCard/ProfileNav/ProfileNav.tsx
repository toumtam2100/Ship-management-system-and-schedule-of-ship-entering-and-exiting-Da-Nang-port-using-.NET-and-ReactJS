import React from 'react';
import { profileNavData } from '@app/constants/profileNavData';
import { useNavigate } from 'react-router-dom';
import * as S from './ProfileNav.styles';
import { Button } from 'antd';

export const ProfileNav: React.FC = () => {
  const navigate = useNavigate();

  return (
    <S.Wrapper>
      {profileNavData.map((item, index) => (
        <Button key={index} icon={item.icon} onClick={() => navigate(item.href)}>
          {item.name}
        </Button>
      ))}
    </S.Wrapper>
  );
};
