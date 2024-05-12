{ } import React, { useState, useEffect } from 'react';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import ShipEditForm from '@app/components/forms/ShipForm/ShipEditForm';
import { Col, Row, Typography } from 'antd';
import BackButton from '@app/components/buttons/BackButton/BackButton';
import { ShipTableRow, getShipTableData } from '@app/api/shipTable.api';
import { useParams } from 'react-router-dom';

const { Title } = Typography;

const ShipEditDetailPage: React.FC = () => {    
    return (
        <div style={{ marginLeft: 6 }}>
            <PageTitle>Thông tin của tàu</PageTitle>
            <Row>
                <Col xs={24} md={16} lg={18} xl={20}>
                    <Title>Chỉnh Sửa Thông Tin Cảng Vụ</Title>
                </Col>
                <Col xs={24} md={8} lg={6} xl={4} style={{ margin: 'auto' }}>
                    <BackButton />
                </Col>
            </Row>
            {/* <ShipEditForm /> */}
        </div>
    );
};

export default ShipEditDetailPage;