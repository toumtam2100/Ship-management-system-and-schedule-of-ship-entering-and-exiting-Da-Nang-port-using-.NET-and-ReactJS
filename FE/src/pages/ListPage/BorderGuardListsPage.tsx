import React from 'react';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import BorderGuardListTable from '@app/components/tables/BorderGuardListTable';

const BorderGuardListsPage: React.FC = () => {
  return (
    <>
      <PageTitle>Quản Lý Biên Phòng</PageTitle>
      <div style={{ marginLeft: 6 , marginRight: 12}}>
        <BorderGuardListTable />
      </div>
    </>
  );
};

export default BorderGuardListsPage;
