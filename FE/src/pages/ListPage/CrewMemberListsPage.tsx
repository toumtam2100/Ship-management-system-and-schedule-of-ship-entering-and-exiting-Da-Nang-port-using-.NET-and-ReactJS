import React from 'react';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import CrewMemberListTable from '@app/components/tables/CrewMemberListTable';

const CrewMemberListsPage: React.FC = () => {
  return (
    <>
      <PageTitle>Quản lý thuyền viên</PageTitle>
      <div style={{ marginLeft: 6 , marginRight: 12}}>
        <CrewMemberListTable />
      </div>
    </>
  );
};

export default CrewMemberListsPage;
