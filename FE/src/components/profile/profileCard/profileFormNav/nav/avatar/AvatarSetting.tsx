import React, { useEffect, useState } from 'react';
import { Card, Typography, Upload, Button, Image, message, Row, Col, Space } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { UploadChangeParam } from 'antd/es/upload';
import { RcFile, UploadFile } from 'antd/es/upload/interface';
import { fetchUserData, extractKey, uploadImageToS3 } from '../PersonalInfo/PersonalInfo.utils';
const idToken = localStorage.getItem('idToken');

// Function to convert file to Base64 string
const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

// Function to perform validations before file upload
const beforeUpload = (file: RcFile): boolean => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG files!');
    return false;
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must be smaller than 2MB!');
    return false;
  }
  return true;
};

const AvatarSetting: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [originalFileName, setOriginalFileName] = useState('');
  const [originalAvatarUrl, setOriginalAvatarUrl] = useState('');
  const [hasChanged, setHasChanged] = useState(false);
  const [selectedFile, setSelectedFile] = useState<RcFile | null>(null);

  useEffect(() => {
    if (idToken) {
      fetchUserData(idToken)
        .then((data) => {
          //Lấy URL image
          setImageUrl(data.result.avatar);
          setOriginalAvatarUrl(data.result.avatar);
          //Tách lấy key từ URL S3 image
          const avatarKey = extractKey(data.result.avatar);
          //Đặt tên ảnh mới theo tên ảnh cũ.
          setOriginalFileName(avatarKey);
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
        });
    } else {
      console.error('No idToken found');
    }
  }, [idToken]);

  // Handler for file changes in the Upload component
  const handleFileChange = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj as RcFile, (url: string) => {
        setImageUrl(url);
        setSelectedFile(info.file.originFileObj || null);
        setLoading(false);
        setHasChanged(true);
      });
    }
  };

  const handleSave = async () => {
    if (!selectedFile) {
      message.error('Please select a file to upload');
      return;
    }
    if (!originalFileName) {
      message.error('Original file name is missing');
      return;
    }

    try {
      // gọi hàm tải ảnh lên S3
      await uploadImageToS3(selectedFile, originalFileName);

      const successMsgKey = 'updateSuccess';
      message.success({ content: 'Cập nhật thông tin thành công', key: successMsgKey });

      setTimeout(() => {
        message.destroy(successMsgKey);

        let secondsToGo = 1;
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
    } catch (error) {
      console.error('Error uploading to S3', error);
      message.error('Failed to update your avatar.');
    }
  };

  const handleCancel = () => {
    // Set lại link ảnh cũ từ state
    setImageUrl(originalAvatarUrl);
    // Clear state giám sát file đã chọn
    setSelectedFile(null);
    setHasChanged(false);
    console.log('Image selection canceled and original avatar restored.');
  };

  return (
    <Card>
      <Row gutter={[10, 20]}>
        <Col span={24} style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
          <Upload
            name="avatar"
            listType="picture"
            className="avatar-uploader"
            showUploadList={false}
            action="https://a3f36714-1e69-4b25-ab71-2c0bc95c7a16.mock.pstmn.io/mockTest/postRoute"
            beforeUpload={beforeUpload}
            onChange={handleFileChange}
          >
            <Space direction="vertical" size={20}>
              <img
                src={imageUrl}
                alt="avatar"
                style={{
                  width: '500px',
                  height: '500px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '2px solid gray',
                }}
              />
              <Typography>Để thay đổi ảnh đại diện, hãy nhấn vào ảnh của bạn</Typography>
            </Space>
          </Upload>
        </Col>
        {hasChanged && (
          <Col span={24} style={{ textAlign: 'center' }}>
            <Space>
              <Button type="primary" icon={<CheckOutlined />} onClick={() => handleSave()}>
                Lưu
              </Button>
              <Button icon={<CloseOutlined />} onClick={handleCancel}>
                Hủy/Quay lại
              </Button>
            </Space>
          </Col>
        )}
      </Row>
    </Card>
  );
};

export default AvatarSetting;
