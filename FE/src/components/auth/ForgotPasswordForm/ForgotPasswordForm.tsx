import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Auth from '@app/components/layouts/AuthLayout/AuthLayout.styles';
import { useAppDispatch } from '@app/hooks/reduxHooks';
import { doResetPassword } from '@app/store/slices/authSlice';
import { Button, Input, Typography, Form } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import { BaseImage } from '@app/components/common/BaseImage/BaseImage';
import KeyIcon from '@app/assets/images/key.png';
import { ContentWrapper, ImageWrapper, buttonStyle, descriptionStyle, inputStyle, titleStyle } from './ForgotPasswordForm.styles';
import { PersonTableRow, getPersonTableData } from '@app/api/personTable.api';

interface ForgotPasswordFormData {
    email: string;
}

const initValues = {
    email: '',
};

const { Text, Title } = Typography;

export const ForgotPasswordForm: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null); // Initialize error state

    const handleSubmit = async (values: ForgotPasswordFormData) => {
        setLoading(true);

        try {
            const personTableData = await getPersonTableData({});
            const personWithEmail = personTableData.data.find((person: PersonTableRow) => person.email === values.email);

            if (personWithEmail) {
                dispatch(doResetPassword(values))
                    .unwrap()
                    .then(() => {
                        navigate('/auth/security-code');
                    })
                    .catch(() => {
                        setLoading(false);
                    });
            } else {
                setError('Email không tồn tại trong hệ thống.');
                setLoading(false);
            }
        } catch (error) {
            console.error('Error occurred while checking email:', error);
            setLoading(false);
        }
    };

    const handleInput = () => {
        setError(null);
    };

    return (
        <Auth.FormWrapper>
            <Form layout="vertical" onFinish={handleSubmit} requiredMark="optional" initialValues={initValues}>
                {/* <Auth.BackWrapper onClick={() => navigate(-1)}>
          <Auth.BackIcon />
          Quay lại
        </Auth.BackWrapper> */}
                <ContentWrapper>
                    <ImageWrapper>
                        <BaseImage src={KeyIcon} alt="Not found" preview={false} />
                    </ImageWrapper>
                    <Title style={titleStyle} level={2}>Đặt lại mật khẩu</Title>
                    <Text style={descriptionStyle}>Nhập địa chỉ email của bạn và chúng tôi sẽ gửi mã nhận để đặt lại mật khẩu</Text>
                    <Form.Item
                        name="email"
                        rules={[{ required: true, message: "Vui lòng nhập email!" }]}
                        validateStatus={error ? "error" : ""}
                        help={error}
                        style={inputStyle}
                    >
                        <Input
                            prefix={<MailOutlined />}
                            placeholder="Nhập email"
                            onInput={handleInput}
                        />
                    </Form.Item>
                    <Form.Item noStyle>
                        <Button
                            htmlType="submit"
                            style={buttonStyle}
                            loading={isLoading}
                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#2a6f97"}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#013a63"}
                        >
                            Gửi mã
                        </Button>
                    </Form.Item>
                </ContentWrapper>
            </Form>
        </Auth.FormWrapper>
    );
};