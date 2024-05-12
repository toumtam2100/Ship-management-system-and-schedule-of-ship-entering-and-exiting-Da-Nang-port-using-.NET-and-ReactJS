import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as S from './ProfileOverlay.styles';
const signout = async (idToken: any, accessToken: any) => {
  console.log('signouid', idToken);
  console.log('signouad', accessToken);
  try {
    const url = `https://cangcadanang.asia/backend/api/Auth/signout`;
    const response = await fetch(url, {
      method: 'Delete', // Use PATCH method
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify({
        accessToken: accessToken,
      }),
    });
    if (response.ok) {
      console.log('logout r nha');
      localStorage.clear();
    }
    if (!response.ok) {
      throw new Error('Failed to logout');
   
    }
  } catch (error) {
    console.error('Error logout:', error);
    localStorage.clear();
    throw error;
  }
};

export const ProfileOverlay: React.FC = ({ ...props }) => {
  const navigate = useNavigate();
  const i = localStorage.getItem('idToken');
  const a = localStorage.getItem('accessToken');
  return (
    <div {...props}>
      <S.Text>
        <Link to="/profile">Thông tin</Link>
      </S.Text>
      <S.ItemsDivider />
      <S.Text>
        {/* <Link to="/logout">{t('header.logout')}</Link> */}
        <a
          onClick={() => {
            localStorage.clear();
            signout(i, a), navigate('/auth/login');
            // window.location.reload();
          }}
        >
          Đăng xuất
        </a>
      </S.Text>
    </div>
  );
};
