import React, { useEffect, useState } from 'react';
import { ProfileOverlay } from '../ProfileOverlay/ProfileOverlay';
import { useAppSelector } from '@app/hooks/reduxHooks';
import { useResponsive } from '@app/hooks/useResponsive';
import * as S from './ProfileDropdown.styles';
import { BasePopover } from '@app/components/common/BasePopover/BasePopover';
import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { BaseAvatar } from '@app/components/common/BaseAvatar/BaseAvatar';
import { fetchUserData } from '@app/components/profile/profileCard/profileFormNav/nav/PersonalInfo/PersonalInfo.utils';

interface UserModel {
  fullName?: string;
  avatar?: string;
}

export const ProfileDropdown: React.FC = () => {
  const { isTablet } = useResponsive();
  // const [fullname,setfullname] =useState<any>(null);
  const [userData, setUserData] = useState<UserModel | null>(null);
  const fullName = localStorage.getItem('fullName');
  const idToken = localStorage.getItem('idToken');

  useEffect(() => {
    if(idToken) {
      fetchUserData(idToken)
      .then((data) => {
        setUserData(data.result);
      })
    }
  }, [idToken]);

  return (
    <BasePopover content={<ProfileOverlay />} trigger="click">
      <S.ProfileDropdownHeader as={BaseRow} gutter={[10, 10]} align="middle">
        <BaseCol>
          <BaseAvatar src={userData?.avatar} alt="User" shape="circle" size={40} />
        </BaseCol>
        {isTablet && (
          <BaseCol>
            <span>{userData?.fullName}</span>
          </BaseCol>
        )}
      </S.ProfileDropdownHeader>
    </BasePopover>
  );
};
