import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { VerificationCodeInput } from '@app/components/common/inputs/VerificationCodeInput/VerificationCodeInput';
import { useAppDispatch } from '@app/hooks/reduxHooks';
import { doVerifySecurityCode } from '@app/store/slices/authSlice';
import VerifyEmailImage from '@app/assets/images/email.png';
import * as Auth from '@app/components/layouts/AuthLayout/AuthLayout.styles';
import './SecurityCodeForm.styles';
import { BaseImage } from '@app/components/common/BaseImage/BaseImage';
import { BaseSpin } from '@app/components/common/BaseSpin/BaseSpin';
import { Typography } from 'antd';
import { ContentWrapper, ImageWrapper, descriptionStyle, linkStyle, textStyle } from './SecurityCodeForm.styles';

interface SecurityCodeFormProps {
  onFinish?: () => void;
}
const { Text, Title } = Typography;

export const SecurityCodeForm: React.FC<SecurityCodeFormProps> = ({ onFinish }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [securityCode, setSecurityCode] = useState('');
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (securityCode.length === 6) {
      setLoading(true);
      dispatch(doVerifySecurityCode({ code: securityCode }))
        .unwrap()
        .then(() => {
          navigate('/auth/new-password');
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [securityCode, onFinish, dispatch]);

  return (
    <Auth.FormWrapper>
      <BaseForm layout="vertical" requiredMark="optional">
        {/* <Auth.BackWrapper onClick={onBack || navigateBack}>
          <Auth.BackIcon />
          Quay lại
        </Auth.BackWrapper> */}
        <ContentWrapper>
          <ImageWrapper>
            <BaseImage src={VerifyEmailImage} alt="Not found" preview={false} />
          </ImageWrapper>
          <Title level={2}>Nhập Mã OTP</Title>
          <Text style={descriptionStyle}>Chúng tôi đã gửi mã OTP. Vui lòng kiểm tra email.</Text>
          {isLoading ? <BaseSpin /> : <VerificationCodeInput autoFocus onChange={setSecurityCode} />}
          <Typography style={textStyle}>
            Chưa nhận được mã OTP? 
            <Typography >
              <Link style={linkStyle} to="/" target="_blank">
                Nhấn đây
              </Link> để gửi lại
            </Typography>
          </Typography>
        </ContentWrapper>
      </BaseForm>
    </Auth.FormWrapper>
  );
};
