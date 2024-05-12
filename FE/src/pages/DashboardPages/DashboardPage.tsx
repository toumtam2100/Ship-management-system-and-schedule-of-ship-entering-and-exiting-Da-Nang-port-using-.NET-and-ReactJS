import React from 'react';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import { Typography } from 'antd';
import { UserPieChart } from './UserPieChart';
import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { RegisterPieChart } from './RegisterPieChart';
import { LineChart } from './LineChart';
const { Title } = Typography;

const DashboardPage: React.FC = () => {
  return (
    <>
      <PageTitle>Trang chủ</PageTitle>
      <Title style={{ marginLeft: 40, marginTop: 30 }}>Trang Chủ</Title>
      <BaseRow style={{ marginLeft: 60 }} gutter={[30, 30]}>
        <BaseCol xs={24} lg={11}>
          <UserPieChart />
        </BaseCol>
        <BaseCol style={{ marginLeft: 40 }} xs={24} lg={11}>
          <RegisterPieChart />
        </BaseCol>
        <BaseCol style={{ marginLeft: 50, marginBottom: 30 }} xs={24} lg={21}>
          <LineChart />
        </BaseCol>
      </BaseRow>
    </>
  );
};

export default DashboardPage;
