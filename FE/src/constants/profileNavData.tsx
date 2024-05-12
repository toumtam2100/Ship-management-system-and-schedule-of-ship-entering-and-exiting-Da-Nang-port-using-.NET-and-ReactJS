import { PictureOutlined, SafetyOutlined, UserOutlined } from '@ant-design/icons';
import React from 'react';

interface ProfileNavItem {
  id: number;
  name: string;
  icon: React.ReactNode;
  //color: 'primary' | 'error' | 'warning' | 'success';
  href: string;
}

export const profileNavData: ProfileNavItem[] = [
  {
    id: 1,
    name: 'Thông tin cá nhân',
    icon: <UserOutlined />,
    href: 'personal-info',
  },
  // {
  //   id: 2,
  //   name: 'Bảo mật',
  //   icon: <SafetyOutlined />,
  //   color: 'success',
  //   href: 'security-settings',
  // },
  {
    id: 2,
    name: 'Ảnh đại diện',
    icon: <PictureOutlined />,
    href: 'avatar-setting',
  },
  // {
  //   id: 4,
  //   name: 'profile.nav.payments.title',
  //   icon: <DollarOutlined />,
  //   color: 'warning',
  //   href: 'payments',
  // },
];
