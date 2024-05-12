import React, { useEffect, useState } from 'react';
import { Spin } from 'antd';
import * as S from './ProfileInfo.styles';
import { BaseAvatar } from '@app/components/common/BaseAvatar/BaseAvatar';
import { LoadingOutlined } from '@ant-design/icons';
//import { UserModel } from './ProfileInfo.utils';
import { fetchUserData } from '../profileFormNav/nav/PersonalInfo/PersonalInfo.utils';

interface UserModel {
  fullName?: string;
  avatar?: string;
}

export const ProfileInfo: React.FC = () => {
  const [userData, setUserData] = useState<UserModel | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const idToken = localStorage.getItem('idToken');

  useEffect(() => {
    if (idToken) {
      setIsLoading(true);
      fetchUserData(idToken)
        .then((data) => {
          console.log(data);
          setUserData(data.result);
          console.log(data.result.fullName);
          console.log(data.result.avatar);

          setIsLoading(false);
        })
        .catch(() => setIsLoading(false));
    }
  }, [idToken]);

  return (
    <S.Wrapper>
      {userData && (
        <>
          <S.ImgWrapper>
            {isLoading ? (
              <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
            ) : (
              <BaseAvatar shape="circle" src={userData.avatar} alt="Profile" />
            )}
          </S.ImgWrapper>
          <S.Title>{userData.fullName}</S.Title>
        </>
      )}
    </S.Wrapper>
  );
};
