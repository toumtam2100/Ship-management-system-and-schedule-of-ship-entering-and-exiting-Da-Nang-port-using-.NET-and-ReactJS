import React, { useState } from 'react';
import { Button, Row, Typography } from 'antd';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import CrewMemberForm from '@app/components/forms/CreatePersonForm/CrewMemberForm';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const RegisterNewCrewMemberPage: React.FC = () => {
  const [formData, setFormData] = useState({});

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/crew-member-management');
  };

  const handleFormChange = (values: any) => {
    setFormData(values);
  };

  return (
    <>
      <PageTitle>Đăng ký thuyền viên</PageTitle>
      <Row align="stretch" justify="space-between" style={{ marginTop: 20 }}>
        <Title style={{ marginLeft: 30 }}>Đăng Ký Thuyền Viên</Title>
        <Button style={{ marginRight: 30 }} onClick={handleClick}>
          Quay lại
        </Button>
      </Row>
      <CrewMemberForm onFormChange={handleFormChange} />
    </>
  );
};

export default RegisterNewCrewMemberPage;
