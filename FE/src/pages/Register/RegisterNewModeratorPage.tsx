import React, { useState } from 'react';
import { Button, Row, Typography } from 'antd';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import ModeratorForm from '@app/components/forms/CreatePersonForm/ModeratorForm';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const RegisterNewModeratorPage: React.FC = () => {
  const [formData, setFormData] = useState({});

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/moderator-management');
  };

  const handleFormChange = (values: any) => {
    setFormData(values);
  };

  return (
    <>
      <PageTitle>Đăng ký cảng vụ</PageTitle>
      <Row align="stretch" justify="space-between" style={{ marginTop: 20 }}>
        <Title style={{ marginLeft: 30 }}>Đăng Ký Cảng Vụ</Title>
        <Button style={{ marginRight: 30 }} onClick={handleClick}>
          Quay lại
        </Button>
      </Row>
      <ModeratorForm onFormChange={handleFormChange} />
    </>
  );
};

export default RegisterNewModeratorPage;
