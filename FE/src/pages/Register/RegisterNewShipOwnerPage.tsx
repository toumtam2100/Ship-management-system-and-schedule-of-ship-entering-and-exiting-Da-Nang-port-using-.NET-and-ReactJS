import React, { useState } from 'react';
import { Button, Row, Typography } from 'antd';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import ShipOwnerForm from '@app/components/forms/CreatePersonForm/ShipOwnerForm';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const RegisterNewShipOwnerPage: React.FC = () => {
  const [formData, setFormData] = useState({});

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/ship-owner-management');
  };

  const handleFormChange = (values: any) => {
    setFormData(values);
  };

  return (
    <>
      <PageTitle>Đăng ký chủ thuyền</PageTitle>
      <Row align="stretch" justify="space-between" style={{ marginTop: 20 }}>
        <Title style={{ marginLeft: 30 }}>Đăng Ký Chủ Thuyền</Title>
        <Button style={{ marginRight: 30 }} onClick={handleClick}>
          Quay lại
        </Button>
      </Row>
      <ShipOwnerForm onFormChange={handleFormChange} />
    </>
  );
};

export default RegisterNewShipOwnerPage;
