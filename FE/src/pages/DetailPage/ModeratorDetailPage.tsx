import React from 'react';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import { Col, Row, Typography } from 'antd';
import ModeratorDetailForm from '@app/components/forms/DetailForm/ManagementDetail/ModeratorDetailForm';
import BackButton from '@app/components/buttons/BackButton/BackButton';

const { Title } = Typography;

const ModeratorDetailPage: React.FC = () => {
    return (
        <div style={{ marginLeft: 6 }}>
            <PageTitle>Thông Tin Của Cảng Vụ</PageTitle>
            <Row>
                <Col xl={20}>
                    <Title>Thông Tin Cảng Vụ</Title>
                </Col>
                <Col xl={4} style={{ margin: 'auto' }}>
                    <BackButton />
                </Col>
            </Row>
            <ModeratorDetailForm />
        </div>
    );
};

export default ModeratorDetailPage;