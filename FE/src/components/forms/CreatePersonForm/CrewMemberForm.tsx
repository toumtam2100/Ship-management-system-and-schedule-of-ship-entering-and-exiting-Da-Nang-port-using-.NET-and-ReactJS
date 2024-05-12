import React, { useEffect, useState } from 'react';
import { Col, Row, Space, Typography, Form, Card, Button, message } from 'antd';
import ImageUpload from '@app/components/imageController/ImageUpload';
import type { RcFile } from 'antd/es/upload/interface';
import { handleFinish, onFinishFailed, normalizeVietnamese } from '../ShipForm/ShipForm.utils'; // Vẫn lấy của ShipForm.utils
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
import YearExInput from '@app/components/input/PersonInput/YearExInput';
import { useNavigate } from 'react-router-dom';
import { CreateCrewData, createCrew } from '@app/api/crew.api';

const { Title } = Typography;

const CrewMemberForm: React.FC<{ onFormChange: (values: any) => void }> = ({ onFormChange }) => {
  const [form] = Form.useForm();
  const [canSubmit, setCanSubmit] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<RcFile>();
  const navigate = useNavigate();
  // const successMessage = () => {
  //   message.success('Đăng ký thành công thuyền viên');
  //   navigate('/crew-member-management');
  // };
  useEffect(() => {
    form
      .validateFields()
      .then(() => setCanSubmit(true))
      .catch(() => setCanSubmit(false));
  }, [form]);

  const handleFormFinish = async (values: any) => {
    try {
      await form.validateFields();
      //values.fullName = normalizeVietnamese(values.fullName).toUpperCase();

      const yearEx = values.yearExperience.toString();

      const crewData: CreateCrewData = {
        fullName: values.fullName,
        countries: 'VN',
        nationalId: values.nationalId,
        relativePhoneNumber: values.relativePhoneNumber,
        yearExperience: yearEx,
      };

      const result = await createCrew(crewData);
      console.log('Result from creating crew:', result);

      // Upon successful crew creation
      message.success('Bạn đã đăng ký thành công thuyền viên');
      // Optional: Navigate to another page or perform additional actions
      navigate('/crew-member-management');

      console.log('Form values:', values);
    } catch (error) {
      console.error('Validation failed:', error);
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
            <Card style={{ borderRadius: '20px', border: '1px solid rgba(190,192,198,255)', padding: 0 }}>
              <Title style={{ fontSize: '22px', textTransform: 'uppercase' }}>Thông tin cá nhân</Title>
              <Row>
                <Space size={100} align="start">
                  <Col>
                    <Space direction="vertical" size={10}>
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
                        name="relativePhoneNumber"
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
                        name="nationalId"
                        rules={[
                          // { required: true, message: 'Vui lòng nhập căn cước công dân!' },
                          ({ getFieldValue }) => ({
                            validator(_, value) {
                              if (!value || (value.length === 12 && /^\d+$/.test(value))) {
                                return Promise.resolve();
                              }
                              return Promise.reject(new Error('Nhập đúng 12 số căn cước công dân!'));
                            },
                          }),
                        ]}
                      >
                        <CardIdInput />
                      </Form.Item>
                      <Form.Item
                        name="yearExperience"
                        //rules={[{ required: true, message: 'Vui lòng nhập năm kinh nghiệm!' }]}
                      >
                        <YearExInput />
                      </Form.Item>
                    </Space>
                  </Col>
                </Space>
              </Row>
              <Form.Item style={{ margin: '0px' }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    disabled={!canSubmit}
                    //onClick={successMessage}
                  >
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

export default CrewMemberForm;
