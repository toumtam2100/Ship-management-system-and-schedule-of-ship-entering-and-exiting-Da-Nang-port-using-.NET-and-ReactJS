import React from 'react';
import { ProfileDropdown } from '../components/profileDropdown/ProfileDropdown/ProfileDropdown';
import { SettingsDropdown } from '../components/settingsDropdown/SettingsDropdown';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { BaseCol } from '@app/components/common/BaseCol/BaseCol';

export const DesktopHeader: React.FC = () => {
  return (
    <BaseRow justify="end" align="middle" gutter={[5, 5]}>
      <BaseCol>
        <SettingsDropdown />
      </BaseCol>
      <BaseCol>
        <ProfileDropdown />
      </BaseCol>
    </BaseRow>
  );
};
