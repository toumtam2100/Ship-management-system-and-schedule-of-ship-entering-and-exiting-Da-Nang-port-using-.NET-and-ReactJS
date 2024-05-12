import { Select, Typography } from 'antd';
import React, { ReactNode } from 'react'; // Import ReactNode

interface NationalityItemProps {
  countries: { name: string }[];
  selectedCountry?: string;
  onChange: (value: string) => void;
}

const NationalityItem: React.FC<NationalityItemProps> = ({ countries, selectedCountry, onChange }) => {
  return (
    <>
      <Typography style={{ color: '#01509A' }}>Quốc tịch</Typography>
      <Select
        showSearch
        value={selectedCountry}
        onChange={onChange}
        filterOption={(input, option) => {
          const children: ReactNode = option?.props.children; // Using option.props.children which is typed correctly
          if (typeof children === 'string') {
            return children.toLowerCase().includes(input.toLowerCase());
          }
          // For cases where children might not be a string
          return false;
        }}
        style={{ width: '100%' }}
      >
        {countries.map(country => (
          <Select.Option key={country.name} value={country.name}>
            {country.name}
          </Select.Option>
        ))}
      </Select>
    </>
  );
};

export default NationalityItem;