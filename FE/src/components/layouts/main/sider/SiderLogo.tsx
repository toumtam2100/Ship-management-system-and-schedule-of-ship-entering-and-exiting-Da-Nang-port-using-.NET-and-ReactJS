import React from 'react';
import * as S from './MainSider/MainSider.styles';
import { useResponsive } from 'hooks/useResponsive';

interface SiderLogoProps {
  isSiderCollapsed: boolean;
  toggleSider: () => void;
}
export const SiderLogo: React.FC<SiderLogoProps> = ({ isSiderCollapsed, toggleSider }) => {
  const { tabletOnly, desktopOnly, isBigScreen } = useResponsive();

  return (
    <>
      <S.SiderLogoDiv>
        <S.SiderLogoLink to="/">
          <S.BrandSpan $isCollapsed={isSiderCollapsed}>MSB-DNP</S.BrandSpan>
        </S.SiderLogoLink>
        {(tabletOnly || desktopOnly || isBigScreen) && (
          <S.BurgerCol>
            <S.MobileBurger onClick={toggleSider} isCross={!isSiderCollapsed} />
          </S.BurgerCol>
        )}
      </S.SiderLogoDiv>
    </>
  );
};
