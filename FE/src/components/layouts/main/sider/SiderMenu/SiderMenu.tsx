import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import * as S from './SiderMenu.styles';
import { sidebarNavigation, SidebarNavigationItem } from '../sidebarNavigation';


interface SiderContentProps {
  setCollapsed: (isCollapsed: boolean) => void;
}

const SiderMenu: React.FC<SiderContentProps> = ({ setCollapsed }) => {
  const role = localStorage.getItem('role')
  const roleType = localStorage.getItem('roleType')
  // console.log('Sidebarrole' + username1);
  const { t } = useTranslation();
  const location = useLocation();

  let filteredSidebarNavigation = sidebarNavigation;

  if (role === 'Military' && roleType === 'Admin') {
    // If username is 'None', filter out all items except 'moderatorlist', 'militarylist'
    filteredSidebarNavigation = sidebarNavigation.filter(
      (item) =>  item.key === 'militarylist'
    );
  } 
  else if (role === 'PortAuthority' && roleType === 'Admin') {
    // If username is 'PortAuthority', filter out 'moderatorlist', 'militarylist'
    filteredSidebarNavigation = sidebarNavigation.filter(
      (item) =>  item.key === 'moderatorlist' || item.key === 'dashboard'
    );}
  else if (role === 'PortAuthority') {
    // If username is 'PortAuthority', filter out 'moderatorlist', 'militarylist'
    filteredSidebarNavigation = sidebarNavigation.filter(
      (item) => item.key !== 'moderatorlist' && item.key !== 'militarylist'
    );}
    else if (role === 'Military' && roleType === 'User') {
      // If username is 'PortAuthority', filter out 'moderatorlist', 'militarylist'
      filteredSidebarNavigation = sidebarNavigation.filter(
        (item) => item.key === 'approvearrivalship' || item.key === 'approvedepartureship'  || item.key === 'map' 
        // (item) => item.key !== 'moderatorlist' && item.key !== 'militarylist '&& item.key !== 'shiplist '
        // && item.key !== 'sailorlist '&& item.key !== 'ownerlist ' && item.key !== 'arrival-register '  && item.key !== 'departure-register' 
      );}
      else if (role === 'User' && roleType === 'User') {
        // If username is 'PortAuthority', filter out 'moderatorlist', 'militarylist'
        filteredSidebarNavigation = sidebarNavigation.filter(
          (item) => item.key === 'arrival-register' || item.key === 'departure-register'  || item.key==='schedulelist'||item.key==='uncomplete'|| item.key === 'map' 
          || item.key ==='shiplist'||item.key ==='nextjourney'
          // (item) => item.key !== 'moderatorlist' && item.key !== 'militarylist '&& item.key !== 'shiplist '
          // && item.key !== 'sailorlist '&& item.key !== 'ownerlist ' && item.key !== 'arrival-register '  && item.key !== 'departure-register' 
        );
  }

  const currentMenuItem = filteredSidebarNavigation
    .reduce((result: SidebarNavigationItem[], current) => result.concat(current.children || current), [])
    .find(({ url }) => url === location.pathname);

  const defaultSelectedKeys = currentMenuItem ? [currentMenuItem.key] : [];

  const openedSubmenu = filteredSidebarNavigation.find(({ children }) =>
    children?.some(({ url }) => url === location.pathname)
  );
  const defaultOpenKeys = openedSubmenu ? [openedSubmenu.key] : [];

  return (
    <>
      <S.Menu
        mode="inline"
        defaultSelectedKeys={defaultSelectedKeys}
        defaultOpenKeys={defaultOpenKeys}
        items={filteredSidebarNavigation.map((nav) => {
          const isSubMenu = nav.children?.length;

          return {
            key: nav.key,
            title: t(nav.title),
            label: isSubMenu ? t(nav.title) : <Link to={nav.url || ''}>{t(nav.title)}</Link>,
            icon: nav.icon,
            children:
              isSubMenu &&
              nav.children &&
              nav.children.map((childNav) => ({
                key: childNav.key,
                label: <Link to={childNav.url || ''}>{t(childNav.title)}</Link>,
                title: t(childNav.title),
              })),
          };
        })}
      />
    </>
  );
};

export default SiderMenu;
