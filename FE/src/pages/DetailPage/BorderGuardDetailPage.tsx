import React from 'react';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import { Col, Row, Typography } from 'antd';
import BorderGuardDetailForm from '@app/components/forms/DetailForm/ManagementDetail/BorderGuardDetailForm';
import BackButton from '@app/components/buttons/BackButton/BackButton';

const { Title } = Typography;

const BorderGuardDetailPage: React.FC = () => {
    return (
        <div style={{ marginLeft: 6 }}>
            <PageTitle>Thông Tin Của Biên Phòng</PageTitle>
            <Row>
                <Col xs={24} md={16} lg={18} xl={20}>
                    <Title>Thông Tin Biên Phòng</Title>
                </Col>
                <Col xs={24} md={8} lg={6} xl={4} style={{ margin: 'auto' }}>
                    <BackButton />
                </Col>
            </Row>
            <BorderGuardDetailForm />
        </div>
    );
};

export default BorderGuardDetailPage;