import React from 'react';
import { ClockCircleOutlined, ExclamationCircleOutlined, IssuesCloseOutlined, LoginOutlined, LogoutOutlined } from '@ant-design/icons';

import { ReactComponent as Military } from '@app/assets/icons/medal-ribbon-star.svg';
import { ReactComponent as Captain } from '@app/assets/icons/captain.svg';
import { ReactComponent as Calendar } from '@app/assets/icons/calendar_month.svg';
import { ReactComponent as Dashboard } from '@app/assets/icons/dashboard.svg';
import { ReactComponent as Moderator } from '@app/assets/icons/group_add_black_24dp.svg';
import { ReactComponent as Owner } from '@app/assets/icons/engineering_white_24dp.svg';
import { ReactComponent as Sailor } from '@app/assets/icons/groups_white_24dp.svg';
import { ReactComponent as Boat } from '@app/assets/icons/sailing_white_24dp.svg';
import { ReactComponent as Map } from '@app/assets/icons/explore_white_24dp.svg';
import { ReactComponent as ApproveEnterShip } from '@app/assets/icons/approve-enter-ship.svg';

export interface SidebarNavigationItem {
  title: string;
  key: string;
  url?: string;
  children?: SidebarNavigationItem[];
  icon?: React.ReactNode;
}

export const sidebarNavigation: SidebarNavigationItem[] = [
  {
    title: 'Trang chủ',
    key: 'dashboard',
    url: '/dashboard',
    icon: <Dashboard />,
  },
  {
    title: 'Quản lý cảng vụ',
    key: 'moderatorlist',
    url: '/moderator-management',
    icon: <Moderator />,
  },
  {
    title: 'Quản lý biên phòng',
    key: 'militarylist',
    url: '/border-guard-management',
    icon: <Military />,
  },
  {
    title: 'Lịch sử ra vào cảng',
    key: 'schedulelist',
    url: '/history',
    icon: <Calendar />,
  },
  {
    title: 'Các đơn được duyệt chưa khởi hành',
    key: 'nextjourney',
    url: '/nextjourney',
    icon: <IssuesCloseOutlined />,
  },
  {
    title: 'Các đơn chưa/không được duyệt',
    key: 'uncomplete',
    url: '/uncomplete',
    icon: <ClockCircleOutlined />,
  },
  {
    title: 'Quản lý thuyền trưởng',
    key: 'captainlist',
    url: '/captain-management',
    icon: <Captain />,
  },
  {
    title: 'Quản lý chủ tàu',
    key: 'ownerlist',
    url: '/ship-owner-management',
    icon: <Owner />,
  },
  {
    title: 'Quản lý thuyền viên',
    key: 'sailorlist',
    url: '/crew-member-management',
    icon: <Sailor />,
  },
  {
    title: 'Quản lý tàu',
    key: 'shiplist',
    url: '/ship-management',
    icon: <Boat />,
  },
  {
    title: 'Duyệt tàu vào cảng',
    key: 'approvearrivalship',
    url: 'approve-arrival-ship-management',
    icon: <ApproveEnterShip />
  },
  {
    title: 'Duyệt tàu rời cảng',
    key: 'approvedepartureship',
    url: 'approve-departure-ship-management',
    icon: <ExclamationCircleOutlined />
  },
  {
    title: 'Nhập tàu vào cảng',
    key: 'arrival-register',
    url: '/arrival-register',
    icon: <LoginOutlined />
  },
  {
    title: 'Nhập tàu rời cảng',
    key: 'departure-register',
    url: '/departure-register',
    icon: <LogoutOutlined />
  },
  {
    title: 'Theo dõi tọa độ tàu',
    key: 'map',
    url: '/map',
    icon: <Map />,
  },
];
