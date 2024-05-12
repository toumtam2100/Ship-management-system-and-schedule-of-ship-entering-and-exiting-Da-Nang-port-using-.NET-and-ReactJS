import React from 'react';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import { Col, Row, Typography } from 'antd';
import ShipOwnerDetailForm from '@app/components/forms/DetailForm/PersonDetail/ShipOwnerDetailForm';
import BackButton from '@app/components/buttons/BackButton/BackButton';

const { Title } = Typography;

const ShipOwnerDetailPage: React.FC = () => {
  return (
    <div style={{ marginLeft: 6 }}>
      <PageTitle>Thông Tin Của Chủ Tàu</PageTitle>
      <Row>
        <Col xs={24} md={16} lg={18} xl={20}>
          <Title>Thông Tin Chủ Tàu</Title>
        </Col>
        <Col xs={24} md={8} lg={6} xl={4} style={{ margin: 'auto' }}>
          <BackButton />
        </Col>
      </Row>
      <ShipOwnerDetailForm />
      <Title style={{ marginTop: 20 }}>Các tàu đang sở hữu</Title>
    </div>
  );
};

export default ShipOwnerDetailPage;
