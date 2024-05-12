import React from 'react';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import DepartureShipListTable from '@app/components/tables/DepartureShipListTable';

const ApproveEnterShipListsPage: React.FC = () => {
  return (
    <div style={{ marginLeft: 6, marginRight: 12 }}>
      <PageTitle>Xét Duyệt Rời Cảng</PageTitle>
      <DepartureShipListTable />
    </div>
  );
};

export default ApproveEnterShipListsPage;
