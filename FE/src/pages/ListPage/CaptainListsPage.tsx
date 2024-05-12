import React from 'react';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import CaptainListTable from '@app/components/tables/CaptainListTable';

const CaptainListsPage: React.FC = () => {
  return (
    <>
      <PageTitle>Quản lý thuyền trưởng</PageTitle>
      <div style={{ marginLeft: 6 , marginRight: 12}}>
        <CaptainListTable />
      </div>
    </>
  );
};

export default CaptainListsPage;
