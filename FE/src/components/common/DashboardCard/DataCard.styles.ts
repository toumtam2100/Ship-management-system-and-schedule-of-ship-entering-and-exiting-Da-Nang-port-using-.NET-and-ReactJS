// DataCardStyles.ts
export const cardStyle = {
    color: 'white',
    backgroundColor: '#468FAF',
    width: 300,
    height: 200,
    borderRadius: '20px',
  };
  
  export const headStyle = { color: 'white', fontSize: 20 };
  
  export const bodyStyle = (loading: boolean) => ({
    transition: 'opacity 0.3s',
    opacity: loading ? 0 : 1,
  });
  