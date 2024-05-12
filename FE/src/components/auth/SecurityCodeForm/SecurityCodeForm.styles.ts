import { FONT_SIZE, FONT_WEIGHT, media } from '@app/styles/themes/constants';
import styled from 'styled-components';

export const ImageWrapper = styled.div`
  margin-bottom: 1.875rem;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const titleStyle: React.CSSProperties = {
  textAlign: 'center',
}
export const descriptionStyle: React.CSSProperties = {
  marginBottom: 15,
  color: 'grey',
  fontSize: '24',
}

export const textStyle: React.CSSProperties = { 
  textAlign: 'center',
  marginTop: '2vh',
}
export const linkStyle: React.CSSProperties = {
  textDecoration: 'underline'
}