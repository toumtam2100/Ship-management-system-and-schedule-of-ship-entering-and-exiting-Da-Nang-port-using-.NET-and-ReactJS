import React from 'react';
import { Notifications } from './nav/notifications/Notifications/Notifications';
import { PersonalInfo } from './nav/PersonalInfo/PersonalInfo';
import { SecuritySettings } from './nav/SecuritySettings/SecuritySettings';
import AvatarSetting from './nav/avatar/AvatarSetting';

interface ProfileFormNavProps {
  menu: string;
}

export const ProfileFormNav: React.FC<ProfileFormNavProps> = ({ menu }) => {
  let currentMenu;

  switch (menu) {
    case 'info': {
      currentMenu = <PersonalInfo />;
      break;
    }

    case 'security': {
      currentMenu = <SecuritySettings />;
      break;
    }

    case 'avatar': {
      currentMenu = <AvatarSetting />;
      break;
    }
    
    default: {
      currentMenu = null;
    }
  }

  return currentMenu;
};
