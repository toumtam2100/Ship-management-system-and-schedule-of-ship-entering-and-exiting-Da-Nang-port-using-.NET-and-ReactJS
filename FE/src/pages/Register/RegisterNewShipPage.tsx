import React, { useState } from 'react';
import { Button, Row, Typography } from 'antd';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import ShipForm from '@app/components/forms/ShipForm/ShipForm'; // Assuming ShipForm provides custom input components
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const RegisterNewShipPage: React.FC = () => {
  const [formData, setFormData] = useState({});

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/ship-management');
  };

  const handleFormChange = (values: any) => {
    setFormData(values);
  };

  return (
    <>
      <PageTitle>Đăng ký tàu mới</PageTitle>
      <Row align="stretch" justify="space-between" style={{ marginTop: 20 }}>
        <Title style={{ marginLeft: 30 }}>Đăng Ký Tàu Mới</Title>
        <Button style={{ marginRight: 30 }} onClick={handleClick}>
          Quay lại
        </Button>
      </Row>
      <ShipForm />
    </>
  );
};

export default RegisterNewShipPage;
