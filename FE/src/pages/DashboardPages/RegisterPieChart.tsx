import React from 'react';
import { BaseCard } from '@app/components/common/BaseCard/BaseCard';
import { PieChart } from '@app/components/common/charts/PieChart';

export const RegisterPieChart: React.FC = () => {
  const data = [
    { value: 10, name: 'Đơn vào cảng' },
    { value: 20, name: 'Đơn rời cảng' },
  ];
  const name = 'Đơn đăng ký:';

  const option = {
    color: ['#d3536e', '#7493b5'],
    series: [
      {
        data: data,
        type: 'pie',
      },
    ],
  };

  return (
    <BaseCard padding="0 0 1.875rem" title={'Đơn đang chờ được duyệt'}>
      <PieChart option={option} name={name} showLegend={true} />
    </BaseCard>
  );
};
