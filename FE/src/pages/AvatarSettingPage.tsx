import React from 'react';
import AvatarSetting from '@app/components/profile/profileCard/profileFormNav/nav/avatar/AvatarSetting';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';

const AvatarSettingPage: React.FC = () => {
  return (
    <>
      <PageTitle>Thay đổi ảnh đại diện</PageTitle>
      <AvatarSetting />
    </>
  );
};

export default AvatarSettingPage;
