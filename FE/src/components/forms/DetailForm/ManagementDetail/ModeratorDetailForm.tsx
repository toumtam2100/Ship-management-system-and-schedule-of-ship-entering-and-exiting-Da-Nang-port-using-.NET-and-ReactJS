import React, { useEffect, useState } from 'react';
import { Col, Descriptions, Row } from 'antd';
import UploadImageButton from '@app/components/buttons/UploadImage/UploadImageButton';
import { useNavigate, useParams } from 'react-router-dom';
import EditButton from '@app/components/buttons/EditButton/EditButton';
import { editButtonStyle } from '../DetailForm.style';
import StatusTag from '@app/components/tags/StatusTag/StatusTag';
import { Moderator, getModeratorTableData } from '@app/api/moderator.api';

const formatDate = (date: Date): string => {
  const day = ('0' + date.getDate()).slice(-2);
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const ModeratorDetailForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [moderatorDetails, setModeratorDetails] = useState<Moderator | null>(null);
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [isEditMode, setIsEditMode] = useState(false);
  const [prevUpdateInforTime, setPrevUpdateInforTime] = useState<Date | null>(null);
  const handleImageUpload = (url: string) => {
    setImageUrl(url);
  };

  const handleEditClick = () => {
    navigate(`/moderator-detail/${id}/edit`);
  };

  const handleSaveClick = () => {
    setIsEditMode(false);
  };

  useEffect(() => {
    const fetchModeratorDetail = async () => {
      try {
        const { data } = await getModeratorTableData({ current: 1, pageSize: 6 });
        const moderator = data.find((item) => item.id === Number(id));

        if (moderator) {
          setModeratorDetails(moderator);
          setImageUrl(moderator.avatar);
        } else {
          console.error(`Moderator with id ${id} not found`);
        }
      } catch (error) {
        console.error('Error fetching moderator details', error);
      }
    };

    fetchModeratorDetail();
  }, [id]);

  if (!moderatorDetails) {
    return <div>Đang tải...</div>;
  }

  const handleBack = () => {
    navigate('/moderator-management');
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
            <Descriptions.Item label="Họ và tên">{moderatorDetails.fullName}</Descriptions.Item>
            <Descriptions.Item label="Ngày sinh">
              {formatDate(new Date(moderatorDetails.dateOfBirth))}
            </Descriptions.Item>
            <Descriptions.Item label="Địa chỉ">{moderatorDetails.address}</Descriptions.Item>
            <Descriptions.Item label="Quốc tịch">{moderatorDetails.country}</Descriptions.Item>
            <Descriptions.Item label="Căng cước công dân">{moderatorDetails.nationalId}</Descriptions.Item>
            <Descriptions.Item label="Giới tính">{moderatorDetails.gender}</Descriptions.Item>
            <Descriptions.Item label="Số điện thoại">{moderatorDetails.phoneNumber}</Descriptions.Item>
            <Descriptions.Item label="Email">{moderatorDetails.email}</Descriptions.Item>
            <Descriptions.Item label="Ngày thay đổi gần nhất">
              {formatDate(new Date(moderatorDetails.updatedAt))}
            </Descriptions.Item>
            <Descriptions.Item label="Thay đổi bởi">{moderatorDetails.updatedBy}</Descriptions.Item>
            <Descriptions.Item label="Trạng thái">
              <StatusTag status={moderatorDetails.isDisabled}>
                {moderatorDetails.isDisabled ? 'Đã khóa' : 'Hoạt động'}
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

export default ModeratorDetailForm;
