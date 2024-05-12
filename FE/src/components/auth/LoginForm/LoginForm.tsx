import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@app/hooks/reduxHooks';
import './LoginForm.styles';
import * as Auth from '@app/components/layouts/AuthLayout/AuthLayout.styles';
import { Button, Card, Checkbox, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import {
  ImageWrapper,
  buttonStyle,
  containerStyle,
  forgotPasswordLinkStyle,
  logoContainerStyle,
  logoStyle,
} from './LoginForm.styles';
import { BaseImage } from '@app/components/common/BaseImage/BaseImage';
import DaNangLogo from '@app/assets/images/logo.webp';

const login = async (username: any, password: any) => {
  try {
    const url = `https://cangcadanang.asia/backend/api/Auth/signin`;
    const response = await fetch(url, {
      method: 'POST', // Use PATCH method
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to login');
    }
    const data = await response.json();
    console.log('login return:', data.result.idToken);
    localStorage.setItem('idToken', data.result.idToken);
    localStorage.setItem('accessToken', data.result.accessToken);
    const fullName = getMyself(data.result.idToken);
    console.log('logindata' + data);
    return fullName;
  } catch (error) {
    console.error('Error login:', error);
    throw error;
  }
};

const getMyself = async (idToken: any) => {
  try {
    const url = `https://cangcadanang.asia/backend/api/User/me`;
    const response = await fetch(url, {
      method: 'GET', // Use PATCH method
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to get me');
    }

    const data = await response.json();
    localStorage.setItem('roleType', data.result.roleType);
    localStorage.setItem('userId', data.result.id);
    localStorage.setItem('role',data.result.role); 
    // localStorage.setItem('role', data.result.role);
    console.log(data)
    return [data.result.fullName, data.result.role];
  } catch (error) {
    console.error('Error get me:', error);
    throw error;
  }
};
export const LoginForm: React.FC = () => {

  const navigate = useNavigate();
  // const dispatch = useAppDispatch();
  // const dispatch = useAppDispatch();
  const [isLoading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const handleSubmit = async (values: { email: string; password: string }) => {
    setLoading(true);

    try {
      const user = await login(values.email, values.password);
      localStorage.setItem('fullName',user[0]); // Set fullName in localStorage
      if ( user[1]=='PortAuthority') {
        navigate('/dashboard');
      } else if(user[1]==='User' ){
        navigate('/profile/personal-info')
      }
      else if (user[1]=='Military'){
        navigate('/profile/personal-info')
      }
    } catch (error) {
      console.error('Error occurred during login:', error);
      setLoading(false);
      if (error instanceof Error) {
        const errorMessage = error.message;
        if (errorMessage === 'Failed to login') {
          setEmailError('Tài khoản không chính xác');
          setPasswordError('Mật khẩu không chính xác');
        }
      }
    }
  };

  return (
    <Auth.FormWrapper>
      <ImageWrapper>
        <BaseImage style={logoStyle} src={DaNangLogo} alt="Not found" preview={false} />
      </ImageWrapper>
      <Form onFinish={handleSubmit}>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập tài khoản',
            },
          ]}
          validateStatus={emailError ? 'error' : ''}
          help={emailError}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="TÀI KHOẢN" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập mật khẩu!',
            },
          ]}
          validateStatus={passwordError ? 'error' : ''}
          help={passwordError}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="MẬT KHẨU"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item noStyle>
            <Checkbox>Ghi nhớ đăng nhập</Checkbox>
          </Form.Item>
          <Link style={forgotPasswordLinkStyle} to="/auth/forgot-password">
            Quên mật khẩu
          </Link>
        </Form.Item>
        <Form.Item>
          <Button
            htmlType="submit"
            style={buttonStyle}
            loading={isLoading}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#2a6f97')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#013a63')}
          >
            ĐĂNG NHẬP
          </Button>
        </Form.Item>
      </Form>
    </Auth.FormWrapper>
  );
};