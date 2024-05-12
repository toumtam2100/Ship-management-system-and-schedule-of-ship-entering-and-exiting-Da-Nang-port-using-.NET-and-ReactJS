import { Select } from 'antd';
// import 'antd/dist/antd.css';

const { Option } = Select;

export const DropdownButtonComponent = () => {
  function handleChange(value: any) {
    console.log(`Selected: ${value}`);
  }

  return (
    <Select
      style={{ width: '170px', height: '40px' }}
      className="dropdown "
      defaultValue="pending"
      onChange={handleChange}
      popupClassName="custom-dropdown"
    >
      <Option className="option1" value="pending">
        Chờ ra khơi
      </Option>
      <Option value="departed">Đang ra khơi</Option>
      <Option value="updated">Đã cập cảng</Option>
    </Select>
  );
};
