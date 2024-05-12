import { Form, Select, Typography } from 'antd';
import React from 'react';

interface ShipNameProps {
  onChange?: (setShipName: any) => void;
}

const ShipTypeInput: React.FC<ShipNameProps> = () => {
  return (
    <>
      <Typography>Loại Tàu</Typography>
      <Form.Item name="shipType" rules={[{ required: true, message: 'Please select a ship type!' }]}>
        <Select placeholder="Chọn loại tàu" allowClear>
          <Select.Option value="Fishing">Đánh Bắt Thủy Sản</Select.Option>
          <Select.Option value="Carrying">Vận Chuyển Hàng Hóa</Select.Option>
          <Select.Option value="Other">Khác</Select.Option>
        </Select>
      </Form.Item>
    </>
  );
};

export default ShipTypeInput;
