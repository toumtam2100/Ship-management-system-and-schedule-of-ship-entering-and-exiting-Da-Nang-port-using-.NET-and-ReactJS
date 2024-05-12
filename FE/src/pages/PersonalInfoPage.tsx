import React from 'react';
import { PersonalInfo } from '@app/components/profile/profileCard/profileFormNav/nav/PersonalInfo/PersonalInfo';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';

const PersonalInfoPage: React.FC = () => {

  return (
    <>
      <PageTitle>Thông tin cá nhân</PageTitle>
      <PersonalInfo />
    </>
  );
};

export default PersonalInfoPage;
