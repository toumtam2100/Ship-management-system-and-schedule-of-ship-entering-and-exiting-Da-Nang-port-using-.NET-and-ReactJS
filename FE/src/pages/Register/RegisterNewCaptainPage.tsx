import React, { useState } from 'react';
import { Button, Row, Typography } from 'antd';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import CaptainForm from '@app/components/forms/CreatePersonForm/CaptainForm';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const RegisterNewCaptainPage: React.FC = () => {
  const [formData, setFormData] = useState({});

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/captain-management');
  };

  const handleFormChange = (values: any) => {
    setFormData(values);
  };

  return (
    <>
      <PageTitle>Đăng ký thuyền trưởng</PageTitle>
      <Row align="stretch" justify="space-between" style={{ marginTop: 20 }}>
        <Title style={{ marginLeft: 30 }}>Đăng Ký Thuyền Trưởng</Title>
        <Button style={{ marginRight: 30 }} onClick={handleClick}>
          Quay lại
        </Button>
      </Row>
      <CaptainForm onFormChange={handleFormChange} />
    </>
  );
};

export default RegisterNewCaptainPage;
