import React, { useCallback, useEffect, useMemo, useState, Dispatch, SetStateAction } from 'react';
import { fetchUserData, updateUserData, extractKey } from './PersonalInfo.utils';
import { Card, Col, Input, Row, Form, Typography, Button } from 'antd';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import FullNameItem from './FullNameItem/FullNameItem';
import BirthdayItem from './BirthdayItem/BirthdayItem';
import ContactItem from './ContactItem/ContactItem';
import moment from 'moment';
import GenderItem from './GenderItem/GenderItem';
import EmailItem from './EmailItem/EmailItem';
import AddressItem from './AddressItem/AddressItem';
import NationalIDItem from './NationalIDItem/NationalIDItem';
import { message } from 'antd';

interface PersonalInfoFormValues {
  fullName?: string;
  dateOfBirth?: string;
  address?: string;
  phoneNumber?: string;
  email?: string;
  gender?: string;
  country?: string;
  nationalId?: string;
  avatar?: string;
}

dayjs.extend(utc);

export const PersonalInfo: React.FC = () => {
  const [isModified, setIsModified] = useState<boolean>(false); // State to track user modifications in the form
  const [userData, setUserData] = useState<PersonalInfoFormValues | null>(null);
  const idToken = localStorage.getItem('idToken');
  const [countryCode, setCountryCode] = useState<string>('');
  const [localNumber, setLocalNumber] = useState<string>('');

  useEffect(() => {
    if (idToken) {
      fetchUserData(idToken)
        .then((data) => {
          console.log(data);
          const formattedDoB = data.result.dateOfBirth ? dayjs(data.result.dateOfBirth).utc().format('YYYY-MM-DD') : '';

          const formattedUserData = {
            avatar: extractKey(data.result.avatar),
            fullName: data.result.fullName,
            dateOfBirth: formattedDoB,
            address: data.result.address,
            phoneNumber: data.result.phoneNumber,
            email: data.result.email,
            gender: data.result.gender,
            country: data.result.country,
            nationalId: data.result.nationalId,
          };

          setUserData(formattedUserData);
          console.log('hehe', formattedUserData);

          // Split the phone number into country code and local number
          const phoneNumber = data.result.phoneNumber;
          const extractedCountryCode = phoneNumber.slice(0, 3);
          const extractedLocalNumber = phoneNumber.slice(3);

          setCountryCode(extractedCountryCode); // Set the country code state
          setLocalNumber(extractedLocalNumber); // Set the local number state

          form.setFieldsValue(formattedUserData);
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
        });
    } else {
      console.error('No idToken found');
    }
  }, []);

  const [form] = Form.useForm();

  const handleFormChange = () => {
    setIsModified(true);
  };

  const handleSave = async () => {
    if (userData && idToken) {
      try {
        const updateData = {
          fullName: userData.fullName,
          phoneNumber: userData.phoneNumber,
          gender: userData.gender,
          avatar: userData.avatar, // Update the actual avatar data if available
          address: userData.address,
        };

        const result = await updateUserData(idToken, updateData);
        setIsModified(false);

        const successMsgKey = 'updateSuccess';
        message.success({ content: 'Cập nhật thông tin thành công', key: successMsgKey });

        setTimeout(() => {
          message.destroy(successMsgKey);

          let secondsToGo = 2;
          const countdownMsgKey = 'reloadCountdown';

          message.loading({ content: `Tải lại trang trong ${secondsToGo}...`, key: countdownMsgKey });

          const timer = setInterval(() => {
            secondsToGo -= 1;
            message.loading({ content: `Tải lại trang trong ${secondsToGo}...`, key: countdownMsgKey });
          }, 1000);

          setTimeout(() => {
            clearInterval(timer);
            message.destroy(countdownMsgKey);
            window.location.reload();
          }, secondsToGo * 1000);
        }, 1000);

        // Update local state with response data if necessary
        setUserData(result);
      } catch (error) {
        console.error('Error saving user data:', error);
        message.error('Có lỗi khi cập nhật thông tin. Vui lòng thử lại.');
      }
    } else {
      console.error('No ID token or incomplete user data provided for update');
      message.error('Dữ liệu không đầy đủ để cập nhật.');
    }
  };

  const handleCancel = () => {
    form.resetFields(); // Reset form fields to initial values
    setIsModified(false); // Reset the isModified flag as changes have been discarded
  };

  return (
    <Card>
      <Form form={form} layout="vertical" onChange={handleFormChange}>
        <Row gutter={[50, 20]}>
          <Col span={12}>
            <FullNameItem
              value={userData?.fullName}
              onUpdate={(newFullName) => {
                setUserData((prevUserData) => ({
                  ...prevUserData,
                  fullName: newFullName,
                }));
                form.setFieldsValue({ fullName: newFullName });
                setIsModified(true);
              }}
            />
          </Col>
          <Col span={12}>
            <BirthdayItem initialValue={userData?.dateOfBirth ?? ''} />
          </Col>
          <Col span={12}>
            <ContactItem
              addonBefore={userData?.phoneNumber?.slice(0, 3)} // Assuming this is the countryCode
              phoneNumber={userData?.phoneNumber ?? ''}
              onPhoneNumberChange={(newPhoneNumber) => {
                setUserData((prevUserData) => ({
                  ...prevUserData,
                  phoneNumber: newPhoneNumber,
                }));
                form.setFieldsValue({ phoneNumber: newPhoneNumber });
                setIsModified(true);
              }}
            />
          </Col>
          <Col span={12}>
            <GenderItem
              initialValue={userData?.gender ?? ''}
              onUpdate={(newGender) => {
                setUserData((prevUserData) => ({
                  ...prevUserData,
                  gender: newGender,
                }));
                form.setFieldsValue({ gender: newGender });
                setIsModified(true);
              }}
            />
          </Col>
          <Col span={12}>
            <EmailItem value={userData?.email} />
          </Col>
          <Col span={12}>
            <NationalIDItem nationalId={userData?.nationalId} />
          </Col>
          <Col span={24}>
            <AddressItem address={userData?.address} />
          </Col>
          {isModified && (
            <>
              <Col span={12}>
                <Button type="primary" onClick={handleSave} style={{ width: '100%' }}>
                  Lưu
                </Button>
              </Col>
              <Col span={12}>
                <Button onClick={handleCancel} style={{ width: '100%' }}>
                  Hủy bỏ
                </Button>
              </Col>
            </>
          )}
        </Row>
      </Form>
    </Card>
  );
};
