import React, { useState } from 'react';
import { Col, Input, Row, Space, Typography, Form, Card, Button } from 'antd';
import ImageUpload from '@app/components/imageController/ImageUpload';
import { RcFile } from 'antd/lib/upload';
import { ShipTableRow } from '@app/api/shipTable.api';
import ShipOwnerSelect from '../ShipOwnerModal/ShipOwnerSelect';
import ShipNameInput from '@app/components/input/ShipInput/ShipNameInput/ShipNameInput';
import { validateIMO } from '@app/components/input/ShipInput/IMOInput/IMOValidation';
import IMOInput from '@app/components/input/ShipInput/IMOInput/IMOInput';
import ClassNumberInput from '@app/components/input/ShipInput/ClassNumberInput/ClassNumberInput';
import RegisterNumberInput from '@app/components/input/ShipInput/RegisterNumberInput/RegisterNumberInput';
import ShipLengthInput from '@app/components/input/ShipInput/ShipLengthInput/ShipLengthInput';
import GTInput from '@app/components/input/ShipInput/GrossTonnageInput/GTInput';

const { Title } = Typography;

const ShipEditForm: React.FC<{ shipItem: ShipTableRow, onFormChange: (values: any) => void }> = ({ shipItem, onFormChange }) => {
    const [form] = Form.useForm();
    const [canSubmit, setCanSubmit] = useState<boolean>(false);
    const [shipDetails, setShipDetails] = useState<ShipTableRow | null>(null);
    const [selectedFile, setSelectedFile] = useState<RcFile>();

    const handleFinish = async (values: any) => {
        try {
            await form.validateFields();
            console.log('Form values:', values);
        } catch (error) {
            console.error('Validation failed:', error);
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <Form
                form={form}
                onFinish={handleFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                onFieldsChange={() => setCanSubmit(!form.getFieldsError().filter(({ errors }) => errors.length).length)}
            >
                <Row justify="space-evenly" align="top" style={{ marginTop: 20, flex: 1 }}>
                    <Col>
                        <Form.Item name="imageUrl">
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
                                            <Form.Item name="shipOwner" rules={[{ required: true, message: 'Vui lòng chọn chủ tàu!' }]}>
                                                <ShipOwnerSelect />
                                            </Form.Item>
                                            <Form.Item name="shipName" rules={[{ required: true, message: 'Vui lòng nhập tên tàu!' }]}>
                                                <ShipNameInput />
                                            </Form.Item>
                                            <Form.Item
                                                name="IMONumber"
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
                                        </Space>
                                    </Col>
                                    <Col>
                                        <Space direction="vertical" size={40}>
                                            <Form.Item
                                                name="classNumber"
                                                initialValue={shipDetails?.classNumber}
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
                                            <Form.Item name="registerNumber" initialValue={shipDetails?.registerNumber}>
                                                <RegisterNumberInput />
                                            </Form.Item>
                                            <Form.Item name="shipLength" rules={[{ required: true, message: 'Vui lòng nhập chiều dài tàu' }]}>
                                                <ShipLengthInput />
                                            </Form.Item>
                                            <Form.Item name="tonnageGross" rules={[{ required: true, message: 'Vui lòng nhập tổng dung tích' }]}>
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

export default ShipEditForm;
