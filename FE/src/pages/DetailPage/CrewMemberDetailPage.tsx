import React from 'react';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import { Col, Row, Typography } from 'antd';
import CrewMemberDetailForm from '@app/components/forms/DetailForm/PersonDetail/CrewMemberDetailForm';
import BackButton from '@app/components/buttons/BackButton/BackButton';

const { Title } = Typography;

const CrewMemberDetailPage: React.FC = () => {
  return (
    <div style={{ marginLeft: 6 }}>
      <PageTitle>Thông tin của thuyền viên</PageTitle>
      <Row>
        <Col xs={24} md={16} lg={18} xl={20}>
          <Title>Thông tin thuyền viên</Title>
        </Col>
        <Col xs={24} md={8} lg={6} xl={4} style={{ margin: 'auto' }}>
          <BackButton />
        </Col>
      </Row>
      <CrewMemberDetailForm />
      <Title style={{ marginTop: 20 }}>Lịch sử hoạt động</Title>
    </div>
  );
};

export default CrewMemberDetailPage;
