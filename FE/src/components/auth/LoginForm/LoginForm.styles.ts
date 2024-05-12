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

export const LoginDescription = styled.div`
  margin-bottom: 1.875rem;
  color: var(--text-main-color);
  font-size: ${FONT_SIZE.xs};

  @media only screen and ${media.xs} {
    margin-bottom: 1.5625rem;
    font-weight: ${FONT_WEIGHT.bold};
  }

  @media only screen and ${media.md} {
    margin-bottom: 1.75rem;
    font-weight: ${FONT_WEIGHT.regular};
  }

  @media only screen and ${media.xl} {
    margin-bottom: 1.875rem;
  }
`;

export const RememberMeText = styled.span`
  color: var(--primary-color);
  font-size: ${FONT_SIZE.xs};
`;

export const ForgotPasswordText = styled.span`
  color: var(--text-light-color);
  font-size: ${FONT_SIZE.xs};
  text-decoration: underline;
`;

export const containerStyle: React.CSSProperties = {
  width: "70%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",
  alignItems: "center",
};

export const logoContainerStyle: React.CSSProperties = {
  textAlign: "center",
};

export const logoStyle: React.CSSProperties = {
  maxWidth: "50%",
  height: "auto",
  margin: "0 auto",
};

export const loginFormContainerStyle: React.CSSProperties = {
  maxWidth: "300px",
  width: "100%",
  margin: "0 auto",
};

export const widthButtonStyle: React.CSSProperties = {
  width: "100%",
};
export const buttonStyle: React.CSSProperties = {
  color: "white",
  width: "100%",
  backgroundColor: "#013a63",
};

export const forgotPasswordLinkStyle: React.CSSProperties = {
  float: "right",
};

export const inputStyle: React.CSSProperties = {
  width: "100%",
};