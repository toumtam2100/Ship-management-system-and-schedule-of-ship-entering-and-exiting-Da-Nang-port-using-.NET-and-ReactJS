import React from 'react';
import { Typography, Input } from 'antd';

interface AddressItemProps {
  address?: string;
}

const { TextArea } = Input;

const AddressItem: React.FC<AddressItemProps> = ({ address }) => {
  return (
    <>
      <Typography style={{ color: '#01509A' }}>Địa chỉ</Typography>
      <TextArea disabled value={address} />
    </>
  );
};

export default AddressItem;
