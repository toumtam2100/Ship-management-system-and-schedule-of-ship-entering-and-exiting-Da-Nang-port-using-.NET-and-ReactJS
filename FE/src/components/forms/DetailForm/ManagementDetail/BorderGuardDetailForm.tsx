import React, { useEffect, useState } from 'react';
import { Col, Descriptions, Row } from 'antd';
import UploadImageButton from '@app/components/buttons/UploadImage/UploadImageButton';
import { useNavigate, useParams } from 'react-router-dom';
import EditButton from '@app/components/buttons/EditButton/EditButton';
import { editButtonStyle } from '../DetailForm.style';
import StatusTag from '@app/components/tags/StatusTag/StatusTag';
import { BorderGuard, getBorderGuardTableData } from '@app/api/borderGuard.api';

const formatDate = (date: Date): string => {
  const day = ('0' + date.getDate()).slice(-2);
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const BorderGuardDetailForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [borderGuardDetail, setBorderGuardDetail] = useState<BorderGuard | null>(null);
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [isEditMode, setIsEditMode] = useState(false);
  const [prevUpdateInforTime, setPrevUpdateInforTime] = useState<Date | null>(null);
  const handleImageUpload = (url: string) => {
    setImageUrl(url);
  };

  const handleEditClick = () => {
    navigate(`/border-guard-detail/${id}/edit`);
  };

  const handleSaveClick = () => {
    setIsEditMode(false);
  };

  useEffect(() => {
    const fetchborderGuardDetails = async () => {
      try {
        const { data } = await getBorderGuardTableData({ current: 1, pageSize: 6 });
        const borderGuard = data.find((item) => item.id === Number(id));

        if (borderGuard) {
          setBorderGuardDetail(borderGuard);
          setImageUrl(borderGuard.avatar);
        } else {
          console.error(`Border guard with id ${id} not found`);
        }
      } catch (error) {
        console.error('Error fetching border guard details', error);
      }
    };

    fetchborderGuardDetails();
  }, [id]);

  if (!borderGuardDetail) {
    return <div>Đang tải...</div>;
  }

  const handleBack = () => {
    navigate('/border-guard-management');
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
            <Descriptions.Item label="Họ và tên">{borderGuardDetail.fullName}</Descriptions.Item>
            <Descriptions.Item label="Ngày sinh">
              {formatDate(new Date(borderGuardDetail.dateOfBirth))}
            </Descriptions.Item>
            <Descriptions.Item label="Địa chỉ">{borderGuardDetail.address}</Descriptions.Item>
            <Descriptions.Item label="Quốc tịch">{borderGuardDetail.country}</Descriptions.Item>
            <Descriptions.Item label="Căng cước công dân">{borderGuardDetail.nationalId}</Descriptions.Item>
            <Descriptions.Item label="Giới tính">{borderGuardDetail.gender}</Descriptions.Item>
            <Descriptions.Item label="Số điện thoại">{borderGuardDetail.phoneNumber}</Descriptions.Item>
            <Descriptions.Item label="Email">{borderGuardDetail.email}</Descriptions.Item>
            <Descriptions.Item label="Ngày thay đổi gần nhất">
              {formatDate(new Date(borderGuardDetail.updatedAt))}
            </Descriptions.Item>
            <Descriptions.Item label="Thay đổi bởi">{borderGuardDetail.updatedBy}</Descriptions.Item>
            <Descriptions.Item label="Trạng thái">
              <StatusTag status={borderGuardDetail.isDisabled}>
                {borderGuardDetail.isDisabled ? 'Đã khóa' : 'Hoạt động'}
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

export default BorderGuardDetailForm;
