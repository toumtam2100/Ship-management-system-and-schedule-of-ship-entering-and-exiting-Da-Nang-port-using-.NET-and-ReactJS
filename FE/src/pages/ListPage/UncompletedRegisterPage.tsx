import React from 'react';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import UncompleteTable from '@app/components/tables/UncompleteTable';

const UncompletedRegisterPage: React.FC = () => {
    return (
        <div style={{ marginLeft: 6 , marginRight: 12}}>
            <PageTitle></PageTitle>
            <UncompleteTable />
        </div>
    );
};

export default UncompletedRegisterPage;