import React, { useEffect, useState } from 'react';
import { Col, Row, Descriptions } from 'antd';
import UploadImageButton from '@app/components/buttons/UploadImage/UploadImageButton';
import { useNavigate, useParams } from 'react-router-dom';
import EditButton from '@app/components/buttons/EditButton/EditButton';
import { editButtonStyle } from '../DetailForm.style';
import StatusTag from '@app/components/tags/StatusTag/StatusTag';
import { ShipOwner, getShipOwnerTableData } from '@app/api/shipOwner.api';

const formatDate = (date: Date): string => {
  const day = ('0' + date.getDate()).slice(-2);
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const ShipOwnerDetailForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [shipOwnerDetails, setShipOwnerDetails] = useState<ShipOwner | null>(null);
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [isEditMode, setIsEditMode] = useState(false);
  const handleImageUpload = (url: string) => {
    setImageUrl(url);
  };

  const handleEditClick = () => {
    navigate(`/ship-owner-detail/${id}/edit`);
  };

  useEffect(() => {
    const fetchshipOwnerDetail = async () => {
      try {
        const { data } = await getShipOwnerTableData({ current: 1, pageSize: 6 });
        const shipOwner = data.find((item) => item.id === Number(id));

        if (shipOwner) {
          setShipOwnerDetails(shipOwner);
          setImageUrl(shipOwner.avatar);
        } else {
          console.error(`Ship owner with id ${id} not found`);
        }
      } catch (error) {
        console.error('Error fetching ship owner details', error);
      }
    };

    fetchshipOwnerDetail();
  }, [id]);

  if (!shipOwnerDetails) {
    return <div>Đang tải...</div>;
  }

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
            <Descriptions.Item label="Họ và tên">{shipOwnerDetails.fullName}</Descriptions.Item>
            <Descriptions.Item label="Ngày sinh">
              {formatDate(new Date(shipOwnerDetails.dateOfBirth))}
            </Descriptions.Item>
            <Descriptions.Item label="Địa chỉ">{shipOwnerDetails.address}</Descriptions.Item>
            <Descriptions.Item label="Quốc tịch">{shipOwnerDetails.country}</Descriptions.Item>
            <Descriptions.Item label="Căng cước công dân">{shipOwnerDetails.nationalId}</Descriptions.Item>
            <Descriptions.Item label="Giới tính">{shipOwnerDetails.gender}</Descriptions.Item>
            <Descriptions.Item label="Số điện thoại">{shipOwnerDetails.phoneNumber}</Descriptions.Item>
            <Descriptions.Item label="Email">{shipOwnerDetails.email}</Descriptions.Item>
            <Descriptions.Item label="Ngày thay đổi gần nhất">
              {formatDate(new Date(shipOwnerDetails.updatedAt))}
            </Descriptions.Item>
            <Descriptions.Item label="Thay đổi bởi">{shipOwnerDetails.updatedBy}</Descriptions.Item>
            <Descriptions.Item label="Trạng thái">
              <StatusTag status={shipOwnerDetails.isDisabled}>
                {shipOwnerDetails.isDisabled ? 'Đã khóa' : 'Hoạt động'}
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

export default ShipOwnerDetailForm;
