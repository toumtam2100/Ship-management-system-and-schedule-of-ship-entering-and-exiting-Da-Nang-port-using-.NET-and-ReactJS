import styled from "styled-components";

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
  marginBottom: 0,
}
export const descriptionStyle: React.CSSProperties = {
  marginBottom: 10,
  color: 'grey',
  fontSize: '24',
}

export const containerStyle: React.CSSProperties = {
  width: "100%",
  height: "85vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",
  alignItems: "center",
};

export const logoContainerStyle: React.CSSProperties = {
  textAlign: "center",
  marginBottom: "30px",
  marginTop: "60px",
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

export const buttonStyle: React.CSSProperties = {
  color: "white",
  width: "100%",
  backgroundColor: "#013a63",
};

export const inputStyle: React.CSSProperties = {
  width: "100%",
};