import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Upload, Button, Typography, Space } from 'antd';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import React, { useState } from 'react';

interface ImageUploadProps {
  uploadEnabled?: boolean; // Flag to enable/disable upload functionality
  imageUrl?: string; // URL of the image to display
  setSelectedFile: React.Dispatch<React.SetStateAction<RcFile | undefined>>;
}

const { Text } = Typography;

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
  const acceptedExtensions = ['image/jpeg', 'image/png', 'image/jpg'];
  const isAcceptedFileType = acceptedExtensions.includes(file.type);
  if (!isAcceptedFileType) {
    message.error('Chỉ chấp nhận file ảnh (JPEG/PNG/JPG)!');
  }
  const isLt4M = file.size / 1024 / 1024 < 4;
  if (!isLt4M) {
    message.error('Kích thước ảnh phải nhỏ hơn 4MB');
  }
  return isAcceptedFileType && isLt4M;
};

const ImageUpload: React.FC<ImageUploadProps> = ({ setSelectedFile }) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  //const [selectedFile, setSelectedFile] = useState<RcFile>();

  const handleChange: UploadProps['onChange'] = async (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoading(false);
        setImageUrl(url);
        setSelectedFile(info.file.originFileObj); // Store the selected file
      });
    }
  };

  const uploadButton = (
    <Button type="default" style={{ borderRadius: 20, width: 400, height: 600 }}>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 10 }}>Tải ảnh lên</div>
    </Button>
  );

  return (
    <>
      <Upload
        name="avatar"
        listType="picture"
        className="ship-image-uploader"
        showUploadList={false}
        action="https://a3f36714-1e69-4b25-ab71-2c0bc95c7a16.mock.pstmn.io/mockTest/postRoute"
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {imageUrl ? (
          <Space direction="vertical" align="center">
            <img
              src={imageUrl}
              alt="ship-img"
              style={{
                width: 400,
                height: 600,
                borderRadius: 20,
                border: '2px solid rgba(0, 0, 0, 0.3)',
                objectFit: 'cover',
              }}
            />
            <Text>Để thay đổi ảnh, hãy bấm lại vào ảnh!</Text>
          </Space>
        ) : (
          uploadButton
        )}
      </Upload>
    </>
  );
};

export default ImageUpload;
