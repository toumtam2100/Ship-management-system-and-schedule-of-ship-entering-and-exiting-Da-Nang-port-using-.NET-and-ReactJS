import React, { useState } from 'react';
import { Col, Row, Space, Typography, Form, Card, Button, message } from 'antd';
import ImageUpload from '@app/components/imageController/ImageUpload';
import type { RcFile } from 'antd/es/upload/interface';
import { handleFinish, onFinishFailed, normalizeVietnamese } from '@app/api/moderator.api';
import FullNameInput from '@app/components/input/PersonInput/FullNameInput';
import CountryInput from '@app/components/input/PersonInput/CountryInput';
import CardIdInput from '@app/components/input/PersonInput/CardIdInput';
import { SexItem } from '@app/components/input/PersonInput/SexItem';
import { BirthdayItem } from '@app/components/input/PersonInput/BirthdayItem';
import UserNameInput from '@app/components/input/PersonInput/UserNameInput';
import PasswordInput from '@app/components/input/PersonInput/PasswordInput';
import PhoneNumberInput from '@app/components/input/PersonInput/PhoneNumberInput';
import EmailInput from '@app/components/input/PersonInput/EmailInput';
import AddressInput from '@app/components/input/PersonInput/AddressInput';
import FullAdressItem from '@app/components/input/PersonInput/FullAddressItem';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import FullAddressItem from '@app/components/input/PersonInput/FullAddressItem';
import { error, log } from 'console';
import { CreateModeratorData, createModerator } from '@app/api/moderator.api';

const { Title } = Typography;

const ModeratorForm: React.FC<{ onFormChange: (values: any) => void }> = ({ onFormChange }) => {
  const [form] = Form.useForm();
  const [canSubmit, setCanSubmit] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<RcFile>();

  const [provinceName, setProvinceName] = useState<string>('');
  const [districtName, setDistrictName] = useState<string>('');
  const [communeName, setCommuneName] = useState<string>('');
  const [streetValue, setStreetValue] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    form
      .validateFields()
      .then(() => setCanSubmit(true))
      .catch(() => setCanSubmit(false));
  }, [form]);

  const handleFormFinish = async (values: any) => {
    try {
      await form.validateFields();
      const imageName = normalizeVietnamese(values.fullName).toUpperCase();
      console.log(imageName);

      console.log('Form values:', values);

      const fullAddress = `${provinceName}, ${districtName}, ${communeName}, ${streetValue}`;
      values.address = fullAddress;

      const moderatorData: CreateModeratorData = {
        avatar: values.avatar,
        fullName: values.fullName,
        gender: values.gender,
        address: fullAddress,
        username: values.username,
        phoneNumber: values.phoneNumber,
        password: values.password,
        email: values.email,
      };

      if (selectedFile) {
        const uploadResult = await handleFinish(selectedFile, imageName);
        if (uploadResult) {
          moderatorData.avatar = uploadResult.Key;
          await createModerator(moderatorData);
          message.success('Đăng ký thành công cảng vụ');
          navigate('/moderator-management');
        }
      } else {
        console.error('No file selected for upload.');
      }
    } catch (error) {
      console.error('Validation failed or error creating moderator:', error);
      // Handle error accordingly, maybe display a message to the user
    }
  };

  return (
    <>
      <Form
        form={form}
        onFinish={handleFormFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        onFieldsChange={() => setCanSubmit(!form.getFieldsError().filter(({ errors }) => errors.length).length)}
      >
        <Row justify="space-evenly" align="top" style={{ marginTop: 10, flex: 1 }}>
          <Col>
            <Form.Item name="avatar">
              <ImageUpload setSelectedFile={setSelectedFile} />
            </Form.Item>
          </Col>
          <Col>
            <Card style={{ borderRadius: '20px', border: '1px solid rgba(190,192,198,255)', padding: 0 }}>
              <Title style={{ fontSize: '22px', textTransform: 'uppercase' }}>Thông tin cá nhân</Title>
              <Row>
                <Space size={100} align="start">
                  <Col>
                    <Space direction="horizontal" size={100}>
                      <Form.Item
                        name="fullName"
                        rules={[
                          // { required: true, message: 'Vui lòng nhập họ và tên!' },
                          ({ getFieldValue }) => ({
                            validator(_, value) {
                              if (!value || value.length <= 30) {
                                return Promise.resolve();
                              }
                              return Promise.reject(new Error('Không được nhập quá 30 ký tự!'));
                            },
                          }),
                        ]}
                      >
                        <FullNameInput />
                      </Form.Item>
                      <Form.Item
                        name="gender"
                        rules={
                          [
                            // { required: true, message: 'Vui lòng chọn giới tính!' }
                          ]
                        }
                      >
                        <SexItem />
                      </Form.Item>
                    </Space>
                  </Col>
                </Space>
              </Row>

              <Row>
                <Space size={100} align="start">
                  <Form.Item name="address">
                    <FullAddressItem
                      onChange={(value: { province: string; district: string; commune: string; street: string }) => {
                        if (typeof value === 'object' && value !== null) {
                          // Type assertion to tell TypeScript that value is an object
                          const { province, district, commune, street } = value as {
                            province: string;
                            district: string;
                            commune: string;
                            street: string;
                          };
                          // Now you can safely access the properties
                          setProvinceName(province);
                          setDistrictName(district);
                          setCommuneName(commune);
                          setStreetValue(street);
                        }
                      }}
                    />
                  </Form.Item>
                </Space>
              </Row>
              <Title style={{ fontSize: '22px', textTransform: 'uppercase', marginTop: '8px' }}>
                Thông tin tài khoản
              </Title>
              <Row>
                <Space size={100} align="start">
                  <Col>
                    <Space direction="vertical" size={10}>
                      <Form.Item
                        name="username"
                        rules={
                          [
                            // { required: true, message: 'Vui lòng nhập tài khoản!' }
                          ]
                        }
                      >
                        <UserNameInput />
                      </Form.Item>
                      <Form.Item
                        name="phoneNumber"
                        rules={
                          [
                            // { required: true, message: 'Vui lòng nhập số điện thoại!' },
                            // ({ getFieldValue }) => ({
                            //   validator(_, value) {
                            //     if (!value || value.startsWith('0')) {
                            //       return Promise.resolve();
                            //     }
                            //     return Promise.reject(new Error('Số điện thoại phải bắt đầu bằng 0!'));
                            //   },
                            // }),
                          ]
                        }
                      >
                        <PhoneNumberInput />
                      </Form.Item>
                    </Space>
                  </Col>
                  <Col>
                    <Space direction="vertical" size={10}>
                      <Form.Item
                        name="password"
                        rules={[
                          // { required: true, message: 'Vui lòng nhập mật khẩu!' },
                          ({ getFieldValue }) => ({
                            validator(_, value) {
                              if (
                                !value ||
                                /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+=~`|}{[\]:;?><,./-]).{8,}$/.test(value)
                              ) {
                                return Promise.resolve();
                              }
                              return Promise.reject(new Error('Mật khẩu phải đúng quy định! Hoặc sử dụng tự động'));
                            },
                          }),
                        ]}
                      >
                        <PasswordInput />
                      </Form.Item>
                      <Form.Item
                        name="email"
                        rules={[
                          // { required: true, message: 'Vui lòng nhập email!' },
                          { type: 'email', message: 'Email không hợp lệ!' },
                        ]}
                      >
                        <EmailInput />
                      </Form.Item>
                    </Space>
                  </Col>
                </Space>
              </Row>
              <Form.Item style={{ margin: '0px' }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button type="primary" htmlType="submit" disabled={!canSubmit}>
                    Đăng ký
                  </Button>
                </div>
              </Form.Item>
            </Card>
            <div style={{ marginBottom: '10px' }}></div>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default ModeratorForm;
