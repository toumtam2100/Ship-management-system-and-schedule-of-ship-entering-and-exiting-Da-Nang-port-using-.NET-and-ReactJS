import React from 'react';
import { BaseCard } from '@app/components/common/BaseCard/BaseCard';
import { PieChart } from '@app/components/common/charts/PieChart';

export const UserPieChart: React.FC = () => {
  const data = [
    { value: 70, name: 'Thuyền viên' },
    { value: 20, name: 'Thuyền trưởng' },
    { value: 22, name: 'Chủ tàu' },
    { value: 15, name: 'Biên phòng' },
    { value: 15, name: 'Cảng vụ' },
  ];

  const name = 'Cá nhân:';

  return (
    <BaseCard padding="0 0 1.875rem" title={'Các cá nhân'}>
      <PieChart data={data} name={name} showLegend={true} />
    </BaseCard>
  );
};
