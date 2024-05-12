import React, { useState } from 'react';
import { Col, Row, Space, Typography, Form, Card, Button, Select } from 'antd';
import ShipOwnerSelect from '../ShipOwnerModal/ShipOwnerSelect';
import ClassNumberInput from '../../input/ShipInput/ClassNumberInput/ClassNumberInput';
import RegisterNumberInput from '../../input/ShipInput/RegisterNumberInput/RegisterNumberInput';
import GTInput from '@app/components/input/ShipInput/GrossTonnageInput/GTInput';
import ShipLengthInput from '@app/components/input/ShipInput/ShipLengthInput/ShipLengthInput';
import ShipNameInput from '@app/components/input/ShipInput/ShipNameInput/ShipNameInput';
import { validateIMO } from '@app/components/input/ShipInput/IMOInput/IMOValidation';
import ImageUpload from '@app/components/imageController/ImageUpload';
import type { RcFile } from 'antd/es/upload/interface';
import { handleFinish, onFinishFailed, normalizeVietnamese } from './ShipForm.utils';
import { Ship, registerShip } from '@app/api/shipRegistration.api';
import ShipTypeInput from '@app/components/input/ShipTypeInput/ShipTypeInput';
import IMOInput from '@app/components/input/ShipInput/IMOInput/IMOInput';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

interface ShipFormProps {
  initialValues?: Ship; // This should match the `Ship` interface from your API
}

const ShipForm: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate(); 
  const [canSubmit, setCanSubmit] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<RcFile>();

  const handleFormFinish = async (values: any) => {
    try {
      await form.validateFields();
      const shipData = {
        imagePath: values.imagePath,
        ownerId: values.ownerId?.id,
        name: values.name,
        classNumber: values.classNumber,
        imoNumber: values.imoNumber || '',
        length: values.length || '',
        shipType: values.shipType,
        registerNumber: values.registerNumber,
        grossTonnage: values.grossTonnage,

      };

      if (selectedFile) {
        const uploadResult = await handleFinish(selectedFile, shipData);
        if (uploadResult) {
          shipData.imagePath = uploadResult.Key;
          await registerShip(shipData);
          navigate('/ship-management');
        }
      } else {
        console.error('No file selected for upload.');
      }
    } catch (error) {
      console.error('Form submission failed:', error);
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
        <Row justify="space-evenly" align="top" style={{ marginTop: 20, flex: 1 }}>
          <Col>
            <Form.Item name="shipImg">
              <ImageUpload setSelectedFile={setSelectedFile} />
            </Form.Item>
          </Col>
          <Col>
            <Card style={{ borderRadius: '20px', border: '1px solid rgba(190,192,198,255)' }}>
              <Title level={2}>Thông tin tàu</Title>
              <Row>
                <Space size={100} align="start">
                  <Col>
                    <Space direction="vertical" size={40}>
                      <Form.Item name="ownerId" rules={[{ required: true, message: 'Vui lòng chọn chủ tàu!' }]}>
                        <ShipOwnerSelect />
                      </Form.Item>
                      <Form.Item name="name" rules={[{ required: true, message: 'Vui lòng nhập tên tàu!' }]}>
                        <ShipNameInput />
                      </Form.Item>
                      <Form.Item
                        name="imoNumber"
                        rules={[
                          { required: true, message: 'Vui lòng nhập số IMO' },
                          ({ getFieldValue }) => ({
                            validator(_, value) {
                              if (validateIMO(value)) {
                                return Promise.resolve();
                              }
                              return Promise.reject(new Error('Số IMO không hợp lệ!'));
                            },
                          }),
                        ]}
                        validateFirst
                      >
                        <IMOInput />
                      </Form.Item>
                      <Form.Item name="shipType" rules={[{ required: true, message: 'Please select a ship type!' }]}>
                        <ShipTypeInput />
                      </Form.Item>
                    </Space>
                  </Col>
                  <Col>
                    <Space direction="vertical" size={20}>
                      <Form.Item
                        name="classNumber"
                        rules={[
                          { required: true, message: 'Vui lòng nhập số đăng ký' },
                          ({ getFieldValue }) => ({
                            validator(_, value) {
                              if (/^(VR)?\d{6}$/.test(value)) {
                                return Promise.resolve();
                              }
                              return Promise.reject(new Error('Số phân cấp phải có đúng 6 chữ số!'));
                            },
                          }),
                        ]}
                      >
                        <ClassNumberInput />
                      </Form.Item>
                      <Form.Item name="registerNumber">
                        <RegisterNumberInput />
                      </Form.Item>
                      
                      <Form.Item name="length" rules={[{ required: true, message: 'Vui lòng nhập chiều dài tàu' }]}>
                        <ShipLengthInput />
                      </Form.Item>
                      <Form.Item name="grossTonnage" rules={[{ required: true, message: 'Vui lòng nhập tổng dung tích' }]}>
                        <GTInput />
                      </Form.Item>
                    </Space>
                  </Col>
                </Space>
              </Row>
              <Form.Item>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                  <Button type="primary" htmlType="submit" disabled={!canSubmit}>
                    Đăng ký
                  </Button>
                </div>
              </Form.Item>
            </Card>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default ShipForm;
