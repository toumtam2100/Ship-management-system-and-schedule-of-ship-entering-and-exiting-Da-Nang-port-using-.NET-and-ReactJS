import React from 'react';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import ArrivalShipListTable from '@app/components/tables/ArrivalShipListTable';

const ApproveArrivalShipListsPage: React.FC = () => {
  return (
    <div style={{ marginLeft: 6, marginRight: 12 }}>
      <PageTitle>Xét Duyệt Vào Cảng</PageTitle>
      <ArrivalShipListTable />
    </div>
  );
};

export default ApproveArrivalShipListsPage;
