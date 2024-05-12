import React from 'react';
import * as S from './BirthdayItem.styles';
import { Typography } from 'antd';
import { Dayjs } from 'dayjs';
import dayjs from 'dayjs';

interface BirthdayItemProps {
  value?: Dayjs | null;
  onChange?: (date: Dayjs | null, dateString: string) => void;
}

export const BirthdayItem: React.FC<BirthdayItemProps> = ({ value, onChange }) => {
  const disableDate = (current: Dayjs) => {
    // Disable all dates after 2006
    return current && current.isAfter(dayjs().year(2006).endOf('year'));
  };

  return (
    <>
      <Typography style={{ color: '#01509A' }}>Ngày tháng năm sinh</Typography>
      <S.BirthdayPicker value={value} onChange={onChange} format="L" disabledDate={disableDate} />
    </>
  );
};
