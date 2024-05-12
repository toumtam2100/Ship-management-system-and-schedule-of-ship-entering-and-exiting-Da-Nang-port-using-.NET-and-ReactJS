import React, { useState, useEffect } from 'react';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import ShipEditForm from '@app/components/forms/ShipForm/ShipEditForm';
import { Col, Row, Typography } from 'antd';
import BackButton from '@app/components/buttons/BackButton/BackButton';
import { ShipTableRow, getShipTableData } from '@app/api/shipTable.api';
import { useParams } from 'react-router-dom';
import ShipForm from '@app/components/forms/ShipForm/ShipForm';

const { Title } = Typography;

const ShipEditDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
   
    return (
        <div style={{ marginLeft: 6 }}>
            <PageTitle>Thông tin của tàu</PageTitle>
            <Row>
                <Col xs={24} md={18} lg={20} xl={22}>
                    <Title>Chỉnh Sửa Thông Tin Tàu</Title>
                </Col>
                <Col xs={24} md={6} lg={4} xl={2} style={{ margin: 'auto' }}>
                    <BackButton />
                </Col>
            </Row>
            <ShipForm />
        </div>
    );
};

export default ShipEditDetailPage;