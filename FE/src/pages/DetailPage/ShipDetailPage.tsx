import React from 'react';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import ShipDetailForm from '@app/components/forms/DetailForm/ShipDetail/ShipDetailForm';
import { Col, Row, Typography } from 'antd';
import SailingHistoryShipTable from '@app/components/tables/TableForDetailPage/PortHistoryTable';
import BackButton from '@app/components/buttons/BackButton/BackButton';

const { Title } = Typography;

const ShipDetailPage: React.FC = () => {
  return (
    <div style={{ marginLeft: 6 }}>
      <PageTitle>Thông tin của tàu</PageTitle>
      <Row>
        <Col xs={24} md={18} lg={20} xl={22}>
          <Title>Thông Tin Tàu</Title>
        </Col>
        <Col xs={24} md={6} lg={4} xl={2} style={{ margin: 'auto' }}>
          <BackButton />
        </Col>
      </Row>
      <ShipDetailForm />
      <SailingHistoryShipTable />
    </div>
  );
};

export default ShipDetailPage;
