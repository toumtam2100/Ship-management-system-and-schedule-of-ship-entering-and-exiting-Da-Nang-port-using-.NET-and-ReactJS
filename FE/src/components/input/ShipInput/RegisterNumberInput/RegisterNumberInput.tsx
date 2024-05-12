import { Typography, Input, InputNumber, Select, Form } from 'antd';
import React, { useState } from 'react';
import { provinceAbbreviations } from './ProvinceData.api';

const { Option } = Select;

interface RegisterNumberInputProps {
  value?: string;
  onChange?: (value: string) => void;
}

const RegisterNumberInput: React.FC<RegisterNumberInputProps> = ({ onChange }) => {
  const [provinceCode, setProvinceCode] = useState('');
  const [number, setNumber] = useState('');
  const [combinedValue, setCombinedValue] = useState('');

  const handleChange = (provinceCode: string) => {
    setProvinceCode(provinceCode);
    if (number) {
      const newValue = `${provinceCode}-${number}-TS`;
      setCombinedValue(newValue);
      if (onChange) {
        onChange(newValue);
      }
    }
  };

  const handleNumberChange = (value: number | string | null) => {
    if (typeof value === 'number') {
      const newNumber = value.toString();
      setNumber(newNumber);
      if (provinceCode) {
        const newValue = `${provinceCode}-${newNumber}-TS`;
        setCombinedValue(newValue);
        if (onChange) {
          onChange(newValue);
        }
      }
    }
  };

  // Custom validation rule to check if the number field has exactly 5 digits
  const validateNumber = (_: any, value: number | undefined) => {
    if (value === undefined || String(value).length === 5) {
      return Promise.resolve();
    }
    return Promise.reject(new Error('Mã số đăng ký phải có đúng 5 chữ số!'));
  };

  return (
    <>
      <Typography style={{ color: '#01509A' }}>Số đăng ký</Typography>
      <div style={{ display: 'flex', flexDirection: 'row', width: '340px' }}>
        <Input.Group compact>
          <Form.Item
            name={['registerNumber, province']}
            noStyle
            rules={[{ required: true, message: 'Vui lòng chọn tỉnh thành đăng ký!' }]}
          >
            <Select
              style={{ width: '70%' }}
              placeholder="Tỉnh thành"
              onChange={handleChange} // Pass the value directly to handleChange
            >
              {Object.entries(provinceAbbreviations).map(([name, abbreviation]) => (
                <Option key={abbreviation} value={name}>
                  {`${abbreviation} - ${name}`}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name={['registerNumber, num']}
            noStyle
            rules={[{ required: true, message: 'Vui lòng nhập mã số đăng ký!' }, { validator: validateNumber }]}
          >
            <InputNumber
              maxLength={5}
              controls={false}
              style={{
                // textAlign: 'center',
                height: '50px',
                width: '30%',
              }}
              placeholder="Số đăng ký"
              onChange={handleNumberChange}
            />
          </Form.Item>
        </Input.Group>
      </div>
    </>
  );
};

export default RegisterNumberInput;
