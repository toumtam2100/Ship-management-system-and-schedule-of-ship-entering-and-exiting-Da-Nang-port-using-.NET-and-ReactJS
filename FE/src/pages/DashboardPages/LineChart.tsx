import React, { useState, useEffect, useCallback } from 'react';
import { BaseCard } from '@app/components/common/BaseCard/BaseCard';
import { BaseChart } from '@app/components/common/charts/BaseChart';
import Data from './data.json';
import { useAppSelector } from '@app/hooks/reduxHooks';
import { themeObject } from '@app/styles/themes/themeVariables';

interface DataRow {
  id: string;
  fromDatasetId: string;
  transform: {
    type: string;
    config: { and: [{ dimension: string; gte: number }, { dimension: string; '=': string }] };
  };
}

interface SeriesRow {
  type: string;
  datasetId: string;
  showSymbol: boolean;
  name: string;
  endLabel: {
    show: boolean;
    formatter: (params: { value: string }) => string;
    color?: string;
  };
  labelLayout: {
    moveOverlap: string;
  };
  emphasis: {
    focus: string;
  };
  encode: {
    x: string;
    y: string;
    label: [string, string];
    itemName: string;
    tooltip: [string];
  };
}

export const LineChart: React.FC = () => {
  const [data, setData] = useState<DataRow[]>([]);
  const [series, setSeries] = useState<SeriesRow[]>([]);
  const rawData = JSON.parse(JSON.stringify(Data));

  const theme = useAppSelector((state) => state.theme.theme);

  const runAnimation = useCallback(() => {
    const registers = ['Vào cảng', 'Rời cảng'];
    const datasetWithFilters: DataRow[] = [];
    const seriesList: SeriesRow[] = [];

    registers.forEach((register) => {
      const datasetId = `dataset_${register}`;
      datasetWithFilters.push({
        id: datasetId,
        fromDatasetId: 'dataset_raw',
        transform: {
          type: 'filter',
          config: {
            and: [
              { dimension: 'MonthOfYear', gte: 1 },
              { dimension: 'Register', '=': register },
            ],
          },
        },
      });
      seriesList.push({
        type: 'line',
        datasetId: datasetId,
        showSymbol: true,
        name: register,
        endLabel: {
          show: true,
          formatter: (params) => `${params.value[1]}: ${params.value[0]}`,
          color: themeObject[theme].textMain,
        },
        labelLayout: {
          moveOverlap: 'shiftY',
        },
        emphasis: {
          focus: 'series',
        },
        encode: {
          x: 'MonthOfYear',
          y: 'Income',
          label: ['Register', 'Income'],
          itemName: 'MonthOfYear',
          tooltip: ['Income'],
        },
      });
    });
    setData(datasetWithFilters);
    setSeries(seriesList);
  }, [theme]);

  useEffect(() => {
    setTimeout(() => {
      runAnimation();
    }, 200);
  }, [runAnimation]);

  const option = {
    color: ['#ff3d71', '#ffb765'],
    animationDuration: 10000,
    dataset: [
      {
        id: 'dataset_raw',
        source: rawData,
      },
      ...data,
    ],
    tooltip: {
      order: 'valueDesc',
      trigger: 'axis',
    },
    xAxis: {
      type: 'category',
      nameLocation: 'middle',
    },
    yAxis: {
      name: '',
    },
    grid: {
      left: 65,
      right: 150,
      top: 20,
      bottom: 30,
    },
    series: series,
  };

  return (
    <BaseCard padding="0 0 1.875rem" title={'Thống kê ra vào cảng trong 12 tháng qua'}>
      <BaseChart option={option} height="24rem" />
    </BaseCard>
  );
};
