import React, { useEffect, useState } from 'react';
import { Col, Row, Descriptions } from 'antd';
import UploadImageButton from '@app/components/buttons/UploadImage/UploadImageButton';
import { useNavigate, useParams } from 'react-router-dom';
import EditButton from '@app/components/buttons/EditButton/EditButton';
import { editButtonStyle } from '../DetailForm.style';
import StatusTag from '@app/components/tags/StatusTag/StatusTag';
import { Captain, getCaptainTableData } from '@app/api/captain.api';

const formatDate = (date: Date): string => {
  const day = ('0' + date.getDate()).slice(-2);
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const CaptainDetailForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [captainDetails, setCaptainDetail] = useState<Captain | null>(null);
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [isEditMode, setIsEditMode] = useState(false);
  const [prevUpdateInforTime, setPrevUpdateInforTime] = useState<Date | null>(null);
  const handleImageUpload = (url: string) => {
    setImageUrl(url);
  };

  const handleEditClick = () => {
    navigate(`/captain-detail/${id}/edit`);
  };

  const handleSaveClick = () => {
    setIsEditMode(false);
  };

  useEffect(() => {
    const fetchcaptainDetail = async () => {
      try {
        const { data } = await getCaptainTableData({ current: 1, pageSize: 6 });
        const captain = data.find((item) => item.id === Number(id));

        if (captain) {
          setCaptainDetail(captain);
          setImageUrl(captain.avatar);
        } else {
          console.error(`Captain with id ${id} not found`);
        }
      } catch (error) {
        console.error('Error fetching captain details', error);
      }
    };

    fetchcaptainDetail();
  }, [id]);

  if (!captainDetails) {
    return <div>Đang tải...</div>;
  }

  const handleBack = () => {
    navigate('/captain-management');
  };
  return (
    <div>
      <Row>
        <Col
          xs={{ span: 19, offset: 5 }}
          md={{ span: 8, offset: 0 }}
          lg={{ span: 6, offset: 0 }}
          xl={{ offset: 0, span: 4 }}
        >
          <UploadImageButton imageUrl={imageUrl} onImageUpload={handleImageUpload} disabled={!isEditMode} />
        </Col>
        <Col xs={{ span: 24 }} md={{ span: 15 }} lg={{ span: 16 }} xl={{ span: 18 }}>
          <Descriptions labelStyle={{ fontWeight: 'bold' }} column={2}>
            <Descriptions.Item label="Họ và tên">{captainDetails.fullName}</Descriptions.Item>
            <Descriptions.Item label="Ngày sinh">{formatDate(new Date(captainDetails.dateOfBirth))}</Descriptions.Item>
            <Descriptions.Item label="Địa chỉ">{captainDetails.address}</Descriptions.Item>
            <Descriptions.Item label="Quốc tịch">{captainDetails.country}</Descriptions.Item>
            <Descriptions.Item label="Căng cước công dân">{captainDetails.nationalId}</Descriptions.Item>
            <Descriptions.Item label="Giới tính">{captainDetails.gender}</Descriptions.Item>
            <Descriptions.Item label="Số điện thoại">{captainDetails.phoneNumber}</Descriptions.Item>
            <Descriptions.Item label="Email">{captainDetails.email}</Descriptions.Item>
            <Descriptions.Item label="Ngày thay đổi gần nhất">
              {formatDate(new Date(captainDetails.updatedAt))}
            </Descriptions.Item>
            <Descriptions.Item label="Thay đổi bởi">{captainDetails.updatedBy}</Descriptions.Item>
            <Descriptions.Item label="Trạng thái">
              <StatusTag status={captainDetails.isDisabled}>
                {captainDetails.isDisabled ? 'Đã khóa' : 'Hoạt động'}
              </StatusTag>
            </Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>
      <Row gutter={[8, 8]} style={editButtonStyle}>
        <Col
          xs={{ span: 24, offset: 0 }}
          md={{ span: 8, offset: 8 }}
          lg={{ span: 6, offset: 6 }}
          xl={{ span: 4, offset: 4 }}
        >
          <EditButton onClick={handleEditClick} />
        </Col>
      </Row>
    </div>
  );
};

export default CaptainDetailForm;
