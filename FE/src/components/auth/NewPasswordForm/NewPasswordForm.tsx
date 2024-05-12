import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { useAppDispatch } from '@app/hooks/reduxHooks';
import { doSetNewPassword } from '@app/store/slices/authSlice';
import * as Auth from '@app/components/layouts/AuthLayout/AuthLayout.styles';
import { Button, Form, Input, Typography, message } from 'antd';
import { BaseImage } from '@app/components/common/BaseImage/BaseImage';
import NewPasswordImage from '@app/assets/images/password.png';
import { ContentWrapper, ImageWrapper, buttonStyle, inputStyle, titleStyle } from './NewPasswordForm.styles';

interface NewPasswordFormData {
  password: string;
  confirmPassword: string;
}

const initStates = {
  password: '',
  confirmPassword: '',
};

export const NewPasswordForm: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isLoading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const handleSubmit = (values: NewPasswordFormData) => {
    setLoading(true);

    if (values.password.length < 8) {
      setPasswordError("Mật khẩu không được dưới 8 kí tự.");
      setLoading(false);
      return;
    }
    if (values.password.length > 15) {
      setPasswordError("Mật khẩu không được trên 15 kí tự.");
      setLoading(false);
      return;
    }

    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z]).{8,15}$/;
    if (!passwordRegex.test(values.password)) {
      setPasswordError("Mật khẩu phải chứa ít nhất một số, một kí tự đặc biệt và một chữ hoa.");
      setLoading(false);
      return;
    }

    dispatch(doSetNewPassword({ newPassword: values.password }))
      .unwrap()
      .then(() => {
        navigate('/auth/login');
      })
      .catch((err) => {
        setLoading(false);
      });
  };
  
  const handleInput = () => {
    setPasswordError(null);
  };


  return (
    <Auth.FormWrapper>
      <Form layout="vertical" onFinish={handleSubmit} requiredMark="optional" initialValues={initStates}>
        {/* <Auth.BackWrapper onClick={() => navigate(-1)}>
          <Auth.BackIcon />
          Quay lại
        </Auth.BackWrapper> */}
        <ContentWrapper>
          <ImageWrapper>
            <BaseImage src={NewPasswordImage} alt="Not found" preview={false} />
          </ImageWrapper>
          <Typography.Title level={3} style={titleStyle}>Tạo mật khẩu mới</Typography.Title>
          <Form.Item
            name="password"
            label="Mật khẩu"
            style={inputStyle}
            rules={[
              { required: true, message: "Vui lòng điền mật khẩu!" },
            ]}
            validateStatus={passwordError ? "error" : ""}
            help={passwordError}
          >
            <Input.Password onInput={handleInput} placeholder="Nhập mặt khẩu mới" />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            label="Xác nhận mật khẩu"
            dependencies={['password']}
            style={inputStyle}
            rules={[
              { required: true, message: "Vui lòng xác nhận mật khẩu!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Không khớp mật khẩu"));
                },
              }),
            ]}
            hasFeedback
          >
            <Input.Password placeholder="Nhập lại mật khẩu mới" />
          </Form.Item>
          <Form.Item noStyle>
            <Button
              htmlType="submit"
              style={buttonStyle}
              loading={isLoading}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#2a6f97"}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#013a63"}
            >
              ĐỔI MẬT KHẨU
            </Button>
          </Form.Item>
        </ContentWrapper>
      </Form>
    </Auth.FormWrapper>
  );
};
