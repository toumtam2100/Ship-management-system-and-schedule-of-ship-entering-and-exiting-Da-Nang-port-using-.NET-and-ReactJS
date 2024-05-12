import React from 'react';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import ShipListTable from '@app/components/tables/ShipListTable';

const ShipListsPage: React.FC = () => {
  return (
    <>
      <PageTitle>Quản lý tàu</PageTitle>
      <div style={{ marginLeft: 6 , marginRight: 12}}>
        <ShipListTable />
      </div>
    </>
  );
};

export default ShipListsPage;
