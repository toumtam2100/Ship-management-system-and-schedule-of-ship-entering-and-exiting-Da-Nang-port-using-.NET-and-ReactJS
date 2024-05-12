import React, { useEffect, useState } from 'react';
import { Col, Descriptions, Row } from 'antd';
import UploadImageButton from '@app/components/buttons/UploadImage/UploadImageButton';
import { useNavigate, useParams } from 'react-router-dom';
import { ShipTableRow, getImageFromS3, getShipTableData } from '@app/api/shipTable.api';
import EditButton from '@app/components/buttons/EditButton/EditButton';
import { editButtonStyle } from '../DetailForm.style';
import StatusTag from '@app/components/tags/StatusTag/StatusTag';
import { ShipCertificateRow, getShipCertificateData } from '@app/api/shipCertificate.api';

const formatDate = (date: Date): string => {
  const day = ('0' + date.getDate()).slice(-2);
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const ShipDetailForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [shipDetails, setShipDetails] = useState<ShipTableRow | null>(null);
  const [shipCertiDetails, setShipCertiDetails] = useState<ShipCertificateRow | null>(null);
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [isEditMode, setIsEditMode] = useState(false);
  const handleImageUpload = (url: string) => {
    setImageUrl(url);
  };

  const handleEditClick = () => {
    navigate(`/ship-detail/${id}/edit`);
  };
  const handleSaveClick = () => {
    // TODO: Add logic to save the edited data
    setIsEditMode(false);
  };

  useEffect(() => {
    const fetchShipDetails = async () => {
      try {
        // Fetch ship details
        const { data } = await getShipTableData({ current: 1, pageSize: 6 });
        const ship = data.find((item) => item.id === Number(id));

        if (ship) {
          setShipDetails(ship);
          setImageUrl(ship.imagePath);
          getImageFromS3(ship.imagePath).then(setImageUrl).catch(console.error);
          console.log('Fetched Ship Details:', ship);

          const certificateData = await getShipCertificateData({ current: 1, pageSize: 6 }, `${ship.id}`);

          if (certificateData) {
            const certificate = certificateData.data[0];
            setShipCertiDetails({
              ...certificate,
              issueDate: new Date(certificate.issueDate),
              expiryDate: new Date(certificate.expiryDate),
            });
          } else {
            console.error(`Certificate details not found for ship with id ${id}`);
          }
        } else {
          console.error(`Ship with id ${id} not found`);
        }
      } catch (error) {
        console.error('Error fetching ship details', error);
      }
    };
    fetchShipDetails();
  }, [id]);

  if (!shipDetails) {
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
          <Descriptions column={2}>
            <Descriptions.Item label="Họ và tên chủ tàu">{shipDetails.shipOwner}</Descriptions.Item>
            <Descriptions.Item label="Tên tàu">{shipDetails.shipName}</Descriptions.Item>
            <Descriptions.Item label="Số phân cấp">{shipDetails.classNumber}</Descriptions.Item>
            <Descriptions.Item label="Số IMO">{shipDetails.IMONumber}</Descriptions.Item>
            <Descriptions.Item label="Số đăng kiểm">{shipDetails.registerNumber}</Descriptions.Item>
            <Descriptions.Item label="Ngày phát hành">
              {shipCertiDetails?.issueDate ? formatDate(shipCertiDetails.expiryDate) : ''}
            </Descriptions.Item>
            <Descriptions.Item label="Ngày hết hạn">
              {shipCertiDetails?.expiryDate ? formatDate(shipCertiDetails.expiryDate) : ''}
            </Descriptions.Item>
            <Descriptions.Item label="Loại tàu">{shipDetails.shipType}</Descriptions.Item>
            <Descriptions.Item label="Tổng trọng tải">{shipDetails.tonnageGross}</Descriptions.Item>
            <Descriptions.Item label="Tình trạng">
              <StatusTag status={shipDetails.isDisabled}>{shipDetails.isDisabled ? 'Đã khóa' : 'Hoạt động'}</StatusTag>
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

export default ShipDetailForm;
