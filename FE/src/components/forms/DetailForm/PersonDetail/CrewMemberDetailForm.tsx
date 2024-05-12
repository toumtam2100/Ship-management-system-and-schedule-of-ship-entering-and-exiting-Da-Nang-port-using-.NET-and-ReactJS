import React, { useEffect, useState } from 'react';
import { Col, DatePicker, Input, Row, Select, InputNumber } from 'antd';
import UploadImageButton from '@app/components/buttons/UploadImage/UploadImageButton';
import { useNavigate, useParams } from 'react-router-dom';
import { CrewMemberTableRow, getCrewMemberTableData } from '@app/api/crewMemberTable.api';
import moment from 'moment';
import EditButton from '@app/components/buttons/EditButton/EditButton';
import { editButtonStyle, formItemStyle, labelItemStyle, inputTextItemStyle, textItemStyle } from '../DetailForm.style';
import SaveAndCancelButton from '@app/components/buttons/SaveAndCancel/SaveAndCancelButton';
import StatusTag from '@app/components/tags/StatusTag/StatusTag';
import SexTag from '@app/components/tags/SexTag/SexTag';
import { CheckOutlined, ManOutlined, WomanOutlined } from '@ant-design/icons';
import { BaseSpace } from '@app/components/common/BaseSpace/BaseSpace';
import ReactCountryFlag from 'react-country-flag';

const { Option } = Select;

const formatDate = (date: Date): string => {
  const day = ('0' + date.getDate()).slice(-2);
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const CrewMemberDetailForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [crewMemberDetails, setCrewMemberDetails] = useState<CrewMemberTableRow | null>(null);
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [isEditMode, setIsEditMode] = useState(false);
  const [prevUpdateInforTime, setPrevUpdateInforTime] = useState<Date | null>(null);
  const handleImageUpload = (url: string) => {
    setImageUrl(url);
  };

  const handleEditClick = () => {
    setIsEditMode(true);
    if (crewMemberDetails) {
      setPrevUpdateInforTime(crewMemberDetails.updateInforTime);
      setCrewMemberDetails({
        ...crewMemberDetails,
        updateInforTime: new Date(),
      });
    }
  };

  const handleSaveClick = () => {
    setIsEditMode(false);
  };

  const handleCancelClick = () => {
    setIsEditMode(false);
    if (crewMemberDetails && prevUpdateInforTime) {
      setCrewMemberDetails({
        ...crewMemberDetails,
        updateInforTime: prevUpdateInforTime,
      });
    }
  };

  useEffect(() => {
    const fetchcrewMemberDetails = async () => {
      try {
        const { data } = await getCrewMemberTableData({ current: 1, pageSize: 6 });
        const crewMember = data.find((item) => item.id === Number(id));

        if (crewMember) {
          setCrewMemberDetails(crewMember);
          setImageUrl(crewMember.imageUrl);
        } else {
          console.error(`Crew member with id ${id} not found`);
        }
      } catch (error) {
        console.error('Error fetching crew member details', error);
      }
    };

    fetchcrewMemberDetails();
  }, [id]);

  if (!crewMemberDetails) {
    return <div>Đang tải...</div>;
  }

  const handleBack = () => {
    navigate('/crew-member-management');
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
          <Row gutter={[0, 16]}>
            <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }} xl={{ span: 12 }}>
              <div style={formItemStyle}>
                <label style={labelItemStyle}>Họ và tên: </label>
                {isEditMode ? (
                  <Input
                    style={inputTextItemStyle}
                    size="middle"
                    value={crewMemberDetails.fullName}
                    onChange={(e) => setCrewMemberDetails({ ...crewMemberDetails, fullName: e.target.value })}
                  />
                ) : (
                  <span style={textItemStyle}>{crewMemberDetails.fullName}</span>
                )}
              </div>
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }} xl={{ span: 12 }}>
              <div style={formItemStyle}>
                <label style={labelItemStyle}>Ngày sinh: </label>
                {isEditMode ? (
                  <DatePicker
                    style={inputTextItemStyle}
                    value={moment(crewMemberDetails.dateOfBirth)}
                    allowClear={false}
                    size="middle"
                    onChange={(date) => {
                      if (date) {
                        setCrewMemberDetails({ ...crewMemberDetails, dateOfBirth: date.toDate() });
                      }
                    }}
                  />
                ) : (
                  <>{formatDate(crewMemberDetails.dateOfBirth)}</>
                )}
              </div>
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }} xl={{ span: 12 }}>
              <div style={formItemStyle}>
                <label style={labelItemStyle}>Nơi sinh: </label>
                {isEditMode ? (
                  <Input
                    style={inputTextItemStyle}
                    size="middle"
                    value={crewMemberDetails.birthPlace}
                    onChange={(e) => setCrewMemberDetails({ ...crewMemberDetails, birthPlace: e.target.value })}
                  />
                ) : (
                  <span style={textItemStyle}>{crewMemberDetails.birthPlace}</span>
                )}
              </div>
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }} xl={{ span: 12 }}>
              <div style={formItemStyle}>
                <label style={labelItemStyle}>Quốc tịch: </label>
                {isEditMode ? (
                  <Input
                    style={inputTextItemStyle}
                    size="middle"
                    value={crewMemberDetails.country}
                    onChange={(e) => setCrewMemberDetails({ ...crewMemberDetails, country: e.target.value })}
                  />
                ) : (
                  <span style={textItemStyle}>
                    {crewMemberDetails.country}
                    <ReactCountryFlag
                      countryCode={'VN'}
                      svg
                      alt="country flag"
                      style={{ fontSize: '2em', marginLeft: '10px' }}
                    />
                  </span>
                )}
              </div>
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }} xl={{ span: 12 }}>
              <div style={formItemStyle}>
                <label style={labelItemStyle}>Căn cước công dân: </label>
                {isEditMode ? (
                  <Input
                    style={inputTextItemStyle}
                    size="middle"
                    value={crewMemberDetails.cardId}
                    onChange={(e) => setCrewMemberDetails({ ...crewMemberDetails, cardId: e.target.value })}
                  />
                ) : (
                  <span style={textItemStyle}>{crewMemberDetails.cardId}</span>
                )}
              </div>
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }} xl={{ span: 12 }}>
              <div style={formItemStyle}>
                <label style={labelItemStyle}>Giới tính: </label>
                {isEditMode ? (
                  <Select
                    style={inputTextItemStyle}
                    size="middle"
                    value={crewMemberDetails.sex}
                    onChange={(value) => setCrewMemberDetails({ ...crewMemberDetails, sex: value })}
                  >
                    <Option value={true}>
                      <BaseSpace align="center">
                        <ManOutlined />
                        Nam
                      </BaseSpace>
                    </Option>
                    <Option value={false}>
                      <BaseSpace align="center">
                        <WomanOutlined />
                        Nữ
                      </BaseSpace>
                    </Option>
                  </Select>
                ) : (
                  <SexTag sex={crewMemberDetails.sex} />
                )}
              </div>
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }} xl={{ span: 12 }}>
              <div style={formItemStyle}>
                <label style={labelItemStyle}>Số điện thoại: </label>
                {isEditMode ? (
                  <Input
                    disabled
                    style={{ ...inputTextItemStyle, borderColor: 'green' }}
                    size="middle"
                    value={crewMemberDetails.phoneNumber}
                    suffix={
                      <span style={{ color: 'green' }}>
                        <CheckOutlined /> Đã xác thực
                      </span>
                    }
                    onChange={(e) => setCrewMemberDetails({ ...crewMemberDetails, phoneNumber: e.target.value })}
                  />
                ) : (
                  <span style={textItemStyle}>{crewMemberDetails.phoneNumber}</span>
                )}
              </div>
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }} xl={{ span: 12 }}>
              <div style={formItemStyle}>
                <label style={labelItemStyle}>Email: </label>
                {isEditMode ? (
                  <Input
                    disabled
                    style={{ ...inputTextItemStyle, borderColor: 'green' }}
                    size="middle"
                    value={crewMemberDetails.email}
                    suffix={
                      <span style={{ color: 'green' }}>
                        <CheckOutlined /> Đã xác thực
                      </span>
                    }
                    onChange={(e) => setCrewMemberDetails({ ...crewMemberDetails, email: e.target.value })}
                  />
                ) : (
                  <span style={textItemStyle}>{crewMemberDetails.email}</span>
                )}
              </div>
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }} xl={{ span: 12 }}>
              <div style={formItemStyle}>
                <label style={labelItemStyle}>Ngày thay đổi gần nhất: </label>
                {isEditMode ? (
                  <DatePicker
                    style={inputTextItemStyle}
                    value={
                      crewMemberDetails.updateInforTime && !isNaN(new Date(crewMemberDetails.updateInforTime).getTime())
                        ? moment(crewMemberDetails.updateInforTime)
                        : null
                    }
                    allowClear={false}
                    size="middle"
                    onChange={(date) => {
                      if (date) {
                        setCrewMemberDetails({ ...crewMemberDetails, updateInforTime: date.toDate() });
                      }
                    }}
                  />
                ) : (
                  <>
                    {crewMemberDetails.updateInforTime && !isNaN(new Date(crewMemberDetails.updateInforTime).getTime())
                      ? formatDate(crewMemberDetails.updateInforTime)
                      : 'Chưa từng thay đổi'}
                  </>
                )}
              </div>
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }} xl={{ span: 12 }}>
              <div style={formItemStyle}>
                <label style={labelItemStyle}>Thay đổi bởi: </label>
                {isEditMode ? (
                  <Input
                    style={inputTextItemStyle}
                    size="middle"
                    value={crewMemberDetails.changeBy || ''}
                    onChange={(e) => setCrewMemberDetails({ ...crewMemberDetails, changeBy: e.target.value })}
                  />
                ) : (
                  <span style={textItemStyle}>{crewMemberDetails.changeBy || 'Chưa từng thay đổi'}</span>
                )}
              </div>
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }} xl={{ span: 12 }}>
              <div style={formItemStyle}>
                <label style={labelItemStyle}>Trạng thái: </label>
                {isEditMode ? (
                  <Select
                    style={inputTextItemStyle}
                    size="middle"
                    value={crewMemberDetails.status}
                    onChange={(value) => setCrewMemberDetails({ ...crewMemberDetails, status: value })}
                  >
                    <Option value={true}>Hoạt động</Option>
                    <Option value={false}>Không hoạt động</Option>
                  </Select>
                ) : (
                  <StatusTag status={crewMemberDetails.status} />
                )}
              </div>
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }} xl={{ span: 12 }}>
              <div style={formItemStyle}>
                <label style={labelItemStyle}>Năm kinh nghiệm: </label>
                {isEditMode ? (
                  <InputNumber
                    min={1}
                    max={40}
                    style={inputTextItemStyle}
                    size="middle"
                    defaultValue={crewMemberDetails.yearExperience || 1} // Providing a default value of 1 if crewMemberDetails.yearExperience is null
                    value={crewMemberDetails.yearExperience}
                    onChange={(value) => setCrewMemberDetails({ ...crewMemberDetails, yearExperience: value || 1 })} // Providing a default value of 1 if value is null
                  />
                ) : (
                  <span style={textItemStyle}>{crewMemberDetails.yearExperience}</span>
                )}
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row gutter={[8, 8]} style={editButtonStyle}>
        <Col
          xs={{ span: 24, offset: 0 }}
          md={{ span: 8, offset: 8 }}
          lg={{ span: 6, offset: 6 }}
          xl={{ span: 4, offset: 4 }}
        >
          {isEditMode ? (
            <SaveAndCancelButton onSave={handleSaveClick} onCancel={handleCancelClick} />
          ) : (
            <EditButton onClick={handleEditClick} />
          )}
        </Col>
      </Row>
    </div>
  );
};

export default CrewMemberDetailForm;
