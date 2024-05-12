import { BaseLayout } from '@app/components/common/BaseLayout/BaseLayout';
import { LAYOUT } from '@app/styles/themes/constants';
import { media } from '@app/styles/themes/constants';
import styled from 'styled-components';

export const Header = styled(BaseLayout.Header)`
  line-height: 1.5;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  
  @media only screen and ${media.md} {
    padding: ${LAYOUT.desktop.paddingVertical} ${LAYOUT.desktop.paddingHorizontal};
    height: ${LAYOUT.desktop.headerHeight};
  }
`;
