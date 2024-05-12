import React from 'react';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import NextJourneyTable from '@app/components/tables/NextJourneyTable';

const NextJourney: React.FC = () => {
  return (
    <div style={{ marginLeft: 6, marginRight: 12 }}>
      <PageTitle></PageTitle>
      <NextJourneyTable />
    </div>
  );
};

export default NextJourney;
