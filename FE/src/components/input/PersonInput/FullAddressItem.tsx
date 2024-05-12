import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Typography, Col, Space, Form, Select, Spin, Input } from 'antd';

const { Option } = Select;

interface FullAddressItemProps {
  onChange: (value: { province: string; district: string; commune: string; street: string }) => void;
}
const apiUrl = 'https://vietnam-administrative-division-json-server-swart.vercel.app';
const apiEndpointDistrict = apiUrl + '/district/?idProvince=';
const apiEndpointCommune = apiUrl + '/commune/?idDistrict=';

const FullAddressItem: React.FC<FullAddressItemProps> = ({ onChange }) => {
  //Set state to manage province code and value
  const [provinceName, setProvinceName] = useState('');
  const [provinceValue, setProvinceValue] = useState('');
  //Set state to manage district code and value
  const [districtValue, setDistrictValue] = useState<string>('0');
  const [districtName, setDistrictName] = useState('');
  //Set state to manage commune code and value
  const [communeValue, setCommuneValue] = useState<string>('0');
  const [communeName, setCommuneName] = useState('');
  //Set state to manage street value
  const [streetValue, setStreetValue] = useState('');
  //Getting list from API and set loadind indicator etc...
  const [districtList, setDistrictList] = useState<any[]>([]);
  const [communeList, setCommuneList] = useState<any[]>([]);
  const [isLoadingDistrict, setIsLoadingDistrict] = useState<boolean>(false);
  const [isLoadingCommune, setIsLoadingCommune] = useState<boolean>(false);

  useEffect(() => {
    //Combine all into 1 single 'address'
    const fullAddress = `${provinceName}, ${districtName}, ${communeName}, ${streetValue}`;
    console.log('Full Address:', fullAddress);
  }, [provinceName, districtName, communeName, streetValue]);

  const handleChangeProvince = async (value: string) => {
    if (value === '0') {
      setDistrictList([]);
      setCommuneList([]);
      setDistrictValue('0');
      setCommuneValue('0');
      return;
    }
    setIsLoadingDistrict(true);
    try {
      //Call API again to find the province name using the province key
      const response = await axios.get(`https://vietnam-administrative-division-json-server-swart.vercel.app/province`);
      const provinceList = response.data;
      const selectedProvince = provinceList.find((province: any) => province.idProvince === value);
      if (selectedProvince) {
        //Set province name for useState
        setProvinceName(selectedProvince.name);
        setProvinceValue(value);
        //console.log('Province name:', selectedProvince.name);
      } else {
        console.error('Province not found for value:', value);
      }
      const responseDistrict = await axios.get(apiEndpointDistrict + value);
      setDistrictList(responseDistrict.data);
    } catch (error) {
      console.error('Error fetching districts:', error);
    } finally {
      setIsLoadingDistrict(false);
    }
    if (onChange) {
      onChange({
        province: provinceName,
        district: districtName,
        commune: communeName,
        street: streetValue,
      });
    }
  };

  // console.log('Province Name:', provinceName);
  // console.log('Province Value:', provinceValue);

  const handleChangeDistrict = async (value: string) => {
    setDistrictValue(value);
    if (value === '0') {
      setCommuneList([]);
      setCommuneValue('0');
    } else {
      setIsLoadingCommune(true);
      try {
        //Call API again to find the district name using the district key
        const responseDistrict = await axios.get(apiEndpointDistrict + provinceValue);
        const districtList = responseDistrict.data;
        //console.log(districtList);
        const selectedDistrict = districtList.find((district: any) => district.idDistrict === value);
        if (selectedDistrict) {
          //Set district name for useState
          setDistrictName(selectedDistrict.name);
          setDistrictValue(value);
          //console.log('District name:', selectedDistrict.name);
        } else {
          console.error('District not found for value:', value);
        }
        const responseCommune = await axios.get(apiEndpointCommune + value);
        setCommuneList(responseCommune.data);
      } catch (error) {
        console.error('Error fetching communes:', error);
      } finally {
        setIsLoadingCommune(false);
      }
    }
    if (onChange) {
      onChange({
        province: provinceName,
        district: districtName,
        commune: communeName,
        street: streetValue,
      });
    }
  };

  // console.log('District Name:', districtName);
  // console.log('District Value:', districtValue);

  const handleChangeCommune = async (value: string) => {
    setCommuneValue(value);
    try {
      //Call API again to find the commune name using the commune key
      const responseCommune = await axios.get(apiEndpointCommune + districtValue);
      const communeList = responseCommune.data;
      //console.log(communeList);
      const selectedCommune = communeList.find((commune: any) => commune.idCommune === value);
      if (selectedCommune) {
        //Set commune name for useState
        setCommuneName(selectedCommune.name);
        setCommuneValue(value);
        //console.log('Commune name:', selectedCommune.name);
      } else {
        console.error('Commune not found for value:', value);
      }
    } catch (error) {}
    if (onChange) {
      onChange({
        province: provinceName,
        district: districtName,
        commune: communeName,
        street: streetValue,
      });
    }
  };

  const handleChangeStreet = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setStreetValue(value);

    if (onChange) {
      onChange({
        province: provinceName,
        district: districtName,
        commune: communeName,
        street: streetValue,
      });
    }
  };

  return (
    <Col>
      <Space size={100}>
        <Space direction="vertical" size={10}>
          <Form.Item>
            <Typography style={{ color: '#01509A' }}>Tỉnh/Thành Phố</Typography>
            <Select id="province" defaultValue="0" onChange={handleChangeProvince} style={{ width: '300px' }}>
              <Option value="0">&nbsp;Chọn Tỉnh/Thành Phố...</Option>
              <option value="01">&nbsp;Thành phố Hà Nội</option>
              <option value="79">&nbsp;Thành phố Hồ Chí Minh</option>
              <option value="31">&nbsp;Thành phố Hải Phòng</option>
              <option value="48">&nbsp;Thành phố Đà Nẵng</option>
              <option value="92">&nbsp;Thành phố Cần Thơ</option>
              <option value="02">&nbsp;Tỉnh Hà Giang</option>
              <option value="04">&nbsp;Tỉnh Cao Bằng</option>
              <option value="06">&nbsp;Tỉnh Bắc Kạn</option>
              <option value="08">&nbsp;Tỉnh Tuyên Quang</option>
              <option value="10">&nbsp;Tỉnh Lào Cai</option>
              <option value="11">&nbsp;Tỉnh Điện Biên</option>
              <option value="12">&nbsp;Tỉnh Lai Châu</option>
              <option value="14">&nbsp;Tỉnh Sơn La</option>
              <option value="15">&nbsp;Tỉnh Yên Bái</option>
              <option value="17">&nbsp;Tỉnh Hoà Bình</option>
              <option value="19">&nbsp;Tỉnh Thái Nguyên</option>
              <option value="20">&nbsp;Tỉnh Lạng Sơn</option>
              <option value="22">&nbsp;Tỉnh Quảng Ninh</option>
              <option value="24">&nbsp;Tỉnh Bắc Giang</option>
              <option value="25">&nbsp;Tỉnh Phú Thọ</option>
              <option value="26">&nbsp;Tỉnh Vĩnh Phúc</option>
              <option value="27">&nbsp;Tỉnh Bắc Ninh</option>
              <option value="30">&nbsp;Tỉnh Hải Dương</option>
              <option value="33">&nbsp;Tỉnh Hưng Yên</option>
              <option value="34">&nbsp;Tỉnh Thái Bình</option>
              <option value="35">&nbsp;Tỉnh Hà Nam</option>
              <option value="36">&nbsp;Tỉnh Nam Định</option>
              <option value="37">&nbsp;Tỉnh Ninh Bình</option>
              <option value="38">&nbsp;Tỉnh Thanh Hóa</option>
              <option value="40">&nbsp;Tỉnh Nghệ An</option>
              <option value="42">&nbsp;Tỉnh Hà Tĩnh</option>
              <option value="44">&nbsp;Tỉnh Quảng Bình</option>
              <option value="45">&nbsp;Tỉnh Quảng Trị</option>
              <option value="46">&nbsp;Tỉnh Thừa Thiên Huế</option>
              <option value="49">&nbsp;Tỉnh Quảng Nam</option>
              <option value="51">&nbsp;Tỉnh Quảng Ngãi</option>
              <option value="52">&nbsp;Tỉnh Bình Định</option>
              <option value="54">&nbsp;Tỉnh Phú Yên</option>
              <option value="56">&nbsp;Tỉnh Khánh Hòa</option>
              <option value="58">&nbsp;Tỉnh Ninh Thuận</option>
              <option value="60">&nbsp;Tỉnh Bình Thuận</option>
              <option value="62">&nbsp;Tỉnh Kon Tum</option>
              <option value="64">&nbsp;Tỉnh Gia Lai</option>
              <option value="66">&nbsp;Tỉnh Đắk Lắk</option>
              <option value="67">&nbsp;Tỉnh Đắk Nông</option>
              <option value="68">&nbsp;Tỉnh Lâm Đồng</option>
              <option value="70">&nbsp;Tỉnh Bình Phước</option>
              <option value="72">&nbsp;Tỉnh Tây Ninh</option>
              <option value="74">&nbsp;Tỉnh Bình Dương</option>
              <option value="75">&nbsp;Tỉnh Đồng Nai</option>
              <option value="77">&nbsp;Tỉnh Bà Rịa - Vũng Tàu</option>
              <option value="80">&nbsp;Tỉnh Long An</option>
              <option value="82">&nbsp;Tỉnh Tiền Giang</option>
              <option value="83">&nbsp;Tỉnh Bến Tre</option>
              <option value="84">&nbsp;Tỉnh Trà Vinh</option>
              <option value="86">&nbsp;Tỉnh Vĩnh Long</option>
              <option value="87">&nbsp;Tỉnh Đồng Tháp</option>
              <option value="89">&nbsp;Tỉnh An Giang</option>
              <option value="91">&nbsp;Tỉnh Kiên Giang</option>
              <option value="93">&nbsp;Tỉnh Hậu Giang</option>
              <option value="94">&nbsp;Tỉnh Sóc Trăng</option>
              <option value="95">&nbsp;Tỉnh Bạc Liêu</option>
              <option value="96">&nbsp;Tỉnh Cà Mau</option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Typography style={{ color: '#01509A' }}>Quận/Huyện</Typography>
            <Select id="district" value={districtValue} onChange={handleChangeDistrict} style={{ width: '300px' }}>
              <Option value="0">&nbsp;Chọn Quận/Huyện...</Option>
              {districtList.map((district: any) => (
                <Option key={district.idDistrict} value={district.idDistrict}>
                  &nbsp;{district.name}
                </Option>
              ))}
            </Select>
            {isLoadingDistrict && (
              <span>
                <Spin style={{ marginLeft: '8px' }} />
              </span>
            )}
          </Form.Item>
        </Space>
        <Space direction="vertical">
          <Form.Item>
            <Typography style={{ color: '#01509A' }}>Xã/Phường</Typography>
            <Select id="commune" value={communeValue} onChange={handleChangeCommune} style={{ width: '300px' }}>
              <Option value="0">&nbsp;Chọn Phường/Xã...</Option>
              {communeList.map((commune: any) => (
                <Option key={commune.idCommune} value={commune.idCommune}>
                  &nbsp;{commune.name}
                </Option>
              ))}
            </Select>
            {isLoadingCommune && !isLoadingDistrict && (
              <span>
                <Spin style={{ marginLeft: '8px' }} />
              </span>
            )}
          </Form.Item>
          <Form.Item
            rules={
              [
                // { required: true, message: 'Vui lòng nhập địa chỉ!' }
              ]
            }
          >
            <Typography style={{ color: '#01509A' }}>Tên đường, số nhà...</Typography>
            <Input
              id="street"
              placeholder="Nhập địa chỉ"
              maxLength={30}
              style={{ width: '300px' }}
              onChange={handleChangeStreet}
              value={streetValue}
            />
          </Form.Item>
        </Space>
      </Space>
    </Col>
  );
};

export default FullAddressItem;
