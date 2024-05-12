import React from 'react';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import ShipOwnerListTable from '@app/components/tables/ShipOwnerListTable';

const ShipOwnerListsPage: React.FC = () => {
  return (
    <>
      <PageTitle>Quản lý chủ thuyền</PageTitle>
      <div style={{ marginLeft: 6 , marginRight: 12}}>
        <ShipOwnerListTable />
      </div>
    </>
  );
};

export default ShipOwnerListsPage;
