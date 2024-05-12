// BirthdayItem.tsx
import React, { useState, useEffect } from 'react';
import { DatePicker, Typography } from 'antd';
import moment from 'moment';

interface BirthdayItemProps {
  initialValue: string;
  //onUpdate: (newBirthday: string) => void;
}

const BirthdayItem: React.FC<BirthdayItemProps> = ({ initialValue }) => {
  const [dateOfBirth, setDateOfBirth] = useState<string>(initialValue);

  // When the initialValue changes (e.g., fetched from an API), update the local state
  useEffect(() => {
    if (initialValue) {
      setDateOfBirth(initialValue);
    }
  }, [initialValue]);

  // const handleDateChange = (date: moment.Moment | null, dateString: string) => {
  //   if (date) {
  //     setDateOfBirth(dateString);
  //     onUpdate(dateString); // Push updates to the parent component
  //   } else {
  //     setDateOfBirth(''); // Reset if the date was cleared
  //     onUpdate(''); // Notify parent of the reset
  //   }
  // };

  return (
    <>
      <Typography style={{ color: '#01509A' }}>Ngày sinh</Typography>
      <DatePicker
        disabled
        style={{ width: '100%' }}
        format="YYYY-MM-DD"
        value={dateOfBirth ? moment(dateOfBirth) : null}
      />
    </>
  );
};

export default BirthdayItem;
