import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { media } from '@app/styles/themes/constants';
import { LAYOUT } from '@app/styles/themes/constants';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { BaseLayout } from '@app/components/common/BaseLayout/BaseLayout';
import { BurgerIcon } from '@app/components/common/Burger/BurgerIcon';
import { BaseCol } from '@app/components/common/BaseCol/BaseCol';

export const Sider = styled(BaseLayout.Sider)`
  position: fixed;
  overflow: visible;
  right: 0;
  z-index: 5;
  min-height: 100vh;
  max-height: 100vh;
  transition: 0.3s ease;

  color: var(--text-secondary-color);

  @media only screen and ${media.md} {
    right: unset;
    left: 0;
  }

  @media only screen and ${media.xl} {
    position: unset;
  }
`;

export const CollapseButton = styled(BaseButton)<{ $isCollapsed: boolean }>`
  background: var(--collapse-background-color);
  border: 1px solid var(--border-color);
  transition: all 0.2s ease;
  position: absolute;

  ${(props) => props.$isCollapsed && css``}

  color: var(--text-secondary-color);

  &:hover {
    color: var(--text-secondary-color);
    background: var(--primary-color);
    border: 1px solid var(--border-color);
  }

  &:focus {
    color: var(--text-secondary-color);
    background: var(--primary-color);
    border: 1px solid var(--border-color);
  }
`;

export const SiderContent = styled.div`
  overflow-y: auto;
  scrollbar-width: none;
  overflow-x: hidden;
  max-height: calc(100vh - ${LAYOUT.mobile.headerHeight});
  @media only screen and ${media.md} {
    max-height: calc(100vh - ${LAYOUT.desktop.headerHeight});
  }
`;

export const SiderLogoLink = styled(Link)`
  display: flex;
  align-items: center;
  overflow: hidden;
  position: relative;
`;

export const SiderLogoDiv = styled.div`
  height: ${LAYOUT.mobile.headerHeight};
  padding: ${LAYOUT.mobile.headerPadding};
  display: flex;
  justify-content: center;
  align-items: center;

  @media only screen and ${media.md} {
    height: ${LAYOUT.desktop.headerHeight};
    padding-top: ${LAYOUT.desktop.paddingVertical};
    padding-bottom: ${LAYOUT.desktop.paddingVertical};
  }
`;

export const BrandSpan = styled.span<{ $isCollapsed: boolean }>`
  margin-right: 1rem;
  font-weight: 700;
  font-size: 1.85rem;
  color: #1d1d1d;
  display: ${(props) => (props.$isCollapsed ? 'none' : 'inline-block')};
`;

export const BurgerCol = styled(BaseCol)`
  z-index: 999;
  display: inherit;
`;

export const MobileBurger = styled(BurgerIcon)`
  margin-left: 0.75rem;
  width: 1.5rem;
  height: 1.5rem;
  color: var(--text-main-color);
  ${(props) =>
    props.isCross &&
    css`
      color: var(--text-main-color);
    `};
`;
