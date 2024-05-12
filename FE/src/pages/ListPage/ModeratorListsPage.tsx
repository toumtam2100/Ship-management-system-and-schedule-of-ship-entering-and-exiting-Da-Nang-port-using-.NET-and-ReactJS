import React from 'react';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import ModeratorListTable from '@app/components/tables/ModeratorListTable';

const ModeratorListsPage: React.FC = () => {
  return (
    <>
      <PageTitle>Quản Lý Cảng Vụ</PageTitle>
      <div style={{ marginLeft: 6 , marginRight: 12}}>
        <ModeratorListTable />
      </div>
    </>
  );
};

export default ModeratorListsPage;
