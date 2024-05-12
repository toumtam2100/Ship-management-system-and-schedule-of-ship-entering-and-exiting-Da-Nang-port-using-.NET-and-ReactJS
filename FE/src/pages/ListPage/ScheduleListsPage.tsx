import React from 'react';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import HistoryTable from '@app/components/tables/HistoryTable';

const ScheduleListsPage: React.FC = () => {
    return (
        <div style={{ marginLeft: 6 , marginRight: 12}}>
            <PageTitle>Lịch sử ra vào cảng</PageTitle>
            <HistoryTable />
        </div>
    );
};

export default ScheduleListsPage;