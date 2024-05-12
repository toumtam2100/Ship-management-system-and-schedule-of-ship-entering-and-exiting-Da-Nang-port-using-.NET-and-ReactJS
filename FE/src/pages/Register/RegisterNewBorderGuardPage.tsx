import React, { useState } from 'react';
import { Button, Row, Typography } from 'antd';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import BorderGuardForm from '@app/components/forms/CreatePersonForm/BorderGuardForm';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const RegisterNewBorderGuardPage: React.FC = () => {
  const [formData, setFormData] = useState({});

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/border-guard-management');
  };

  const handleFormChange = (values: any) => {
    setFormData(values);
  };

  return (
    <>
      <PageTitle>Đăng ký biên phòng</PageTitle>
      <Row align="stretch" justify="space-between" style={{ marginTop: 20 }}>
        <Title style={{ marginLeft: 30 }}>Đăng Ký Biên Phòng</Title>
        <Button style={{ marginRight: 30 }} onClick={handleClick}>
          Quay lại
        </Button>
      </Row>
      <BorderGuardForm onFormChange={handleFormChange} />
    </>
  );
};

export default RegisterNewBorderGuardPage;
